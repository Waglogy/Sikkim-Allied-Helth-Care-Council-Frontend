"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  eyebrow: string;
  title: string;
  desc: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional background photo (place in /public). Falls back to brand gradient. */
  image?: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Official Website · Autonomous Statutory Body",
    title: "Sikkim State Allied & Healthcare Council",
    desc: "Regulating, registering and advancing allied and healthcare professions across the State — ensuring quality education, ethical practice and public trust.",
    primary: { label: "View Notifications", href: "/#notifications" },
    secondary: { label: "About the Council", href: "/#about" },
  },
  {
    eyebrow: "Registration",
    title: "Online Registration Portal is Now Open",
    desc: "Allied and healthcare professionals can now register and renew their credentials online for the 2026–27 cycle.",
    primary: { label: "Register Now", href: "/#notifications" },
    secondary: { label: "View Guidelines", href: "/#notifications" },
  },
  {
    eyebrow: "Recognition",
    title: "Setting Standards for Healthcare Education",
    desc: "Recognising institutions and qualifications to uphold the highest standards of allied healthcare education in Sikkim.",
    primary: { label: "Explore Departments", href: "/#departments" },
    secondary: { label: "Upcoming Events", href: "/#events" },
  },
];

const AUTO_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Steady auto-advance — the timer is not tied to `index`, so it never resets
  // mid-cycle; it simply pauses on hover/focus.
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTO_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  return (
    <section
      className="relative overflow-hidden bg-navy text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* dotted texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 z-10 h-96 w-96 rounded-full bg-blue/20 blur-3xl" />

      {/* sliding track */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative w-full shrink-0">
            {slide.image && (
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                className="object-cover opacity-25"
              />
            )}
            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {slide.eyebrow}
                </span>
                <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                  {slide.desc}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
                  >
                    {slide.primary.label}
                  </Link>
                  {slide.secondary && (
                    <Link
                      href={slide.secondary.href}
                      className="rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {slide.secondary.label}
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15 sm:h-80 sm:w-80">
                  <div className="absolute inset-4 rounded-full bg-white/5 ring-1 ring-white/10" />
                  <Image
                    src="/SSAHC-LOGO.png"
                    alt="Sikkim State Allied & Healthcare Council emblem"
                    width={240}
                    height={240}
                    className="relative h-48 w-48 rounded-full bg-white p-3 sm:h-60 sm:w-60"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-white transition hover:bg-white/15 md:inline-flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-white transition hover:bg-white/15 md:inline-flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-blue-600" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
