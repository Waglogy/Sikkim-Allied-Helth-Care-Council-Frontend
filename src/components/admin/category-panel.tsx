"use client";

import { useState } from "react";
import CreateCategoryForm from "@/components/admin/create-category-form";
import { useCategories, useDeleteCategory } from "@/hooks/use-admin-api";
import type { CategoryResponse } from "@/lib/api";
import { Panel, EmptyOrList, EditButton, DeleteButton } from "@/components/admin/panel-ui";

export default function CategoryPanel() {
  const query = useCategories();
  const del = useDeleteCategory();
  const items = query.data ?? [];
  const [editing, setEditing] = useState<CategoryResponse | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onSaved = () => {
    setEditing(null);
    query.refetch();
  };

  async function handleDelete(uuid: string, label: string, memberCount: number) {
    const extra = memberCount > 0
      ? ` ${memberCount} member${memberCount === 1 ? "" : "s"} will become uncategorised.`
      : "";
    if (!window.confirm(`Delete "${label}"?${extra} This cannot be undone.`)) return;
    setDeletingId(uuid);
    const res = await del.mutate(uuid);
    setDeletingId(null);
    if (res !== null) {
      if (editing?.uuid === uuid) setEditing(null);
      query.refetch();
    }
  }

  return (
    <Panel
      heading={editing ? "Edit category" : "Add category"}
      intro="Groups that members are listed under — the council executive and the professional representative categories. Ordered by priority."
      form={
        <CreateCategoryForm
          key={editing?.uuid ?? "new"}
          editing={editing}
          onSaved={onSaved}
          onCancelEdit={() => setEditing(null)}
        />
      }
      query={query}
      count={items.length}
    >
      <EmptyOrList loading={query.loading} empty={items.length === 0}>
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c.uuid} className="ui-card flex items-center gap-3 p-4 transition hover:border-blue/30 hover:shadow-md">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-navy/60">
                {c.priority}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-navy">{c.name}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold ${
                      c.type === "EXECUTIVE"
                        ? "bg-saffron-50 text-saffron-600"
                        : "bg-blue-50 text-blue"
                    }`}
                  >
                    {c.type === "EXECUTIVE" ? "Executive" : "Professional"}
                  </span>
                  <span className="text-navy/50">
                    {c.members.length} member{c.members.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <EditButton onClick={() => setEditing(c)} />
                <DeleteButton onClick={() => handleDelete(c.uuid, c.name, c.members.length)} loading={deletingId === c.uuid} />
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
