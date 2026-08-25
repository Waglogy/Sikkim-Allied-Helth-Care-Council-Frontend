"use client";

import { useRef, useState } from "react";
import { uploadFile, ApiError } from "@/lib/api";
import { fileUrl } from "@/lib/public-api";

/* -------------------------------------------------------------------------- */
/*  UploadField — picks file(s), uploads them to the backend (→ R2) and keeps  */
/*  the returned public URLs in `value`. Works for a single file or a list.    */
/* -------------------------------------------------------------------------- */

const IMAGE_RE = /\.(png|jpe?g|webp|gif)(\?.*)?$/i;

function fileNameOf(url: string): string {
  try {
    return decodeURIComponent(url.split("/").pop()?.split("?")[0] || url);
  } catch {
    return url;
  }
}

export default function UploadField({
  value,
  onChange,
  multiple = false,
  accept = "image/png,image/jpeg,image/webp,image/gif,application/pdf",
  hint,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  accept?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const picked = multiple ? Array.from(files) : [files[0]];
      const results = await Promise.all(picked.map((f) => uploadFile(f)));
      const urls = results.map((r) => r.url);
      onChange(multiple ? [...value, ...urls] : [urls[0]]);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const canAdd = multiple || value.length === 0;

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((url) => (
            <li key={url} className="flex items-center gap-3 rounded-lg border border-border bg-white p-2">
              {IMAGE_RE.test(url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fileUrl(url)} alt="" className="h-10 w-10 shrink-0 rounded object-cover ring-1 ring-border" />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-navy/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </span>
              )}
              <a
                href={fileUrl(url)}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 truncate text-xs text-navy/70 hover:text-blue hover:underline"
              >
                {fileNameOf(url)}
              </a>
              <button
                type="button"
                onClick={() => onChange(value.filter((u) => u !== url))}
                className="shrink-0 rounded-md p-1.5 text-navy/40 transition hover:bg-red-50 hover:text-red-600"
                aria-label="Remove"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm font-medium text-navy/60 transition hover:border-blue/40 hover:bg-blue-50/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <svg className="h-4 w-4 animate-spin text-blue" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
          )}
          {busy ? "Uploading…" : multiple ? "Upload files" : "Upload file"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {hint && <p className="text-[11px] text-navy/40">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
