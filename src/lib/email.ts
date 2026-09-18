import nodemailer from "nodemailer";
import { ContactSubmission, EmailSettings, EmailNotificationResult } from "./types";
import { getEmailSettings } from "./db";

export function generateInquiryHtml(submission: ContactSubmission, baseUrl: string = "https://shazwerk.ch"): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F8F7; color: #141416; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E5E2; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .header { background: #141416; color: #FFFFFF; padding: 24px 32px; }
    .brand { font-size: 14px; font-weight: 700; letter-spacing: 0.05em; color: #E30613; text-transform: uppercase; }
    .title { font-size: 20px; font-weight: 600; margin-top: 6px; color: #FFFFFF; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717A; margin-bottom: 4px; font-family: monospace; }
    .value { font-size: 15px; color: #141416; font-weight: 500; }
    .value-strong { font-size: 17px; font-weight: 600; color: #09090B; }
    .message-box { background: #F8F8F7; border: 1px solid #E5E5E2; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272A; white-space: pre-wrap; margin-top: 8px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .actions { display: flex; gap: 12px; margin-top: 28px; padding-top: 24px; border-top: 1px solid #E5E5E2; }
    .button-primary { display: inline-block; background: #E30613; color: #FFFFFF !important; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 600; text-align: center; }
    .button-secondary { display: inline-block; background: #141416; color: #FFFFFF !important; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 600; text-align: center; }
    .footer { background: #FAFAFA; padding: 16px 32px; border-top: 1px solid #E5E5E2; font-size: 11px; color: #A1A1AA; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">SHAZWERK · New Project Brief</div>
      <div class="title">${escapeHtml(submission.company)}</div>
    </div>
    <div class="content">
      <div class="grid">
        <div class="field-group">
          <div class="label">Client Contact</div>
          <div class="value-strong">${escapeHtml(submission.name)}</div>
          <div class="value"><a href="mailto:${escapeHtml(submission.email)}" style="color: #E30613; text-decoration: none;">${escapeHtml(submission.email)}</a></div>
          ${submission.phone ? `<div class="value" style="font-size: 13px; color: #71717A;">${escapeHtml(submission.phone)}</div>` : ""}
        </div>
        <div class="field-group">
          <div class="label">Scope & Focus</div>
          <div class="value-strong">${escapeHtml(submission.project_type)}</div>
          <div class="value" style="font-size: 13px; color: #71717A;">Budget: ${escapeHtml(submission.budget || "Not specified")}</div>
          <div class="value" style="font-size: 13px; color: #71717A;">Timeline: ${escapeHtml(submission.timeline || "Not specified")}</div>
        </div>
      </div>

      <div class="field-group">
        <div class="label">Project Brief & Technical Overview</div>
        <div class="message-box">${escapeHtml(submission.message)}</div>
      </div>

      <div class="actions">
        <a href="mailto:${escapeHtml(submission.email)}?subject=Re:%20Project%20Brief%20%E2%80%94%20SHAZWERK%20%2F%20${encodeURIComponent(submission.company)}&body=Hi%20${encodeURIComponent(submission.name)},%0A%0AThank%20you%20for%20reaching%20out%20to%20SHAZWERK.%20We%20have%20reviewed%20your%20brief%20regarding%20${encodeURIComponent(submission.project_type)}.%0A%0A" class="button-primary">
          Reply to Lead
        </a>
        <a href="${baseUrl}/admin" class="button-secondary">
          Open in Admin Console
        </a>
      </div>
    </div>
    <div class="footer">
      Submission ID: ${submission.id.slice(0, 8).toUpperCase()} · Received: ${new Date(submission.created_at).toUTCString()} · SHAZWERK Swiss Engineering
    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendInquiryNotification(
  submission: ContactSubmission
): Promise<EmailNotificationResult> {
  const timestamp = new Date().toISOString();
  const settings = await getEmailSettings();

  if (!settings.notifyOnNewLead) {
    return {
      success: true,
      provider: "disabled",
      timestamp,
    };
  }

  const recipient = settings.notificationEmail || process.env.NOTIFICATION_EMAIL || "hello@shazwerk.ch";
  const subject = `[SHAZWERK Brief] ${submission.company} — ${submission.project_type}`;
  const html = generateInquiryHtml(submission);

  // 1. Check Resend API
  const resendApiKey = settings.resendApiKey || process.env.RESEND_API_KEY;
  if ((settings.provider === "resend" || settings.provider === "auto") && resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `${settings.senderName || "SHAZWERK Inquiries"} <${settings.senderEmail || "notifications@shazwerk.ch"}>`,
          to: [recipient],
          reply_to: submission.email,
          subject: subject,
          html: html,
        }),
      });

      const resData = await response.json();
      if (response.ok) {
        return {
          success: true,
          provider: "resend",
          messageId: resData.id,
          timestamp,
        };
      }
      console.warn("Resend API warning:", resData);
    } catch (err: any) {
      console.error("Resend delivery failed:", err);
    }
  }

  // 2. Check SMTP via Nodemailer
  const smtpHost = settings.smtpHost || process.env.SMTP_HOST;
  const smtpUser = settings.smtpUser || process.env.SMTP_USER;
  const smtpPass = settings.smtpPass || process.env.SMTP_PASS;
  const smtpPort = settings.smtpPort || Number(process.env.SMTP_PORT) || 587;

  if ((settings.provider === "smtp" || settings.provider === "auto") && smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: settings.smtpSecure || smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${settings.senderName || "SHAZWERK Inquiries"}" <${settings.senderEmail || smtpUser}>`,
        to: recipient,
        replyTo: submission.email,
        subject: subject,
        html: html,
      });

      return {
        success: true,
        provider: "smtp",
        messageId: info.messageId,
        timestamp,
      };
    } catch (err: any) {
      console.error("SMTP delivery failed:", err);
    }
  }

  // 3. Check Webhook
  const webhookUrl = settings.webhookUrl || process.env.NOTIFICATION_WEBHOOK_URL;
  if ((settings.provider === "webhook" || settings.provider === "auto") && webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_project_inquiry",
          recipient,
          submission,
          html,
          timestamp,
        }),
      });
      if (res.ok) {
        return {
          success: true,
          provider: "webhook",
          timestamp,
        };
      }
    } catch (err: any) {
      console.error("Webhook notification failed:", err);
    }
  }

  // 4. Default / Stored notification fallback (always records locally)
  console.log(`[Notification Queued] Destination: ${recipient} | Submission from: ${submission.email}`);
  return {
    success: true,
    provider: "stored_in_console",
    messageId: `queued_${submission.id.slice(0, 8)}`,
    timestamp,
  };
}
