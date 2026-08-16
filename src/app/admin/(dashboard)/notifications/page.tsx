"use client";

import { useState } from "react";
import {
  useCollection,
  seedNotifications,
  type AdminNotification,
} from "@/lib/use-admin-store";

const TAGS: AdminNotification["tag"][] = [
  "Registration",
  "Notice",
  "Order",
  "Circular",
  "Result",
];

const field =
  "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

type Draft = Omit<AdminNotification, "id">;
const empty: Draft = { date: "", tag: "Notice", title: "" };

export default function NotificationsAdmin() {
  const { items, add, update, remove, loaded } = useCollection(
    "notifications",
    seedNotifications
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);

  function startAdd() {
    setEditingId(null);
    setDraft(empty);
  }

  function startEdit(n: AdminNotification) {
    setEditingId(n.id);
    setDraft({ date: n.date, tag: n.tag, title: n.title });
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
            {editingId ? "Edit Notification" : "Add Notification"}
          </h3>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Title</label>
              <textarea
                required
                rows={3}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Notification title"
                className={field}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Date</label>
                <input
                  required
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  placeholder="18 Jul 2026"
                  className={field}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-navy/70">Tag</label>
                <select
                  value={draft.tag}
                  onChange={(e) =>
                    setDraft({ ...draft, tag: e.target.value as AdminNotification["tag"] })
                  }
                  className={field}
                >
                  {TAGS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                {editingId ? "Save Changes" : "Add Notification"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={startAdd}
                  className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-navy/70 transition hover:bg-muted"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* List */}
      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-navy/60">
            {items.length} notification{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {loaded && items.length === 0 && (
            <p className="py-12 text-center text-sm text-navy/50">
              No notifications. Add one using the form.
            </p>
          )}
          {items.map((n) => (
            <div key={n.id} className="flex items-start gap-4 p-4">
              <span className="mt-0.5 shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-blue">
                {n.tag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-navy">{n.title}</p>
                <p className="mt-0.5 text-xs text-navy/50">{n.date}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => startEdit(n)}
                  className="rounded-md p-2 text-navy/50 transition hover:bg-blue-50 hover:text-blue"
                  aria-label="Edit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </button>
                <button
                  onClick={() => remove(n.id)}
                  className="rounded-md p-2 text-navy/50 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete"
                >
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
