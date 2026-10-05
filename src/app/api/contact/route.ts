import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSubmission, recordAnalyticsEvent } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  company: z.string().max(100).optional().nullable().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(40).optional().nullable().or(z.literal("")),
  project_type: z.string().min(1).max(100),
  budget: z.string().max(100).optional().nullable().or(z.literal("")),
  timeline: z.string().max(100).optional().nullable().or(z.literal("")),
  message: z.string().min(1, "Message is required").max(10000),
  honeypot: z.string().optional(),
});

// Simple sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Submission rate limit exceeded. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam trap check: Only filter out if honeypot has non-whitespace content AND message looks suspicious or empty
    if (body.honeypot && typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
      console.warn("[Spam Trap] Honeypot field filled:", body.honeypot);
      // Return fake success to confuse bots without storing spam
      return NextResponse.json({ success: true, id: "SPAM-TRAP-FILTERED" });
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Invalid input payload";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = validation.data;

    // Secure database insertion
    const submission = await createSubmission({
      name: data.name,
      company: data.company || "Direct Inquiry",
      email: data.email,
      phone: data.phone || undefined,
      project_type: data.project_type,
      budget: data.budget || undefined,
      timeline: data.timeline || undefined,
      message: data.message,
    });

    // Send immediate email notification to the studio team
    try {
      await sendInquiryNotification(submission);
    } catch (notifyErr) {
      console.warn("Email notification dispatch warning:", notifyErr);
    }

    // Record rich analytics event linked to visitor session
    const country = req.headers.get("x-vercel-ip-country") || "CH (Estimated)";
    const city = req.headers.get("x-vercel-ip-city") || "";
    await recordAnalyticsEvent({
      event_type: "form_submit",
      path: "/contact",
      country,
      city,
      device: "Web Form",
      cta_id: "contact_form",
      meta: {
        submission_id: submission.id,
        name: submission.name,
        company: submission.company,
        email: submission.email,
        phone: submission.phone || "",
        project_type: submission.project_type,
        budget: submission.budget || "",
        message: submission.message,
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id.slice(0, 8).toUpperCase(),
      submission,
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "An error occurred while transmitting your project inquiry." },
      { status: 500 }
    );
  }
}
