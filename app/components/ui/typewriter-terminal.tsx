"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const LINES = [
  "> boot sequence initiated",
  "> loading motion engine..........",
  "> calibrating easing curves.......",
  "> mounting components.............",
  "> running diagnostics.............",
  "> all systems nominal",
  "> access granted — welcome.",
];

const HERO_WORDS = ["Execute.", "Deploy.", "Repeat."];

export function TypewriterTerminalDemo() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const enterRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    exitTlRef.current?.kill();
    setRevealed(false);

    lineRefs.current.forEach((el) => { if (el) el.textContent = ""; });
    gsap.set(enterRef.current, { autoAlpha: 0, y: 8 });
    gsap.set(preloaderRef.current, { autoAlpha: 1 });
    gsap.set(flashRef.current, { autoAlpha: 0 });

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(heroRef.current, { scale: 1.08 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    let time = 0.3;

    LINES.forEach((line, lineIdx) => {
      for (let j = 0; j < line.length; j++) {
        const charIdx = j;
        tl.call(() => {
          const el = lineRefs.current[lineIdx];
          if (el) el.textContent = line.slice(0, charIdx + 1);
        }, [], time + charIdx * 0.028);
      }
      time += line.length * 0.028 + 0.25;
    });

    tl.to(enterRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, time);
  }, []);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { autoAlpha: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    runIntro();
    return () => {
      tlRef.current?.kill();
      exitTlRef.current?.kill();
    };
  }, [runIntro]);

  const handleEnter = useCallback(() => {
    setRevealed(true);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline();
    exitTlRef.current = tl;

    // Flash
    tl.to(flashRef.current, { autoAlpha: 1, duration: 0.06, ease: "none" });
    tl.to(flashRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });

    // Terminal fades out — same time as flash
    tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "<");

    // Hero reveals
    tl.to(heroRef.current, { scale: 1, duration: 0.65, ease: "power3.out" }, "<0.1");

    if (words?.length) {
      tl.to(words, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
      }, "-=0.4");
    }

    tl.to(heroSubRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#050505] font-mono"
      style={{ minHeight: 420 }}
    >
      {/* Hero layer — z-0 */}
      <div ref={heroRef} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="flex flex-wrap justify-center gap-x-4">
            {HERO_WORDS.map((w) => (
              <div key={w} className="overflow-hidden">
                <span className="reveal-word inline-block text-4xl md:text-5xl font-bold text-[#eaeaea] tracking-tight">
                  {w}
                </span>
              </div>
            ))}
          </div>
          <p
            ref={heroSubRef}
            className="mt-3 text-[10px] tracking-[0.3em] uppercase text-[#555]"
          >
            Frontend Engineer · Motion-First Interfaces
          </p>
        </div>
      </div>

      {/* Terminal preloader — z-10 */}
      <div
        ref={preloaderRef}
        className="absolute inset-0 bg-[#050505] z-10 p-6 md:p-10 flex flex-col justify-center"
      >
        {/* Decorative header */}
        <div className="text-[8px] tracking-[0.3em] uppercase text-[#333] mb-6">
          SYSTEM TERMINAL v0.1 — ADITYA KHALKAR
        </div>

        {/* Terminal lines */}
        <div className="flex flex-col">
          {LINES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              className="text-[11px] tracking-wide text-[#00FFC2] mb-1.5"
            />
          ))}
        </div>

        {/* Enter button */}
        <button
          ref={enterRef}
          onClick={handleEnter}
          className="mt-8 self-start text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
          style={{ opacity: 0 }}
        >
          ENTER SITE
        </button>
      </div>

      {/* Flash overlay — z-30 */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none bg-[#00FFC2]"
        style={{ opacity: 0 }}
      />

      {/* Reset — shown after reveal */}
      {revealed && (
        <button
          onClick={runIntro}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[9px] tracking-widest uppercase text-[#333] hover:text-[#666] transition-colors cursor-pointer"
        >
          RESET
        </button>
      )}
    </div>
  );
}

export const typewriterTerminalCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const LINES = [
  "> boot sequence initiated",
  "> loading motion engine..........",
  "> calibrating easing curves.......",
  "> mounting components.............",
  "> running diagnostics.............",
  "> all systems nominal",
  "> access granted — welcome.",
];

const HERO_WORDS = ["Execute.", "Deploy.", "Repeat."];

export function TypewriterTerminal() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const enterRef = useRef<HTMLButtonElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { autoAlpha: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    lineRefs.current.forEach((el) => { if (el) el.textContent = ""; });
    gsap.set(enterRef.current, { autoAlpha: 0, y: 8 });
    gsap.set(flashRef.current, { autoAlpha: 0 });

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    let time = 0.3;
    LINES.forEach((line, lineIdx) => {
      for (let j = 0; j < line.length; j++) {
        const charIdx = j;
        tl.call(() => {
          const el = lineRefs.current[lineIdx];
          if (el) el.textContent = line.slice(0, charIdx + 1);
        }, [], time + charIdx * 0.028);
      }
      time += line.length * 0.028 + 0.25;
    });

    tl.to(enterRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, time);

    return () => { tl.kill(); };
  }, []);

  const handleEnter = useCallback(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();

    tl.to(flashRef.current, { autoAlpha: 1, duration: 0.06, ease: "none" });
    tl.to(flashRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "<");
    tl.to(heroRef.current, { scale: 1, duration: 0.65, ease: "power3.out" }, "<0.1");

    if (words?.length) {
      tl.to(words, { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "-=0.4");
    }

    tl.to(heroSubRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] font-mono">
      <div ref={heroRef} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="flex flex-wrap justify-center gap-x-4">
            {HERO_WORDS.map((w) => (
              <div key={w} className="overflow-hidden">
                <span className="reveal-word inline-block text-6xl font-bold text-[#eaeaea] tracking-tight">
                  {w}
                </span>
              </div>
            ))}
          </div>
          <p ref={heroSubRef} className="mt-4 text-xs tracking-[0.3em] uppercase text-[#555]">
            Frontend Engineer · Motion-First Interfaces
          </p>
        </div>
      </div>

      <div ref={preloaderRef} className="absolute inset-0 bg-[#050505] z-10 p-6 md:p-10 flex flex-col justify-center">
        <div className="text-[8px] tracking-[0.3em] uppercase text-[#333] mb-6">
          SYSTEM TERMINAL v0.1 — ADITYA KHALKAR
        </div>
        <div className="flex flex-col">
          {LINES.map((_, i) => (
            <div
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              className="text-[11px] tracking-wide text-[#00FFC2] mb-1.5"
            />
          ))}
        </div>
        <button
          ref={enterRef}
          onClick={handleEnter}
          className="mt-8 self-start text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
        >
          ENTER SITE
        </button>
      </div>

      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none bg-[#00FFC2]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}`;
