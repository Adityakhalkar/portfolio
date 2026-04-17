"use client";

import { useRef, useEffect, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const R = 45;
const CIRC = 2 * Math.PI * R;

const CORNERS = [
  { text: "34.0522° N / 118.2437° W", pos: "top-3 left-3" },
  { text: "SYS.INIT ■", pos: "top-3 right-3" },
  { text: "BUILD v1.0.0", pos: "bottom-3 left-3" },
  { text: "STATUS · LOADING", pos: "bottom-3 right-3" },
] as const;

export function LandingRevealDemo() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const engageRef = useRef<HTMLButtonElement>(null);
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

    if (countRef.current) countRef.current.textContent = "0";
    if (corners[3]) corners[3].textContent = "STATUS · LOADING";

    gsap.set(preloaderRef.current, { clipPath: "inset(0 0% 0 0)" });
    gsap.set(heroRef.current, { scale: 1.1 });
    gsap.set(circleRef.current, { strokeDashoffset: CIRC });
    gsap.set(svgRef.current, { rotation: 0 });
    gsap.set(engageRef.current, { autoAlpha: 0, y: 8 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 12 });
    gsap.set(corners, { autoAlpha: 0 });

    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    if (words?.length) gsap.set(words, { yPercent: 110 });
    if (heroSubRef.current) gsap.set(heroSubRef.current, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(corners, {
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    tl.to(logoRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

    const proxy = { v: 0 };
    tl.to(proxy, {
      v: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate() {
        const n = Math.round(proxy.v);
        if (countRef.current) countRef.current.textContent = String(n);
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = String(CIRC * (1 - proxy.v / 100));
        }
      },
      onComplete() {
        const c = cornerRefs.current[3];
        if (c) c.textContent = "STATUS · READY";
      },
    }, "-=0.2");

    tl.to(svgRef.current, {
      rotation: 360,
      duration: 2.2,
      ease: "power1.inOut",
      transformOrigin: "55px 55px",
    }, "<");

    tl.to(engageRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
    });
  }, []);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { clipPath: "inset(0 0% 0 0)" });
    gsap.set(heroRef.current, { scale: 1.1 });
  }, []);

  useEffect(() => {
    runIntro();
    return () => {
      tlRef.current?.kill();
      exitTlRef.current?.kill();
    };
  }, [runIntro]);

  const handleEngage = useCallback(() => {
    setRevealed(true);
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();
    exitTlRef.current = tl;

    tl.to(preloaderRef.current, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.9,
      ease: "power3.inOut",
    });

    tl.to(heroRef.current, {
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
    }, "<0.15");

    if (words?.length) {
      tl.to(words, {
        yPercent: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      }, "-=0.5");
    }

    tl.to(heroSubRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.25");
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#050505] font-mono"
      style={{ minHeight: 420 }}
    >
      {/* Hero layer */}
      <div ref={heroRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="flex flex-wrap justify-center gap-x-4">
            {["Craft.", "Ship.", "Repeat."].map((w) => (
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

      {/* Preloader layer */}
      <div
        ref={preloaderRef}
        className="absolute inset-0 z-10 bg-[#050505] flex flex-col items-center justify-center"
      >
        {CORNERS.map(({ text, pos }, i) => (
          <div
            key={i}
            ref={(el) => { cornerRefs.current[i] = el; }}
            className={`absolute ${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a] opacity-0`}
          >
            {text}
          </div>
        ))}

        {/* Circle progress */}
        <div className="relative mb-5">
          <svg
            ref={svgRef}
            width="110"
            height="110"
            viewBox="0 0 110 110"
          >
            <circle cx="55" cy="55" r={R} fill="none" stroke="#1c1c1c" strokeWidth="1" />
            <circle
              ref={circleRef}
              cx="55"
              cy="55"
              r={R}
              fill="none"
              stroke="#00FFC2"
              strokeWidth="1.5"
              strokeLinecap="butt"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC}
              transform="rotate(-90 55 55)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span
              ref={countRef}
              className="text-xl font-bold text-[#eaeaea] tabular-nums leading-none"
            >
              0
            </span>
            <span className="text-[9px] text-[#3a3a3a] tracking-widest">%</span>
          </div>
        </div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="mb-6 text-[10px] tracking-[0.4em] uppercase text-[#444] opacity-0"
        >
          ADITYA KHALKAR
        </div>

        {/* Engage button */}
        <button
          ref={engageRef}
          onClick={handleEngage}
          className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200 cursor-pointer opacity-0"
        >
          ENGAGE
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

export const landingRevealCode = `"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";

const R = 45;
const CIRC = 2 * Math.PI * R;

export function LandingReveal() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const engageRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    gsap.set(preloaderRef.current, { clipPath: "inset(0 0% 0 0)" });
    gsap.set(heroRef.current, { scale: 1.1 });
  }, []);

  useEffect(() => {
    const corners = cornerRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    gsap.set(circleRef.current, { strokeDashoffset: CIRC });
    gsap.set(engageRef.current, { autoAlpha: 0, y: 8 });
    gsap.set(logoRef.current, { autoAlpha: 0, y: 12 });
    gsap.set(corners, { autoAlpha: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(corners, {
      autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
    });

    tl.to(logoRef.current, {
      autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out",
    }, "-=0.3");

    const proxy = { v: 0 };
    tl.to(proxy, {
      v: 100,
      duration: 2.2,
      ease: "power1.inOut",
      onUpdate() {
        const n = Math.round(proxy.v);
        if (countRef.current) countRef.current.textContent = String(n);
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = String(
            CIRC * (1 - proxy.v / 100)
          );
        }
      },
    }, "-=0.2");

    tl.to(svgRef.current, {
      rotation: 360, duration: 2.2, ease: "power1.inOut",
      transformOrigin: "55px 55px",
    }, "<");

    tl.to(engageRef.current, {
      autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out",
    });

    return () => { tl.kill(); };
  }, []);

  const handleEngage = useCallback(() => {
    const words = heroRef.current?.querySelectorAll<HTMLElement>(".reveal-word");
    const tl = gsap.timeline();

    tl.to(preloaderRef.current, {
      clipPath: "inset(0 100% 0 0)", duration: 0.9, ease: "power3.inOut",
    });

    tl.to(heroRef.current, {
      scale: 1, duration: 0.9, ease: "power3.out",
    }, "<0.15");

    if (words?.length) {
      tl.to(words, {
        yPercent: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
      }, "-=0.5");
    }

    tl.to(heroSubRef.current, {
      autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out",
    }, "-=0.25");
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] font-mono">
      {/* Hero */}
      <div ref={heroRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="flex flex-wrap justify-center gap-x-4">
            {["Craft.", "Ship.", "Repeat."].map((w) => (
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

      {/* Preloader */}
      <div ref={preloaderRef} className="absolute inset-0 z-10 bg-[#050505] flex flex-col items-center justify-center">
        {[
          { text: "34.0522° N / 118.2437° W", pos: "top-4 left-4" },
          { text: "SYS.INIT ■",               pos: "top-4 right-4" },
          { text: "BUILD v1.0.0",              pos: "bottom-4 left-4" },
          { text: "STATUS · LOADING",          pos: "bottom-4 right-4" },
        ].map(({ text, pos }, i) => (
          <div key={i}
            ref={(el) => { cornerRefs.current[i] = el; }}
            className={\`absolute \${pos} text-[9px] tracking-widest uppercase text-[#2a2a2a]\`}>
            {text}
          </div>
        ))}

        <div className="relative mb-5">
          <svg ref={svgRef} width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r={R} fill="none" stroke="#1c1c1c" strokeWidth="1" />
            <circle ref={circleRef} cx="55" cy="55" r={R}
              fill="none" stroke="#00FFC2" strokeWidth="1.5" strokeLinecap="butt"
              strokeDasharray={CIRC} strokeDashoffset={CIRC}
              transform="rotate(-90 55 55)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span ref={countRef} className="text-xl font-bold text-[#eaeaea] tabular-nums leading-none">0</span>
            <span className="text-[9px] text-[#3a3a3a] tracking-widest">%</span>
          </div>
        </div>

        <div ref={logoRef} className="mb-6 text-[10px] tracking-[0.4em] uppercase text-[#444]">
          YOUR NAME
        </div>

        <button ref={engageRef} onClick={handleEngage}
          className="text-[9px] tracking-[0.5em] uppercase text-[#00FFC2] border border-[#00FFC2]/25 px-6 py-2.5 hover:bg-[#00FFC2]/5 transition-colors duration-200">
          ENGAGE
        </button>
      </div>
    </div>
  );
}`;
