import { NextResponse } from "next/server";

import { isDbConfigured } from "@/lib/db/connection";
import { insertLead } from "@/lib/db/queries/leads";

type LeadType = "business" | "professional" | "home";

interface LeadPayload {
  type?: LeadType;
  name?: string;
  phone?: string;
  line?: string;
  email?: string;
  location?: string;
  sector?: string;
  surfaces?: string[];
  timeline?: string;
  budgetBand?: string;
  message?: string;
  website?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function sanitizeString(value: unknown): string | undefined {
  if (!isNonEmptyString(value)) {
    return undefined;
  }

  return value.trim().slice(0, 2000);
}

function sanitizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const items = value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .slice(0, 20);

  return items.length > 0 ? items : undefined;
}

function formatLeadForLine(lead: {
  type: LeadType;
  name: string;
  phone?: string;
  line?: string;
  email?: string;
  location?: string;
  sector?: string;
  surfaces?: string[];
  timeline?: string;
  budgetBand?: string;
  message?: string;
  receivedAt: string;
}) {
  const parts: string[] = [];

  parts.push("[Zenta] มี lead ใหม่");
  parts.push(`ประเภท: ${lead.type}`);
  parts.push(`ชื่อ/บริษัท: ${lead.name}`);

  const contacts = [
    lead.phone ? `โทร: ${lead.phone}` : null,
    lead.line ? `LINE: ${lead.line}` : null,
    lead.email ? `อีเมล: ${lead.email}` : null,
  ].filter(Boolean);
  if (contacts.length > 0) {
    parts.push(contacts.join(" | "));
  }

  if (lead.location) parts.push(`โลเคชัน: ${lead.location}`);
  if (lead.sector) parts.push(`Sector: ${lead.sector}`);
  if (lead.surfaces && lead.surfaces.length > 0) {
    parts.push(`จุดที่จะทำ: ${lead.surfaces.join(", ")}`);
  }
  if (lead.timeline) parts.push(`ช่วงเวลา: ${lead.timeline}`);
  if (lead.budgetBand) parts.push(`งบ: ${lead.budgetBand}`);

  if (lead.message) {
    const trimmed = lead.message.length > 800 ? `${lead.message.slice(0, 800)}...` : lead.message;
    parts.push(`รายละเอียด: ${trimmed}`);
  }

  parts.push(`เวลา: ${lead.receivedAt}`);

  const message = parts.join("\n");
  return message.length > 4800 ? `${message.slice(0, 4800)}...` : message;
}

async function pushLineMessage(text: string) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_LEAD_TARGET_ID;

  if (!accessToken || !to) {
    console.warn("[zenta] LINE env missing; skipping LINE push");
    return { skipped: true } as const;
  }

  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      messages: [{ type: "text", text }],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[zenta] LINE push failed", response.status, body);
    return { ok: false as const, status: response.status, body };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 },
    );
  }

  if (payload && isNonEmptyString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const type = payload.type ?? "business";

  if (!(["business", "professional", "home"] as const).includes(type)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_TYPE" },
      { status: 400 },
    );
  }

  const name = sanitizeString(payload.name);
  const phone = sanitizeString(payload.phone);
  const line = sanitizeString(payload.line);
  const email = sanitizeString(payload.email);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "NAME_REQUIRED" },
      { status: 400 },
    );
  }

  if (!phone && !line && !email) {
    return NextResponse.json(
      { ok: false, error: "CONTACT_REQUIRED" },
      { status: 400 },
    );
  }

  const lead = {
    type,
    name,
    phone,
    line,
    email,
    location: sanitizeString(payload.location),
    sector: sanitizeString(payload.sector),
    surfaces: sanitizeStringArray(payload.surfaces),
    timeline: sanitizeString(payload.timeline),
    budgetBand: sanitizeString(payload.budgetBand),
    message: sanitizeString(payload.message),
    receivedAt: new Date().toISOString(),
  };

  console.log("[zenta] lead received", lead);

  let leadId: number | null = null;
  let dbSaved = false;

  if (isDbConfigured()) {
    try {
      leadId = await insertLead(lead);
      dbSaved = true;
    } catch (error) {
      console.error("[zenta][db] lead insert failed", error);
    }
  }

  const lineMessage = formatLeadForLine(lead);
  const lineResult = await pushLineMessage(lineMessage);

  const lineFailureCode =
    "ok" in lineResult && !lineResult.ok
      ? lineResult.status === 429
        ? "LINE_QUOTA_EXCEEDED"
        : "LINE_DELIVERY_FAILED"
      : null;

  const lineDelivered = !lineFailureCode;

  if (!dbSaved && !lineDelivered) {
    return NextResponse.json(
      { ok: false, error: lineFailureCode ?? "LINE_DELIVERY_FAILED" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId,
    warning: lineFailureCode ?? undefined,
  });
}
