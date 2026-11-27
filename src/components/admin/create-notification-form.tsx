"use client";

import { useState } from "react";
import {
  useCreateNotification,
  useUpdateNotification,
} from "@/hooks/use-admin-api";
import type { NotificationResponse } from "@/lib/api";
import UploadField from "@/components/admin/upload-field";

/* -------------------------------------------------------------------------- */
/*  Notification form — create (POST) or edit (PUT /api/notification/{uuid}).   */
/*  A notification is a title, a publication date and an optional PDF.          */
/* -------------------------------------------------------------------------- */

const field = "ui-input";

/** Today as yyyy-MM-dd in local time (what <input type="date"> expects). */
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function CreateNotificationForm({
  editing,
  onSaved,
  onCancelEdit,
}: {
  editing?: NotificationResponse | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
}) {
  const create = useCreateNotification();
  const update = useUpdateNotification();
  const isEdit = !!editing;
  const { data, error, fieldErrors, loading } = isEdit ? update : create;

  const [document, setDocument] = useState<string[]>(editing?.document ? [editing.document] : []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: String(fd.get("title") || "").trim(),
      document: document[0] || undefined,
      date: String(fd.get("date") || "") || undefined,
    };

    const saved = isEdit
      ? await update.mutate({ uuid: editing!.uuid, data: payload })
      : await create.mutate(payload);

    if (saved) {
      if (!isEdit) {
        form.reset();
        setDocument([]);
      }
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="ui-label">Title</label>
        <input required name="title" defaultValue={editing?.title} placeholder="Verification schedule for provisional certificates" className={field} />
        {fieldErrors.title && <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>}
      </div>

      <div>
        <label className="ui-label">Date</label>
        <input
          required
          type="date"
          name="date"
          defaultValue={editing?.date ?? today()}
          className={field}
        />
        {fieldErrors.date && <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p>}
      </div>

      <div>
        <label className="ui-label">
          PDF document <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          value={document}
          onChange={setDocument}
          accept="application/pdf"
          hint="PDF · up to 10 MB"
        />
      </div>

      {error && <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}

      {data && !isEdit && (
        <p className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
          Created “{data.title}” — {data.uuid}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="ui-btn ui-btn-primary flex-1">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Notification"}
        </button>
        {isEdit && (
          <button type="button" onClick={onCancelEdit} className="ui-btn ui-btn-ghost">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
