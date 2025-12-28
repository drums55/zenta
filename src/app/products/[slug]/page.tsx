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
    return { title: "ผลิตภัณฑ์ Zenta Interior Film" };
  }

  const product = await getPublishedCmsContentByTypeAndSlug({ type: "product", slug });
  if (!product) {
    return { title: "ไม่พบผลิตภัณฑ์" };
  }

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.summary || undefined,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.seoDescription || product.summary || undefined,
      images: product.ogImageUrl ? [product.ogImageUrl] : product.coverImageUrl ? [product.coverImageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isDbConfigured()) {
    notFound();
  }

  const product = await getPublishedCmsContentByTypeAndSlug({ type: "product", slug });
  if (!product) {
    notFound();
  }

  return (
    <div className="container space-y-8 py-10">
      <TrackEvent
        name="view_product_detail"
        params={{ slug: product.slug }}
      />
      <nav className="text-xs text-slate-600">
        <Link href="/products" className="transition-colors hover:text-foreground">
          ผลิตภัณฑ์
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-slate-500">{product.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {product.title}
        </h1>

        {product.publishedAt ? (
          <p className="text-[11px] text-slate-500">เผยแพร่: {formatBangkok(product.publishedAt)}</p>
        ) : null}

        {product.summary ? (
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">{product.summary}</p>
        ) : null}
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-4">
          {product.coverImageUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90">
              <Image
                src={product.coverImageUrl}
                alt={product.coverImageAlt || product.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          {product.bodyHtml ? (
            <article
              className="prose prose-slate max-w-none rounded-2xl border border-slate-200/80 bg-white/90 p-6 prose-headings:tracking-tight"
              dangerouslySetInnerHTML={{ __html: product.bodyHtml }}
            />
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-brand-soft/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ขอคำแนะนำการใช้งานจริง
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              ส่งรูปพื้นที่และบอกจุดที่จะทำ เพื่อให้เราช่วยแนะนำลายและวิธีทำงานที่ลด downtime
              ได้ดีที่สุด
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-50 transition hover:bg-brand-accent/90"
            >
              ขอคำปรึกษา / ใบเสนอราคา
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
