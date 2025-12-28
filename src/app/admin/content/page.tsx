import Link from "next/link";

import { isDbConfigured } from "@/lib/db/connection";
import { listCmsContent, type CmsContentStatus, type CmsContentType } from "@/lib/db/queries/cms";

import { CreateDraftForm } from "./ui/create-draft-form";

interface AdminContentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function isCmsType(value: string): value is CmsContentType {
  return value === "article" || value === "case_study" || value === "product";
}

function isCmsStatus(value: string): value is CmsContentStatus {
  return value === "draft" || value === "scheduled" || value === "published" || value === "archived";
}

function getParam(params: Record<string, string | string[] | undefined>, key: string): string {
  const v = params[key];
  return Array.isArray(v) ? String(v[0] ?? "") : String(v ?? "");
}

function formatType(value: CmsContentType): string {
  if (value === "article") return "Articles";
  if (value === "case_study") return "Case Studies";
  return "Products";
}

function formatStatus(value: CmsContentStatus): string {
  if (value === "draft") return "Draft";
  if (value === "scheduled") return "Scheduled";
  if (value === "published") return "Published";
  return "Archived";
}

export default async function AdminContentPage(props: AdminContentPageProps) {
  const sp = await props.searchParams;

  const typeRaw = getParam(sp, "type");
  const statusRaw = getParam(sp, "status");

  const type = isCmsType(typeRaw) ? typeRaw : ("article" satisfies CmsContentType);
  const status = isCmsStatus(statusRaw) ? statusRaw : undefined;

  if (!isDbConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Content</h1>
        <p className="mt-3 text-sm text-neutral-600">Database is not configured. Please set DB_* environment variables.</p>
      </main>
    );
  }

  const items = await listCmsContent({ type, status, limit: 200 });

  const buildHref = (next: { type?: CmsContentType; status?: CmsContentStatus | "" }) => {
    const params = new URLSearchParams();
    params.set("type", next.type ?? type);
    if (next.status) {
      params.set("status", next.status);
    }
    return `/admin/content?${params.toString()}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Content</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {formatType(type)}{status ? ` · ${formatStatus(status)}` : ""} · {items.length} items
          </p>
        </div>

        <CreateDraftForm type={type} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={buildHref({ type: "article", status: status ?? "" })}
          className={`rounded-full border px-3 py-1 text-sm ${type === "article" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-800"}`}
        >
          Articles
        </Link>
        <Link
          href={buildHref({ type: "case_study", status: status ?? "" })}
          className={`rounded-full border px-3 py-1 text-sm ${type === "case_study" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-800"}`}
        >
          Case Studies
        </Link>
        <Link
          href={buildHref({ type: "product", status: status ?? "" })}
          className={`rounded-full border px-3 py-1 text-sm ${type === "product" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-800"}`}
        >
          Products
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={buildHref({ type, status: "" })}
          className={`rounded-full border px-3 py-1 text-sm ${!status ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-800"}`}
        >
          All
        </Link>
        {(["draft", "scheduled", "published", "archived"] as CmsContentStatus[]).map((s) => (
          <Link
            key={s}
            href={buildHref({ type, status: s })}
            className={`rounded-full border px-3 py-1 text-sm ${status === s ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-800"}`}
          >
            {formatStatus(s)}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-700">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">By</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3 font-medium text-neutral-900">{item.title}</td>
                <td className="px-4 py-3 text-neutral-700">{item.slug}</td>
                <td className="px-4 py-3 text-neutral-700">{formatStatus(item.status)}</td>
                <td className="px-4 py-3 text-neutral-700">
                  {new Date(item.updatedAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok", hour12: false })}
                </td>
                <td className="px-4 py-3 text-neutral-700">{item.updatedBy ?? ""}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/content/${item.id}`}
                    className="inline-flex h-9 items-center rounded-md bg-neutral-900 px-3 text-sm font-medium text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-600" colSpan={6}>
                  No items.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}
