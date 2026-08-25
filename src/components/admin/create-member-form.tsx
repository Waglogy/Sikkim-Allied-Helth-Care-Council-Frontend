"use client";

import { useState } from "react";
import { useCreateMember, useUpdateMember } from "@/hooks/use-admin-api";
import type { MemberResponse, CategoryResponse } from "@/lib/api";
import UploadField from "@/components/admin/upload-field";

/* -------------------------------------------------------------------------- */
/*  Member form — create (POST /api/member) or edit (PUT /api/member/{uuid}).  */
/*  A member has a photo, name, designation, description, a display priority   */
/*  and belongs to a category.                                                 */
/* -------------------------------------------------------------------------- */

const field = "ui-input";

export default function CreateMemberForm({
  editing,
  categories,
  onSaved,
  onCancelEdit,
}: {
  editing?: MemberResponse | null;
  categories: CategoryResponse[];
  onSaved?: () => void;
  onCancelEdit?: () => void;
}) {
  const create = useCreateMember();
  const update = useUpdateMember();
  const isEdit = !!editing;
  const { data, error, fieldErrors, loading } = isEdit ? update : create;

  const [photo, setPhoto] = useState<string[]>(editing?.photo ? [editing.photo] : []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      designation: String(fd.get("designation") || "").trim(),
      photo: photo[0] || undefined,
      description: String(fd.get("description") || "").trim() || undefined,
      priority: Number(fd.get("priority") || 0),
      categoryUuid: String(fd.get("categoryUuid") || "") || undefined,
    };

    const saved = isEdit
      ? await update.mutate({ uuid: editing!.uuid, data: payload })
      : await create.mutate(payload);

    if (saved) {
      if (!isEdit) {
        form.reset();
        setPhoto([]);
      }
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="ui-label">
          Photo <span className="text-navy/40">(optional)</span>
        </label>
        <UploadField
          value={photo}
          onChange={setPhoto}
          accept="image/png,image/jpeg,image/webp,image/gif"
          hint="One image · up to 10 MB"
        />
      </div>

      <div>
        <label className="ui-label">Name</label>
        <input required name="name" defaultValue={editing?.name} placeholder="Ms. Chokie Lepcha" className={field} />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label className="ui-label">Designation</label>
        <input required name="designation" defaultValue={editing?.designation} placeholder="Sr. Medical Lab Technologist" className={field} />
        {fieldErrors.designation && <p className="mt-1 text-xs text-red-600">{fieldErrors.designation}</p>}
      </div>

      <div>
        <label className="ui-label">
          Description <span className="text-navy/40">(optional)</span>
        </label>
        <textarea name="description" rows={3} defaultValue={editing?.description ?? ""} placeholder="Department of Pathology, STNM Multispeciality Hospital, Gangtok" className={field} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="ui-label">Category</label>
          <select name="categoryUuid" defaultValue={editing?.categoryUuid ?? ""} className={field}>
            <option value="">— Uncategorised —</option>
            {categories.map((c) => (
              <option key={c.uuid} value={c.uuid}>
                {c.type === "EXECUTIVE" ? "Executive" : "Professional"} · {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="ui-label">Priority</label>
          <input type="number" name="priority" defaultValue={editing?.priority ?? 0} placeholder="0" className={field} />
        </div>
      </div>

      {error && <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{error}</p>}

      {data && !isEdit && (
        <p className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
          Created “{data.name}”
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="ui-btn ui-btn-primary flex-1">
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Member"}
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
