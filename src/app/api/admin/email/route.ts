import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getEmailSettings, updateEmailSettings } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";
import { ContactSubmission } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getEmailSettings();
  // Redact passwords in response for security
  const safeSettings = {
    ...settings,
    smtpPass: settings.smtpPass ? "••••••••" : "",
    resendApiKey: settings.resendApiKey ? `${settings.resendApiKey.slice(0, 6)}...` : "",
  };

  return NextResponse.json({ settings: safeSettings });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    // Don't overwrite password with bullets
    if (payload.smtpPass === "••••••••") {
      delete payload.smtpPass;
    }
    if (payload.resendApiKey && payload.resendApiKey.includes("...")) {
      delete payload.resendApiKey;
    }

    const updated = await updateEmailSettings(payload);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update email settings" }, { status: 500 });
  }
}

// Send Test Email
export async function PUT(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testSubmission: ContactSubmission = {
      id: "TEST-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      created_at: new Date().toISOString(),
      name: "Marc Hürzeler (Test Lead)",
      company: "Zurich Dynamics Holding AG",
      email: "marc.huerzeler@zurich-dynamics.ch",
      phone: "+41 44 820 90 10",
      project_type: "Enterprise AI & Sovereign LLM",
      budget: "CHF 100k – 200k+",
      timeline: "1 – 3 months",
      message:
        "This is an automated test notification from the SHAZWERK Admin Console. When a client submits a project brief on https://shazwerk.ch/contact, you will receive real-time email notifications formatted with client contact details, budget, and direct one-click reply links.",
      status: "new",
    };

    const result = await sendInquiryNotification(testSubmission);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to send test email" }, { status: 500 });
  }
}
