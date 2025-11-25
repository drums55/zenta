import { demoPatterns } from "@/data/patterns";

export default function ProductsPage() {
  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผลิตภัณฑ์ Zenta Interior Film
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
          หน้า catalog นี้จะเริ่มจากรายการ pattern ตัวอย่าง เพื่อใช้ทดสอบ layout และ data model
          ก่อนที่จะนำเข้า catalogue จริงและระบบตัวกรองใน phase ถัดไป
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {demoPatterns.map((pattern) => (
          <article
            key={pattern.id}
            className="flex flex-col rounded-xl border border-white/10 bg-brand-soft/40 p-5 text-sm text-slate-200"
          >
            <div className="mb-4 h-32 w-full rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-brand-accent/40" />
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {pattern.code}
              </span>
              <span className="rounded-full bg-slate-900/60 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-300">
                {pattern.series}
              </span>
            </div>
            <h2 className="text-base font-semibold leading-snug text-slate-50">
              {pattern.name}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              โทนสี: {pattern.colorFamily} • ผิว: {pattern.finish}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              เหมาะกับพื้นผิว: {pattern.surfaces.join(", ")}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              เหมาะสำหรับ: {pattern.recommendedFor.join(", ")}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
