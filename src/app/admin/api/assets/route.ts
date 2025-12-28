import { NextRequest, NextResponse } from "next/server";

import { getAdminUserFromRequest } from "@/lib/adminAuth";
import {
  attachAssetToContent,
  upsertCmsAsset,
  type CmsAssetRole,
} from "@/lib/db/queries/cms";

export const runtime = "nodejs";

function isAssetRole(value: string): value is CmsAssetRole {
  return value === "cover" || value === "gallery" || value === "inline" || value === "attachment";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const adminUser = getAdminUserFromRequest(request);

    const body = (await request.json().catch(() => null)) as
      | {
          bucket?: string;
          storagePath?: string;
          publicUrl?: string;
          fileName?: string;
          contentType?: string;
          sizeBytes?: number;
          width?: number | null;
          height?: number | null;
          altText?: string | null;
          contentId?: number;
          role?: string;
          sortOrder?: number;
        }
      | null;

    const bucket = String(body?.bucket ?? "").trim();
    const storagePath = String(body?.storagePath ?? "").trim();
    const publicUrl = String(body?.publicUrl ?? "").trim();
    const fileName = String(body?.fileName ?? "").trim();
    const contentType = String(body?.contentType ?? "").trim();

    const sizeBytes = Number(body?.sizeBytes ?? NaN);

    if (!bucket || !storagePath || !publicUrl || !fileName || !contentType) {
      return NextResponse.json({ error: "Missing asset fields" }, { status: 400 });
    }

    if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) {
      return NextResponse.json({ error: "Invalid sizeBytes" }, { status: 400 });
    }

    const assetId = await upsertCmsAsset({
      bucket,
      storagePath,
      publicUrl,
      fileName,
      contentType,
      sizeBytes,
      width: body?.width ?? null,
      height: body?.height ?? null,
      altText: body?.altText ?? null,
      uploadedBy: adminUser,
    });

    if (!assetId) {
      return NextResponse.json({ error: "Unable to save asset" }, { status: 500 });
    }

    const contentId = body?.contentId;
    const roleRaw = String(body?.role ?? "");

    if (typeof contentId === "number" && Number.isFinite(contentId) && contentId > 0 && isAssetRole(roleRaw)) {
      const ok = await attachAssetToContent({
        contentId,
        assetId,
        role: roleRaw,
        sortOrder: typeof body?.sortOrder === "number" && Number.isFinite(body.sortOrder) ? body.sortOrder : 0,
      });

      if (!ok) {
        return NextResponse.json({ error: "Unable to attach asset" }, { status: 500 });
      }
    }

    return NextResponse.json({ assetId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" || message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
