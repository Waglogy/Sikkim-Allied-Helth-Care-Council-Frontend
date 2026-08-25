"use client";

import { useCreateCategory, useUpdateCategory } from "@/hooks/use-admin-api";
import type { CategoryResponse, CategoryType } from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  Category form — create (POST) or edit (PUT /api/category/{uuid}).          */
/*  A category groups members: a name, a display priority and a type           */
/*  (council Executive vs a Professional representative group).                */
/* -------------------------------------------------------------------------- */

const field = "ui-input";

const TYPES: { value: CategoryType; label: string }[] = [
  { value: "PROFESSIONAL", label: "Professional category" },
  { value: "EXECUTIVE", label: "Council executive" },
];

export default function CreateCategoryForm({
  editing,
  onSaved,
  onCancelEdit,
}: {
  editing?: CategoryResponse | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
}) {
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const isEdit = !!editing;
  const { data, error, fieldErrors, loading } = isEdit ? update : create;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      priority: Number(fd.get("priority") || 0),
      type: (String(fd.get("type") || "PROFESSIONAL") as CategoryType),
    };

    const saved = isEdit
      ? await update.mutate({ uuid: editing!.uuid, data: payload })
      : await create.mutate(payload);

    if (saved) {
      if (!isEdit) form.reset();
      onSaved?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="ui-label">Name</label>
        <input required name="name" defaultValue={editing?.name} placeholder="Medical Laboratory & Life Sciences" className={field} />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="ui-label">Type</label>
          <select name="type" defaultValue={editing?.type ?? "PROFESSIONAL"} className={field}>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="ui-label">Priority</label>
          <input type="number" name="priority" defaultValue={editing?.priority ?? 0} placeholder="1" className={field} />
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
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Category"}
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
