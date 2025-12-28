import { Buffer } from "node:buffer";

import { NextRequest, NextResponse } from "next/server";

import { uploadCmsAsset } from "@/lib/googleCloudStorage";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

function isAllowedContentType(contentType: string): boolean {
  if (!contentType) return false;

  return (
    contentType.startsWith("image/") ||
    contentType === "application/pdf" ||
    contentType === "video/mp4" ||
    contentType === "image/svg+xml"
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const folderRaw = formData.get("folder");

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const folder = typeof folderRaw === "string" ? folderRaw.trim() : "";

    const contentType = file.type || "application/octet-stream";
    if (!isAllowedContentType(contentType)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length <= 0) {
      return NextResponse.json({ error: "Empty file" }, { status: 400 });
    }

    if (buffer.length > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "File is too large" }, { status: 413 });
    }

    const fileName = (file as File).name ?? "file";

    const result = await uploadCmsAsset({
      file: buffer,
      fileName,
      contentType,
      folder: folder || "files",
    });

    return NextResponse.json({
      url: result.publicUrl,
      bucket: result.bucket,
      storagePath: result.storagePath,
      contentType: result.contentType,
      size: result.size,
      fileName: result.fileName,
    });
  } catch (error) {
    console.error("[AdminAssetsUpload] Upload failed", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
