import { apiClient } from "../client";

/* ------------------------------- Upload API ------------------------------- */
/*  Maps to UploadController (@RequestMapping("/api/upload")).                 */

/** Result of a successful upload — `url` is the public address to store. */
export type UploadResult = {
  url: string;
  fileName: string;
  contentType: string;
  size: number;
};

/** POST /api/upload — send one file (multipart) and get back its public URL. */
export function uploadFile(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  return apiClient<UploadResult>("/api/upload", {
    method: "POST",
    body: form,
  });
}
