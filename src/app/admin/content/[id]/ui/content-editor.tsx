"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";

import type { CmsContentRow } from "@/lib/db/queries/cms";

type AssetRow = {
  id: number;
  bucket: string;
  storagePath: string;
  publicUrl: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  uploadedBy: string | null;
  createdAt: string;
  role: "cover" | "gallery" | "inline" | "attachment";
  sortOrder: number;
};

function toNullIfBlank(value: string, maxLen: number): string | null {
  const v = value.trim();
  if (!v) return null;
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}

export function ContentEditor(props: { initialContent: CmsContentRow; initialAssets: AssetRow[] }) {
  const { initialContent } = props;

  const [title, setTitle] = useState(initialContent.title);
  const [slug, setSlug] = useState(initialContent.slug);
  const [summary, setSummary] = useState(initialContent.summary ?? "");

  const [coverImageUrl, setCoverImageUrl] = useState(initialContent.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(initialContent.coverImageAlt ?? "");

  const [seoTitle, setSeoTitle] = useState(initialContent.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initialContent.seoDescription ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(initialContent.ogImageUrl ?? "");

  const [status, setStatus] = useState(initialContent.status);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [assets, setAssets] = useState<AssetRow[]>(props.initialAssets);

  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  const coverPickerRef = useRef<HTMLInputElement | null>(null);

  const folder = useMemo(() => `${initialContent.type}/${initialContent.contentKey}`, [initialContent.contentKey, initialContent.type]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage.configure({ allowBase64: false }),
    ],
    content: initialContent.bodyJson ? JSON.parse(initialContent.bodyJson) : "",
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[260px] rounded-md border border-neutral-200 bg-white px-4 py-3 text-neutral-900 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    setAssets(props.initialAssets);
  }, [props.initialAssets]);

  async function refresh() {
    const res = await fetch(`/admin/api/content/${initialContent.id}`, { method: "GET" });
    if (!res.ok) return;
    const data = (await res.json()) as { content: CmsContentRow; assets: AssetRow[] };
    setStatus(data.content.status);
    setAssets(data.assets);
  }

  async function save() {
    if (!editor) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const bodyJson = JSON.stringify(editor.getJSON());
      const bodyHtml = editor.getHTML();

      const res = await fetch(`/admin/api/content/${initialContent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: initialContent.type,
          slug,
          title,
          summary: toNullIfBlank(summary, 1000),
          coverImageUrl: toNullIfBlank(coverImageUrl, 1000),
          coverImageAlt: toNullIfBlank(coverImageAlt, 300),
          seoTitle: toNullIfBlank(seoTitle, 300),
          seoDescription: toNullIfBlank(seoDescription, 1000),
          ogImageUrl: toNullIfBlank(ogImageUrl, 1000),
          bodyJson,
          bodyHtml,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Save failed");
      }

      setMessage("Saved");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function setContentStatus(nextStatus: "draft" | "scheduled" | "published" | "archived") {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/admin/api/content/${initialContent.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Status update failed");
      }

      await refresh();
      setMessage("Updated");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Status update failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function publishNow() {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/admin/api/content/${initialContent.id}/publish`, { method: "POST" });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Publish failed");
      }

      await refresh();
      setMessage("Published");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function schedule(whenIso: string) {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/admin/api/content/${initialContent.id}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduledAt: whenIso }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Schedule failed");
      }

      await refresh();
      setMessage("Scheduled");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Schedule failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadToGcs(file: File): Promise<{
    url: string;
    bucket: string;
    storagePath: string;
    contentType: string;
    size: number;
    fileName: string;
  }> {
    const form = new FormData();
    form.set("file", file);
    form.set("folder", folder);

    const res = await fetch("/admin/api/assets/upload", {
      method: "POST",
      body: form,
    });

    const data = (await res.json().catch(() => null)) as any;
    if (!res.ok) {
      throw new Error(data?.error ?? "Upload failed");
    }

    return {
      url: String(data.url),
      bucket: String(data.bucket),
      storagePath: String(data.storagePath),
      contentType: String(data.contentType),
      size: Number(data.size),
      fileName: String(data.fileName),
    };
  }

  async function saveAssetToDb(input: {
    bucket: string;
    storagePath: string;
    publicUrl: string;
    fileName: string;
    contentType: string;
    sizeBytes: number;
    role: "cover" | "gallery" | "inline" | "attachment";
  }): Promise<number> {
    const res = await fetch("/admin/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucket: input.bucket,
        storagePath: input.storagePath,
        publicUrl: input.publicUrl,
        fileName: input.fileName,
        contentType: input.contentType,
        sizeBytes: input.sizeBytes,
        contentId: initialContent.id,
        role: input.role,
      }),
    });

    const data = (await res.json().catch(() => null)) as any;
    if (!res.ok) {
      throw new Error(data?.error ?? "Save asset failed");
    }

    return Number(data.assetId);
  }

  async function onInsertImage(file: File) {
    if (!editor) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const uploaded = await uploadToGcs(file);
      await saveAssetToDb({
        bucket: uploaded.bucket,
        storagePath: uploaded.storagePath,
        publicUrl: uploaded.url,
        fileName: uploaded.fileName,
        contentType: uploaded.contentType,
        sizeBytes: uploaded.size,
        role: "inline",
      });

      editor.chain().focus().setImage({ src: uploaded.url, alt: file.name }).run();

      await refresh();
      setMessage("Uploaded");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsSaving(false);
    }
  }

  async function onUploadCover(file: File) {
    setIsSaving(true);
    setMessage(null);

    try {
      const uploaded = await uploadToGcs(file);
      await saveAssetToDb({
        bucket: uploaded.bucket,
        storagePath: uploaded.storagePath,
        publicUrl: uploaded.url,
        fileName: uploaded.fileName,
        contentType: uploaded.contentType,
        sizeBytes: uploaded.size,
        role: "cover",
      });

      setCoverImageUrl(uploaded.url);
      await refresh();
      setMessage("Cover uploaded");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-neutral-700">
            <div className="font-medium">Status: {status}</div>
            <div className="text-xs text-neutral-500">Folder: {folder}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void save()}
              disabled={isSaving || !editor}
              className="h-9 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => void publishNow()}
              disabled={isSaving}
              className="h-9 rounded-md border border-neutral-900 bg-white px-3 text-sm font-medium text-neutral-900 disabled:opacity-50"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => {
                const iso = window.prompt("Schedule ISO datetime (e.g. 2025-12-31T10:00:00+07:00)");
                if (iso) void schedule(iso);
              }}
              disabled={isSaving}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 disabled:opacity-50"
            >
              Schedule
            </button>
            <button
              type="button"
              onClick={() => void setContentStatus("draft")}
              disabled={isSaving}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 disabled:opacity-50"
            >
              Unpublish
            </button>
            <button
              type="button"
              onClick={() => void setContentStatus("archived")}
              disabled={isSaving}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 disabled:opacity-50"
            >
              Archive
            </button>
          </div>
        </div>

        {message ? <p className="mt-3 text-sm text-neutral-700">{message}</p> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Metadata</h2>

          <div className="mt-4 grid gap-4">
            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">Summary</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div className="grid gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-neutral-700">Cover image</div>
                  <div className="text-xs text-neutral-500">Upload or paste URL</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    ref={coverPickerRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onUploadCover(f);
                      if (coverPickerRef.current) coverPickerRef.current.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => coverPickerRef.current?.click()}
                    disabled={isSaving}
                    className="h-9 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white disabled:opacity-50"
                  >
                    Upload cover
                  </button>
                </div>
              </div>

              <div className="grid gap-1">
                <label className="text-xs font-medium text-neutral-700">Cover URL</label>
                <input
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-xs font-medium text-neutral-700">Cover alt text</label>
                <input
                  value={coverImageAlt}
                  onChange={(e) => setCoverImageAlt(e.target.value)}
                  className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
                />
              </div>

              {coverImageUrl ? (
                <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
                  <Image
                    src={coverImageUrl}
                    alt={coverImageAlt || "cover"}
                    width={1200}
                    height={480}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <h2 className="text-lg font-semibold">SEO</h2>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">SEO title</label>
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">SEO description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={4}
                className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-xs font-medium text-neutral-700">OG image URL</label>
              <input
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Body</h2>
            <p className="mt-1 text-sm text-neutral-600">Use the toolbar to format text and insert images.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900"
            >
              List
            </button>
            <button
              type="button"
              onClick={() => {
                const href = window.prompt("Link URL");
                if (href) editor?.chain().focus().setLink({ href }).run();
              }}
              className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900"
            >
              Link
            </button>

            <input
              ref={imagePickerRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void onInsertImage(f);
                if (imagePickerRef.current) imagePickerRef.current.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => imagePickerRef.current?.click()}
              disabled={isSaving}
              className="h-9 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white disabled:opacity-50"
            >
              Insert image
            </button>
          </div>
        </div>

        <div className="mt-4">{editor ? <EditorContent editor={editor} /> : null}</div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Assets</h2>
          <button type="button" onClick={() => void refresh()} className="text-sm font-medium text-neutral-900 underline">
            Refresh
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((a) => (
            <div key={`${a.id}-${a.role}`} className="overflow-hidden rounded-md border border-neutral-200 bg-white">
              <div className="flex items-center justify-between gap-2 border-b border-neutral-200 bg-neutral-50 px-3 py-2">
                <div className="text-xs font-medium text-neutral-700">{a.role}</div>
                <a href={a.publicUrl} target="_blank" rel="noreferrer" className="text-xs font-medium text-neutral-900 underline">
                  Open
                </a>
              </div>
              <div className="p-3">
                {a.contentType.startsWith("image/") ? (
                  <Image
                    src={a.publicUrl}
                    alt={a.altText ?? a.fileName}
                    width={800}
                    height={400}
                    className="h-32 w-full rounded object-cover"
                  />
                ) : (
                  <div className="text-sm text-neutral-700">{a.fileName}</div>
                )}
                <div className="mt-2 text-xs text-neutral-500">{a.fileName}</div>
              </div>
            </div>
          ))}

          {assets.length === 0 ? <div className="text-sm text-neutral-600">No assets yet.</div> : null}
        </div>
      </div>

      <div className="text-sm text-neutral-700">
        <NextLink href="/admin/content" className="font-medium text-neutral-900 underline">
          Back
        </NextLink>
      </div>
    </div>
  );
}
