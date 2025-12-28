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
    return { title: "ผลงาน / Case Studies" };
  }

  const cs = await getPublishedCmsContentByTypeAndSlug({ type: "case_study", slug });
  if (!cs) {
    return { title: "ไม่พบผลงาน" };
  }

  return {
    title: cs.seoTitle || cs.title,
    description: cs.seoDescription || cs.summary || undefined,
    openGraph: {
      title: cs.seoTitle || cs.title,
      description: cs.seoDescription || cs.summary || undefined,
      images: cs.ogImageUrl ? [cs.ogImageUrl] : cs.coverImageUrl ? [cs.coverImageUrl] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isDbConfigured()) {
    notFound();
  }

  const caseStudy = await getPublishedCmsContentByTypeAndSlug({ type: "case_study", slug });
  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent
        name="view_case_study_detail"
        params={{ slug: caseStudy.slug }}
      />
      <nav className="text-xs text-slate-600">
        <Link href="/case-studies" className="transition-colors hover:text-foreground">
          ผลงาน
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{caseStudy.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {caseStudy.title}
        </h1>

        {caseStudy.publishedAt ? (
          <p className="text-[11px] text-slate-500">เผยแพร่: {formatBangkok(caseStudy.publishedAt)}</p>
        ) : null}

        {caseStudy.summary ? (
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            {caseStudy.summary}
          </p>
        ) : null}
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          {caseStudy.coverImageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90">
              <Image
                src={caseStudy.coverImageUrl}
                alt={caseStudy.coverImageAlt || caseStudy.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          {caseStudy.bodyHtml ? (
            <article
              className="prose prose-slate max-w-none rounded-2xl border border-slate-200/80 bg-white/90 p-6 prose-headings:tracking-tight"
              dangerouslySetInnerHTML={{ __html: caseStudy.bodyHtml }}
            />
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              อยากทำแบบนี้กับพื้นที่ของคุณ?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              เล่าประเภทพื้นที่และข้อจำกัดเรื่องเวลา/การเปิดบริการ แล้วเราจะช่วยวางแนวทางให้เหมาะที่สุด
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ขอคำปรึกษา / นัดสำรวจ
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
