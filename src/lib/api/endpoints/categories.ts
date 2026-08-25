import { apiClient } from "../client";
import type { CreateCategory, CategoryResponse } from "../types";

/* ------------------------------ Categories API ---------------------------- */
/*  Maps to CategoryController (@RequestMapping("/api/category")).             */

/** POST /api/category — create a member category. */
export function createCategory(
  payload: CreateCategory
): Promise<CategoryResponse> {
  return apiClient<CategoryResponse>("/api/category", {
    method: "POST",
    body: payload,
  });
}

/** GET /api/category — list all categories, each with its members. */
export function listCategories(): Promise<CategoryResponse[]> {
  return apiClient<CategoryResponse[]>("/api/category");
}

/** GET /api/category/{uuid} — fetch one category with its members. */
export function getCategory(uuid: string): Promise<CategoryResponse> {
  return apiClient<CategoryResponse>(`/api/category/${uuid}`);
}

/** PUT /api/category/{uuid} — update a category. */
export function updateCategory(
  uuid: string,
  payload: CreateCategory
): Promise<CategoryResponse> {
  return apiClient<CategoryResponse>(`/api/category/${uuid}`, {
    method: "PUT",
    body: payload,
  });
}

/** DELETE /api/category/{uuid} — remove a category (its members are kept). */
export function deleteCategory(uuid: string): Promise<void> {
  return apiClient<void>(`/api/category/${uuid}`, { method: "DELETE" });
}
