import Link from "next/link";

export default function ProfessionalsPage() {
  return (
    <div className="container space-y-8 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          สำหรับมืออาชีพ (Architect / ID / Contractor)
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
          ถ้าคุณกำลังหา material ทางเลือกสำหรับงานรีโนเวทที่ต้องการความเร็วและความเรียบร้อย
          ทีม Zenta ช่วยแนะนำโทน/ลายที่เหมาะกับ concept และข้อจำกัดหน้างาน พร้อมวางแผนการติดตั้งให้รบกวนการใช้งานน้อยที่สุด
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            ใช้กับพื้นผิวไหนได้บ้าง
          </p>
          <p className="mt-2 leading-relaxed">
            ผนัง ประตู ตู้ เคาน์เตอร์ และพื้นผิวที่ต้องการรีเฟรชโดยไม่รื้อของเดิม
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            เหมาะกับงานประเภทไหน
          </p>
          <p className="mt-2 leading-relaxed">
            ร้านอาหาร/คาเฟ่ รีเทล คลินิก ออฟฟิศ โรงแรม และงานบ้าน/คอนโด
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            ทำงานร่วมกับทีมเทคนิค
          </p>
          <p className="mt-2 leading-relaxed">
            ส่ง reference/ภาพหน้างาน แล้วให้เราช่วยคัดตัวเลือกและตอบคำถามการใช้งานจริง
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          เริ่มจากโปรเจกต์ของคุณ
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">
          ดูลายที่มีในคลัง หรือส่งรายละเอียดโครงการเพื่อให้ทีมช่วยแนะนำลายและแนวทางติดตั้ง
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
          >
            ดูลายฟิล์ม
          </Link>
          <Link
            href="/contact?type=professional"
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
          >
            ติดต่อทีมเทคนิค
          </Link>
        </div>
      </section>
    </div>
  );
}
