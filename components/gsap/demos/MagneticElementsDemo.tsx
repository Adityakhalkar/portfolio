"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const MagneticElementsDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    play: () => {
      // Pulse effect
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      }
    },
    reset: () => {
      // Reset positions
      if (buttonRef.current) {
        gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5 });
      }
      dotsRef.current.forEach(dot => {
        if (dot) gsap.to(dot, { x: 0, y: 0, duration: 0.5 });
      });
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Magnetic Button
      if (buttonRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const btnX = btnRect.left - rect.left + btnRect.width / 2;
        const btnY = btnRect.top - rect.top + btnRect.height / 2;

        const dist = Math.hypot(mouseX - btnX, mouseY - btnY);
        const maxDist = 200;

        if (dist < maxDist) {
          const power = (1 - dist / maxDist) * 0.5;
          gsap.to(buttonRef.current, {
            x: (mouseX - btnX) * power,
            y: (mouseY - btnY) * power,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }
      }

      // Magnetic Field (Dots)
      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left - rect.left + dotRect.width / 2;
        const dotY = dotRect.top - rect.top + dotRect.height / 2;

        const dist = Math.hypot(mouseX - dotX, mouseY - dotY);
        const maxDist = 150;

        if (dist < maxDist) {
          const power = (1 - dist / maxDist) * 20; // Repel or attract
          const angle = Math.atan2(mouseY - dotY, mouseX - dotX);

          gsap.to(dot, {
            x: Math.cos(angle) * power,
            y: Math.sin(angle) * power,
            duration: 0.3,
            ease: "power1.out"
          });
        } else {
          gsap.to(dot, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black relative overflow-hidden transition-colors duration-500">
      {/* Dot Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <div
              ref={el => { dotsRef.current[i] = el; }}
              className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Magnetic Button */}
      <button
        ref={buttonRef}
        className="relative z-10 w-32 h-32 rounded-full border border-black dark:border-white bg-transparent flex items-center justify-center group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
      >
        <span className="text-xs font-bold tracking-widest">HOVER</span>
      </button>
    </div>
  );
});

MagneticElementsDemo.displayName = "MagneticElementsDemo";

export default MagneticElementsDemo;
