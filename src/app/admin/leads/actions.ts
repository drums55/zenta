"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { updateLeadManagement, type LeadStatus } from "@/lib/db/queries/leads";

async function getAdminUserFromAuthHeader(): Promise<string> {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Admin auth is not configured");
  }

  const h = await headers();
  const authorization = h.get("authorization");
  if (!authorization || !authorization.startsWith("Basic ")) {
    throw new Error("Authentication required");
  }

  const encoded = authorization.slice("Basic ".length);
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const [user, pass] = decoded.split(":");
    if (user !== username || pass !== password) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch {
    throw new Error("Invalid authorization header");
  }
}

function isLeadStatus(value: string): value is LeadStatus {
  return value === "new" || value === "contacted" || value === "quoted" || value === "won" || value === "lost";
}

export async function updateLeadAction(formData: FormData) {
  const handledBy = await getAdminUserFromAuthHeader();

  const idRaw = String(formData.get("id") ?? "");
  const statusRaw = String(formData.get("status") ?? "");
  const hasNoteField = formData.has("note");
  const noteRaw = hasNoteField ? String(formData.get("note") ?? "") : "";

  const id = Number(idRaw);
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("Invalid lead id");
  }

  if (!isLeadStatus(statusRaw)) {
    throw new Error("Invalid status");
  }

  const note = noteRaw.trim().length > 0 ? noteRaw.trim().slice(0, 4000) : null;

  await updateLeadManagement({
    id,
    status: statusRaw,
    note,
    noteIsSet: hasNoteField,
    handledBy,
  });

  revalidatePath("/admin/leads");
}
