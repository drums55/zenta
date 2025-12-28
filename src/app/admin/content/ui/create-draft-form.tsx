"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CmsContentType } from "@/lib/db/queries/cms";

export function CreateDraftForm(props: { type: CmsContentType }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/admin/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: props.type,
          title,
          slug,
        }),
      });

      const data = (await res.json().catch(() => null)) as { id?: number; error?: string } | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Create failed");
      }

      const id = Number(data?.id);
      if (!Number.isFinite(id) || id <= 0) {
        throw new Error("Create failed");
      }

      setTitle("");
      setSlug("");
      router.push(`/admin/content/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-end">
      <div className="flex flex-1 flex-col gap-1">
        <label className="text-xs font-medium text-neutral-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <label className="text-xs font-medium text-neutral-700">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
          placeholder="slug"
        />
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-md bg-neutral-900 px-4 text-sm font-medium text-white disabled:opacity-50"
        >
          Create draft
        </button>
        {error ? <div className="text-xs text-red-700">{error}</div> : null}
      </div>
    </form>
  );
}
