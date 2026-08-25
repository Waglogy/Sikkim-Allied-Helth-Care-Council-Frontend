import { apiClient } from "../client";
import type { CreateMessage, MessageResponse } from "../types";

/* ------------------------------ Messages API ------------------------------ */
/*  Maps to MessageController (@RequestMapping("/api/message")).               */

/** POST /api/message — create a message announcement. */
export function createMessage(payload: CreateMessage): Promise<MessageResponse> {
  return apiClient<MessageResponse>("/api/message", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/message — list all messages (newest first). */
export function listMessages(): Promise<MessageResponse[]> {
  return apiClient<MessageResponse[]>("/api/message");
}

/** GET /api/message/{uuid} — fetch a single message. */
export function getMessage(uuid: string): Promise<MessageResponse> {
  return apiClient<MessageResponse>(`/api/message/${uuid}`);
}

/** PUT /api/message/{uuid} — replace a message. */
export function updateMessage(
  uuid: string,
  payload: CreateMessage
): Promise<MessageResponse> {
  return apiClient<MessageResponse>(`/api/message/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/message/{uuid} — remove a message. */
export function deleteMessage(uuid: string): Promise<void> {
  return apiClient<void>(`/api/message/${uuid}`, { method: "DELETE" });
}
