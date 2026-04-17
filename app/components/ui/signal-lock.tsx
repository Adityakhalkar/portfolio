"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const FILTERS = [
  "brightness(0.08) contrast(3) grayscale(1) blur(4px)",
  "brightness(0.35) contrast(2) grayscale(0.7) blur(2px)",
  "brightness(0.7) contrast(1.4) grayscale(0.3) blur(0.5px)",
  "brightness(1) contrast(1) grayscale(0) blur(0px)",
] as const;

const CORNERS = [
  { text: "SIGNAL SEARCH", pos: "top-3 left-3" },
  { text: "CH: 04", pos: "top-3 right-3" },
  { text: "FREQ: 2.4GHz", pos: "bottom-3 left-3" },
  { text: "LOCK: —", pos: "bottom-3 right-3" },
] as const;

const HERO_WORDS = ["Acquired.", "Locked.", "Online."];

export function SignalLockDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    setRevealed(false);

    // Reset corner[3] text
    const corner3 = cornerRefs.current[3];
    if (corner3) corner3.textContent = "LOCK: —";

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(heroRef.current, { filter: FILTERS[0] });
    gsap.set(scanlineRef.current, { y: -3, autoAlpha: 1 });
    gsap.set(staticRef.current, { autoAlpha: 1 });
    gsap.set(cornerRefs.current.filter(Boolean), { autoAlpha: 0 });

    const containerHeight = containerRef.current?.offsetHeight ?? 420;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Corner texts fade in
    tl.to(cornerRefs.current.filter((el): el is HTMLDivElement => el !== null), {
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
    });

    // 3 sweeps
    for (let i = 0; i < 3; i++) {
      tl.fromTo(
        scanlineRef.current,
        { y: -3 },
        { y: containerHeight + 3, duration: 0.85, ease: "none" }
      );
      tl.to(
        heroRef.current,
        { filter: FILTERS[i + 1], duration: 0.85, ease: "none" },
        "<"
      );

      if (i < 2) {
        tl.set(scanlineRef.current, { y: -3 }, "+=0.2");
      }
    }

    // Lock achieved — fade out scanline and static overlay
    tl.to(scanlineRef.current, { autoAlpha: 0, duration: 0.5 });
    tl.to(staticRef.current, { autoAlpha: 0, duration: 0.6 }, "<");

    // Update corner status text
    tl.call(() => {
      const el = cornerRefs.current[3];
      if (el) el.textContent = "LOCK: ACQUIRED";
    });

    // Reveal hero words
    const words2 = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words2?.length) {
      tl.to(
        words2,
        { yPercent: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      );
    }

    tl.to(
      heroSubRef.current,
      { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );

    tl.call(() => setRevealed(true));
  }, []);

  useLayoutEffect(() => {
    gsap.set(heroRef.current, { filter: FILTERS[0] });
    gsap.set(scanlineRef.current, { y: -3 });
    gsap.set(cornerRefs.current.filter(Boolean), { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    runIntro();
    return () => {
      tlRef.current?.kill();
    };
  }, [runIntro]);

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

      {/* Static scanline texture overlay — z-5 */}
      <div
        ref={staticRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Corner texts — z-5 */}
      {CORNERS.map(({ text, pos }, i) => (
        <div
          key={i}
          ref={(el) => { cornerRefs.current[i] = el; }}
          className={`absolute ${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a] pointer-events-none`}
          style={{ zIndex: 5 }}
        >
          {text}
        </div>
      ))}

      {/* Scanline sweep — z-15 */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 3,
          background:
            "linear-gradient(to right, transparent 0%, #00FFC2 30%, #00FFC2 70%, transparent 100%)",
          boxShadow: "0 0 12px #00FFC2, 0 0 24px rgba(0,255,194,0.4)",
          top: -3,
          zIndex: 15,
        }}
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

export const signalLockCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const FILTERS = [
  "brightness(0.08) contrast(3) grayscale(1) blur(4px)",
  "brightness(0.35) contrast(2) grayscale(0.7) blur(2px)",
  "brightness(0.7) contrast(1.4) grayscale(0.3) blur(0.5px)",
  "brightness(1) contrast(1) grayscale(0) blur(0px)",
] as const;

const CORNERS = [
  { text: "SIGNAL SEARCH", pos: "top-4 left-4" },
  { text: "CH: 04",        pos: "top-4 right-4" },
  { text: "FREQ: 2.4GHz",  pos: "bottom-4 left-4" },
  { text: "LOCK: —",       pos: "bottom-4 right-4" },
] as const;

const HERO_WORDS = ["Acquired.", "Locked.", "Online."];

export function SignalLock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const staticRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(heroRef.current, { filter: FILTERS[0] });
    gsap.set(scanlineRef.current, { y: -3 });
    gsap.set(cornerRefs.current.filter(Boolean), { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0, y: 10 });
    gsap.set(heroRef.current, { filter: FILTERS[0] });
    gsap.set(scanlineRef.current, { y: -3, autoAlpha: 1 });
    gsap.set(staticRef.current, { autoAlpha: 1 });
    gsap.set(cornerRefs.current.filter(Boolean), { autoAlpha: 0 });

    const containerHeight = containerRef.current?.offsetHeight ?? 900;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(cornerRefs.current.filter((el): el is HTMLDivElement => el !== null), {
      autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "power2.out",
    });

    for (let i = 0; i < 3; i++) {
      tl.fromTo(scanlineRef.current,
        { y: -3 },
        { y: containerHeight + 3, duration: 0.85, ease: "none" }
      );
      tl.to(heroRef.current, { filter: FILTERS[i + 1], duration: 0.85, ease: "none" }, "<");
      if (i < 2) tl.set(scanlineRef.current, { y: -3 }, "+=0.2");
    }

    tl.to(scanlineRef.current, { autoAlpha: 0, duration: 0.5 });
    tl.to(staticRef.current, { autoAlpha: 0, duration: 0.6 }, "<");

    tl.call(() => {
      const el = cornerRefs.current[3];
      if (el) el.textContent = "LOCK: ACQUIRED";
    });

    const words2 = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words2?.length) {
      tl.to(words2, { yPercent: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" }, "-=0.3");
    }

    tl.to(heroSubRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505] font-mono">
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

      <div
        ref={staticRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {CORNERS.map(({ text, pos }, i) => (
        <div
          key={i}
          ref={(el) => { cornerRefs.current[i] = el; }}
          className={\`absolute \${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a] pointer-events-none\`}
          style={{ zIndex: 5 }}
        >
          {text}
        </div>
      ))}

      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 3,
          background: "linear-gradient(to right, transparent 0%, #00FFC2 30%, #00FFC2 70%, transparent 100%)",
          boxShadow: "0 0 12px #00FFC2, 0 0 24px rgba(0,255,194,0.4)",
          top: -3,
          zIndex: 15,
        }}
      />
    </div>
  );
}`;
