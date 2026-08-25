"use client";

import { useState } from "react";
import { useContacts, useResolveContact, useDeleteContact } from "@/hooks/use-admin-api";
import { fmt } from "@/components/admin/panel-ui";

export default function ContactPanel() {
  const query = useContacts();
  const resolveMut = useResolveContact();
  const deleteMut = useDeleteContact();
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const all = query.data ?? [];
  const items = onlyOpen ? all.filter((c) => !c.resolved) : all;
  const openCount = all.filter((c) => !c.resolved).length;

  async function toggleResolved(uuid: string, resolved: boolean) {
    setBusyId(uuid);
    const res = await resolveMut.mutate({ uuid, resolved });
    setBusyId(null);
    if (res !== null) query.refetch();
  }

  async function remove(uuid: string, label: string) {
    if (!window.confirm(`Delete the message "${label}"? This cannot be undone.`)) return;
    setBusyId(uuid);
    const res = await deleteMut.mutate(uuid);
    setBusyId(null);
    if (res !== null) query.refetch();
  }

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-navy/55">
        Messages submitted through the public contact form. Mark them resolved once handled.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-navy/55">
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 px-2 text-xs font-semibold text-blue">
            {openCount}
          </span>
          open of {all.length}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-medium text-navy/70">
            <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} className="rounded border-border" />
            Show only open
          </label>
          <button onClick={query.refetch} className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/70 transition hover:bg-muted">
            Refresh
          </button>
        </div>
      </div>

      {query.error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{query.error}</p>
      )}

      {!query.error && (
        <div className="space-y-3">
          {query.loading && <p className="ui-card p-6 text-center text-sm text-navy/50">Loading…</p>}
          {!query.loading && items.length === 0 && (
            <p className="ui-card p-10 text-center text-sm text-navy/50">No messages{onlyOpen ? " open" : ""}.</p>
          )}
          {items.map((c) => (
            <div key={c.uuid} className="ui-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy">{c.subject}</p>
                  <p className="mt-0.5 text-xs text-navy/55">
                    {c.name} · <a href={`mailto:${c.email}`} className="text-blue hover:underline">{c.email}</a>
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.resolved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                  {c.resolved ? "Resolved" : "Open"}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-navy/70">{c.message}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[11px] text-navy/45">{fmt(c.createdAt)}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleResolved(c.uuid, !c.resolved)}
                    disabled={busyId === c.uuid}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/70 transition hover:bg-muted disabled:opacity-60"
                  >
                    {c.resolved ? "Reopen" : "Mark resolved"}
                  </button>
                  <button
                    onClick={() => remove(c.uuid, c.subject)}
                    disabled={busyId === c.uuid}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy/60 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
