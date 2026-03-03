"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const CrashZoomDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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

      // Impact Frame Sequence
      tl.set(containerRef.current, { filter: "invert(0)" })
        .set(textRef.current, { opacity: 0, scale: 0.5 })

        // 1. Rapid Zoom In
        .to(targetRef.current, {
          scale: 5,
          duration: 0.1,
          ease: "expo.in",
        })

        // 2. Impact Frame (Invert colors)
        .set(containerRef.current, { filter: "invert(1)" })
        .set(textRef.current, { opacity: 1, scale: 1.5 })
        .to(targetRef.current, {
          scale: 4.8, // slight shake
          duration: 0.05,
          yoyo: true,
          repeat: 3
        })

        // 3. Reset
        .set(containerRef.current, { filter: "invert(0)" })
        .to(targetRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        })
        .to(textRef.current, {
          opacity: 0,
          scale: 2,
          duration: 0.2
        }, "<");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white dark:bg-black transition-colors duration-0 flex items-center justify-center">

      {/* Background Lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[200%] h-[1px] bg-black dark:bg-white"
            style={{ transform: `rotate(${i * 15}deg)` }}
          />
        ))}
      </div>

      {/* Target Element */}
      <div ref={targetRef} className="relative z-10 w-32 h-32 border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black">
        <div className="w-4 h-4 bg-black dark:bg-white rounded-full" />
        <div className="absolute inset-0 border border-black/20 dark:border-white/20 scale-150" />
      </div>

      {/* Impact Text */}
      <div
        ref={textRef}
        className="absolute z-20 text-9xl font-black tracking-tighter text-black dark:text-white pointer-events-none mix-blend-difference"
      >
        IMPACT
      </div>

    </div>
  );
});

CrashZoomDemo.displayName = "CrashZoomDemo";

export default CrashZoomDemo;
