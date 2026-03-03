"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const RackFocusDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const knobRef = useRef<HTMLDivElement>(null);
  const [focusDistance, setFocusDistance] = useState(0.5); // 0 = near, 1 = far

  useImperativeHandle(ref, () => ({
    play: () => {
      // Auto rack focus
      gsap.to(knobRef.current, {
        rotation: 180,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          const r = gsap.getProperty(this.targets()[0], "rotation") as number;
          updateFocus(r / 180);
        },
        yoyo: true,
        repeat: 1
      });
    },
    reset: () => {
      gsap.to(knobRef.current, {
        rotation: 90,
        duration: 1,
        onUpdate: function () {
          const r = gsap.getProperty(this.targets()[0], "rotation") as number;
          updateFocus(r / 180);
        }
      });
    },
  }));

  const updateFocus = (progress: number) => {
    // progress: 0 (near) -> 1 (far)
    setFocusDistance(progress);

    // Layer 0 (Near): Clear at 0, blurry at 1
    gsap.set(layersRef.current[0], {
      filter: `blur(${progress * 10}px)`,
      opacity: 1 - progress * 0.5
    });

    // Layer 1 (Mid): Blurry at 0, Clear at 0.5, Blurry at 1
    const midBlur = Math.abs(progress - 0.5) * 20;
    gsap.set(layersRef.current[1], {
      filter: `blur(${midBlur}px)`,
      opacity: 1
    });

    // Layer 2 (Far): Blurry at 0, Clear at 1
    gsap.set(layersRef.current[2], {
      filter: `blur(${(1 - progress) * 10}px)`,
      opacity: 0.5 + progress * 0.5
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      Draggable.create(knobRef.current, {
        type: "rotation",
        bounds: { minRotation: 0, maxRotation: 180 },
        onDrag: function () {
          updateFocus(this.rotation / 180);
        }
      });

      // Initial state
      gsap.set(knobRef.current, { rotation: 90 });
      updateFocus(0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">

      {/* Layer 2: Far (Background) */}
      <div
        ref={el => { layersRef.current[2] = el; }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale"
      />

      {/* Layer 1: Mid (Subject) */}
      <div
        ref={el => { layersRef.current[1] = el; }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-9xl font-black text-white mix-blend-difference tracking-tighter">
          FOCUS
        </div>
      </div>

      {/* Layer 0: Near (Foreground Elements) */}
      <div
        ref={el => { layersRef.current[0] = el; }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white opacity-50 rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border-l-4 border-white opacity-50" />
      </div>

      {/* Lens Control UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-white/20" />
          <div
            ref={knobRef}
            className="w-full h-full rounded-full border-2 border-white flex items-center justify-center cursor-grab active:cursor-grabbing bg-black/50 backdrop-blur-sm"
          >
            <div className="w-1 h-4 bg-white absolute top-2" />
            <div className="text-[10px] font-mono text-white mt-8">LENS</div>
          </div>
        </div>
        <div className="flex justify-between w-48 text-[10px] text-white font-mono tracking-widest opacity-50">
          <span>MACRO</span>
          <span>INF</span>
        </div>
      </div>

    </div>
  );
});

RackFocusDemo.displayName = "RackFocusDemo";

export default RackFocusDemo;
