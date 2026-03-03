"use client";

import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const SVGMorphDemo = forwardRef<DemoControls>((props, ref) => {
  const shapeRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Minimalist Icons (Menu -> Close -> Search -> User)
  // Note: These are simple paths that have the same number of points for smoother interpolation without MorphSVGPlugin
  const icons = [
    "M 10,30 L 90,30 L 90,40 L 10,40 Z M 10,50 L 90,50 L 90,60 L 10,60 Z M 10,70 L 90,70 L 90,80 L 10,80 Z", // Menu (3 bars)
    "M 20,20 L 80,80 L 70,90 L 10,30 Z M 80,20 L 20,80 L 10,70 L 70,10 Z M 0,0 L 0,0 L 0,0 L 0,0 Z", // Close (X) - approximating points
    "M 40,10 A 30,30 0 1,1 40,70 A 30,30 0 1,1 40,10 M 65,65 L 90,90 L 80,100 L 55,75 Z M 0,0 L 0,0 L 0,0 L 0,0 Z", // Search (Circle + Line)
    "M 50,20 A 20,20 0 1,1 50,60 A 20,20 0 1,1 50,20 M 20,90 Q 50,60 80,90 L 80,100 L 20,100 Z M 0,0 L 0,0 L 0,0 L 0,0 Z", // User (Circle + Arc)
  ];

  const labels = ["MENU", "CLOSE", "SEARCH", "USER"];

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
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1 });

      icons.forEach((path, index) => {
        if (index === 0) return; // Skip first as we start there

        tl.to(shapeRef.current, {
          attr: { d: path },
          duration: 0.8,
          ease: "power2.inOut",
        })
          .to(".icon-label", {
            opacity: 0,
            y: -10,
            duration: 0.3,
            onComplete: () => {
              const labelEl = document.querySelector(".icon-label");
              if (labelEl) labelEl.textContent = labels[index];
            }
          }, "-=0.8")
          .to(".icon-label", {
            opacity: 1,
            y: 0,
            duration: 0.3,
          }, "-=0.5")
          .to({}, { duration: 1 }); // Wait
      });

      // Loop back to start
      tl.to(shapeRef.current, {
        attr: { d: icons[0] },
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(".icon-label", {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            const labelEl = document.querySelector(".icon-label");
            if (labelEl) labelEl.textContent = labels[0];
          }
        }, "-=0.8")
        .to(".icon-label", {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, "-=0.5");

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-full" />

        <svg
          viewBox="0 0 100 100"
          className="w-32 h-32 text-black dark:text-white"
        >
          <path
            ref={shapeRef}
            d={icons[0]}
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mt-8 text-center">
        <div className="icon-label text-sm font-bold tracking-[0.5em] font-mono">
          {labels[0]}
        </div>
        <div className="w-8 h-[1px] bg-black dark:bg-white mx-auto mt-4" />
      </div>
    </div>
  );
});

SVGMorphDemo.displayName = "SVGMorphDemo";

export default SVGMorphDemo;
