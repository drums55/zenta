import { demoPatterns } from "@/data/patterns";

export default function ProductsPage() {
  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผลิตภัณฑ์ Zenta Interior Film
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          เลือกดูตัวอย่างลายฟิล์มตกแต่งภายในจาก Zenta พร้อมโทนสี พื้นผิว และประเภทงานที่เหมาะสม
          ลายและข้อมูลจะถูกเติมเข้ามาเรื่อย ๆ ตามโปรเจกต์และคอลเลกชันใหม่ ๆ
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {demoPatterns.map((pattern) => (
          <article
            key={pattern.id}
            className="flex flex-col rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800"
          >
            <div className="mb-4 h-32 w-full rounded-xl bg-gradient-to-br from-brand-soft via-white to-brand/40" />
            <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {pattern.code}
              </span>
              <span className="rounded-full bg-slate-900/70 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-100">
                {pattern.series}
              </span>
            </div>
            <h2 className="text-base font-semibold leading-snug text-slate-900">
              {pattern.name}
            </h2>
            <p className="mt-1 text-xs text-slate-700">
              โทนสี: {pattern.colorFamily} • ผิว: {pattern.finish}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-700">
              เหมาะกับพื้นผิว: {pattern.surfaces.join(", ")}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              เหมาะสำหรับ: {pattern.recommendedFor.join(", ")}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
