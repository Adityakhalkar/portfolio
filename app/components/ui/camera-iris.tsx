"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const CORNERS = [
  { text: "f/1.8", pos: "top-3 left-3" },
  { text: "ISO 100", pos: "top-3 right-3" },
  { text: "1/250s", pos: "bottom-3 left-3" },
  { text: "\u221e mm", pos: "bottom-3 right-3" },
] as const;

const HERO_WORDS = ["Sharp.", "Clear.", "Focused."];

export function CameraIrisDemo() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const focusBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    exitTlRef.current?.kill();
    setRevealed(false);

    const corners = cornerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    // Reset preloader clip-path and hero scale
    gsap.set(preloaderRef.current, { clipPath: "circle(150% at 50% 50%)" });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });

    // Reset preloader internals
    gsap.set(corners, { autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(focusBtnRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Corner texts fade in
    tl.to(corners, {
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    });

    // Logo slides up
    tl.to(logoRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

    // Progress bar fills
    tl.to(progressBarRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: "power1.inOut",
    }, "-=0.2");

    // Focus button appears
    tl.to(focusBtnRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { clipPath: "circle(150% at 50% 50%)" });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    runIntro();
    return () => {
      tlRef.current?.kill();
      exitTlRef.current?.kill();
    };
  }, [runIntro]);

  const handleFocus = useCallback(() => {
    setRevealed(true);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline({
      onComplete: () => {
        // Reveal hero words after iris closes
        if (words?.length) {
          gsap.to(words, {
            yPercent: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          });
        }
        gsap.to(heroSubRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.3,
        });
      },
    });
    exitTlRef.current = tl;

    // Iris closes: circle shrinks to 0
    tl.to(preloaderRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Hero scales down simultaneously
    tl.to(heroRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "<");
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

      {/* Preloader — z-10, clipped by iris */}
      <div
        ref={preloaderRef}
        className="absolute inset-0 z-10 bg-[#050505] flex flex-col items-center justify-center"
        style={{ clipPath: "circle(150% at 50% 50%)" }}
      >
        {/* Corner camera metadata */}
        {CORNERS.map(({ text, pos }, i) => (
          <div
            key={i}
            ref={(el) => { cornerRefs.current[i] = el; }}
            className={`absolute ${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a]`}
          >
            {text}
          </div>
        ))}

        {/* Decorative static ring — NOT the clip-path circle */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "1px solid #1c1c1c",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo */}
        <div
          ref={logoRef}
          className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]"
        >
          YOUR.NAME
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-[#00FFC2] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Focus button */}
        <button
          ref={focusBtnRef}
          onClick={handleFocus}
          className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
          style={{ opacity: 0 }}
        >
          FOCUS
        </button>
      </div>

      {/* Reset — shown after reveal */}
      {revealed && (
        <button
          onClick={runIntro}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[9px] tracking-widest uppercase text-[#333] hover:text-[#666] transition-colors duration-200 cursor-pointer"
        >
          RESET
        </button>
      )}
    </div>
  );
}

export const cameraIrisCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const CORNERS = [
  { text: "f/1.8",   pos: "top-4 left-4" },
  { text: "ISO 100", pos: "top-4 right-4" },
  { text: "1/250s",  pos: "bottom-4 left-4" },
  { text: "\u221e mm",    pos: "bottom-4 right-4" },
] as const;

const HERO_WORDS = ["Sharp.", "Clear.", "Focused."];

export function CameraIris() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const focusBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { clipPath: "circle(150% at 50% 50%)" });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    const corners = cornerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(preloaderRef.current, { clipPath: "circle(150% at 50% 50%)" });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(corners, { autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(focusBtnRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(corners, { autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" });
    tl.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    tl.to(progressBarRef.current, { scaleX: 1, duration: 1.8, ease: "power1.inOut" }, "-=0.2");
    tl.to(focusBtnRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });

    return () => { tl.kill(); };
  }, []);

  const handleFocus = useCallback(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline({
      onComplete: () => {
        if (words?.length) {
          gsap.to(words, { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" });
        }
        gsap.to(heroSubRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out", delay: 0.3 });
      },
    });

    tl.to(preloaderRef.current, { clipPath: "circle(0% at 50% 50%)", duration: 0.8, ease: "power3.inOut" });
    tl.to(heroRef.current, { scale: 1, duration: 0.8, ease: "power3.out" }, "<");
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

      <div ref={preloaderRef} className="absolute inset-0 z-10 bg-[#050505] flex flex-col items-center justify-center" style={{ clipPath: "circle(150% at 50% 50%)" }}>
        {CORNERS.map(({ text, pos }, i) => (
          <div key={i} ref={(el) => { cornerRefs.current[i] = el; }}
            className={\`absolute \${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a]\`}>
            {text}
          </div>
        ))}
        <div className="absolute pointer-events-none" style={{ width: 120, height: 120, borderRadius: "50%", border: "1px solid #1c1c1c", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        <div ref={logoRef} className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]">YOUR.NAME</div>
        <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
          <div ref={progressBarRef} className="absolute inset-0 bg-[#00FFC2] origin-left" style={{ transform: "scaleX(0)" }} />
        </div>
        <button ref={focusBtnRef} onClick={handleFocus}
          className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer">
          FOCUS
        </button>
      </div>
    </div>
  );
}`;
