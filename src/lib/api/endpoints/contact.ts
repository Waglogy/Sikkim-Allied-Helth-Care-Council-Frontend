import { apiClient } from "../client";
import type { CreateContact, ContactResponse } from "../types";

/* ------------------------------- Contact API ------------------------------ */
/*  Maps to ContactController (@RequestMapping("/api/contact")).              */

/** POST /api/contact — public: submit a contact message. */
export function submitContact(payload: CreateContact): Promise<ContactResponse> {
  return apiClient<ContactResponse>("/api/contact", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/contact — admin: list all contact messages (newest first). */
export function listContacts(): Promise<ContactResponse[]> {
  return apiClient<ContactResponse[]>("/api/contact");
}

/** PATCH /api/contact/{uuid} — admin: mark resolved / unresolved. */
export function setContactResolved(
  uuid: string,
  resolved: boolean
): Promise<ContactResponse> {
  return apiClient<ContactResponse>(`/api/contact/${uuid}`, {
    method: "PATCH",
    body: { resolved },
  });
}

/** DELETE /api/contact/{uuid} — admin: remove a contact message. */
export function deleteContact(uuid: string): Promise<void> {
  return apiClient<void>(`/api/contact/${uuid}`, { method: "DELETE" });
}
