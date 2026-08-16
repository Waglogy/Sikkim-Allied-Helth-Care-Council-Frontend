"use client";

import { useState } from "react";

const categories = [
  "Registration & Licensing",
  "Certificate / Credential Verification",
  "Examination & Assessment",
  "Course / Institution Recognition",
  "Professional Conduct & Ethics",
  "Other",
];

export default function GrievanceForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — wire this to an API route / email service later.
    setSent(true);
    e.currentTarget.reset();
  }

  const field =
    "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Full Name
          </label>
          <input required name="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Phone <span className="text-navy/40">(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 90000 00000"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy/70">
            Registration No. <span className="text-navy/40">(if any)</span>
          </label>
          <input
            name="registration"
            placeholder="SSAHC/…"
            className={field}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Nature of Grievance
        </label>
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
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Subject
        </label>
        <input
          required
          name="subject"
          placeholder="Brief subject of your grievance"
          className={field}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Grievance Details
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Describe your grievance in detail…"
          className={field}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        Submit Grievance
      </button>

      {sent && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thank you — your grievance has been recorded. The Council will review
          your submission and respond to you shortly.
        </p>
      )}
    </form>
  );
}
