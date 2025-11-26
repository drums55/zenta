import { demoCaseStudies } from "@/data/case-studies";

export default function CaseStudiesPage() {
  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผลงาน / Case Studies
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
          ดูตัวอย่างงานรีโนเวทที่ใช้ฟิล์มตกแต่งภายในจาก Zenta ทั้งภาพก่อน–หลัง และเรื่องราวของโปรเจกต์
          เพื่อให้เห็นว่าฟิล์มช่วยเปลี่ยนบรรยากาศและประสบการณ์ของ space ได้อย่างไร
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {demoCaseStudies.map((cs) => (
          <article
            key={cs.id}
            className="flex flex-col rounded-xl border border-white/10 bg-brand-soft/40 p-5 text-sm text-slate-200"
          >
            <div className="mb-4 h-32 w-full rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-brand-accent/40" />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-[0.18em]">
                {cs.sector}
              </span>
              {cs.location ? (
                <span className="text-[11px] text-slate-500">{cs.location}</span>
              ) : null}
            </div>
            <h2 className="mt-2 text-base font-semibold leading-snug text-slate-50">
              {cs.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {cs.summary}
            </p>
            {cs.outcomes.length > 0 && (
              <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-400">
                {cs.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
