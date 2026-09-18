import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSubmission, recordAnalyticsEvent } from "@/lib/db";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().nullable(),
  project_type: z.string().min(1).max(50),
  budget: z.string().max(50).optional().nullable(),
  timeline: z.string().max(50).optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(4000),
  honeypot: z.string().optional(),
});

// Simple sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 submissions per minute per IP

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

    // Honeypot spam trap check
    if (body.honeypot && body.honeypot.trim() !== "") {
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
      company: data.company,
      email: data.email,
      phone: data.phone || undefined,
      project_type: data.project_type,
      budget: data.budget || undefined,
      timeline: data.timeline || undefined,
      message: data.message,
    });

    // Record analytics event
    const country = req.headers.get("x-vercel-ip-country") || "CH (Estimated)";
    await recordAnalyticsEvent({
      event_type: "form_submit",
      path: "/contact",
      country,
      device: "Web Form",
      cta_id: "contact_form",
      meta: { project_type: data.project_type },
    });

    return NextResponse.json({
      success: true,
      id: submission.id.slice(0, 8).toUpperCase(),
    });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "An error occurred while transmitting your project inquiry." },
      { status: 500 }
    );
  }
}
