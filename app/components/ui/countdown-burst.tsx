"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const COLOR_MAP: Record<number, string> = {
  5: "#eaeaea",
  4: "#eaeaea",
  3: "#eaeaea",
  2: "#888888",
  1: "#00FFC2",
};

const HERO_WORDS = ["Think.", "Build.", "Ship."];

export function CountdownBurstDemo() {
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const numberWrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasStartedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const resetAll = useCallback(() => {
    tlRef.current?.kill();
    hasStartedRef.current = false;
    setRevealed(false);

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(flashRef.current, { autoAlpha: 0 });
    gsap.set(numberWrapRef.current, { autoAlpha: 0 });
    gsap.set(startBtnRef.current, { autoAlpha: 1 });
    if (numberRef.current) {
      numberRef.current.textContent = "5";
      numberRef.current.style.color = COLOR_MAP[5];
    }
  }, []);

  useLayoutEffect(() => {
    gsap.set(heroRef.current, { scale: 1.08 });
    gsap.set(numberWrapRef.current, { autoAlpha: 0 });
    gsap.set(flashRef.current, { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(numberWrapRef.current, { autoAlpha: 0 });
    gsap.set(flashRef.current, { autoAlpha: 0 });
    gsap.set(startBtnRef.current, { autoAlpha: 1 });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const handleStart = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    // Hide start button, show number wrapper
    gsap.to(startBtnRef.current, { autoAlpha: 0, duration: 0.2, ease: "power2.in" });
    gsap.set(numberWrapRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({
      onComplete: () => setRevealed(true),
    });
    tlRef.current = tl;

    const COUNTS = [5, 4, 3, 2, 1];
    COUNTS.forEach((n, idx) => {
      const offset = idx * 0.75;

      // Set color + textContent via call() — direct DOM write, no setState
      tl.call(
        () => {
          if (numberRef.current) {
            numberRef.current.textContent = String(n);
            numberRef.current.style.color = COLOR_MAP[n];
          }
        },
        [],
        offset
      );

      // Slam in: scale 3.5→1, opacity 0→1
      tl.fromTo(
        numberWrapRef.current,
        { scale: 3.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.22, ease: "power3.out" },
        offset
      );

      // Exit: scale→0.4, opacity→0 (after 0.35s hold)
      tl.to(
        numberWrapRef.current,
        { scale: 0.4, opacity: 0, duration: 0.18, ease: "power2.in" },
        offset + 0.22 + 0.35
      );
    });

    // After "1" exits: brief flash
    const flashStart = COUNTS.length * 0.75;
    tl.to(
      flashRef.current,
      { autoAlpha: 1, duration: 0.04, ease: "none" },
      flashStart
    );
    tl.to(
      flashRef.current,
      { autoAlpha: 0, duration: 0.04, ease: "none" },
      flashStart + 0.04
    );

    // Hero reveals
    tl.to(
      heroRef.current,
      { scale: 1, duration: 0.8, ease: "power3.out" },
      flashStart + 0.08
    );

    if (words?.length) {
      tl.to(
        words,
        { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        flashStart + 0.08
      );
    }

    tl.to(
      heroSubRef.current,
      { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
      flashStart + 0.4
    );
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

      {/* Flash overlay — z-20 */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ backgroundColor: "#00FFC2" }}
      />

      {/* Preloader layer — z-10 */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Dim "5" hint behind start button */}
        <div
          className="absolute select-none"
          style={{
            fontSize: "clamp(120px, 30vw, 220px)",
            fontWeight: 700,
            color: "#eaeaea",
            opacity: 0.1,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          5
        </div>

        {/* Actual countdown number — hidden until started */}
        <div
          ref={numberWrapRef}
          className="absolute select-none"
          style={{ opacity: 0 }}
        >
          <span
            ref={numberRef}
            style={{
              fontSize: "clamp(120px, 30vw, 220px)",
              fontWeight: 700,
              color: COLOR_MAP[5],
              lineHeight: 1,
              display: "block",
            }}
          >
            5
          </span>
        </div>

        {/* Start button */}
        <button
          ref={startBtnRef}
          onClick={handleStart}
          className="relative z-10 text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer pointer-events-auto"
        >
          START
        </button>
      </div>

      {/* Reset — shown after reveal */}
      {revealed && (
        <button
          onClick={resetAll}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-[9px] tracking-widest uppercase text-[#333] hover:text-[#666] transition-colors duration-200 cursor-pointer"
        >
          RESET
        </button>
      )}
    </div>
  );
}

export const countdownBurstCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const COLOR_MAP: Record<number, string> = {
  5: "#eaeaea",
  4: "#eaeaea",
  3: "#eaeaea",
  2: "#888888",
  1: "#00FFC2",
};

const HERO_WORDS = ["Think.", "Build.", "Ship."];

export function CountdownBurst() {
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const numberWrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasStartedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.set(heroRef.current, { scale: 1.08 });
    gsap.set(numberWrapRef.current, { autoAlpha: 0 });
    gsap.set(flashRef.current, { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    return () => { tlRef.current?.kill(); };
  }, []);

  const handleStart = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.to(startBtnRef.current, { autoAlpha: 0, duration: 0.2, ease: "power2.in" });
    gsap.set(numberWrapRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    [5, 4, 3, 2, 1].forEach((n, idx) => {
      const offset = idx * 0.75;
      tl.call(() => {
        if (numberRef.current) {
          numberRef.current.textContent = String(n);
          numberRef.current.style.color = COLOR_MAP[n];
        }
      }, [], offset);
      tl.fromTo(numberWrapRef.current,
        { scale: 3.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.22, ease: "power3.out" },
        offset
      );
      tl.to(numberWrapRef.current,
        { scale: 0.4, opacity: 0, duration: 0.18, ease: "power2.in" },
        offset + 0.22 + 0.35
      );
    });

    const flashStart = 5 * 0.75;
    tl.to(flashRef.current, { autoAlpha: 1, duration: 0.04, ease: "none" }, flashStart);
    tl.to(flashRef.current, { autoAlpha: 0, duration: 0.04, ease: "none" }, flashStart + 0.04);
    tl.to(heroRef.current, { scale: 1, duration: 0.8, ease: "power3.out" }, flashStart + 0.08);
    if (words?.length) {
      tl.to(words, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, flashStart + 0.08);
    }
    tl.to(heroSubRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, flashStart + 0.4);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] font-mono">
      <div ref={heroRef} className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="flex flex-wrap justify-center gap-x-4">
            {HERO_WORDS.map((w) => (
              <div key={w} className="overflow-hidden">
                <span className="reveal-word inline-block text-6xl font-bold text-[#eaeaea] tracking-tight">{w}</span>
              </div>
            ))}
          </div>
          <p ref={heroSubRef} className="mt-4 text-xs tracking-[0.3em] uppercase text-[#555]">
            Frontend Engineer · Motion-First Interfaces
          </p>
        </div>
      </div>

      <div ref={flashRef} className="absolute inset-0 z-20 pointer-events-none" style={{ backgroundColor: "#00FFC2" }} />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="absolute select-none" style={{ fontSize: "clamp(120px,30vw,220px)", fontWeight: 700, color: "#eaeaea", opacity: 0.1, lineHeight: 1 }}>5</div>
        <div ref={numberWrapRef} className="absolute select-none" style={{ opacity: 0 }}>
          <span ref={numberRef} style={{ fontSize: "clamp(120px,30vw,220px)", fontWeight: 700, color: COLOR_MAP[5], lineHeight: 1, display: "block" }}>5</span>
        </div>
        <button ref={startBtnRef} onClick={handleStart}
          className="relative z-10 text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer pointer-events-auto">
          START
        </button>
      </div>
    </div>
  );
}`;
