"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";

import { trackEvent } from "@/lib/analytics";
import { solutionSectors } from "@/data/solutions";

type LeadType = "business" | "professional" | "home";

const leadTypeLabels: Record<LeadType, string> = {
  business: "ธุรกิจ / รีโนเวทร้าน",
  professional: "นักออกแบบ / สถาปนิก",
  home: "บ้าน / คอนโด",
};

const surfaceOptions = [
  { value: "wall", label: "ผนัง" },
  { value: "door", label: "ประตู/บาน" },
  { value: "cabinet", label: "ตู้" },
  { value: "countertop", label: "เคาน์เตอร์" },
  { value: "column", label: "เสา" },
  { value: "other", label: "อื่น ๆ" },
] as const;

const timelineOptions = [
  { value: "asap", label: "เร็วที่สุด" },
  { value: "1-2-weeks", label: "ภายใน 1–2 สัปดาห์" },
  { value: "within-1-month", label: "ภายใน 1 เดือน" },
  { value: "planning", label: "กำลังวางแผน/ยังไม่แน่ใจ" },
] as const;

const budgetOptions = [
  { value: "under-30000", label: "ต่ำกว่า 30,000" },
  { value: "30000-80000", label: "30,000–80,000" },
  { value: "80000-200000", label: "80,000–200,000" },
  { value: "200000-plus", label: "200,000+" },
  { value: "unsure", label: "ยังไม่แน่ใจ" },
] as const;

function errorMessage(code: string) {
  switch (code) {
    case "NAME_REQUIRED":
      return "กรุณากรอกชื่อ/ชื่อบริษัท";
    case "CONTACT_REQUIRED":
      return "กรุณาใส่อย่างน้อย 1 ช่องทางติดต่อ (โทร / LINE / อีเมล)";
    case "INVALID_TYPE":
      return "รูปแบบคำขอไม่ถูกต้อง กรุณาลองใหม่";
    default:
      return "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";
  }
}

function ContactPageContent() {
  const searchParams = useSearchParams();

  const [leadType, setLeadType] = useState<LeadType>("business");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line, setLine] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("");
  const [surfaces, setSurfaces] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budgetBand, setBudgetBand] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");

    if (type === "business" || type === "professional" || type === "home") {
      setLeadType(type);
    }
  }, [searchParams]);

  const sectorOptions = useMemo(
    () =>
      solutionSectors.map((item) => ({
        value: item.slug,
        label: item.title,
      })),
    [],
  );

  const hasContact = Boolean(phone.trim() || line.trim() || email.trim());

  function toggleSurface(value: string) {
    setSurfaces((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitError(null);

    if (!name.trim()) {
      setSubmitError(errorMessage("NAME_REQUIRED"));
      return;
    }

    if (!hasContact) {
      setSubmitError(errorMessage("CONTACT_REQUIRED"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: leadType,
          name,
          phone,
          line,
          email,
          location,
          sector: sector || undefined,
          surfaces: surfaces.length > 0 ? surfaces : undefined,
          timeline: timeline || undefined,
          budgetBand: budgetBand || undefined,
          message,
          website,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setSubmitError(errorMessage(data?.error ?? "UNKNOWN"));
        return;
      }

      setIsSubmitted(true);

      trackEvent("lead_submit", {
        type: leadType,
        sector: sector || undefined,
        surfaces_count: surfaces.length,
        timeline: timeline || undefined,
        budget_band: budgetBand || undefined,
      });
    } catch {
      setSubmitError(errorMessage("NETWORK"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ติดต่อ / ขอใบเสนอราคา
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          เล่าเป้าหมายและข้อจำกัดของพื้นที่ (เวลา/การเปิดร้าน/พื้นผิวที่ต้องทำ) แล้วทีม Zenta จะติดต่อกลับเพื่อแนะนำแนวทางและนัดสำรวจ
        </p>
        <p className="text-xs text-slate-600">
          เราจะตอบกลับภายใน 24–48 ชั่วโมงทำการ
        </p>
      </header>

      {isSubmitted ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            รับข้อมูลแล้วครับ
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
            ขอบคุณครับ ทีมงานจะติดต่อกลับเพื่อสอบถามรายละเอียดเพิ่มเติมและนัดหมายตามความเหมาะสม
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
            >
              กลับหน้าแรก
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ดูผลงานตัวอย่าง
            </Link>
          </div>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white/90 p-6"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ประเภทคำขอ
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(leadTypeLabels) as LeadType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLeadType(type)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    leadType === type
                      ? "border-brand-accent bg-brand-accent text-slate-50"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {leadTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ชื่อ / บริษัท <span className="text-brand-accent">*</span>
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                placeholder="เช่น คุณเอ / Zenta Cafe"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                โลเคชัน / พื้นที่
              </span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                placeholder="เช่น กรุงเทพฯ / รามอินทรา"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                โทร
              </span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                placeholder="08x-xxx-xxxx"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                LINE
              </span>
              <input
                value={line}
                onChange={(event) => setLine(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                placeholder="LINE ID / เบอร์ที่ผูก LINE"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                อีเมล
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="mt-2 text-xs text-slate-600">
            ต้องมีอย่างน้อย 1 ช่องทางติดต่อ (โทร / LINE / อีเมล)
          </div>

          {leadType === "business" ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                  ประเภทงาน (sector)
                </span>
                <select
                  value={sector}
                  onChange={(event) => setSector(event.target.value)}
                  className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
                >
                  <option value="">เลือก (ถ้าทราบ)</option>
                  {sectorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                  จุดที่จะทำ
                </p>
                <div className="flex flex-wrap gap-2">
                  {surfaceOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleSurface(option.value)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                        surfaces.includes(option.value)
                          ? "border-brand-accent bg-brand-accent text-slate-50"
                          : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ช่วงเวลาที่ต้องการ
              </span>
              <select
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
              >
                <option value="">เลือก (ถ้าทราบ)</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                งบประมาณโดยประมาณ
              </span>
              <select
                value={budgetBand}
                onChange={(event) => setBudgetBand(event.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
              >
                <option value="">เลือก (ถ้าทราบ)</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-6 block space-y-2 text-sm text-slate-700">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              รายละเอียดเพิ่มเติม
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-2xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-accent"
              placeholder="เช่น อยากรีโนเวทเคาน์เตอร์ + ผนัง, ต้องเปิดร้านต่อ, มีรูปหน้างาน ฯลฯ"
            />
          </label>

          <label className="hidden" aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              autoComplete="off"
            />
          </label>

          {submitError ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-600">
              กดส่งแล้วทีมงานจะติดต่อกลับเพื่อถามรายละเอียดและนัดหมาย
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "กำลังส่ง..." : "ส่งข้อมูล"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container py-10" />}>
      <ContactPageContent />
    </Suspense>
  );
}
