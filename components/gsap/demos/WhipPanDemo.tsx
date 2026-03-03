"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const WhipPanDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const blurLinesRef = useRef<HTMLDivElement>(null);
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
      // Set initial states
      gsap.set(scene2Ref.current, { xPercent: 100 });
      gsap.set(blurLinesRef.current, { opacity: 0, scaleX: 2 });

      const tl = gsap.timeline({ paused: true });

      // Whip pan sequence
      tl.to(blurLinesRef.current, { opacity: 1, duration: 0.1 })
        .to(scene1Ref.current, {
          xPercent: -100,
          duration: 0.4,
          ease: "expo.inOut",
        }, "<")
        .to(scene2Ref.current, {
          xPercent: 0,
          duration: 0.4,
          ease: "expo.inOut",
        }, "<")
        .to(blurLinesRef.current, { opacity: 0, duration: 0.1 }, "-=0.1");

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">

      {/* Scene 1: Day / Structure */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 bg-white flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-32 h-32 border-4 border-black mb-8 mx-auto" />
          <div className="text-black text-4xl font-bold tracking-tighter">STRUCTURE</div>
          <div className="text-black/50 text-xs tracking-[0.5em] mt-2">SCENE 01</div>
        </div>
      </div>

      {/* Scene 2: Night / Void */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 bg-black flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-32 h-32 rounded-full border-4 border-white mb-8 mx-auto" />
          <div className="text-white text-4xl font-bold tracking-tighter">VOID</div>
          <div className="text-white/50 text-xs tracking-[0.5em] mt-2">SCENE 02</div>
        </div>
      </div>

      {/* Motion Blur Lines (Overlay) */}
      <div
        ref={blurLinesRef}
        className="absolute inset-0 pointer-events-none flex flex-col justify-between py-12 opacity-0 mix-blend-difference"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-[2px] bg-white opacity-50"
            style={{
              width: `${Math.random() * 50 + 50}%`,
              marginLeft: `${Math.random() * 50}%`
            }}
          />
        ))}
      </div>

    </div>
  );
});

WhipPanDemo.displayName = "WhipPanDemo";

export default WhipPanDemo;
