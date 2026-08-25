import { apiClient } from "../client";
import type { CreateGrievance, GrievanceResponse } from "../types";

/* ----------------------------- Grievances API ----------------------------- */
/*  Maps to GrievanceController (@RequestMapping("/api/grievance")).          */

/** POST /api/grievance — public: submit a grievance. */
export function submitGrievance(
  payload: CreateGrievance
): Promise<GrievanceResponse> {
  return apiClient<GrievanceResponse>("/api/grievance", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/grievance — admin: list all grievances (newest first). */
export function listGrievances(): Promise<GrievanceResponse[]> {
  return apiClient<GrievanceResponse[]>("/api/grievance");
}

/** PATCH /api/grievance/{uuid} — admin: mark resolved / unresolved. */
export function setGrievanceResolved(
  uuid: string,
  resolved: boolean
): Promise<GrievanceResponse> {
  return apiClient<GrievanceResponse>(`/api/grievance/${uuid}`, {
    method: "PATCH",
    body: { resolved },
  });
}

/** DELETE /api/grievance/{uuid} — admin: remove a grievance. */
export function deleteGrievance(uuid: string): Promise<void> {
  return apiClient<void>(`/api/grievance/${uuid}`, { method: "DELETE" });
}
