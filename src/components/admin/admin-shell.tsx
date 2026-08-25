"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthed, useAdmin, signOut } from "@/lib/use-admin-store";
import { getToken } from "@/lib/api";

const nav = [
  { label: "Dashboard", href: "/admin", icon: "grid", desc: "Overview" },
  { label: "Members", href: "/admin/members", icon: "users", desc: "Council members" },
  { label: "Categories", href: "/admin/categories", icon: "layers", desc: "Member groups" },
  { label: "Events", href: "/admin/events", icon: "calendar", desc: "Announcements" },
  { label: "Messages", href: "/admin/messages", icon: "bell", desc: "Notices & circulars" },
  { label: "Publications", href: "/admin/publications", icon: "book", desc: "Journals & papers" },
  { label: "Notifications", href: "/admin/notifications", icon: "file", desc: "Title + PDF" },
  { label: "Contact", href: "/admin/contact", icon: "mail", desc: "Contact messages" },
  { label: "Grievances", href: "/admin/grievances", icon: "inbox", desc: "Public grievances" },
];

function NavIcon({ name }: { name: string }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "book":
      return (
        <svg {...p}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "file":
      return (
        <svg {...p}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case "layers":
      return (
        <svg {...p}>
          <path d="m12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...p}>
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authed = useAuthed();
  const admin = useAdmin();
  const [open, setOpen] = useState(false);
  const avatarInitial = (admin?.name || admin?.email || "A").charAt(0).toUpperCase();

  // Light client-side guard. We check the persisted token (localStorage) rather
  // than `authed`, because `authed` is briefly false on the first client render
  // after a refresh (before the store hydrates) — using it here would wrongly
  // bounce a logged-in admin to /admin/login on every reload.
  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [authed, router]);

  function logout() {
    signOut();
    router.replace("/admin/login");
  }

  const active = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const currentItem = nav.find((n) => active(n.href)) ?? nav[0];

  if (!authed) return null;

  const sidebar = (
    <div className="admin-scroll flex h-full flex-col overflow-y-auto bg-gradient-to-b from-navy to-navy-800 text-white">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <Image
          src="/SSAHC-LOGO.png"
          alt="SSAHC"
          width={44}
          height={44}
          className="h-11 w-11 rounded-xl bg-white p-1 shadow-md"
        />
        <div className="leading-tight">
          <p className="font-serif text-sm font-semibold">SSAHC Admin</p>
          <p className="text-[11px] text-white/50">Content Management</p>
        </div>
      </div>

      <p className="px-6 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
        Manage
      </p>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const isActive = active(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-white/12 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-saffron" />
              )}
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                  isActive ? "bg-white/15 text-white" : "text-white/60 group-hover:text-white"
                }`}
              >
                <NavIcon name={item.icon} />
              </span>
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="m-3 rounded-xl bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue to-saffron text-sm font-semibold text-white">
            {avatarInitial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{admin?.name ?? "Admin"}</p>
            <p className="truncate text-[11px] text-white/45">{admin?.role ?? ""}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="shrink-0 rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer + overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transition-transform lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-white/80 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-lg border border-border p-2 text-navy/70 transition hover:bg-muted lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-saffron">
                {currentItem.desc}
              </p>
              <h1 className="truncate font-serif text-lg font-semibold text-navy">
                {currentItem.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-navy/70 transition hover:bg-muted sm:inline-flex"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
              View site
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-sm font-semibold text-white shadow-sm">
              {avatarInitial}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
