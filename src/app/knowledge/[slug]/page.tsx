import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { TrackEvent } from "@/components/analytics/track-event";
import { isDbConfigured } from "@/lib/db/connection";
import { getPublishedCmsContentByTypeAndSlug } from "@/lib/db/queries/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatBangkok(iso: string): string {
  return new Date(iso).toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isDbConfigured()) {
    return { title: "ความรู้เรื่องฟิล์มตกแต่งภายใน" };
  }

  const article = await getPublishedCmsContentByTypeAndSlug({ type: "article", slug });
  if (!article) {
    return { title: "ไม่พบบทความ" };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary || undefined,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.summary || undefined,
      images: article.ogImageUrl ? [article.ogImageUrl] : article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isDbConfigured()) {
    notFound();
  }

  const article = await getPublishedCmsContentByTypeAndSlug({ type: "article", slug });
  if (!article) {
    notFound();
  }

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent name="view_knowledge_detail" params={{ slug: article.slug }} />

      <nav className="text-xs text-slate-600">
        <Link href="/knowledge" className="transition-colors hover:text-foreground">
          ความรู้
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{article.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{article.title}</h1>

        {article.publishedAt ? (
          <p className="text-[11px] text-slate-500">เผยแพร่: {formatBangkok(article.publishedAt)}</p>
        ) : null}

        {article.summary ? (
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">{article.summary}</p>
        ) : null}
      </header>

      {article.coverImageUrl ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90">
          <Image
            src={article.coverImageUrl}
            alt={article.coverImageAlt || article.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      ) : null}

      {article.bodyHtml ? (
        <article
          className="prose prose-slate max-w-none rounded-2xl border border-slate-200/80 bg-white/90 p-6 prose-headings:tracking-tight"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      ) : null}

      <div>
        <Link href="/contact" className="inline-flex rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90">
          ขอคำปรึกษา / นัดสำรวจ
        </Link>
      </div>
    </div>
  );
}
