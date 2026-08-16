"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useCollection,
  seedMessages,
  type AdminMessage,
} from "@/lib/use-admin-store";

const field =
  "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

type Draft = Omit<AdminMessage, "id">;
const empty: Draft = { name: "", role: "", photo: "", excerpt: "" };

export default function MessagesAdmin() {
  const { items, add, update, remove, loaded } = useCollection(
    "messages",
    seedMessages
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);

  function startAdd() {
    setEditingId(null);
    setDraft(empty);
  }

  function startEdit(m: AdminMessage) {
    setEditingId(m.id);
    setDraft({ name: m.name, role: m.role, photo: m.photo ?? "", excerpt: m.excerpt });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingId) update(editingId, draft);
    else add(draft);
    startAdd();
  }

  function initials(name: string, role: string) {
    const source = name || role;
    return source
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-navy">
            {editingId ? "Edit Message" : "Add Message"}
          </h3>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Name <span className="text-navy/40">(optional)</span></label>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Full name"
                className={field}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Role / Designation</label>
              <input
                required
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                placeholder="Hon'ble Chief Minister of Sikkim"
                className={field}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Photo path / URL <span className="text-navy/40">(optional)</span></label>
              <input
                value={draft.photo}
                onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
                placeholder="/hcm.svg"
                className={field}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">Message</label>
              <textarea
                required
                rows={5}
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                placeholder="Message from the dignitary…"
                className={field}
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                {editingId ? "Save Changes" : "Add Message"}
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
          {items.length} message{items.length === 1 ? "" : "s"}
        </p>
        <div className="space-y-4">
          {loaded && items.length === 0 && (
            <p className="rounded-2xl border border-border bg-white py-12 text-center text-sm text-navy/50">
              No messages yet.
            </p>
          )}
          {items.map((m) => (
            <div key={m.id} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
              <div className="shrink-0">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name || m.role}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover object-top ring-1 ring-border"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-sm font-semibold text-white">
                    {initials(m.name, m.role)}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <blockquote className="text-sm leading-relaxed text-navy/70">
                  &ldquo;{m.excerpt}&rdquo;
                </blockquote>
                <div className="mt-3">
                  {m.name && <p className="font-serif text-sm font-semibold text-navy">{m.name}</p>}
                  <p className="text-xs font-medium uppercase tracking-wide text-saffron">{m.role}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(m)} className="rounded-md p-2 text-navy/50 transition hover:bg-blue-50 hover:text-blue" aria-label="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                  </svg>
                </button>
                <button onClick={() => remove(m.id)} className="rounded-md p-2 text-navy/50 transition hover:bg-red-50 hover:text-red-600" aria-label="Delete">
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
