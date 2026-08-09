"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  eyebrow?: string;
  title: string;
  desc: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional background photo (place in /public). Falls back to brand gradient. */
  image?: string;
  /** Optional portrait shown in the right column instead of the emblem. */
  portrait?: { src: string; name: string; role: string };
};

const slides: Slide[] = [
  {
    title: "Sikkim State Allied & Healthcare Council",
    desc: "Regulating, registering and advancing allied and healthcare professions across the State — ensuring quality education, ethical practice and public trust.",
    primary: { label: "View Notifications", href: "/#notifications" },
    secondary: { label: "About the Council", href: "/#about" },
    image: "/coverimage.webp",
  },
  {
    eyebrow: "Message from the Chief Minister",
    title: "“Building a healthier, self-reliant Sikkim.”",
    desc: "Our Government is committed to strengthening allied and healthcare services across the State. Through the Council, we aim to uphold the highest standards of professional education, ethics and public care — for the well-being of every citizen of Sikkim.",
    primary: { label: "Read Full Message", href: "/#about" },
    secondary: { label: "About the Council", href: "/#about" },
    portrait: {
      src: "/hcm.svg",
      name: "Shri Prem Singh Tamang (Golay)",
      role: "Hon’ble Chief Minister of Sikkim",
    },
  },
  {
    eyebrow: "Regulation · Standards · Professional Practice",
    title: "Upholding Standards in Allied & Healthcare",
    desc: "The Council works to maintain standards in education, training and professional practice while promoting ethical conduct and quality healthcare services across Sikkim.",
    primary: { label: "Council Functions", href: "/#functions" },
    secondary: { label: "Recognised Professions", href: "/#professions" },
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
                sizes="100vw"
                quality={70}
                priority={i === 0}
                className="object-cover opacity-25"
              />
            )}
            <div className="relative mx-auto grid min-h-[70vh] max-w-7xl items-center gap-8 px-4 py-20 sm:gap-10 sm:px-6 sm:py-28 md:grid-cols-2 md:py-36">
              <div>
                {slide.eyebrow && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                    {slide.eyebrow}
                  </span>
                )}
                <h1 className="mt-5 font-serif text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base">
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

              {slide.portrait ? (
                <div className="relative flex flex-col items-center md:block md:h-full">
                  <div className="flex flex-col items-center gap-3 md:absolute md:bottom-0 md:right-0 md:items-end">
                    <div className="relative">
                      <Image
                        src={slide.portrait.src}
                        alt={slide.portrait.name}
                        width={480}
                        height={620}
                        sizes="(max-width: 768px) 288px, 480px"
                        className="h-auto w-64 object-contain object-bottom drop-shadow-2xl sm:w-80 md:w-[28.5rem]"
                      />
                      {/* soft fade so the image doesn't cut off sharply at the bottom */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
                    </div>
                    <div className="text-center md:text-right">
                      <p className="font-serif text-lg font-semibold text-white">
                        {slide.portrait.name}
                      </p>
                      <p className="text-sm text-white/70">{slide.portrait.role}</p>
                    </div>
                  </div>
                </div>
              ) : (
                i !== 0 && (
                  <div className="flex justify-center md:justify-end">
                    <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15 sm:h-80 sm:w-80">
                      <div className="absolute inset-4 rounded-full bg-white/5 ring-1 ring-white/10" />
                      <Image
                        src="/SSAHC-LOGO.png"
                        alt="Sikkim State Allied & Healthcare Council emblem"
                        width={240}
                        height={240}
                        className="relative h-40 w-40 rounded-full bg-white p-3 sm:h-60 sm:w-60"
                      />
                    </div>
                  </div>
                )
              )}
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
