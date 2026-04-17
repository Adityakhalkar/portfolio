"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const LAYERS = [
  { bg: "#050505", label: "void" },
  { bg: "#00FFC2", label: "accent" },
  { bg: "#eaeaea", label: "concrete" },
] as const;

const HERO_WORDS = ["Design.", "Build.", "Launch."];

export function OverlayWipeDemo() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    exitTlRef.current?.kill();
    setRevealed(false);

    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(layers, { x: "0%" });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(enterBtnRef.current, { autoAlpha: 0 });

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
      duration: 1.8,
      ease: "power1.inOut",
    }, "-=0.2");

    tl.to(enterBtnRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(layers, { x: "0%" });
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
    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline();
    exitTlRef.current = tl;

    // All 3 layers wipe off to the right with stagger
    tl.to(layers, {
      x: "105%",
      duration: 0.72,
      ease: "power3.inOut",
      stagger: 0.1,
    });

    // Hero scales down simultaneously
    tl.to(heroRef.current, {
      scale: 1,
      duration: 0.72,
      ease: "power3.out",
    }, "<");

    // Hero words reveal after layers start to clear
    if (words?.length) {
      tl.to(words, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
      }, "-=0.35");
    }

    tl.to(heroSubRef.current, {
      autoAlpha: 1,
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

      {/* Overlay layers — void=z-12 (top), accent=z-11, concrete=z-10 */}
      {LAYERS.map(({ bg }, i) => {
        const zIndex = 12 - i;
        return (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: bg, zIndex }}
          >
            {/* Preloader UI lives inside the top (void) layer so it slides away with it */}
            {i === 0 && (
              <>
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

                {/* Enter button */}
                <button
                  ref={enterBtnRef}
                  onClick={handleEnter}
                  className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
                  style={{ opacity: 0 }}
                >
                  ENTER
                </button>
              </>
            )}
          </div>
        );
      })}

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

export const overlayWipeCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const LAYERS = [
  { bg: "#050505" },
  { bg: "#00FFC2" },
  { bg: "#eaeaea" },
] as const;

const HERO_WORDS = ["Design.", "Build.", "Launch."];

export function OverlayWipe() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(layers, { x: "0%" });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    gsap.set(layers, { x: "0%" });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.set(enterBtnRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    tl.to(progressBarRef.current, { scaleX: 1, duration: 1.8, ease: "power1.inOut" }, "-=0.2");
    tl.to(enterBtnRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });

    return () => { tl.kill(); };
  }, []);

  const handleEnter = useCallback(() => {
    const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();

    tl.to(layers, { x: "105%", duration: 0.72, ease: "power3.inOut", stagger: 0.1 });
    tl.to(heroRef.current, { scale: 1, duration: 0.72, ease: "power3.out" }, "<");

    if (words?.length) {
      tl.to(words, { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "-=0.35");
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

      {LAYERS.map(({ bg }, i) => {
        const zIndex = 12 - i;
        return (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: bg, zIndex }}
          >
            {i === 0 && (
              <>
                <div ref={logoRef} className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]">
                  YOUR.NAME
                </div>
                <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
                  <div ref={progressBarRef} className="absolute inset-0 bg-[#00FFC2] origin-left" style={{ transform: "scaleX(0)" }} />
                </div>
                <button
                  ref={enterBtnRef}
                  onClick={handleEnter}
                  className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
                >
                  ENTER
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}`;
