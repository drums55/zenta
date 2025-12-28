import Link from "next/link";

import { TrackEvent } from "@/components/analytics/track-event";
import { listPublishedCmsContentByType } from "@/lib/db/queries/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBangkok(iso: string): string {
  return new Date(iso).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
}

export default async function KnowledgePage() {
  const articles = await listPublishedCmsContentByType({ type: "article", limit: 200 });

  return (
    <div className="container space-y-6 py-10">
      <TrackEvent name="view_knowledge_list" params={{ count: articles.length }} />

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">ความรู้เรื่องฟิล์มตกแต่งภายใน</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          รวบรวมบทความพื้นฐานเกี่ยวกับฟิล์มตกแต่งภายใน ช่วยให้คุณเข้าใจวัสดุ วิธีใช้งาน การดูแล และสิ่งที่ควรรู้ก่อนรีโนเวทด้วยฟิล์ม
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge/${article.slug}`}
            className="group rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            <h2 className="text-base font-semibold leading-snug text-slate-900">{article.title}</h2>

            {article.publishedAt ? (
              <p className="mt-1 text-[11px] text-slate-500">เผยแพร่: {formatBangkok(article.publishedAt)}</p>
            ) : null}

            {article.summary ? (
              <p className="mt-2 text-xs leading-relaxed text-slate-700">{article.summary}</p>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">อ่านต่อ</p>
          </Link>
        ))}

        {articles.length === 0 ? (
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-700">
            ยังไม่มีบทความที่เผยแพร่
          </div>
        ) : null}
      </section>
    </div>
  );
}
