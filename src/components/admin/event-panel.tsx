"use client";

import { useState } from "react";
import CreateEventForm from "@/components/admin/create-event-form";
import { useEvents, useDeleteEvent } from "@/hooks/use-admin-api";
import type { EventResponse } from "@/lib/api";
import { Panel, EmptyOrList, EditButton, DeleteButton, fmt } from "@/components/admin/panel-ui";

export default function EventPanel() {
  const query = useEvents();
  const del = useDeleteEvent();
  const items = query.data ?? [];
  const [editing, setEditing] = useState<EventResponse | null>(null);
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
      heading={editing ? "Edit event" : "Add event"}
      intro="Event announcements. Add, edit or remove them here."
      form={
        <CreateEventForm
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
          {items.map((e) => (
            <div key={e.uuid} className="ui-card p-4 transition hover:border-blue/30 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-navy">{e.name}</p>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="mr-1 text-xs font-medium text-blue">{fmt(e.eventDate)}</span>
                  <EditButton onClick={() => setEditing(e)} />
                  <DeleteButton onClick={() => handleDelete(e.uuid, e.name)} loading={deletingId === e.uuid} />
                </div>
              </div>
              {e.description && (
                <p className="mt-1 text-xs leading-relaxed text-navy/60">{e.description}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-navy/50">
                {e.images?.length ? <span>{e.images.length} image(s)</span> : null}
                {e.documents?.length ? <span>{e.documents.length} document(s)</span> : null}
                <span>created {fmt(e.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </EmptyOrList>
    </Panel>
  );
}
