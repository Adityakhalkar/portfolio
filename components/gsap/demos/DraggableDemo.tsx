"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const DraggableDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useImperativeHandle(ref, () => ({
    play: () => {
      // Auto-demo
      if (knobRef.current) {
        gsap.to(knobRef.current, {
          rotation: 270,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: function () {
            const rotation = gsap.getProperty(knobRef.current, "rotation") as number;
            setValue(Math.round((rotation / 360) * 100));
          }
        });
      }
    },
    reset: () => {
      gsap.to(knobRef.current, {
        rotation: 0,
        duration: 1,
        ease: "power2.out",
        onUpdate: function () {
          const rotation = gsap.getProperty(knobRef.current, "rotation") as number;
          setValue(Math.round((rotation / 360) * 100));
        }
      });
      gsap.to(sliderRef.current, { x: 0, duration: 0.5 });
    },
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotary Knob
      Draggable.create(knobRef.current, {
        type: "rotation",
        inertia: true,
        bounds: { minRotation: 0, maxRotation: 360 },
        onDrag: function () {
          setValue(Math.round((this.rotation / 360) * 100));
        },
        onThrowUpdate: function () {
          setValue(Math.round((this.rotation / 360) * 100));
        }
      });

      // Linear Slider
      Draggable.create(sliderRef.current, {
        type: "x",
        bounds: containerRef.current,
        inertia: true,
        lockAxis: true,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center gap-16 bg-white dark:bg-black transition-colors duration-500">

      {/* Rotary Control */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10" />
        <div
          ref={knobRef}
          className="w-32 h-32 rounded-full border border-black dark:border-white flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        >
          <div className="absolute top-2 w-1 h-2 bg-black dark:bg-white" />
          <div className="text-2xl font-bold font-mono tracking-tighter">
            {value}
          </div>
        </div>
        <div className="text-center mt-4 text-[10px] tracking-[0.2em] opacity-50">GAIN CONTROL</div>
      </div>

      {/* Linear Slider */}
      <div className="w-64 h-12 relative flex items-center">
        <div className="absolute inset-0 border-b border-black/20 dark:border-white/20" />
        <div
          ref={sliderRef}
          className="w-12 h-12 border border-black dark:border-white bg-white dark:bg-black flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="w-1 h-4 bg-black dark:bg-white" />
        </div>
        <div className="absolute -bottom-6 w-full text-center text-[10px] tracking-[0.2em] opacity-50">FREQUENCY</div>
      </div>

    </div>
  );
});

DraggableDemo.displayName = "DraggableDemo";

export default DraggableDemo;
