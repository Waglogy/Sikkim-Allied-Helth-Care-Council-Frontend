"use client";

import { useState } from "react";
import {
  useCollection,
  seedEvents,
  type AdminEvent,
} from "@/lib/use-admin-store";

const field =
  "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

type Draft = Omit<AdminEvent, "id">;
const empty: Draft = {
  day: "",
  month: "",
  year: "",
  title: "",
  place: "",
  time: "",
  desc: "",
  past: false,
};

export default function EventsAdmin() {
  const { items, add, update, remove, loaded } = useCollection(
    "events",
    seedEvents
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);

  function startAdd() {
    setEditingId(null);
    setDraft(empty);
  }

  function startEdit(e: AdminEvent) {
    setEditingId(e.id);
    const { id: _id, ...rest } = e;
    void _id;
    setDraft({ ...empty, ...rest });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingId) update(editingId, draft);
    else add(draft);
    startAdd();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-navy">
            {editingId ? "Edit Event" : "Add Event"}
          </h3>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Title</label>
              <input
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Event title"
                className={field}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Day</label>
                <input required value={draft.day} onChange={(e) => setDraft({ ...draft, day: e.target.value })} placeholder="12" className={field} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Month</label>
                <input required value={draft.month} onChange={(e) => setDraft({ ...draft, month: e.target.value })} placeholder="Sep" className={field} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Year</label>
                <input required value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} placeholder="2026" className={field} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Place</label>
                <input required value={draft.place} onChange={(e) => setDraft({ ...draft, place: e.target.value })} placeholder="Venue, Gangtok" className={field} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Time</label>
                <input required value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="10:00 AM" className={field} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Description</label>
              <textarea
                rows={3}
                value={draft.desc}
                onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
                placeholder="Short description (optional)"
                className={field}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-navy/70">
              <input
                type="checkbox"
                checked={!!draft.past}
                onChange={(e) => setDraft({ ...draft, past: e.target.checked })}
                className="rounded border-border"
              />
              Mark as a past event
            </label>
            <div className="flex gap-3">
              <button type="submit" className="rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                {editingId ? "Save Changes" : "Add Event"}
              </button>
              {editingId && (
                <button type="button" onClick={startAdd} className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-navy/70 transition hover:bg-muted">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-3">
        <p className="mb-4 text-sm text-navy/60">
          {items.length} event{items.length === 1 ? "" : "s"}
        </p>
        <div className="space-y-3">
          {loaded && items.length === 0 && (
            <p className="rounded-2xl border border-border bg-white py-12 text-center text-sm text-navy/50">
              No events. Add one using the form.
            </p>
          )}
          {items.map((e) => (
            <div key={e.id} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
                <span className="text-xl font-semibold leading-none">{e.day}</span>
                <span className="text-[10px] uppercase text-white/70">{e.month}</span>
                <span className="text-[10px] text-white/50">{e.year}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-navy">{e.title}</p>
                  {e.past && (
                    <span className="rounded-full bg-navy/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-navy/60">
                      Past
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-navy/60">{e.place} · {e.time}</p>
                {e.desc && <p className="mt-1 text-xs leading-relaxed text-navy/50">{e.desc}</p>}
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(e)} className="rounded-md p-2 text-navy/50 transition hover:bg-blue-50 hover:text-blue" aria-label="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </button>
                <button onClick={() => remove(e.id)} className="rounded-md p-2 text-navy/50 transition hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
