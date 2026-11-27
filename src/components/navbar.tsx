"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** One scrolling item in the "Latest" marquee. */
type TickerItem = { text: string; href: string };

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Notifications", href: "/notifications" },
  { label: "Publications", href: "/publications" },
  { label: "Events", href: "/events" },
  { label: "Council Members", href: "/council-members" },
  { label: "Contact", href: "/contact" },
];

// Shown under the hamburger "more" menu on desktop.
const moreLinks = [
  { label: "Recognised Categories", href: "/recognised-categories" },
  { label: "Registration", href: "/registration" },
  { label: "Public Grievance", href: "/grievances" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [ticker, setTicker] = useState<TickerItem[]>([]);
  const [notifCount, setNotifCount] = useState(0);
  const [pubCount, setPubCount] = useState(0);

  // Load the live notifications + events for the marquee and nav badge from our
  // own /api/ticker route (a server-side fetch — reliable, no CORS/localhost).
  useEffect(() => {
    let active = true;
    fetch("/api/ticker")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data) return;
        if (Array.isArray(data.items)) setTicker(data.items);
        if (typeof data.notificationCount === "number") {
          setNotifCount(data.notificationCount);
        }
        if (typeof data.publicationCount === "number") {
          setPubCount(data.publicationCount);
        }
      })
      .catch(() => {
        // Backend unavailable — leave the ticker empty rather than show nothing stale.
      });
    return () => {
      active = false;
    };
  }, []);

  // Count shown as a red badge next to a nav link (0 = no badge).
  const badgeCount = (href: string) =>
    href === "/notifications" ? notifCount : href === "/publications" ? pubCount : 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* NCAHP strip — always visible (incl. mobile) */}
      <div className="bg-navy text-white/80 md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-1.5 text-[11px]">
          <a
            href="https://ncahp.abdm.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-white"
          >
            National Commission (NCAHP)
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>

      {/* Top utility bar */}
      <div className="hidden bg-navy text-white/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <p>An Autonomous Statutory Body · Established 2022</p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:info@ssahc.org.in"
              className="transition hover:text-white"
            >
              info@ssahc.org.in
            </a>
            <span className="h-3 w-px bg-white/25" />
            <Link href="/grievances" className="transition hover:text-white">
              Public Grievance
            </Link>
            <span className="h-3 w-px bg-white/25" />
            <a
              href="https://ncahp.abdm.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-white"
            >
              National Commission (NCAHP)
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
            <span className="h-3 w-px bg-white/25" />
            <a
              href="https://www.facebook.com/people/Sikkim-State-Allied-Healthcare-Council/61576526097867/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="transition hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="relative z-50 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/SSAHC-LOGO.png"
              alt="Sikkim State Allied & Healthcare Council logo"
              width={56}
              height={56}
              className="h-12 w-12 md:h-14 md:w-14"
              priority
            />
            <div className="leading-tight">
              <p className="font-serif text-sm font-semibold text-navy sm:text-base md:text-lg">
                Sikkim State Allied &amp; Healthcare Council
              </p>
              <p className="text-[11px] tracking-wide text-blue md:text-xs">
                Autonomous Statutory Body
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-blue-50 hover:text-blue"
              >
                {link.label}
                {badgeCount(link.href) > 0 && (
                  <span className="absolute right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
                    {badgeCount(link.href) > 9 ? "9+" : badgeCount(link.href)}
                  </span>
                )}
              </Link>
            ))}

            <Link
              href="/registration"
              className="ml-1 rounded-md bg-blue px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Register
            </Link>

            {/* More menu */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-label="More menu"
                aria-expanded={moreOpen}
                className="inline-flex items-center justify-center rounded-md p-2 text-navy/80 transition hover:bg-blue-50 hover:text-blue"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
              {moreOpen && (
                <>
                  <button
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setMoreOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div className="absolute right-0 z-50 mt-2 w-60 rounded-lg border border-border bg-white p-1 shadow-lg">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-blue-50 hover:text-blue"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-md p-2 text-navy lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-border bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-navy/80 transition hover:bg-blue-50 hover:text-blue"
                >
                  <span>{link.label}</span>
                  {badgeCount(link.href) > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold leading-none text-white">
                      {badgeCount(link.href) > 9 ? "9+" : badgeCount(link.href)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Notice ticker — only rendered when there are live items to show. */}
      {ticker.length > 0 && (
        <div className="border-b border-border bg-blue-50">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 md:px-6">
            <span className="shrink-0 rounded-sm bg-saffron px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Latest
            </span>
            <div className="marquee-track overflow-hidden py-2">
              <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-xs text-navy/80">
                {ticker.map((t, i) => (
                  <Link
                    key={`a-${i}`}
                    href={t.href}
                    className="transition hover:text-blue"
                  >
                    {t.text}
                  </Link>
                ))}
                {/* duplicate for seamless loop */}
                {ticker.map((t, i) => (
                  <Link
                    key={`b-${i}`}
                    href={t.href}
                    aria-hidden
                    tabIndex={-1}
                    className="transition hover:text-blue"
                  >
                    {t.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
