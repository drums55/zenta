import { NextRequest, NextResponse } from "next/server";

import { getAdminUserFromRequest } from "@/lib/adminAuth";
import { scheduleCmsContent } from "@/lib/db/queries/cms";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const adminUser = getAdminUserFromRequest(request);

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = (await request.json().catch(() => null)) as { scheduledAt?: string } | null;
    const scheduledAtRaw = String(body?.scheduledAt ?? "");
    const scheduledAt = new Date(scheduledAtRaw);

    if (!scheduledAtRaw || Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ error: "Invalid scheduledAt" }, { status: 400 });
    }

    const ok = await scheduleCmsContent({ id, updatedBy: adminUser, scheduledAt });
    if (!ok) {
      return NextResponse.json({ error: "Schedule failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
