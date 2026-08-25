"use client";

import { useState } from "react";
import CreatePublicationForm from "@/components/admin/create-publication-form";
import { usePublications, useDeletePublication } from "@/hooks/use-admin-api";
import type { PublicationResponse } from "@/lib/api";
import {
  Panel,
  EmptyOrList,
  EditButton,
  DeleteButton,
  StatusPill,
  fmt,
} from "@/components/admin/panel-ui";

export default function PublicationPanel() {
  const query = usePublications();
  const del = useDeletePublication();
  const items = query.data ?? [];
  const [editing, setEditing] = useState<PublicationResponse | null>(null);
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
      heading={editing ? "Edit publication" : "Add publication"}
      intro="Publications and journals. Add, edit or remove them here."
      form={
        <CreatePublicationForm
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
          {items.map((p) => (
            <div key={p.uuid} className="ui-card p-4 transition hover:border-blue/30 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-navy">{p.title}</p>
                <div className="flex shrink-0 items-center gap-1.5">
                  <StatusPill published={p.publishStatus} />
                  <EditButton onClick={() => setEditing(p)} />
                  <DeleteButton onClick={() => handleDelete(p.uuid, p.title)} loading={deletingId === p.uuid} />
                </div>
              </div>
              {p.description && (
                <p className="mt-1 text-xs leading-relaxed text-navy/60">{p.description}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-navy/50">
                <span>publish {fmt(p.publishDate)}</span>
                {p.fileUpload && <span className="text-blue">has file</span>}
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
