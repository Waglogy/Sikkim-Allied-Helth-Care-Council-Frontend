"use client";

import { useState } from "react";
import CreateNotificationForm from "@/components/admin/create-notification-form";
import { useNotifications, useDeleteNotification } from "@/hooks/use-admin-api";
import type { NotificationResponse } from "@/lib/api";
import {
  Panel,
  EmptyOrList,
  EditButton,
  DeleteButton,
  fmt,
} from "@/components/admin/panel-ui";

export default function NotificationPanel() {
  const query = useNotifications();
  const del = useDeleteNotification();
  const items = query.data ?? [];
  const [editing, setEditing] = useState<NotificationResponse | null>(null);
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
      heading={editing ? "Edit notification" : "Add notification"}
      intro="Public notifications — a title with an optional PDF. Add, edit or remove them here."
      form={
        <CreateNotificationForm
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
          {items.map((n) => (
            <div key={n.uuid} className="ui-card flex items-center gap-3 p-4 transition hover:border-blue/30 hover:shadow-md">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-navy">{n.title}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[11px] text-navy/50">
                  <span>created {fmt(n.createdAt)}</span>
                  {n.document ? (
                    <a href={n.document} target="_blank" rel="noreferrer" className="font-medium text-blue hover:underline">
                      View PDF
                    </a>
                  ) : (
                    <span className="text-navy/40">No document</span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <EditButton onClick={() => setEditing(n)} />
                <DeleteButton onClick={() => handleDelete(n.uuid, n.title)} loading={deletingId === n.uuid} />
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
