import { apiClient } from "../client";
import type { CreateNotification, NotificationResponse } from "../types";

/* ---------------------------- Notifications API --------------------------- */
/*  Maps to NotificationController (@RequestMapping("/api/notification")).     */

/** POST /api/notification — create a notification (title + PDF document). */
export function createNotification(
  payload: CreateNotification
): Promise<NotificationResponse> {
  return apiClient<NotificationResponse>("/api/notification", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/notification — list all notifications (newest first). */
export function listNotifications(): Promise<NotificationResponse[]> {
  return apiClient<NotificationResponse[]>("/api/notification");
}

/** GET /api/notification/{uuid} — fetch a single notification. */
export function getNotification(uuid: string): Promise<NotificationResponse> {
  return apiClient<NotificationResponse>(`/api/notification/${uuid}`);
}

/** PUT /api/notification/{uuid} — replace a notification. */
export function updateNotification(
  uuid: string,
  payload: CreateNotification
): Promise<NotificationResponse> {
  return apiClient<NotificationResponse>(`/api/notification/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/notification/{uuid} — remove a notification. */
export function deleteNotification(uuid: string): Promise<void> {
  return apiClient<void>(`/api/notification/${uuid}`, { method: "DELETE" });
}
