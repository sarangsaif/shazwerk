import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateSubmissionStatus, getSubmissions } from "@/lib/db";
import { SubmissionStatus } from "@/lib/types";

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
