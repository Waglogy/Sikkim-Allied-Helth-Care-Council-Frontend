"use client";

import { useState } from "react";
import CreateMemberForm from "@/components/admin/create-member-form";
import { useMembers, useDeleteMember, useCategories } from "@/hooks/use-admin-api";
import type { MemberResponse } from "@/lib/api";
import { Panel, EmptyOrList, EditButton, DeleteButton } from "@/components/admin/panel-ui";

export default function MemberPanel() {
  const query = useMembers();
  const categoriesQuery = useCategories();
  const del = useDeleteMember();
  const items = query.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const [editing, setEditing] = useState<MemberResponse | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onSaved = () => {
    setEditing(null);
    query.refetch();
  };

  async function handleDelete(uuid: string, label: string) {
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
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
      heading={editing ? "Edit member" : "Add member"}
      intro="Council members shown on the public site. Each has a photo, name, designation, description, priority and a category."
      form={
        <CreateMemberForm
          key={editing?.uuid ?? "new"}
          editing={editing}
          categories={categories}
          onSaved={onSaved}
          onCancelEdit={() => setEditing(null)}
        />
      }
      query={query}
      count={items.length}
    >
      <EmptyOrList loading={query.loading} empty={items.length === 0}>
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.uuid} className="ui-card flex items-start gap-4 p-4 transition hover:border-blue/30 hover:shadow-md">
              {m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-border" />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-sm font-semibold text-white">
                  {m.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">{m.name}</p>
                    <p className="truncate text-xs text-navy/50">{m.designation}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <EditButton onClick={() => setEditing(m)} />
                    <DeleteButton onClick={() => handleDelete(m.uuid, m.name)} loading={deletingId === m.uuid} />
                  </div>
                </div>
                {m.description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy/60">{m.description}</p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  {m.categoryName ? (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue">{m.categoryName}</span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-navy/50">Uncategorised</span>
                  )}
                  <span className="text-navy/40">priority {m.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
