import { NextRequest, NextResponse } from "next/server";

import { getAdminUserFromRequest } from "@/lib/adminAuth";
import {
  getCmsContentById,
  listAssetsForContent,
  updateCmsContent,
  type CmsContentType,
} from "@/lib/db/queries/cms";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isCmsType(value: string): value is CmsContentType {
  return value === "article" || value === "case_study" || value === "product";
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

function toNullIfBlank(value: unknown, maxLen: number): string | null {
  const s = String(value ?? "").trim();
  if (!s) return null;
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

export async function GET(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    getAdminUserFromRequest(request);

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const content = await getCmsContentById(id);
    if (!content) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const assets = await listAssetsForContent(id);
    return NextResponse.json({ content, assets });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const adminUser = getAdminUserFromRequest(request);

    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = (await request.json().catch(() => null)) as
      | {
          type?: string;
          slug?: string;
          title?: string;
          summary?: string | null;
          coverImageUrl?: string | null;
          coverImageAlt?: string | null;
          seoTitle?: string | null;
          seoDescription?: string | null;
          ogImageUrl?: string | null;
          bodyJson?: string | null;
          bodyHtml?: string | null;
        }
      | null;

    const typeRaw = String(body?.type ?? "");
    if (!isCmsType(typeRaw)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const slug = normalizeSlug(String(body?.slug ?? ""));
    const title = String(body?.title ?? "").trim();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const ok = await updateCmsContent({
      id,
      type: typeRaw,
      slug,
      title,
      summary: toNullIfBlank(body?.summary, 1000),
      coverImageUrl: toNullIfBlank(body?.coverImageUrl, 1000),
      coverImageAlt: toNullIfBlank(body?.coverImageAlt, 300),
      seoTitle: toNullIfBlank(body?.seoTitle, 300),
      seoDescription: toNullIfBlank(body?.seoDescription, 1000),
      ogImageUrl: toNullIfBlank(body?.ogImageUrl, 1000),
      bodyJson: body?.bodyJson ? String(body.bodyJson) : null,
      bodyHtml: body?.bodyHtml ? String(body.bodyHtml) : null,
      updatedBy: adminUser,
    });

    if (!ok) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
