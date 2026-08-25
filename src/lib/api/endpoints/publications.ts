import { apiClient } from "../client";
import type { CreatePublication, PublicationResponse } from "../types";

/* ---------------------------- Publications API ---------------------------- */
/*  Maps to PublicationController (@RequestMapping("/api/publication")).       */

/** POST /api/publication — create a publication announcement. */
export function createPublication(
  payload: CreatePublication
): Promise<PublicationResponse> {
  return apiClient<PublicationResponse>("/api/publication", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/publication — list all publications (newest first). */
export function listPublications(): Promise<PublicationResponse[]> {
  return apiClient<PublicationResponse[]>("/api/publication");
}

/** GET /api/publication/{uuid} — fetch a single publication. */
export function getPublication(uuid: string): Promise<PublicationResponse> {
  return apiClient<PublicationResponse>(`/api/publication/${uuid}`);
}

/** PUT /api/publication/{uuid} — replace a publication. */
export function updatePublication(
  uuid: string,
  payload: CreatePublication
): Promise<PublicationResponse> {
  return apiClient<PublicationResponse>(`/api/publication/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/publication/{uuid} — remove a publication. */
export function deletePublication(uuid: string): Promise<void> {
  return apiClient<void>(`/api/publication/${uuid}`, { method: "DELETE" });
}
