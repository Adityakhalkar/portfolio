"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const MotionPathDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ paused: true, repeat: -1 });

      // Planet Orbit
      tl.to(planetRef.current, {
        duration: 8,
        ease: "none",
        motionPath: {
          path: "#orbit-path-1",
          align: "#orbit-path-1",
          alignOrigin: [0.5, 0.5],
        },
      });

      // Moon Orbit (Faster)
      gsap.to(moonRef.current, {
        duration: 3,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: "#orbit-path-2",
          align: "#orbit-path-2",
          alignOrigin: [0.5, 0.5],
        },
      });

      timelineRef.current = tl;
      tl.play(); // Auto-play for this one
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      <div className="relative w-[400px] h-[400px]">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central Star */}
          <circle cx="200" cy="200" r="2" fill="currentColor" className="text-black dark:text-white" />

          {/* Orbit Path 1 (Planet) */}
          <path
            id="orbit-path-1"
            d="M 200, 50 A 150,150 0 1,1 200,350 A 150,150 0 1,1 200,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-black/20 dark:text-white/20"
          />

          {/* Orbit Path 2 (Moon - Elliptical) */}
          <path
            id="orbit-path-2"
            d="M 200, 100 A 100,60 0 1,1 200,300 A 100,60 0 1,1 200,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-black/20 dark:text-white/20"
            transform="rotate(45 200 200)"
          />
        </svg>

        {/* Planet */}
        <div
          ref={planetRef}
          className="absolute top-0 left-0 w-4 h-4 rounded-full bg-black dark:bg-white border-2 border-white dark:border-black z-10"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Moon */}
        <div
          ref={moonRef}
          className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white dark:bg-black border border-black dark:border-white z-10"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] tracking-[0.3em] opacity-50 font-mono">
          ORBITAL MECHANICS
        </div>
      </div>
    </div>
  );
});

MotionPathDemo.displayName = "MotionPathDemo";

export default MotionPathDemo;
