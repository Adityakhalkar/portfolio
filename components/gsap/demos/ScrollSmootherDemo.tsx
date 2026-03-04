"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import gsap from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const ScrollSmootherDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState(0);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          scrollContainerRef.current?.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
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
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    let lastScrollTop = 0;
    let lastTime = Date.now();

    const handleScroll = () => {
      const scrollTop = scroller.scrollTop;
      const now = Date.now();
      const dt = now - lastTime;

      if (dt > 0) {
        const v = Math.abs(scrollTop - lastScrollTop) / dt;
        setVelocity(Math.min(v * 10, 100)); // Normalize somewhat
      }

      lastScrollTop = scrollTop;
      lastTime = now;
    };

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-white dark:bg-black transition-colors duration-500 relative">

      {/* Velocity Meter (Fixed) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1">
        <div className="text-[10px] font-mono tracking-widest opacity-50">VELOCITY</div>
        <div className="w-32 h-1 bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-100"
            style={{ width: `${velocity}%` }}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="min-h-[200vh] p-8 flex flex-col items-center gap-32">

          <div className="text-center mt-20">
            <div className="text-xs tracking-[0.5em] mb-4">MOMENTUM</div>
            <div className="w-[1px] h-32 bg-black dark:bg-white mx-auto" />
          </div>

          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full max-w-md flex items-center gap-8 even:flex-row-reverse">
              <div className="w-1/2 aspect-square bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <span className="text-4xl font-bold opacity-10">0{i}</span>
              </div>
              <div className="w-1/2 space-y-4">
                <div className="h-2 w-full bg-black/10 dark:bg-white/10" />
                <div className="h-2 w-2/3 bg-black/10 dark:bg-white/10" />
                <div className="h-2 w-1/2 bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          ))}

          <div className="text-center mb-20">
            <div className="w-[1px] h-32 bg-black dark:bg-white mx-auto mb-4" />
            <div className="text-xs tracking-[0.5em]">FIN</div>
          </div>

        </div>
      </div>
    </div>
  );
});

ScrollSmootherDemo.displayName = "ScrollSmootherDemo";

export default ScrollSmootherDemo;
