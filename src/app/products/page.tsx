import Link from "next/link";
import Image from "next/image";

import { TrackEvent } from "@/components/analytics/track-event";
import { listPublishedCmsContentByType } from "@/lib/db/queries/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBangkok(iso: string): string {
  return new Date(iso).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
}

export default async function ProductsPage() {
  const products = await listPublishedCmsContentByType({ type: "product", limit: 200 });

  return (
    <div className="container space-y-6 py-10">
      <TrackEvent name="view_products_list" params={{ count: products.length }} />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">ผลิตภัณฑ์ Zenta Interior Film</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          เลือกดูตัวอย่างฟิล์มตกแต่งภายในจาก Zenta พร้อมรายละเอียดและตัวอย่างการใช้งาน
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            {p.coverImageUrl ? (
              <div className="relative h-36 w-full">
                <Image
                  src={p.coverImageUrl}
                  alt={p.coverImageAlt || p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="p-5">
              <h2 className="text-base font-semibold leading-snug text-slate-900">{p.title}</h2>

              {p.publishedAt ? (
                <p className="mt-1 text-[11px] text-slate-500">เผยแพร่: {formatBangkok(p.publishedAt)}</p>
              ) : null}

              {p.summary ? (
                <p className="mt-2 text-xs leading-relaxed text-slate-700">{p.summary}</p>
              ) : null}

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">ดูรายละเอียด</p>
            </div>
          </Link>
        ))}

        {products.length === 0 ? (
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-700">
            ยังไม่มีผลิตภัณฑ์ที่เผยแพร่
          </div>
        ) : null}
      </section>
    </div>
  );
}
