"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const CustomEasingDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const easings = [
    { name: "power1.inOut", label: "SMOOTH" },
    { name: "elastic.out(1, 0.3)", label: "ELASTIC" },
    { name: "bounce.out", label: "BOUNCE" },
    { name: "expo.out", label: "SNAP" },
  ];

  useImperativeHandle(ref, () => ({
    play: () => {
      easings.forEach((easing, index) => {
        const ball = ballRefs.current[index];
        const line = lineRefs.current[index];

        if (ball && line) {
          gsap.fromTo(
            ball,
            { x: 0 },
            {
              x: 300,
              duration: 2,
              ease: easing.name,
              delay: index * 0.2,
            }
          );

          // Animate the progress line
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 2,
              ease: easing.name,
              delay: index * 0.2,
              transformOrigin: "left center"
            }
          );
        }
      });
    },
    reset: () => {
      gsap.to(ballRefs.current, {
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(lineRefs.current, {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    },
  }));

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-center bg-white dark:bg-black transition-colors duration-500 px-12">
      <div className="mb-12 text-center">
        <h2 className="text-xs font-bold tracking-[0.5em] mb-2">MOTION PHYSICS</h2>
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10" />
      </div>

      <div className="space-y-12">
        {easings.map((easing, index) => (
          <div key={easing.name} className="relative">
            <div className="flex justify-between text-[10px] font-mono mb-2 opacity-50">
              <span>0.0s</span>
              <span>{easing.label}</span>
              <span>2.0s</span>
            </div>

            {/* Track */}
            <div className="relative h-px bg-black/10 dark:bg-white/10 w-[300px]">
              {/* Progress Line */}
              <div
                ref={(el) => { lineRefs.current[index] = el; }}
                className="absolute top-0 left-0 h-full bg-black dark:bg-white w-full origin-left scale-x-0"
              />

              {/* Ball */}
              <div
                ref={(el) => { ballRefs.current[index] = el; }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-black dark:bg-white rounded-full z-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

CustomEasingDemo.displayName = "CustomEasingDemo";

export default CustomEasingDemo;
