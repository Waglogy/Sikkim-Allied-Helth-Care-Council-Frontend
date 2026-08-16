"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useCollection,
  seedGallery,
  type AdminGalleryItem,
} from "@/lib/use-admin-store";

const field =
  "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

type Draft = Omit<AdminGalleryItem, "id">;
const empty: Draft = { title: "", image: "", album: "" };

export default function GalleryAdmin() {
  const { items, add, update, remove, loaded } = useCollection(
    "gallery",
    seedGallery
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);

  function startAdd() {
    setEditingId(null);
    setDraft(empty);
  }

  function startEdit(g: AdminGalleryItem) {
    setEditingId(g.id);
    setDraft({ title: g.title, image: g.image, album: g.album });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingId) update(editingId, draft);
    else add(draft);
    startAdd();
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <h3 className="font-serif text-lg font-semibold text-navy">
          {editingId ? "Edit Gallery Item" : "Add Gallery Item"}
        </h3>
        <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-navy/70">Title / Caption</label>
            <input
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Photo caption"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-navy/70">Album</label>
            <input
              required
              value={draft.album}
              onChange={(e) => setDraft({ ...draft, album: e.target.value })}
              placeholder="Events"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-navy/70">Image path / URL</label>
            <input
              required
              value={draft.image}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              placeholder="/coverimage.webp"
              className={field}
            />
          </div>
          <div className="flex items-end gap-3 md:col-span-4">
            <button type="submit" className="rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
              {editingId ? "Save Changes" : "Add to Gallery"}
            </button>
            {editingId && (
              <button type="button" onClick={startAdd} className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-navy/70 transition hover:bg-muted">
                Cancel
              </button>
            )}
          </div>
        </form>
        <p className="mt-3 text-xs text-navy/50">
          Tip: place images in the <code className="rounded bg-muted px-1">/public</code> folder and reference them like <code className="rounded bg-muted px-1">/photo.jpg</code>.
        </p>
      </div>

      {/* Grid */}
      <div>
        <p className="mb-4 text-sm text-navy/60">
          {items.length} item{items.length === 1 ? "" : "s"}
        </p>
        {loaded && items.length === 0 && (
          <p className="rounded-2xl border border-border bg-white py-12 text-center text-sm text-navy/50">
            No gallery items yet.
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((g) => (
            <div key={g.id} className="group overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative aspect-video bg-muted">
                {g.image && (
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-start justify-end gap-1 bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                  <button onClick={() => startEdit(g)} className="rounded-md bg-white/90 p-2 text-navy transition hover:bg-white" aria-label="Edit">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
                    </svg>
                  </button>
                  <button onClick={() => remove(g.id)} className="rounded-md bg-white/90 p-2 text-red-600 transition hover:bg-white" aria-label="Delete">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="rounded-full bg-saffron-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-saffron-600">
                  {g.album}
                </span>
                <p className="mt-2 truncate text-sm font-medium text-navy">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
