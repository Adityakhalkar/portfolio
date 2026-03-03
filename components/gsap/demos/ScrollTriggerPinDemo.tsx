"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const ScrollTriggerPinDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          scrollContainerRef.current?.scrollTo({
            top: scrollContainerRef.current.scrollHeight / 2,
            behavior: "smooth"
          });
        }, 100);
      }
    },
    reset: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left side
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedRef.current,
        scroller: scrollContainerRef.current,
      });

      // Animate sections on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".pin-section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            scroller: scrollContainerRef.current,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="h-40 flex items-center justify-center text-xs tracking-widest uppercase border-b border-black/10 dark:border-white/10">
          <div className="mb-2">Scroll Narrative</div>
          <div className="w-[1px] h-8 bg-black dark:bg-white animate-bounce" />
        </div>

        <div ref={contentRef} className="flex min-h-[1000px]">
          {/* Left: Pinned Content */}
          <div className="w-1/2 relative border-r border-black/10 dark:border-white/10">
            <div
              ref={pinnedRef}
              className="h-full max-h-screen flex flex-col justify-center p-12"
            >
              <div className="text-[10px] tracking-[0.3em] font-mono mb-4 opacity-50">CHAPTER 01</div>
              <h2 className="text-4xl font-bold tracking-tighter mb-8">
                The Art of
                <br />
                Persistence.
              </h2>
              <div className="w-12 h-[1px] bg-black dark:bg-white" />
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div className="w-1/2">
            {[
              { title: "ORIGIN", text: "It begins with a single point of reference." },
              { title: "PROCESS", text: "Evolution occurs through constant iteration." },
              { title: "FORM", text: "Structure emerges from the chaos of thought." },
              { title: "RESULT", text: "Finality is an illusion of the present moment." },
            ].map((item, i) => (
              <div
                key={i}
                className="pin-section h-[400px] flex flex-col justify-center p-12 border-b border-black/5 dark:border-white/5 last:border-b-0"
              >
                <div className="text-xs font-mono mb-2 opacity-50">0{i + 1}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed max-w-xs">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-40 flex items-center justify-center text-xs tracking-widest opacity-20 border-t border-black/10 dark:border-white/10">
          END OF CHAPTER
        </div>
      </div>
    </div>
  );
});

ScrollTriggerPinDemo.displayName = "ScrollTriggerPinDemo";

export default ScrollTriggerPinDemo;
