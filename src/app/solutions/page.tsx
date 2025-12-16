import Link from "next/link";

import { solutionSectors } from "@/data/solutions";

export default function SolutionsPage() {
  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          โซลูชันตามประเภทงาน
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          เลือกดูโซลูชันตามประเภทงาน เพื่อเห็นปัญหาที่พบบ่อย แนวทางแก้ และผลงานที่เกี่ยวข้อง
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {solutionSectors.map((sector) => (
          <Link
            key={sector.slug}
            href={`/solutions/${sector.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">
                {sector.title}
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              {sector.description}
            </p>

            {sector.painPoints.length > 0 ? (
              <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-700">
                {sector.painPoints.slice(0, 3).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              ดูรายละเอียด
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
