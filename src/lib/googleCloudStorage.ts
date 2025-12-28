import { randomUUID } from "node:crypto";

import { Storage } from "@google-cloud/storage";

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const clientEmail = process.env.GOOGLE_CLOUD_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n");
const privateKeyId = process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID;
const clientId = process.env.GOOGLE_CLOUD_CLIENT_ID;

const storage = new Storage({
  projectId,
  credentials:
    clientEmail && privateKey
      ? {
          type: "service_account",
          project_id: projectId,
          private_key_id: privateKeyId,
          private_key: privateKey,
          client_email: clientEmail,
          client_id: clientId,
        }
      : undefined,
});

const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || "zenta";
const bucket = storage.bucket(bucketName);

export interface UploadCmsAssetResult {
  bucket: string;
  fileName: string;
  publicUrl: string;
  size: number;
  contentType: string;
  storagePath: string;
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
}

function sanitizeFolder(folder: string): string {
  const normalized = folder
    .toLowerCase()
    .replace(/\\+/g, "/")
    .replace(/\/+/g, "/")
    .replace(/[^a-z0-9/_-]/g, "_");

  const safeSegments = normalized
    .split("/")
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && s !== "." && s !== "..");

  return safeSegments.join("/");
}

export async function uploadCmsAsset(options: {
  file: Buffer;
  fileName: string;
  contentType: string;
  folder?: string;
}): Promise<UploadCmsAssetResult> {
  const { file, fileName, contentType } = options;
  const folder = options.folder ? sanitizeFolder(options.folder) : "files";

  const timestamp = Date.now();
  const sanitizedFileName = sanitizeFileName(fileName || "file");
  const uniqueId = randomUUID();

  const objectPath = `cms-assets/${folder}/${timestamp}_${uniqueId}_${sanitizedFileName}`;
  const fileRef = bucket.file(objectPath);

  await fileRef.save(file, {
    metadata: {
      contentType,
      cacheControl: "public, max-age=31536000",
    },
    public: true,
  });

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectPath}`;

  return {
    bucket: bucketName,
    fileName: sanitizedFileName,
    publicUrl,
    size: file.length,
    contentType,
    storagePath: objectPath,
  };
}
