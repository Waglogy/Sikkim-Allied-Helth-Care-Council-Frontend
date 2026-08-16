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
    primary: { label: "Register as a Professional", href: "/registration" },
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
    secondary: { label: "Recognised Professions", href: "/recognised-categories" },
    image: "/nsg-C7UJ1Pu_S_I-unsplash.jpg",
  },
  {
    eyebrow: "Public Grievance Redressal",
    title: "Have a grievance? We're here to help.",
    desc: "Lodge a public grievance with the Council regarding registration, certificate verification, examinations or professional conduct. Every submission is reviewed and addressed.",
    primary: { label: "Lodge a Grievance", href: "/grievances" },
    secondary: { label: "Contact the Council", href: "/contact" },
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

  // On mobile each slide has very different content height (a wide group photo
  // vs. a tall portrait), so letting every slide stretch to the tallest one
  // leaves dead space. Instead, size the track to the *active* slide. Desktop
  // keeps its stretch behaviour (min-h + absolute portrait) untouched.
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [trackHeight, setTrackHeight] = useState<number>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = slideRefs.current[index];
    if (!el) return;
    const measure = () => setTrackHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, isMobile]);

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
        className="flex items-start transition-[height,transform] duration-700 ease-out sm:items-stretch"
        style={{
          transform: `translateX(-${index * 100}%)`,
          height: isMobile ? trackHeight : undefined,
        }}
      >
        {slides.map((slide, i) => {
          const eyebrowEl = slide.eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 sm:text-xs">
              {slide.eyebrow}
            </span>
          ) : null;
          const titleEl = (
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {slide.title}
            </h1>
          );
          const descEl = (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base md:mx-0">
              {slide.desc}
            </p>
          );
          const ctasEl = (
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:w-auto md:justify-start">
              <Link
                href={slide.primary.href}
                className="rounded-md bg-blue px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                {slide.primary.label}
              </Link>
              {slide.secondary && (
                <Link
                  href={slide.secondary.href}
                  className="rounded-md border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {slide.secondary.label}
                </Link>
              )}
            </div>
          );
          const portraitImageEl = slide.portrait ? (
            <div className="relative">
              <Image
                src={slide.portrait.src}
                alt={slide.portrait.name}
                width={480}
                height={620}
                sizes="(max-width: 768px) 288px, 480px"
                className="h-auto w-52 object-contain object-bottom drop-shadow-2xl sm:w-80 md:w-[28.5rem]"
              />
              {/* soft fade so the image doesn't cut off sharply at the bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
            </div>
          ) : null;
          const captionEl = slide.portrait ? (
            <div className="text-center md:text-right">
              <p className="font-serif text-lg font-semibold text-white">
                {slide.portrait.name}
              </p>
              <p className="text-sm text-white/70">{slide.portrait.role}</p>
            </div>
          ) : null;

          return (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="relative w-full shrink-0"
            >
              {slide.image && (
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={70}
                  priority={i === 0}
                  className="hidden object-cover object-[center_38%] opacity-25 sm:block"
                />
              )}
              <div className="relative mx-auto grid min-h-[60vh] max-w-7xl content-center items-center gap-6 px-5 py-12 pb-20 sm:min-h-[70vh] sm:gap-10 sm:px-6 sm:py-28 md:grid-cols-2 md:py-36 md:pb-36">
                {slide.portrait ? (
                  <>
                    {/* Mobile: text → portrait → buttons → name, centered */}
                    <div className="flex flex-col items-center gap-6 text-center sm:hidden">
                      <div>
                        {eyebrowEl}
                        {titleEl}
                        {descEl}
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        {portraitImageEl}
                        {captionEl}
                      </div>
                      {ctasEl}
                    </div>

                    {/* Tablet & up: original two-column layout */}
                    <div className="hidden sm:contents">
                      <div className="text-center md:text-left">
                        {eyebrowEl}
                        {titleEl}
                        {descEl}
                        {ctasEl}
                      </div>
                      <div className="relative flex flex-col items-center md:block md:h-full">
                        <div className="flex flex-col items-center gap-3 md:absolute md:bottom-0 md:right-0 md:items-end">
                          {portraitImageEl}
                          {captionEl}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center md:text-left">
                      {eyebrowEl}
                      {titleEl}
                      {descEl}
                      {ctasEl}
                    </div>

                    {/* On mobile the background photo is hidden; show it inline below the buttons instead. */}
                    {slide.image && (
                      <div className="sm:hidden">
                        <Image
                          src={slide.image}
                          alt=""
                          width={800}
                          height={450}
                          sizes="100vw"
                          quality={70}
                          className="h-auto w-full rounded-xl object-contain shadow-2xl shadow-black/50 ring-1 ring-white/10"
                        />
                      </div>
                    )}

                    {i !== 0 && !slide.image && (
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
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
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
