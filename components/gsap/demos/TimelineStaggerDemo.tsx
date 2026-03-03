"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const TimelineStaggerDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [staggerFrom, setStaggerFrom] = useState<"start" | "center" | "edges" | "random">("start");

  useImperativeHandle(ref, () => ({
    play: () => {
      if (timelineRef.current) {
        timelineRef.current.restart();
      }
    },
    reset: () => {
      if (timelineRef.current) {
        timelineRef.current.pause(0);
      }
    },
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Reset state
      gsap.set(".stagger-item", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
      });

      // Elegant stagger animation
      tl.to(".stagger-item", {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: {
          each: 0.05,
          from: staggerFrom,
          grid: [3, 4], // 3 rows, 4 columns
          ease: "power2.out",
        },
        ease: "power3.out",
      });

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [staggerFrom]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center gap-12 bg-white dark:bg-black transition-colors duration-500">
      <div className="grid grid-cols-4 gap-4 w-full max-w-md px-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
          <div
            key={i}
            className="stagger-item aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-sm overflow-hidden relative group cursor-pointer"
          >
            {/* Minimalist content */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
              <div className="w-full h-[1px] bg-black dark:bg-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-[10px] tracking-widest uppercase">
        {(["start", "center", "edges", "random"] as const).map((from) => (
          <button
            key={from}
            onClick={() => setStaggerFrom(from)}
            className={`px-4 py-2 border border-transparent transition-all duration-300 ${staggerFrom === from
                ? "text-black dark:text-white border-b-black dark:border-b-white"
                : "text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
          >
            {from}
          </button>
        ))}
      </div>
    </div>
  );
});

TimelineStaggerDemo.displayName = "TimelineStaggerDemo";

export default TimelineStaggerDemo;
