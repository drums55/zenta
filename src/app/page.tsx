export default function HomePage() {
  return (
    <main className="space-y-16 pb-16">
      <section className="border-b border-white/5 bg-brand-soft/60">
        <div className="container grid gap-10 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Zenta / Interior Film
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              รีโนเวท space ด้วยฟิล์มตกแต่งยุคใหม่
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
              เว็บนี้จะเป็นศูนย์กลางสำหรับการเลือกฟิล์มตกแต่งภายใน ทั้งสำหรับเจ้าของธุรกิจ
              นักออกแบบ และเจ้าของบ้าน — เร็ว สะอาด เป็นระบบ และเข้าใจง่าย
            </p>
            <div className="flex flex-col gap-3 text-xs md:flex-row md:items-center md:gap-4">
              <button className="inline-flex items-center justify-center rounded-full bg-brand-accent px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-950">
                ขอคำปรึกษา / ใบเสนอราคา
              </button>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
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
          <div className="rounded-2xl border border-white/10 bg-brand-soft/80 p-6 text-sm text-slate-300">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              สำหรับใคร
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium text-slate-100">เจ้าของธุรกิจ / แบรนด์</span> – ต้องรีโนเวทร้าน
                หรือ space ให้ทันสมัย โดยไม่เสีย downtime นาน
              </li>
              <li>
                <span className="font-medium text-slate-100">นักออกแบบ / สถาปนิก</span> – ต้องการวัสดุที่มี spec
                ชัด ใช้งานง่าย และนำเสนอให้ลูกค้าได้มั่นใจ
              </li>
              <li>
                <span className="font-medium text-slate-100">เจ้าของบ้าน</span> – อยากเปลี่ยนบรรยากาศห้อง
                โดยไม่ต้องเปลี่ยนเฟอร์นิเจอร์ทั้งชุด
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container space-y-6">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">เลื่อกเส้นทางที่ตรงกับคุณ</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-5 text-sm text-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              สำหรับเจ้าของธุรกิจ
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-100">
              รีโนเวทร้าน/ออฟฟิศให้ตรง brand
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              ดูโซลูชันตามประเภทงาน (ร้านอาหาร รีเทล คลินิก ฯลฯ) พร้อมตัวอย่างเคสจริง
              และแนวทางการเลือกฟิล์ม
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-5 text-sm text-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              สำหรับนักออกแบบ / สถาปนิก
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-100">
              วัสดุสำหรับงานออกแบบ interior
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              เข้าถึง catalogue, spec sheet และ pattern explorer (ระยะถัดไป)
              เพื่อเลือกฟิล์มที่ตรง concept และข้อกำหนดโครงการ
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-5 text-sm text-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              สำหรับเจ้าของบ้าน
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-100">
              เปลี่ยนบรรยากาศบ้านแบบไม่ต้องทุบ
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              เรียนรู้ว่า interior film คืออะไร ความทนทาน การดูแลรักษา และตัวอย่างการเปลี่ยนห้องจริง
            </p>
          </div>
        </div>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ทำไมต้อง interior film กับ Zenta
        </h2>
        <div className="grid gap-4 text-sm text-slate-300 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              เร็ว &amp; สะอาด
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              ติดตั้งได้ในเวลาอันสั้น ลดฝุ่นและเสียงเทียบกับการทุบ/เปลี่ยนวัสดุเดิม
              เหมาะกับ space ที่ต้องเปิดให้บริการต่อเนื่อง
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              ดีไซน์หลากหลาย
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              รองรับลายไม้ หิน ปูน โลหะ และพื้นผิวพิเศษ
              เพื่อสร้าง mood &amp; tone ที่ต่างกันสำหรับแต่ละธุรกิจหรือห้อง
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              ระบบ &amp; ความรู้
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              เว็บนี้จะมีทั้ง knowledge hub คู่มือการเลือกฟิล์ม
              และระบบ catalog ที่ช่วยให้ตัดสินใจง่าย ไม่ต้องเดาเอง
            </p>
          </div>
        </div>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ตัวอย่างเคส (ตัวอย่างโครง)
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
          ใน phase ถัดไป ส่วนนี้จะแสดง case study จริงของ Zenta
          พร้อมก่อน/หลัง เรื่องราว และลิงก์ไปยังลายฟิล์มที่ใช้
        </p>
      </section>

      <section className="container space-y-4">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ขั้นตอนการทำงานกับ Zenta
        </h2>
        <ol className="grid gap-3 text-sm text-slate-300 md:grid-cols-4">
          <li className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">ขั้นที่ 1</p>
            <p className="mt-2 text-sm leading-relaxed">
              คุย brief / requirement และดู reference เบื้องต้น (สามารถส่งรูป space ปัจจุบันมาได้)
            </p>
          </li>
          <li className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">ขั้นที่ 2</p>
            <p className="mt-2 text-sm leading-relaxed">
              แนะนำ solution, series/ลาย และประมาณการงบ/ระยะเวลา
            </p>
          </li>
          <li className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">ขั้นที่ 3</p>
            <p className="mt-2 text-sm leading-relaxed">
              นัดหมายติดตั้งและเตรียมพื้นที่ เพื่อลดการรบกวนการใช้งานจริงให้มากที่สุด
            </p>
          </li>
          <li className="rounded-xl border border-white/10 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">ขั้นที่ 4</p>
            <p className="mt-2 text-sm leading-relaxed">
              ติดตั้งเสร็จ ตรวจงานร่วมกัน พร้อมคู่มือการดูแลรักษาพื้นผิว และ aftercare
            </p>
          </li>
        </ol>
      </section>

      <section className="container space-y-3">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          ความน่าเชื่อถือ &amp; พาร์ตเนอร์ (placeholder)
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
          ใน phase ถัดไป ส่วนนี้จะใช้สำหรับโลโก้ลูกค้า แบรนด์พาร์ตเนอร์ หรือข้อความรับรอง เพื่อให้เว็บดูมี
          social proof เทียบเท่าหรือเหนือกว่า BODAQ / 3M / TODA
        </p>
      </section>
    </main>
  );
}
