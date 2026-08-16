"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/use-admin-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    // No backend yet — accept any non-empty credentials as a placeholder.
    // Replace this with a real authentication call later.
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    signIn();
    router.replace("/admin");
  }

  const field =
    "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-navy/40 focus:border-blue focus:ring-2 focus:ring-blue/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-12 text-white">
      {/* dotted texture + glow, matching the site hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-saffron/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/SSAHC-LOGO.png"
            alt="Sikkim State Allied & Healthcare Council"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full bg-white p-1.5"
            priority
          />
          <h1 className="mt-4 font-serif text-xl font-semibold">
            SSAHC Admin Panel
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Sign in to manage council content
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white p-6 text-navy shadow-2xl shadow-black/30 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="admin@ssahc.org.in"
                className={field}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-navy/70">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className={`${field} pr-11`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-navy/40 transition hover:text-navy"
                >
                  {showPw ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.53 13.53 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-navy/60">
                <input type="checkbox" name="remember" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="font-medium text-blue hover:underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authorised personnel only · Sikkim State Allied &amp; Healthcare Council
        </p>
      </div>
    </div>
  );
}
