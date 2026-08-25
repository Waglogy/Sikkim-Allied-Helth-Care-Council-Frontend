"use client";

import { useSubmitContact } from "@/hooks/use-admin-api";

export default function ContactForm() {
  const { mutate, data, error, fieldErrors, loading, reset } = useSubmitContact();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const created = await mutate({
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: String(fd.get("subject") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    });
    if (created) form.reset();
  }

  const field =
    "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">Full Name</label>
          <input required name="name" placeholder="Your name" className={field} />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">Email</label>
          <input required type="email" name="email" placeholder="you@example.com" className={field} />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">Subject</label>
        <input required name="subject" placeholder="How can we help?" className={field} />
        {fieldErrors.subject && <p className="mt-1 text-xs text-red-600">{fieldErrors.subject}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">Message</label>
        <textarea required name="message" rows={5} placeholder="Write your message…" className={field} />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {data ? (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thank you — your message has been recorded. The Council will respond to
          your query shortly.
          <button type="button" onClick={reset} className="ml-2 underline">
            Send another
          </button>
        </p>
      ) : (
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      )}
    </form>
  );
}
