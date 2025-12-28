import Link from "next/link";

import { isDbConfigured } from "@/lib/db/connection";
import { getCmsContentById, listAssetsForContent } from "@/lib/db/queries/cms";

import { ContentEditor } from "./ui/content-editor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminContentEditorPage(props: PageProps) {
  const { id: idParam } = await props.params;
  const id = Number(idParam);

  if (!Number.isFinite(id) || id <= 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Content</h1>
        <p className="mt-3 text-sm text-neutral-600">Invalid id.</p>
      </main>
    );
  }

  if (!isDbConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Content</h1>
        <p className="mt-3 text-sm text-neutral-600">Database is not configured. Please set DB_* environment variables.</p>
      </main>
    );
  }

  const content = await getCmsContentById(id);
  if (!content) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Content</h1>
            <p className="mt-2 text-sm text-neutral-600">Not found.</p>
          </div>
          <Link href="/admin/content" className="text-sm font-medium text-neutral-900 underline">
            Back
          </Link>
        </div>
      </main>
    );
  }

  const assets = await listAssetsForContent(id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Edit content</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {content.type} · {content.status} · #{content.id}
          </p>
        </div>
        <Link href="/admin/content" className="text-sm font-medium text-neutral-900 underline">
          Back to list
        </Link>
      </div>

      <div className="mt-6">
        <ContentEditor initialContent={content} initialAssets={assets} />
      </div>
    </main>
  );
}
