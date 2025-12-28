import { isDbConfigured } from "@/lib/db/connection";
import { getLatestLeads } from "@/lib/db/queries/leads";

export default async function AdminLeadsPage() {
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
        <table className="w-full min-w-[1100px] text-left text-sm">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="align-top">
                <td className="px-4 py-3 text-neutral-700">
                  {new Date(lead.receivedAt).toLocaleString("th-TH")}
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
              </tr>
            ))}

            {leads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-neutral-600" colSpan={10}>
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
