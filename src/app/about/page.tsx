import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container space-y-8 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          เกี่ยวกับ Zenta
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
          Zenta คือบริการรีโนเวทและยกระดับพื้นผิวด้วยฟิล์มตกแต่งภายใน สำหรับพื้นที่ธุรกิจ บ้าน และงานออกแบบ
          เราโฟกัสงานที่เร็ว สะอาด และคุมงบได้ โดยไม่ต้องทุบหรือรื้อวัสดุเดิมทั้งชุด
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            แนวคิด
          </p>
          <p className="mt-2 leading-relaxed">
            รีโนเวทเพื่อ “ใช้งานจริง” เป็นหลัก: ลด downtime ลดฝุ่น และเก็บงานรอบมุมให้เรียบร้อย
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            ดีไซน์
          </p>
          <p className="mt-2 leading-relaxed">
            ช่วยเลือกโทน/ลายให้เข้ากับ brand และ mood ของพื้นที่ พร้อมคำแนะนำการดูแลรักษา
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            การติดตั้ง
          </p>
          <p className="mt-2 leading-relaxed">
            วางแผนการทำงานให้เหมาะกับหน้างานจริง เช่น ทำเป็นเฟส/นอกเวลา เพื่อรบกวนการใช้งานให้น้อยที่สุด
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          อยากให้เราช่วยประเมินหน้างาน?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
          ส่งรูปพื้นที่และบอกจุดที่จะทำ (ผนัง/ประตู/ตู้/เคาน์เตอร์) พร้อมโลเคชันและช่วงเวลาที่ต้องการ
          ทีมงานจะติดต่อกลับเพื่อแนะนำแนวทางและนัดสำรวจ
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
          >
            ขอคำปรึกษา
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
          >
            ดูลายฟิล์ม
          </Link>
        </div>
      </section>
    </div>
  );
}
