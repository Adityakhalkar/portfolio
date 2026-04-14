"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const HERO_WORDS = ["One.", "Vision.", "Forward."];

export function SplitRevealDemo() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  // Refs for the two copies of animated elements
  const logoLeftRef = useRef<HTMLDivElement>(null);
  const logoRightRef = useRef<HTMLDivElement>(null);
  const barLeftRef = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);
  const btnLeftRef = useRef<HTMLButtonElement>(null);
  const btnRightRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const exitTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasEngagedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const runIntro = useCallback(() => {
    tlRef.current?.kill();
    exitTlRef.current?.kill();
    hasEngagedRef.current = false;
    setRevealed(false);

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    // Reset panels
    gsap.set(leftPanelRef.current, { x: "0%" });
    gsap.set(rightPanelRef.current, { x: "0%" });
    gsap.set(seamRef.current, { opacity: 0 });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });

    // Reset preloader content in both panels
    const logos = [logoLeftRef.current, logoRightRef.current].filter(Boolean);
    const bars = [barLeftRef.current, barRightRef.current].filter(Boolean);
    const btns = [btnLeftRef.current, btnRightRef.current].filter(Boolean);

    gsap.set(logos, { autoAlpha: 0, y: 10 });
    gsap.set(bars, { scaleX: 0 });
    gsap.set(btns, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Animate logos in both panels simultaneously
    tl.to(logos, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Progress bars fill
    tl.to(bars, {
      scaleX: 1,
      duration: 1.8,
      ease: "power1.inOut",
    }, "-=0.2");

    // Enter buttons appear
    tl.to(btns, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    gsap.set(leftPanelRef.current, { x: "0%" });
    gsap.set(rightPanelRef.current, { x: "0%" });
    gsap.set(seamRef.current, { opacity: 0 });
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
    // Prevent double-trigger from both buttons
    if (hasEngagedRef.current) return;
    hasEngagedRef.current = true;
    setRevealed(true);

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");

    const tl = gsap.timeline();
    exitTlRef.current = tl;

    // 1. Center seam flashes
    tl.to(seamRef.current, {
      opacity: 0.8,
      duration: 0.15,
      ease: "none",
    });
    tl.to(seamRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    // 2. Both panels slide apart simultaneously
    tl.to(leftPanelRef.current, {
      x: "-105%",
      duration: 0.75,
      ease: "power3.inOut",
    }, "-=0.3");

    tl.to(rightPanelRef.current, {
      x: "105%",
      duration: 0.75,
      ease: "power3.inOut",
    }, "<");

    // 3. Hero scales down, starting 0.15s into the panel slide
    tl.to(heroRef.current, {
      scale: 1,
      duration: 0.75,
      ease: "power3.out",
    }, "<0.15");

    // 4. Hero words reveal after panels clear
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

  // Shared preloader content rendered in both left and right panels
  const PreloaderContent = ({
    logoRef,
    barRef,
    btnRef,
  }: {
    logoRef: React.RefObject<HTMLDivElement | null>;
    barRef: React.RefObject<HTMLDivElement | null>;
    btnRef: React.RefObject<HTMLButtonElement | null>;
  }) => (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        ref={logoRef}
        className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]"
      >
        YOUR.NAME
      </div>
      <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
        <div
          ref={barRef}
          className="absolute inset-0 bg-[#00FFC2] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <button
        ref={btnRef}
        onClick={handleEnter}
        className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer"
        style={{ opacity: 0 }}
      >
        ENTER
      </button>
    </div>
  );

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

      {/* Left panel — clipped to left half, z-10 */}
      <div
        ref={leftPanelRef}
        className="absolute inset-0 z-10 bg-[#050505]"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <div className="absolute inset-0">
          <PreloaderContent
            logoRef={logoLeftRef}
            barRef={barLeftRef}
            btnRef={btnLeftRef}
          />
        </div>
      </div>

      {/* Right panel — clipped to right half, z-10 */}
      <div
        ref={rightPanelRef}
        className="absolute inset-0 z-10 bg-[#050505]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        <div className="absolute inset-0">
          <PreloaderContent
            logoRef={logoRightRef}
            barRef={barRightRef}
            btnRef={btnRightRef}
          />
        </div>
      </div>

      {/* Center seam — z-11 */}
      <div
        ref={seamRef}
        className="absolute top-0 bottom-0 z-[11] pointer-events-none"
        style={{
          left: "50%",
          width: 1,
          backgroundColor: "#00FFC2",
          opacity: 0,
        }}
      />

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

export const splitRevealCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const HERO_WORDS = ["One.", "Vision.", "Forward."];

export function SplitReveal() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const logoLeftRef = useRef<HTMLDivElement>(null);
  const logoRightRef = useRef<HTMLDivElement>(null);
  const barLeftRef = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);
  const btnLeftRef = useRef<HTMLButtonElement>(null);
  const btnRightRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasEngagedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.set(leftPanelRef.current, { x: "0%" });
    gsap.set(rightPanelRef.current, { x: "0%" });
    gsap.set(seamRef.current, { opacity: 0 });
    gsap.set(heroRef.current, { scale: 1.08 });
  }, []);

  useEffect(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const logos = [logoLeftRef.current, logoRightRef.current].filter(Boolean);
    const bars = [barLeftRef.current, barRightRef.current].filter(Boolean);
    const btns = [btnLeftRef.current, btnRightRef.current].filter(Boolean);

    gsap.set(leftPanelRef.current, { x: "0%" });
    gsap.set(rightPanelRef.current, { x: "0%" });
    gsap.set(heroRef.current, { scale: 1.08 });
    if (words?.length) gsap.set(words, { yPercent: 110 });
    gsap.set(heroSubRef.current, { autoAlpha: 0 });
    gsap.set(logos, { autoAlpha: 0, y: 10 });
    gsap.set(bars, { scaleX: 0 });
    gsap.set(btns, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(logos, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    tl.to(bars, { scaleX: 1, duration: 1.8, ease: "power1.inOut" }, "-=0.2");
    tl.to(btns, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });

    return () => { tl.kill(); };
  }, []);

  const handleEnter = useCallback(() => {
    if (hasEngagedRef.current) return;
    hasEngagedRef.current = true;

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();

    tl.to(seamRef.current, { opacity: 0.8, duration: 0.15, ease: "none" });
    tl.to(seamRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
    tl.to(leftPanelRef.current, { x: "-105%", duration: 0.75, ease: "power3.inOut" }, "-=0.3");
    tl.to(rightPanelRef.current, { x: "105%", duration: 0.75, ease: "power3.inOut" }, "<");
    tl.to(heroRef.current, { scale: 1, duration: 0.75, ease: "power3.out" }, "<0.15");

    if (words?.length) {
      tl.to(words, { yPercent: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "-=0.35");
    }

    tl.to(heroSubRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
  }, []);

  const PreloaderContent = ({
    logoRef,
    barRef,
    btnRef,
  }: {
    logoRef: React.RefObject<HTMLDivElement | null>;
    barRef: React.RefObject<HTMLDivElement | null>;
    btnRef: React.RefObject<HTMLButtonElement | null>;
  }) => (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div ref={logoRef} className="mb-8 text-[10px] tracking-[0.4em] uppercase text-[#444]">YOUR.NAME</div>
      <div className="w-48 h-px bg-[#1c1c1c] mb-8 overflow-hidden relative">
        <div ref={barRef} className="absolute inset-0 bg-[#00FFC2] origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      <button ref={btnRef} onClick={handleEnter}
        className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer">
        ENTER
      </button>
    </div>
  );

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

      <div ref={leftPanelRef} className="absolute inset-0 z-10 bg-[#050505]" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <div className="absolute inset-0">
          <PreloaderContent logoRef={logoLeftRef} barRef={barLeftRef} btnRef={btnLeftRef} />
        </div>
      </div>

      <div ref={rightPanelRef} className="absolute inset-0 z-10 bg-[#050505]" style={{ clipPath: "inset(0 0 0 50%)" }}>
        <div className="absolute inset-0">
          <PreloaderContent logoRef={logoRightRef} barRef={barRightRef} btnRef={btnRightRef} />
        </div>
      </div>

      <div ref={seamRef} className="absolute top-0 bottom-0 z-[11] pointer-events-none"
        style={{ left: "50%", width: 1, backgroundColor: "#00FFC2", opacity: 0 }} />
    </div>
  );
}`;
