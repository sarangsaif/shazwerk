import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateSubmissionStatus, getSubmissions, deleteSubmission } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";
import { SubmissionStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getSubmissions();
  return NextResponse.json({ submissions });
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    const validStatuses: SubmissionStatus[] = ["new", "contacted", "qualified", "archived"];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status or ID" }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, submission: updated });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Submission ID required" }, { status: 400 });
    }

    const success = await deleteSubmission(id);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: "Internal error deleting submission" }, { status: 500 });
  }
}

// Forward submission to configured notification email
export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const submissions = await getSubmissions();
    const target = submissions.find((s) => s.id === id);

    if (!target) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const result = await sendInquiryNotification(target);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to forward submission" }, { status: 500 });
  }
}
