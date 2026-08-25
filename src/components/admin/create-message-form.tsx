"use client";

import { useState } from "react";
import { useCreateMessage, useUpdateMessage } from "@/hooks/use-admin-api";
import { getAdmin } from "@/lib/use-admin-store";
import type { MessageResponse } from "@/lib/api";
import UploadField from "@/components/admin/upload-field";

/* -------------------------------------------------------------------------- */
/*  Message form — create (POST /api/message) or edit (PUT /api/message/{id}). */
/* -------------------------------------------------------------------------- */

const field =
  "ui-input";

/** "2026-08-25T08:00" (datetime-local) → "2026-08-25T08:00:00" (LocalDateTime). */
function toLocalDateTime(value: string): string | undefined {
  if (!value) return undefined;
  return value.length === 16 ? `${value}:00` : value;
}

/** LocalDateTime → datetime-local input value. */
function toInputDateTime(value: string | null): string {
  return value ? value.slice(0, 16) : "";
}

export default function CreateMessageForm({
  editing,
  onSaved,
  onCancelEdit,
}: {
  editing?: MessageResponse | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
}) {
  const create = useCreateMessage();
  const update = useUpdateMessage();
  const isEdit = !!editing;
  const { data, error, fieldErrors, loading } = isEdit ? update : create;

  const [photo, setPhoto] = useState<string[]>(editing?.photo ? [editing.photo] : []);
  const [file, setFile] = useState<string[]>(editing?.fileUpload ? [editing.fileUpload] : []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const admin = getAdmin();
    if (!admin) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: String(fd.get("title") || "").trim(),
      description: String(fd.get("description") || "").trim() || undefined,
      publishDate: toLocalDateTime(String(fd.get("publishDate") || "")),
      photo: photo[0] || undefined,
      fileUpload: file[0] || undefined,
      publishStatus: fd.get("publishStatus") === "on",
      createdBy: editing?.createdBy ?? admin.uuid,
    };

    const saved = isEdit
      ? await update.mutate({ uuid: editing!.uuid, data: payload })
      : await create.mutate(payload);

    if (saved) {
      if (!isEdit) {
        form.reset();
        setPhoto([]);
        setFile([]);
      }
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="ui-label">Title</label>
        <input required name="title" defaultValue={editing?.title} placeholder="Registration renewal notice" className={field} />
        {fieldErrors.title && <p className="mt-1 text-xs text-red-600">{fieldErrors.title}</p>}
      </div>

      <div>
        <label className="ui-label">
          Description <span className="text-navy/40">(optional)</span>
        </label>
        <textarea name="description" rows={3} defaultValue={editing?.description ?? ""} placeholder="All members must renew before Sept 30." className={field} />
      </div>

      <div>
        <label className="ui-label">
          Publish date &amp; time <span className="text-navy/40">(optional)</span>
        </label>
        <input type="datetime-local" name="publishDate" defaultValue={toInputDateTime(editing?.publishDate ?? null)} className={field} />
      </div>

      <div>
        <label className="ui-label">
          Photo <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          value={photo}
          onChange={setPhoto}
          accept="image/png,image/jpeg,image/webp,image/gif"
          hint="One image · JPG, PNG, WebP or GIF · up to 10 MB"
        />
      </div>

      <div>
        <label className="ui-label">
          Attachment <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          value={file}
          onChange={setFile}
          accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
          hint="Image or PDF · up to 10 MB"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-navy/70">
        <input type="checkbox" name="publishStatus" defaultChecked={editing?.publishStatus ?? false} className="rounded border-border" />
        Publish immediately
      </label>

      {error && <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}

      {data && !isEdit && (
        <p className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
          Created “{data.title}” — {data.uuid}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="ui-btn ui-btn-primary flex-1"
        >
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create Message"}
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
