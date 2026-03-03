"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const interests = ["music", "cats", "games", "web", "philosophy"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bracketTLRef = useRef<HTMLSpanElement>(null);
  const bracketTRRef = useRef<HTMLSpanElement>(null);
  const bracketBLRef = useRef<HTMLSpanElement>(null);
  const bracketBRRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Brackets draw in
      tl.fromTo(
        [bracketTLRef.current, bracketTRRef.current, bracketBLRef.current, bracketBRRef.current],
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.05 },
        0
      );

      // Heading slides in
      tl.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        0.1
      );

      // Text lines stagger in
      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 },
        0.3
      );

      // Interest tags stagger in
      if (tagsRef.current) {
        tl.fromTo(
          tagsRef.current.children,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.06 },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-white dark:bg-void"
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Corner brackets framing the content */}
        <span
          ref={bracketTLRef}
          className="absolute -top-6 -left-4 md:-left-8 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-black dark:border-concrete opacity-0"
        />
        <span
          ref={bracketTRRef}
          className="absolute -top-6 -right-4 md:-right-8 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-black dark:border-concrete opacity-0"
        />
        <span
          ref={bracketBLRef}
          className="absolute -bottom-6 -left-4 md:-left-8 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-black dark:border-concrete opacity-0"
        />
        <span
          ref={bracketBRRef}
          className="absolute -bottom-6 -right-4 md:-right-8 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-black dark:border-concrete opacity-0"
        />

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-sm tracking-[0.3em] uppercase text-secondary mb-12 opacity-0"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          About
        </h2>

        {/* Bio */}
        <div className="space-y-6 text-black dark:text-concrete">
          <p
            ref={line1Ref}
            className="text-xl md:text-2xl leading-relaxed font-light opacity-0"
          >
            I build things for the web -- sometimes useful, sometimes just to
            see what breaks. Developer, designer, occasionally both at once.
          </p>

          <p
            ref={line2Ref}
            className="text-xl md:text-2xl leading-relaxed font-light opacity-0"
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
            , where we are making machine learning education less painful.
          </p>

          <p
            ref={line3Ref}
            className="text-lg md:text-xl leading-relaxed text-secondary opacity-0"
          >
            When I am not pushing pixels or writing code, I am probably down a
            philosophy rabbit hole, lost in music, losing arguments with my cat,
            or breaking websites to understand how they tick.
          </p>
        </div>

        {/* Interest tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-3 mt-12">
          {interests.map((interest) => (
            <span
              key={interest}
              className="text-xs tracking-[0.15em] uppercase text-secondary border border-secondary/25 px-3 py-1.5 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 cursor-default"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
