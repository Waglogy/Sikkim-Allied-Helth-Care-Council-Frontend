"use client";

import { useState } from "react";
import CreateMessageForm from "@/components/admin/create-message-form";
import { useMessages, useDeleteMessage } from "@/hooks/use-admin-api";
import type { MessageResponse } from "@/lib/api";
import {
  Panel,
  EmptyOrList,
  EditButton,
  DeleteButton,
  StatusPill,
  fmt,
} from "@/components/admin/panel-ui";

export default function MessagePanel() {
  const query = useMessages();
  const del = useDeleteMessage();
  const items = query.data ?? [];
  const [editing, setEditing] = useState<MessageResponse | null>(null);
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
      heading={editing ? "Edit message" : "Add message"}
      intro="Notices, circulars and messages. Add, edit or remove them here."
      form={
        <CreateMessageForm
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
          {items.map((m) => (
            <div key={m.uuid} className="ui-card flex gap-3 p-4 transition hover:border-blue/30 hover:shadow-md">
              {m.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-border" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-navy">{m.title}</p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <StatusPill published={m.publishStatus} />
                    <EditButton onClick={() => setEditing(m)} />
                    <DeleteButton onClick={() => handleDelete(m.uuid, m.title)} loading={deletingId === m.uuid} />
                  </div>
                </div>
                {m.description && (
                  <p className="mt-1 text-xs leading-relaxed text-navy/60">{m.description}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-navy/50">
                  <span>publish {fmt(m.publishDate)}</span>
                  {m.fileUpload && <span className="text-blue">has file</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
