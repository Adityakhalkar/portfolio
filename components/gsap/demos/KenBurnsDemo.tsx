"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const KenBurnsDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Slow, hypnotic pan and zoom
      tl.fromTo(
        imageRef.current,
        {
          scale: 1.1,
          xPercent: 0,
          yPercent: 0,
        },
        {
          scale: 1.4,
          xPercent: -10,
          yPercent: -5,
          duration: 20,
          ease: "sine.inOut",
        }
      );

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      {/* Cinematic Letterbox Container */}
      <div className="relative w-full max-w-2xl aspect-[2.35/1] overflow-hidden bg-black group">

        {/* Image Layer */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 transition-opacity duration-1000 group-hover:opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop')",
            filter: "grayscale(100%) contrast(120%)",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Text Overlay */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="text-white text-[10px] tracking-[0.5em] font-mono mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            LOCATION
          </div>
          <div className="text-white text-2xl font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            HIGHLANDS
          </div>
        </div>

        {/* Film Grain (Simulated) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
});

KenBurnsDemo.displayName = "KenBurnsDemo";

export default KenBurnsDemo;
