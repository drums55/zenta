import { NextResponse } from "next/server";

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

  return NextResponse.json({ ok: true });
}
