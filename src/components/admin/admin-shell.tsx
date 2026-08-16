"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthed, signOut } from "@/lib/use-admin-store";

const nav = [
  { label: "Dashboard", href: "/admin", icon: "grid" },
  { label: "Notifications", href: "/admin/notifications", icon: "bell" },
  { label: "Events", href: "/admin/events", icon: "calendar" },
  { label: "Gallery", href: "/admin/gallery", icon: "image" },
  { label: "Messages from Dignitaries", href: "/admin/messages", icon: "quote" },
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
    case "image":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M7.2 6C4.9 7.4 3.5 9.7 3.5 12.6c0 .3 0 .6.1.9.5-.3 1.1-.5 1.8-.5 1.7 0 3 1.3 3 3s-1.3 3.1-3.1 3.1C3.2 19.1 2 17 2 14.3 2 10 4.4 6.7 8 5l-.8 1z" />
        </svg>
      );
  }
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authed = useAuthed();

  // Light client-side guard — redirect to login when the session flag is absent.
  useEffect(() => {
    if (!authed) router.replace("/admin/login");
  }, [authed, router]);

  function logout() {
    signOut();
    router.replace("/admin/login");
  }

  const active = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const current = nav.find((n) => active(n.href))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-muted">
      {/* Small-screen gate — the dashboard is desktop-only */}
      <div className="flex min-h-screen items-center justify-center px-6 lg:hidden">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <h1 className="mt-5 font-serif text-xl font-semibold text-navy">
            Desktop only
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-navy/60">
            The admin dashboard is optimised for laptops and desktop computers.
            Please open this page on a larger screen to manage content.
          </p>
          <button
            onClick={logout}
            className="mt-6 text-sm font-medium text-blue hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>

      {/* Desktop shell */}
      {authed && (
        <div className="hidden lg:flex">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-navy text-white">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Image
                src="/SSAHC-LOGO.png"
                alt="SSAHC"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-white p-1"
              />
              <div className="leading-tight">
                <p className="font-serif text-sm font-semibold">SSAHC Admin</p>
                <p className="text-[11px] text-white/50">Content Management</p>
              </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active(item.href)
                      ? "bg-blue text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <NavIcon name={item.icon} />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/10 p-3">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Sign out
              </button>
            </div>
          </aside>

          {/* Main column */}
          <div className="flex min-h-screen flex-1 flex-col pl-64">
            {/* Topbar */}
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-white px-8 py-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-saffron">
                  Admin Panel
                </p>
                <h1 className="font-serif text-lg font-semibold text-navy">
                  {current}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="rounded-md border border-border px-3.5 py-2 text-sm font-medium text-navy/70 transition hover:bg-muted"
                >
                  View site
                </Link>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  A
                </div>
              </div>
            </header>

            <main className="flex-1 px-8 py-8">{children}</main>
          </div>
        </div>
      )}
    </div>
  );
}
