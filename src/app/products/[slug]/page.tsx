import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import {
  demoPatterns,
  type Pattern,
  type PatternPersonaKey,
  type PatternSeries,
  type PatternSurface,
} from "@/data/patterns";

const seriesLabels: Record<PatternSeries, string> = {
  wood: "ลายไม้",
  stone: "ลายหิน",
  concrete: "ลายปูน",
  metal: "ลายโลหะ",
  solid: "สีพื้น",
  "soft-matte": "Soft Matte",
  gloss: "Gloss",
};

const surfaceLabels: Record<PatternSurface, string> = {
  wall: "ผนัง",
  door: "ประตู/บาน",
  cabinet: "ตู้",
  countertop: "เคาน์เตอร์",
  column: "เสา",
  other: "อื่น ๆ",
};

const personaLabels: Record<PatternPersonaKey, string> = {
  businessOwner: "เจ้าของธุรกิจ",
  designer: "นักออกแบบ/สถาปนิก",
  homeowner: "เจ้าของบ้าน",
};

const finishLabels: Record<Pattern["finish"], string> = {
  matte: "ด้าน",
  satin: "ซาติน",
  gloss: "เงา",
  texture: "เท็กซ์เจอร์",
};

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const pattern = demoPatterns.find((item) => item.slug === params.slug);

  if (!pattern) {
    return {
      title: "ไม่พบผลิตภัณฑ์",
    };
  }

  return {
    title: pattern.name,
    description: `ฟิล์มตกแต่งภายใน ${pattern.name} (${pattern.code}) ${seriesLabels[pattern.series]} โทนสี ${pattern.colorFamily} ผิว${finishLabels[pattern.finish]} เหมาะกับ ${pattern.surfaces
      .map((surface) => surfaceLabels[surface])
      .join(", ")}`,
  };
}

export function generateStaticParams() {
  return demoPatterns.map((pattern) => ({ slug: pattern.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pattern = demoPatterns.find((item) => item.slug === params.slug);

  if (!pattern) {
    notFound();
  }

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent
        name="view_pattern_detail"
        params={{ slug: pattern.slug, series: pattern.series }}
      />
      <nav className="text-xs text-slate-600">
        <Link href="/products" className="transition-colors hover:text-foreground">
          ผลิตภัณฑ์
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{pattern.name}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
            {pattern.code}
          </span>
          <span className="rounded-full bg-slate-900/70 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-100">
            {seriesLabels[pattern.series]}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {pattern.name}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          โทนสี: {pattern.colorFamily} • ผิว: {finishLabels[pattern.finish]}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-brand-soft via-white to-brand/40" />

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                เหมาะกับพื้นผิว
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {pattern.surfaces.map((surface) => surfaceLabels[surface]).join(", ")}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                เหมาะสำหรับ
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {pattern.recommendedFor
                  .map((persona) => personaLabels[persona])
                  .join(", ")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              จุดเด่น
            </p>
            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-700">
              {pattern.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ขอคำแนะนำการใช้งานจริง
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              ส่งรูปพื้นที่และบอกจุดที่จะทำ เพื่อให้เราช่วยแนะนำลายและวิธีทำงานที่ลด downtime
              ได้ดีที่สุด
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ขอคำปรึกษา / ใบเสนอราคา
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
