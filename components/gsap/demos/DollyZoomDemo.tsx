"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const DollyZoomDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    const ctx = gsap.context(() => {
      if (!foregroundRef.current || !backgroundRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // The Vertigo effect: zoom out while moving closer
      // Background expands (zooms in)
      tl.to(backgroundRef.current, {
        scale: 2,
        ease: "none",
      }, 0);

      // Foreground shrinks (zooms out) to counteract the movement, staying roughly same size but changing perspective
      tl.to(foregroundRef.current, {
        scale: 0.5,
        ease: "none",
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-black transition-colors duration-500">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="h-32 flex items-center justify-center text-xs tracking-widest uppercase border-b border-black/10 dark:border-white/10">
          <div className="mb-2">Scroll for Vertigo</div>
          <div className="w-[1px] h-8 bg-black dark:bg-white animate-bounce" />
        </div>

        <div ref={containerRef} className="h-[200vh] relative">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">

            {/* Background: Tunnel / Hallway */}
            <div
              ref={backgroundRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_100%)] opacity-10" />

              {/* Grid lines for perspective */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-8 opacity-20 transform scale-150">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-black dark:border-white" />
                ))}
              </div>
            </div>

            {/* Foreground Subject */}
            <div
              ref={foregroundRef}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              <div className="w-48 h-48 border-[20px] border-black dark:border-white flex items-center justify-center bg-white dark:bg-black">
                <div className="w-16 h-16 bg-black dark:bg-white rounded-full" />
              </div>
              <div className="mt-8 text-center bg-white dark:bg-black px-4 py-2">
                <h2 className="text-2xl font-bold tracking-tighter">FOCUS</h2>
                <p className="text-[10px] tracking-[0.3em] uppercase">Subject Remains Constant</p>
              </div>
            </div>

          </div>
        </div>

        <div className="h-32 flex items-center justify-center text-xs tracking-widest opacity-20 border-t border-black/10 dark:border-white/10">
          END SCENE
        </div>
      </div>
    </div>
  );
});

DollyZoomDemo.displayName = "DollyZoomDemo";

export default DollyZoomDemo;
