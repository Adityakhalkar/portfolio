"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const HERO_WORDS = ["Open.", "Reveal.", "Show."];
const STRIP_COUNT = 10;

export function VerticalBlindsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<(HTMLDivElement | null)[]>([]);
  const uiRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    exitTlRef.current?.kill();
    setRevealed(false);

    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(strips, { scaleX: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(uiRef.current, { autoAlpha: 1 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(revealBtnRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(logoRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "power1.inOut",
    }, "-=0.2");

    tl.to(revealBtnRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(strips, { scaleX: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    runIntro();
    return () => {
      tlRef.current?.kill();
      exitTlRef.current?.kill();
    };
  }, [runIntro]);

  const handleReveal = useCallback(() => {
    setRevealed(true);
    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline();
    exitTlRef.current = tl;

    // 1. UI fades out
    tl.to(uiRef.current, { autoAlpha: 0, duration: 0.25 });

    // 2. Strips collapse from center, starts 0.1s after UI fade
    tl.to(strips, {
      scaleX: 0,
      duration: 0.55,
      ease: "power2.inOut",
      stagger: { each: 0.04, from: "center" },
      transformOrigin: "center center",
    }, "+=0.1");

    // 3. Hero scales down — same time as strips
    tl.to(heroRef.current, {
      scale: 1,
      duration: 0.55,
      ease: "power2.out",
    }, "<");

    // 4. Hero words reveal — 0.3s into strip animation
    if (words?.length) {
      tl.to(words, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
      }, "<0.3");
    }

    // 5. heroSub fades in
    tl.to(heroSubRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");
  }, []);

  return (
    <div
      ref={containerRef}
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

      {/* Strips — z-10 */}
      <div className="absolute inset-0 flex flex-row z-10 pointer-events-none">
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { stripsRef.current[i] = el; }}
            className="flex-1 h-full bg-[#050505]"
          />
        ))}
      </div>

      {/* Preloader UI — z-20 */}
      <div
        ref={uiRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]"
        >
          ADITYA KHALKAR
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-[#00FFC2] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Reveal button */}
        <button
          ref={revealBtnRef}
          onClick={handleReveal}
          className="pointer-events-auto text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
          style={{ opacity: 0 }}
        >
          REVEAL
        </button>
      </div>

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

export const verticalBlindsCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const HERO_WORDS = ["Open.", "Reveal.", "Show."];
const STRIP_COUNT = 10;

export function VerticalBlinds() {
  const stripsRef = useRef<(HTMLDivElement | null)[]>([]);
  const uiRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const revealBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(strips, { scaleX: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(strips, { scaleX: 1 });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(revealBtnRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    tl.to(progressBarRef.current, { scaleX: 1, duration: 1.5, ease: "power1.inOut" }, "-=0.2");
    tl.to(revealBtnRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });

    return () => { tl.kill(); };
  }, []);

  const handleReveal = useCallback(() => {
    const strips = stripsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();

    tl.to(uiRef.current, { autoAlpha: 0, duration: 0.25 });
    tl.to(strips, {
      scaleX: 0,
      duration: 0.55,
      ease: "power2.inOut",
      stagger: { each: 0.04, from: "center" },
      transformOrigin: "center center",
    }, "+=0.1");
    tl.to(heroRef.current, { scale: 1, duration: 0.55, ease: "power2.out" }, "<");

    if (words?.length) {
      tl.to(words, { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "<0.3");
    }

    tl.to(heroSubRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
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

      <div className="absolute inset-0 flex flex-row z-10 pointer-events-none">
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { stripsRef.current[i] = el; }}
            className="flex-1 h-full bg-[#050505]"
          />
        ))}
      </div>

      <div
        ref={uiRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <div ref={logoRef} className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]">
          ADITYA KHALKAR
        </div>
        <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
          <div ref={progressBarRef} className="absolute inset-0 bg-[#00FFC2] origin-left" style={{ transform: "scaleX(0)" }} />
        </div>
        <button
          ref={revealBtnRef}
          onClick={handleReveal}
          className="pointer-events-auto text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
        >
          REVEAL
        </button>
      </div>
    </div>
  );
}`;
