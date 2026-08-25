"use client";

import { useSubmitGrievance } from "@/hooks/use-admin-api";

const categories = [
  "Registration & Licensing",
  "Certificate / Credential Verification",
  "Examination & Assessment",
  "Course / Institution Recognition",
  "Professional Conduct & Ethics",
  "Other",
];

export default function GrievanceForm() {
  const { mutate, data, error, fieldErrors, loading, reset } = useSubmitGrievance();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const created = await mutate({
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || undefined,
      registrationNumber: String(fd.get("registration") || "").trim() || undefined,
      category: String(fd.get("category") || "").trim(),
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Phone <span className="text-navy/40">(optional)</span>
          </label>
          <input type="tel" name="phone" placeholder="+91 90000 00000" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Registration No. <span className="text-navy/40">(if any)</span>
          </label>
          <input name="registration" placeholder="SSAHC/…" className={field} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">Nature of Grievance</label>
        <select required name="category" defaultValue="" className={field}>
          <option value="" disabled>
            Select a category…
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {fieldErrors.category && <p className="mt-1 text-xs text-red-600">{fieldErrors.category}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">Subject</label>
        <input required name="subject" placeholder="Brief subject of your grievance" className={field} />
        {fieldErrors.subject && <p className="mt-1 text-xs text-red-600">{fieldErrors.subject}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">Grievance Details</label>
        <textarea required name="message" rows={5} placeholder="Describe your grievance in detail…" className={field} />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {data ? (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thank you — your grievance has been recorded. The Council will review
          your submission and respond to you shortly.
          <button type="button" onClick={reset} className="ml-2 underline">
            Submit another
          </button>
        </p>
      ) : (
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Grievance"}
        </button>
      )}
    </form>
  );
}
