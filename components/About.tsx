"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import MusicScene from "./MusicScene";
import CatsScene from "./CatsScene";
import MoviesScene from "./MoviesScene";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Bracket corners for panels ─── */
function BracketCorners() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-black dark:border-white pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black dark:border-white pointer-events-none" />
    </>
  );
}

/* ════════════════════════════════════════
   Interest config
   ════════════════════════════════════════ */
interface InterestConfig {
  id: string;
  label: string;
  Scene: React.FC<{ active: boolean }>;
}

const INTERESTS: InterestConfig[] = [
  { id: "music", label: "music", Scene: MusicScene },
  { id: "cats", label: "cats", Scene: CatsScene },
  { id: "movies", label: "movies", Scene: MoviesScene },
];

/* ════════════════════════════════════════
   About section — main export
   ════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeInterest, setActiveInterest] = useState<string | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Scroll-triggered reveal for heading + paragraphs
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        0
      );

      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
        },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Stage expand/collapse animation — movies gets a taller panel
  useEffect(() => {
    if (!stageRef.current) return;

    if (activeInterest) {
      const targetHeight = activeInterest === "movies" ? 300 : 180;
      gsap.to(stageRef.current, {
        height: targetHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(stageRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [activeInterest]);

  const handleTagInteraction = useCallback(
    (id: string) => {
      if (isMobile) {
        setActiveInterest((prev) => (prev === id ? null : id));
      } else {
        setActiveInterest(id);
      }
    },
    [isMobile]
  );

  const handleAreaLeave = useCallback(() => {
    if (!isMobile) {
      setActiveInterest(null);
    }
  }, [isMobile]);

  const ActiveScene = activeInterest
    ? INTERESTS.find((i) => i.id === activeInterest)?.Scene
    : null;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-void"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="text-sm tracking-[0.3em] uppercase text-secondary mb-10 md:mb-12 opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          About
        </h2>

        <div className="space-y-6 text-black dark:text-concrete">
          <p
            ref={line1Ref}
            className="text-lg md:text-2xl leading-relaxed font-light opacity-0"
          >
            I build things for the web - sometimes useful, sometimes just
            to see what breaks. Developer, designer, occasionally both at
            once.
          </p>

          <p
            ref={line2Ref}
            className="text-lg md:text-2xl leading-relaxed font-light opacity-0"
          >
            Currently co-founding{" "}
            <a
              href="https://deep-ml.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-secondary/40 hover:decoration-black dark:hover:decoration-white transition-colors"
            >
              Deep-ML
            </a>
            , where we are making machine learning education real again.
          </p>

          <p
            ref={line3Ref}
            className="text-base md:text-xl leading-relaxed text-secondary opacity-0"
          >
            I am mostly watching movies, you can talk to me about movies
            and we will probably get along. I also like music and cats.
          </p>
        </div>

        {/* ─── Interest tags + interactive stage ─── */}
        <div className="mt-12 md:mt-16" onMouseLeave={handleAreaLeave}>
          {/* Tags row */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-5">
            {INTERESTS.map((interest) => (
              <span
                key={interest.id}
                onMouseEnter={() =>
                  !isMobile && handleTagInteraction(interest.id)
                }
                onClick={() =>
                  isMobile && handleTagInteraction(interest.id)
                }
                className={`text-xs sm:text-sm uppercase tracking-[0.12em] cursor-pointer select-none transition-all duration-200 ${
                  activeInterest === interest.id
                    ? "text-black dark:text-white scale-105"
                    : "text-secondary hover:text-black dark:hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                [{" "}
                {interest.label}
                {" "}]
              </span>
            ))}
          </div>

          {/* Stage panel */}
          <div
            ref={stageRef}
            className="relative mt-4 w-full border border-black/10 dark:border-white/10 bg-white dark:bg-void overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <BracketCorners />
            <div className="h-full">
              {ActiveScene && (
                <ActiveScene
                  active={!!activeInterest}
                  key={activeInterest}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
