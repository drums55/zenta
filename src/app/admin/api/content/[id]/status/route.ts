import { NextRequest, NextResponse } from "next/server";

import { getAdminUserFromRequest } from "@/lib/adminAuth";
import { setCmsContentStatus, type CmsContentStatus } from "@/lib/db/queries/cms";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isCmsStatus(value: string): value is CmsContentStatus {
  return value === "draft" || value === "scheduled" || value === "published" || value === "archived";
}

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const adminUser = getAdminUserFromRequest(request);

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = (await request.json().catch(() => null)) as { status?: string } | null;
    const statusRaw = String(body?.status ?? "");

    if (!isCmsStatus(statusRaw)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const ok = await setCmsContentStatus({ id, status: statusRaw, updatedBy: adminUser });
    if (!ok) {
      return NextResponse.json({ error: "Status update failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
