import Link from "next/link";

import { demoCaseStudies } from "@/data/case-studies";
import { solutionSectors } from "@/data/solutions";

export default function HomePage() {
  return (
    <main className="space-y-16 pb-16">
      <section className="border-b border-slate-200/80 bg-brand-soft">
        <div className="container grid gap-10 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:items-center md:min-h-[70vh]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
              Zenta / Interior Film
            </p>
            <h1 className="text-3xl font-semibold tracking-tight leading-tight md:text-5xl">
              รีโนเวท space ด้วยฟิล์มตกแต่งยุคใหม่
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
              เปลี่ยนผนัง เฟอร์นิเจอร์ และ space ด้วยฟิล์มตกแต่งภายใน เลือกโทนและพื้นผิวที่เหมาะกับธุรกิจ
              นักออกแบบ และเจ้าของบ้าน — รีโนเวทเร็ว สะอาด และไม่ต้องทุบ
            </p>
            <div className="mt-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:gap-4">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
                >
                  ขอคำปรึกษา / ใบเสนอราคา
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
                >
                  ดูผลงาน
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                <span>
                  • รีโนเวทเร็ว ไม่ต้องทุบ
                </span>
                <span>
                  • ดีไซน์หลากหลาย
                </span>
                <span>
                  • เหมาะกับทั้งธุรกิจและบ้าน
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-brand-soft via-white to-brand/40 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
              <div className="flex gap-3">
                <div className="flex-1 space-y-3">
                  <div className="h-32 rounded-2xl bg-brand/40 md:h-40" />
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 rounded-xl bg-brand/25" />
                    <div className="h-10 flex-1 rounded-xl bg-brand/10" />
                  </div>
                </div>
                <div className="hidden w-20 flex-col gap-2 md:flex">
                  <div className="h-7 rounded-full bg-brand/25" />
                  <div className="h-7 rounded-full bg-brand/15" />
                  <div className="h-7 rounded-full bg-brand/10" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-brand-soft/80 p-6 text-sm text-slate-700">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                สำหรับใคร
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium text-slate-900">เจ้าของธุรกิจ / แบรนด์</span> – ต้องรีโนเวทร้าน
                  หรือ space ให้ทันสมัย โดยไม่เสีย downtime นาน
                </li>
                <li>
                  <span className="font-medium text-slate-900">นักออกแบบ / สถาปนิก</span> – ต้องการวัสดุที่มี spec
                  ชัด ใช้งานง่าย และนำเสนอให้ลูกค้าได้มั่นใจ
                </li>
                <li>
                  <span className="font-medium text-slate-900">เจ้าของบ้าน</span> – อยากเปลี่ยนบรรยากาศห้อง
                  โดยไม่ต้องเปลี่ยนเฟอร์นิเจอร์ทั้งชุด
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-6">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">เลือกเส้นทางที่ตรงกับคุณ</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/solutions"
            className="group rounded-xl border border-slate-200/80 bg-brand-soft/40 p-5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-brand-soft/60"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              สำหรับเจ้าของธุรกิจ
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              รีโนเวทร้าน/ออฟฟิศให้ตรง brand
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              ดูโซลูชันตามประเภทงาน (ร้านอาหาร รีเทล คลินิก ฯลฯ) พร้อมตัวอย่างเคสจริง
              และแนวทางการเลือกฟิล์ม
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              ดูโซลูชัน
            </p>
          </Link>
          <Link
            href="/professionals"
            className="group rounded-xl border border-slate-200/80 bg-brand-soft/40 p-5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-brand-soft/60"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              สำหรับนักออกแบบ / สถาปนิก
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              วัสดุสำหรับงานออกแบบ interior
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              เข้าถึง catalogue, spec sheet และตัวอย่างลายฟิล์มผ่านเครื่องมือค้นหาลาย
              เพื่อเลือกฟิล์มที่ตรง concept และข้อกำหนดโครงการ
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              สำหรับมืออาชีพ
            </p>
          </Link>
          <Link
            href="/knowledge"
            className="group rounded-xl border border-slate-200/80 bg-brand-soft/40 p-5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-brand-soft/60"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              สำหรับเจ้าของบ้าน
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900">
              เปลี่ยนบรรยากาศบ้านแบบไม่ต้องทุบ
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              เรียนรู้ว่า interior film คืออะไร ความทนทาน การดูแลรักษา และตัวอย่างการเปลี่ยนห้องจริง
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              อ่านความรู้
            </p>
          </Link>
        </div>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ทำไมต้อง interior film กับ Zenta
        </h2>
        <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              เร็ว &amp; สะอาด
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              ติดตั้งได้ในเวลาอันสั้น ลดฝุ่นและเสียงเทียบกับการทุบ/เปลี่ยนวัสดุเดิม
              เหมาะกับ space ที่ต้องเปิดให้บริการต่อเนื่อง
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              ดีไซน์หลากหลาย
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              รองรับลายไม้ หิน ปูน โลหะ และพื้นผิวพิเศษ
              เพื่อสร้าง mood &amp; tone ที่ต่างกันสำหรับแต่ละธุรกิจหรือห้อง
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              ระบบ &amp; ความรู้
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              คุณจะได้ทั้งบทความความรู้ คู่มือการเลือกฟิล์ม
              และ catalog ที่จัดเป็นหมวดหมู่ ช่วยให้ตัดสินใจได้ง่ายขึ้น ไม่ต้องเดาเอง
            </p>
          </div>
        </div>
      </section>

      <section className="container space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              โซลูชันสำหรับธุรกิจ (ตามประเภทงาน)
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-700">
              เริ่มจาก sector ที่พบบ่อยในช่วง validate เพื่อพาไปดูเคสจริงและปิดงานได้เร็ว
            </p>
          </div>
          <Link
            href="/solutions"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent transition hover:text-foreground"
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {solutionSectors.slice(0, 3).map((sector) => (
            <Link
              key={sector.slug}
              href={`/solutions/${sector.slug}`}
              className="group rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {sector.title}
                </p>
                <span className="rounded-full bg-slate-900/70 px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.18em] text-slate-100">
                  {sector.slug}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {sector.description}
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                ดูโซลูชัน
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ตัวอย่างเคสรีโนเวท
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          เรากำลังรวบรวม case study จริงของ Zenta
          ให้คุณเห็นทั้งภาพก่อน–หลัง เรื่องราวของแต่ละโปรเจกต์ และลายฟิล์มที่ใช้ในงานนั้น ๆ
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {demoCaseStudies.slice(0, 3).map((cs) => {
            const sectorLabel =
              solutionSectors.find((sector) => sector.slug === cs.sector)?.title ??
              cs.sector;

            return (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
                  <span className="uppercase tracking-[0.18em]">{sectorLabel}</span>
                  {cs.location ? (
                    <span className="text-[11px] text-slate-500">{cs.location}</span>
                  ) : null}
                </div>
                <h3 className="text-base font-semibold leading-snug text-slate-900">
                  {cs.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  {cs.summary}
                </p>
                {cs.outcomes.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-700">
                    {cs.outcomes.slice(0, 2).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  ดูเคสนี้
                </p>
              </Link>
            );
          })}
        </div>
        <div>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
          >
            ดูผลงานทั้งหมด
          </Link>
        </div>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ขั้นตอนการทำงานกับ Zenta
        </h2>
        <ol className="grid gap-3 text-sm text-slate-700 md:grid-cols-4">
          <li className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">ขั้นที่ 1</p>
            <p className="mt-2 text-sm leading-relaxed">
              คุย brief / requirement และดู reference เบื้องต้น (สามารถส่งรูป space ปัจจุบันมาได้)
            </p>
          </li>
          <li className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">ขั้นที่ 2</p>
            <p className="mt-2 text-sm leading-relaxed">
              แนะนำ solution, series/ลาย และประมาณการงบ/ระยะเวลา
            </p>
          </li>
          <li className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">ขั้นที่ 3</p>
            <p className="mt-2 text-sm leading-relaxed">
              นัดหมายติดตั้งและเตรียมพื้นที่ เพื่อลดการรบกวนการใช้งานจริงให้มากที่สุด
            </p>
          </li>
          <li className="rounded-xl border border-slate-200/80 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">ขั้นที่ 4</p>
            <p className="mt-2 text-sm leading-relaxed">
              ติดตั้งเสร็จ ตรวจงานร่วมกัน พร้อมคู่มือการดูแลรักษาพื้นผิว และ aftercare
            </p>
          </li>
        </ol>
      </section>

      <section className="container space-y-3">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ความน่าเชื่อถือ &amp; พาร์ตเนอร์
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
          ส่วนนี้จะใช้แสดงโลโก้ลูกค้า แบรนด์พาร์ตเนอร์ และข้อความรับรอง
          เพื่อให้คุณเห็นตัวอย่างธุรกิจที่เลือกใช้ Zenta ควบคู่กับผู้เล่นระดับสากลอย่าง BODAQ, 3M และ TODA
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
          >
            ขอคำปรึกษา / นัดสำรวจ
          </Link>
        </div>
      </section>
    </main>
  );
}
