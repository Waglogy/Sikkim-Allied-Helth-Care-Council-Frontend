import { apiClient } from "../client";
import type { CreateMember, MemberResponse } from "../types";

/* ------------------------------ Members API ------------------------------- */
/*  Maps to MembersController (@RequestMapping("/api/member")).                */

/** POST /api/member — create a council member. */
export function createMember(payload: CreateMember): Promise<MemberResponse> {
  return apiClient<MemberResponse>("/api/member", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/member — list all members (ordered by priority, then name). */
export function listMembers(): Promise<MemberResponse[]> {
  return apiClient<MemberResponse[]>("/api/member");
}

/** GET /api/member/{uuid} — fetch a single member. */
export function getMember(uuid: string): Promise<MemberResponse> {
  return apiClient<MemberResponse>(`/api/member/${uuid}`);
}

/** PUT /api/member/{uuid} — replace a member. */
export function updateMember(
  uuid: string,
  payload: CreateMember
): Promise<MemberResponse> {
  return apiClient<MemberResponse>(`/api/member/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/member/{uuid} — remove a member. */
export function deleteMember(uuid: string): Promise<void> {
  return apiClient<void>(`/api/member/${uuid}`, { method: "DELETE" });
}
