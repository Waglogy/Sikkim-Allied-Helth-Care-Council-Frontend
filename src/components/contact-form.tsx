"use client";

import { useState } from "react";

export default function ContactForm() {
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
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Subject
        </label>
        <input
          required
          name="subject"
          placeholder="How can we help?"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-navy/70">
          Message
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Write your message…"
          className={field}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        Send Message
      </button>

      {sent && (
        <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thank you — your message has been recorded. The Council will respond
          to your query shortly.
        </p>
      )}
    </form>
  );
}
