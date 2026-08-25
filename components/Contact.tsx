"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EMAIL = "khalkaraditya8@gmail.com";

/* The brief does the talking. Prefilling the questions means an enquiry
   arrives qualified instead of arriving as "hi, are you available?" */
const SUBJECT = "Project enquiry";
const BODY = [
  "Hi Aditya,",
  "",
  "What we're building:",
  "Where we're stuck:",
  "Timeline:",
  "Budget range:",
  "",
  "",
].join("\n");

export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  SUBJECT
)}&body=${encodeURIComponent(BODY)}`;

/* Published up front on purpose. Someone who likes the work but has no idea
   whether it costs $500 or $15,000 does not send the email. */
const PACKAGES = [
  { name: "Landing page", price: "$2,500", note: "Designed and built" },
  { name: "Site + design system", price: "$5,000", note: "Four pages, extendable" },
  { name: "UI audit and fixes", price: "$1,800", note: "On your existing product" },
  { name: "Agent workflow setup", price: "$3,000", note: "Claude Code for your team" },
];

const ELSEWHERE = [
  { label: "X", href: "https://x.com/adityakhalkar_", handle: "@adityakhalkar_" },
  { label: "GitHub", href: "https://github.com/adityakhalkar", handle: "adityakhalkar" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-khalkar-dsai",
    handle: "aditya-khalkar-dsai",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    const body = bodyRef.current;
    if (!heading || !body) return;

    gsap.set(heading, { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(body, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
    });
    tl.to(heading, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" });
    tl.to(body, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.25);

    /* This is the section that earns the money, so it must never stay hidden
       because a scroll trigger failed to fire. If the reveal has not run a few
       seconds in, drop the animation and show the content. */
    const failsafe = setTimeout(() => {
      if (tl.progress() === 0) {
        tl.kill();
        gsap.set(heading, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(body, { opacity: 1, y: 0 });
      }
    }, 4000);

    return () => {
      clearTimeout(failsafe);
      tl.scrollTrigger?.kill();
      tl.kill();
      [heading, body].forEach((el) => el && gsap.set(el, { clearProps: "all" }));
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked -- the mailto link still works */
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-white dark:bg-void py-16 md:py-24 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          Hire Me
        </h2>
        <div className="mt-4 w-16 h-px bg-gray-300 dark:bg-gray-700" />

        <div ref={bodyRef} className="mt-10 grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div className="space-y-6 max-w-xl">
            {/* Availability state, not decoration */}
            <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] uppercase text-black dark:text-white">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance work
            </p>

            <p className="text-lg md:text-2xl leading-relaxed font-light text-black dark:text-concrete">
              I design and build, so you hire one person instead of two. Landing
              pages, product UI, and the motion work that makes both feel
              expensive.
            </p>

            <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              I take one or two projects a month alongside Deep-ML. Fixed scope,
              fixed price, agreed before I start. Send a rough brief and you will
              get a straight answer on whether I am the right person, including
              when I am not.
            </p>

            <ul className="pt-2 space-y-px">
              {PACKAGES.map((pkg) => (
                <li
                  key={pkg.name}
                  className="flex items-baseline justify-between gap-4 border-t border-gray-200
                    dark:border-gray-800 py-2.5 font-mono text-sm"
                >
                  <span className="text-black dark:text-white">
                    {pkg.name}
                    <span className="block text-[11px] text-gray-500 dark:text-gray-500">
                      {pkg.note}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-black dark:text-white">
                    {pkg.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <a
                href={MAILTO}
                className="group inline-flex items-center gap-3 font-mono text-base md:text-lg text-black dark:text-white
                  border-b border-current pb-1 hover:pb-2 transition-all duration-200 break-all"
              >
                {EMAIL}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-45"
                  aria-hidden
                >
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="block font-mono text-[11px] tracking-[0.15em] uppercase text-gray-500 dark:text-gray-500
                  hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>

            <ul className="space-y-2">
              {ELSEWHERE.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="group inline-flex items-baseline gap-3 font-mono text-sm text-gray-600 dark:text-gray-400
                      hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="w-16 shrink-0 text-[11px] tracking-[0.15em] uppercase text-gray-400 dark:text-gray-600">
                      {l.label}
                    </span>
                    <span className="border-b border-transparent group-hover:border-current transition-colors duration-200">
                      {l.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
