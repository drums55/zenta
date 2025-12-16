import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import { demoCaseStudies } from "@/data/case-studies";
import { demoPatterns, type Pattern, type PatternSeries } from "@/data/patterns";
import { getSolutionSector, solutionSectors } from "@/data/solutions";

const seriesLabels: Record<PatternSeries, string> = {
  wood: "ลายไม้",
  stone: "ลายหิน",
  concrete: "ลายปูน",
  metal: "ลายโลหะ",
  solid: "สีพื้น",
  "soft-matte": "Soft Matte",
  gloss: "Gloss",
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
  params: { sector: string };
}): Metadata {
  const sector = getSolutionSector(params.sector);

  if (!sector) {
    return {
      title: "ไม่พบโซลูชัน",
    };
  }

  return {
    title: sector.title,
    description: sector.description,
  };
}

export function generateStaticParams() {
  return solutionSectors.map((sector) => ({ sector: sector.slug }));
}

export default function SolutionSectorPage({
  params,
}: {
  params: { sector: string };
}) {
  const sector = getSolutionSector(params.sector);

  if (!sector) {
    notFound();
  }

  const caseStudies = demoCaseStudies.filter((cs) => cs.sector === sector.slug);

  const patternIds = caseStudies.flatMap((cs) => cs.patternIds ?? []);
  const uniquePatternIds = Array.from(new Set(patternIds));
  const recommendedPatterns = uniquePatternIds
    .map((id) => demoPatterns.find((pattern) => pattern.id === id))
    .filter((pattern): pattern is (typeof demoPatterns)[number] => Boolean(pattern));

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent
        name="view_solution_sector"
        params={{ sector: sector.slug }}
      />
      <nav className="text-xs text-slate-600">
        <Link href="/solutions" className="transition-colors hover:text-foreground">
          โซลูชัน
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{sector.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {sector.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
          {sector.description}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ปัญหาที่พบบ่อย
            </p>
            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-700">
              {sector.painPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Zenta ช่วยได้อย่างไร
            </p>
            <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate-700">
              {sector.howWeHelp.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ผลงานที่เกี่ยวข้อง
            </p>
            {caseStudies.length > 0 ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {caseStudies.map((cs) => (
                  <Link
                    key={cs.id}
                    href={`/case-studies/${cs.slug}`}
                    className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-brand-soft/60"
                  >
                    <p className="font-semibold text-slate-900">{cs.title}</p>
                    {cs.location ? (
                      <p className="mt-1 text-[11px] text-slate-500">
                        {cs.location}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                      {cs.summary}
                    </p>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                      ดูเคสนี้
                    </p>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {recommendedPatterns.length > 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ลายที่แนะนำ
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {recommendedPatterns.map((pattern) => (
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
                        {seriesLabels[pattern.series]}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-slate-900">{pattern.name}</p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      ผิว: {finishLabels[pattern.finish]}
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
              พร้อมรีโนเวทแล้ว?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              บอกประเภทพื้นที่ โลเคชัน และช่วงเวลาที่ต้องการ เพื่อให้เราช่วยประเมินแนวทางและนัดสำรวจ
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ขอคำปรึกษา / นัดสำรวจ
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
