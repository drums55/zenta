import { NextRequest, NextResponse } from "next/server";

import { getAdminUserFromRequest } from "@/lib/adminAuth";
import {
  createCmsContentDraft,
  listCmsContent,
  type CmsContentStatus,
  type CmsContentType,
} from "@/lib/db/queries/cms";

export const runtime = "nodejs";

function isCmsType(value: string): value is CmsContentType {
  return value === "article" || value === "case_study" || value === "product";
}

function isCmsStatus(value: string): value is CmsContentStatus {
  return value === "draft" || value === "scheduled" || value === "published" || value === "archived";
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_/]/g, "")
    .replace(/-+/g, "-")
    .replace(/^[-/]+|[-/]+$/g, "");
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Middleware already guards /admin/*, but we also parse username for audit.
    getAdminUserFromRequest(request);

    const url = new URL(request.url);

    const typeRaw = url.searchParams.get("type") ?? "";
    const statusRaw = url.searchParams.get("status") ?? "";
    const limitRaw = url.searchParams.get("limit") ?? "";

    const type = typeRaw && isCmsType(typeRaw) ? typeRaw : undefined;
    const status = statusRaw && isCmsStatus(statusRaw) ? statusRaw : undefined;

    const limit = limitRaw ? Number(limitRaw) : undefined;
    const safeLimit = limit && Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 200) : 100;

    const items = await listCmsContent({ type, status, limit: safeLimit });
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const adminUser = getAdminUserFromRequest(request);

    const body = (await request.json().catch(() => null)) as
      | {
          type?: string;
          slug?: string;
          title?: string;
        }
      | null;

    const typeRaw = String(body?.type ?? "");
    const slugRaw = String(body?.slug ?? "");
    const titleRaw = String(body?.title ?? "");

    if (!isCmsType(typeRaw)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const slug = normalizeSlug(slugRaw);
    const title = titleRaw.trim();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const created = await createCmsContentDraft({
      type: typeRaw,
      slug,
      title,
      createdBy: adminUser,
    });

    if (!created) {
      return NextResponse.json({ error: "Unable to create content" }, { status: 500 });
    }

    return NextResponse.json(created);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
