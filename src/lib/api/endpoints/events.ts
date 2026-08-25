import { apiClient } from "../client";
import type { CreateEvent, EventResponse } from "../types";

/* ------------------------------- Events API ------------------------------- */
/*  Maps to EventController (@RequestMapping("/api/event")).                   */

/** POST /api/event — create an event announcement. */
export function createEvent(payload: CreateEvent): Promise<EventResponse> {
  return apiClient<EventResponse>("/api/event", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/event — list all events (newest event date first). */
export function listEvents(): Promise<EventResponse[]> {
  return apiClient<EventResponse[]>("/api/event");
}

/** GET /api/event/{uuid} — fetch a single event. */
export function getEvent(uuid: string): Promise<EventResponse> {
  return apiClient<EventResponse>(`/api/event/${uuid}`);
}

/** PUT /api/event/{uuid} — replace an event. */
export function updateEvent(
  uuid: string,
  payload: CreateEvent
): Promise<EventResponse> {
  return apiClient<EventResponse>(`/api/event/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/event/{uuid} — remove an event. */
export function deleteEvent(uuid: string): Promise<void> {
  return apiClient<void>(`/api/event/${uuid}`, { method: "DELETE" });
}
