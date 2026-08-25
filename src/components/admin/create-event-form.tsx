"use client";

import { useState } from "react";
import { useCreateEvent, useUpdateEvent } from "@/hooks/use-admin-api";
import { getAdmin } from "@/lib/use-admin-store";
import type { EventResponse } from "@/lib/api";
import UploadField from "@/components/admin/upload-field";

/* -------------------------------------------------------------------------- */
/*  Event form — create (POST /api/event) or edit (PUT /api/event/{uuid}).     */
/*  `createdBy` comes from the signed-in admin (ignored server-side on edit).  */
/* -------------------------------------------------------------------------- */

const field =
  "ui-input";

/** "2026-09-01T09:30" (datetime-local) → "2026-09-01T09:30:00" (LocalDateTime). */
function toLocalDateTime(value: string): string {
  return value.length === 16 ? `${value}:00` : value;
}

/** LocalDateTime "2026-09-01T09:30:00" → datetime-local value "2026-09-01T09:30". */
function toInputDateTime(value: string | null): string {
  return value ? value.slice(0, 16) : "";
}

export default function CreateEventForm({
  editing,
  onSaved,
  onCancelEdit,
}: {
  editing?: EventResponse | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
}) {
  const create = useCreateEvent();
  const update = useUpdateEvent();
  const isEdit = !!editing;
  const { data, error, fieldErrors, loading } = isEdit ? update : create;

  // Uploaded file URLs are managed as state (the form remounts on `key` change).
  const [images, setImages] = useState<string[]>(editing?.images ?? []);
  const [documents, setDocuments] = useState<string[]>(editing?.documents ?? []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const admin = getAdmin();
    if (!admin) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      description: String(fd.get("description") || "").trim() || undefined,
      eventDate: toLocalDateTime(String(fd.get("eventDate") || "")),
      images: images.length ? images : undefined,
      documents: documents.length ? documents : undefined,
      createdBy: editing?.createdBy ?? admin.uuid,
    };

    const saved = isEdit
      ? await update.mutate({ uuid: editing!.uuid, data: payload })
      : await create.mutate(payload);

    if (saved) {
      if (!isEdit) {
        form.reset();
        setImages([]);
        setDocuments([]);
      }
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="ui-label">Name</label>
        <input required name="name" defaultValue={editing?.name} placeholder="Annual Health Conclave 2026" className={field} />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label className="ui-label">
          Description <span className="text-navy/40">(optional)</span>
        </label>
        <textarea name="description" rows={3} defaultValue={editing?.description ?? ""} placeholder="State-level allied health professionals meet." className={field} />
      </div>

      <div>
        <label className="ui-label">Event date &amp; time</label>
        <input required type="datetime-local" name="eventDate" defaultValue={toInputDateTime(editing?.eventDate ?? null)} className={field} />
        {fieldErrors.eventDate && <p className="mt-1 text-xs text-red-600">{fieldErrors.eventDate}</p>}
      </div>

      <div>
        <label className="ui-label">
          Images <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          multiple
          value={images}
          onChange={setImages}
          accept="image/png,image/jpeg,image/webp,image/gif"
          hint="JPG, PNG, WebP or GIF · up to 10 MB each"
        />
      </div>

      <div>
        <label className="ui-label">
          Documents <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          multiple
          value={documents}
          onChange={setDocuments}
          accept="application/pdf"
          hint="PDF · up to 10 MB each"
        />
      </div>

      {error && <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}

      {data && !isEdit && (
        <p className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
          Created “{data.name}” — {data.uuid}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="ui-btn ui-btn-primary flex-1"
        >
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="ui-btn ui-btn-ghost"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
