"use client";

import Image from "next/image";
import Link from "next/link";
import { useAdminSignup } from "@/hooks/use-admin-api";
import type { AdminRole } from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  Admin registration form — DEVELOPMENT ONLY.                               */
/*                                                                            */
/*  This calls POST /api/auth/signup, which creates a privileged admin        */
/*  account. It must never ship to production. Protection is layered:         */
/*    1. The route (app/admin/register/page.tsx) returns 404 in production.    */
/*    2. This component also refuses to render outside development.            */
/* -------------------------------------------------------------------------- */

const ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "MODERATOR"];

export default function AdminRegisterForm() {
  // Defence in depth: never render this outside local development.
  if (process.env.NODE_ENV !== "development") return null;

  return <RegisterForm />;
}

function RegisterForm() {
  const { mutate, data, error, fieldErrors, loading, reset } = useAdminSignup();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Capture the form element before awaiting — after the await, React has
    // detached the event and `e.currentTarget` is null.
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const created = await mutate({
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      password: String(form.get("password") || ""),
      role: String(form.get("role") || "ADMIN") as AdminRole,
    });
    if (created) formEl.reset();
  }

  const field =
    "ui-input";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-12 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue/20 blur-3xl" />

      <div className="relative w-full max-w-md">
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
            Create Admin Account
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Register a new council administrator
          </p>
        </div>

        {/* Unmistakable dev-only warning. */}
        <div className="mb-5 rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-center text-xs text-saffron">
          ⚠ Development only — this page does not exist in production builds.
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 text-navy shadow-2xl shadow-black/30 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="ui-label">
                Full Name
              </label>
              <input required name="name" placeholder="Anita Sharma" className={field} />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className="ui-label">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="admin@ssahc.org.in"
                className={field}
                autoComplete="off"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="ui-label">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="At least 8 characters"
                minLength={8}
                className={field}
                autoComplete="new-password"
              />
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label className="ui-label">
                Role
              </label>
              <select name="role" defaultValue="ADMIN" className={field}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {fieldErrors.role && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.role}</p>
              )}
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            {data && (
              <p className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
                Created “{data.name}” ({data.role}) — {data.uuid}
                <button type="button" onClick={reset} className="ml-2 underline">
                  add another
                </button>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="ui-btn ui-btn-primary w-full"
            >
              {loading ? "Creating…" : "Create Admin"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          <Link href="/admin/login" className="hover:underline">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
