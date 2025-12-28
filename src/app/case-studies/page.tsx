import Link from "next/link";
import Image from "next/image";

import { TrackEvent } from "@/components/analytics/track-event";
import { listPublishedCmsContentByType } from "@/lib/db/queries/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBangkok(iso: string): string {
  return new Date(iso).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
}

export default async function CaseStudiesPage() {
  const cases = await listPublishedCmsContentByType({ type: "case_study", limit: 200 });

  return (
    <div className="container space-y-6 py-10">
      <TrackEvent name="view_case_studies_list" params={{ count: cases.length }} />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">ผลงาน / Case Studies</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          ดูตัวอย่างงานรีโนเวทที่ใช้ฟิล์มตกแต่งภายในจาก Zenta เพื่อให้เห็นว่าฟิล์มช่วยเปลี่ยนบรรยากาศและประสบการณ์ของพื้นที่ได้อย่างไร
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {cases.map((cs) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            {cs.coverImageUrl ? (
              <div className="relative h-40 w-full">
                <Image
                  src={cs.coverImageUrl}
                  alt={cs.coverImageAlt || cs.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="p-5">
              <h2 className="text-base font-semibold leading-snug text-slate-900">{cs.title}</h2>

              {cs.publishedAt ? (
                <p className="mt-1 text-[11px] text-slate-500">เผยแพร่: {formatBangkok(cs.publishedAt)}</p>
              ) : null}

              {cs.summary ? (
                <p className="mt-2 text-xs leading-relaxed text-slate-700">{cs.summary}</p>
              ) : null}

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">ดูรายละเอียด</p>
            </div>
          </Link>
        ))}

        {cases.length === 0 ? (
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-700">
            ยังไม่มีผลงานที่เผยแพร่
          </div>
        ) : null}
      </section>
    </div>
  );
}
