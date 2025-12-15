import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import { demoCaseStudies } from "@/data/case-studies";
import { demoPatterns, type Pattern, type PatternPersonaKey } from "@/data/patterns";

const personaLabels: Record<PatternPersonaKey, string> = {
  businessOwner: "เจ้าของธุรกิจ",
  designer: "นักออกแบบ/สถาปนิก",
  homeowner: "เจ้าของบ้าน",
};

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const caseStudy = demoCaseStudies.find((item) => item.slug === params.slug);

  if (!caseStudy) {
    return {
      title: "ไม่พบผลงาน",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
  };
}

export function generateStaticParams() {
  return demoCaseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = demoCaseStudies.find((item) => item.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  const usedPatterns = (caseStudy.patternIds ?? [])
    .map((id) => demoPatterns.find((pattern) => pattern.id === id))
    .filter((pattern): pattern is Pattern => Boolean(pattern));

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent
        name="view_case_study_detail"
        params={{ slug: caseStudy.slug, sector: caseStudy.sector }}
      />
      <nav className="text-xs text-slate-600">
        <Link href="/case-studies" className="transition-colors hover:text-foreground">
          ผลงาน
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{caseStudy.title}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-900/70 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-100">
            {caseStudy.sector}
          </span>
          {caseStudy.location ? (
            <span className="text-[11px] text-slate-500">{caseStudy.location}</span>
          ) : null}
          <span className="text-[11px] text-slate-500">
            กลุ่มหลัก: {personaLabels[caseStudy.primaryPersona]}
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {caseStudy.title}
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
          {caseStudy.summary}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-brand-soft via-white to-brand/40" />

          {caseStudy.outcomes.length > 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ผลลัพธ์
              </p>
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-700">
                {caseStudy.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {caseStudy.images.length > 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ภาพประกอบ (placeholder)
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {caseStudy.images.map((image) => (
                  <div
                    key={`${image.src}-${image.alt}`}
                    className="overflow-hidden rounded-xl border border-slate-200/80 bg-white"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-brand-soft via-white to-brand/40" />
                    <div className="space-y-1 p-3 text-xs text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">
                          {image.kind ?? "image"}
                        </span>
                        <span className="text-[11px] text-slate-500">{image.src}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {usedPatterns.length > 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ลายที่ใช้ในโปรเจกต์
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {usedPatterns.map((pattern) => (
                  <Link
                    key={pattern.id}
                    href={`/products/${pattern.slug}`}
                    className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-brand-soft/60"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                        {pattern.code}
                      </span>
                      <span className="rounded-full bg-slate-900/70 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-100">
                        {pattern.series}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{pattern.name}</p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      โทนสี: {pattern.colorFamily} • ผิว: {pattern.finish}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              อยากทำแบบนี้กับพื้นที่ของคุณ?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              เล่าประเภทพื้นที่และข้อจำกัดเรื่องเวลา/การเปิดบริการ แล้วเราจะช่วยวางแนวทางให้เหมาะที่สุด
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ขอคำปรึกษา / นัดสำรวจ
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              หมายเหตุ
            </p>
            <p className="mt-2 leading-relaxed">
              เนื้อหา case study จะถูกเติมรายละเอียด (timeline, ข้อจำกัด, before/after) เพิ่มขึ้นเรื่อย ๆ
              เมื่อมีโปรเจกต์จริงมากขึ้น
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
