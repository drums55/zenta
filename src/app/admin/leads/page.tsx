import { isDbConfigured } from "@/lib/db/connection";
import { getLatestLeads } from "@/lib/db/queries/leads";

import { updateLeadAction } from "./actions";

export default async function AdminLeadsPage() {
  const formatBangkok = (iso: string) =>
    new Date(iso).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      hour12: false,
    });

  if (!isDbConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <p className="mt-3 text-sm text-neutral-600">
          Database is not configured. Please set DB_* environment variables.
        </p>
      </main>
    );
  }

  const leads = await getLatestLeads(200);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="mt-2 text-sm text-neutral-600">Latest {leads.length} items</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full min-w-[1400px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-700">
            <tr>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Line</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Timeline</th>
              <th className="px-4 py-3 font-medium">Budget</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Note</th>
              <th className="px-4 py-3 font-medium">Handled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="align-top">
                <td className="px-4 py-3 text-neutral-700">
                  {formatBangkok(lead.receivedAt)}
                </td>
                <td className="px-4 py-3 text-neutral-700">{lead.type}</td>
                <td className="px-4 py-3 text-neutral-900">{lead.name}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.phone ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.line ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.email ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.location ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.sector ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.timeline ?? ""}</td>
                <td className="px-4 py-3 text-neutral-700">{lead.budgetBand ?? ""}</td>

                <td className="px-4 py-3">
                  <form action={updateLeadAction} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status ?? "new"}
                      className="h-9 rounded-md border border-neutral-200 bg-white px-2 text-sm"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="quoted">quoted</option>
                      <option value="won">won</option>
                      <option value="lost">lost</option>
                    </select>
                    <button
                      type="submit"
                      className="h-9 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white"
                    >
                      Save
                    </button>
                  </form>
                </td>

                <td className="px-4 py-3">
                  <form action={updateLeadAction} className="flex items-start gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={lead.status ?? "new"} />
                    <textarea
                      name="note"
                      defaultValue={lead.note ?? ""}
                      rows={2}
                      className="min-h-[42px] w-[320px] resize-y rounded-md border border-neutral-200 bg-white px-2 py-1 text-sm"
                    />
                    <button
                      type="submit"
                      className="h-9 rounded-md bg-neutral-900 px-3 text-sm font-medium text-white"
                    >
                      Save
                    </button>
                  </form>
                </td>

                <td className="px-4 py-3 text-neutral-700">
                  <div className="space-y-1">
                    <div>{lead.handledBy ?? ""}</div>
                    <div className="text-xs text-neutral-500">
                      {lead.handledAt ? formatBangkok(lead.handledAt) : ""}
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            {leads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-600" colSpan={13}>
                  No leads yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}
