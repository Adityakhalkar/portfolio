"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { gsap } from "gsap";

export interface DemoControls {
  play: () => void;
  reset: () => void;
}

const Transform3DDemo = forwardRef<DemoControls>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [rotationAxis, setRotationAxis] = useState<"x" | "y" | "z" | "all">("all");
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const autoRotateRef = useRef<gsap.core.Tween | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (cubeRef.current) {
        const tl = gsap.timeline();

        if (rotationAxis === "all") {
          tl.to(cubeRef.current, {
            rotateX: "+=360",
            rotateY: "+=360",
            rotateZ: "+=180",
            duration: 3,
            ease: "expo.inOut",
          })
            .to(cubeRef.current, {
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            }, "-=2")
            .to(cubeRef.current, {
              scale: 1,
              duration: 0.5,
              ease: "power2.in",
            }, "-=1");
        } else {
          const rotation = {
            x: { rotateX: "+=360", rotateY: "+=45" },
            y: { rotateY: "+=360", rotateX: "+=45" },
            z: { rotateZ: "+=360", rotateY: "+=90" },
          };

          tl.to(cubeRef.current, {
            ...rotation[rotationAxis],
            duration: 2,
            ease: "power3.inOut",
          });
        }
      }
    },
    reset: () => {
      if (autoRotateRef.current) {
        autoRotateRef.current.kill();
      }
      setIsAutoRotating(false);
      if (cubeRef.current) {
        gsap.to(cubeRef.current, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    },
  }));

  const toggleAutoRotate = () => {
    if (isAutoRotating && autoRotateRef.current) {
      autoRotateRef.current.kill();
      setIsAutoRotating(false);
    } else if (cubeRef.current) {
      autoRotateRef.current = gsap.to(cubeRef.current, {
        rotateX: "+=360",
        rotateY: "+=360",
        rotateZ: "+=180",
        duration: 12, // Slower for elegance
        repeat: -1,
        ease: "none",
      });
      setIsAutoRotating(true);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      <div
        style={{
          perspective: "1200px", // Flatter perspective
          perspectiveOrigin: "50% 50%",
        }}
        className="mb-12"
      >
        <div
          ref={cubeRef}
          className="relative w-40 h-40"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Faces */}
          {[
            { name: "FRONT", transform: "translateZ(80px)" },
            { name: "BACK", transform: "rotateY(180deg) translateZ(80px)" },
            { name: "RIGHT", transform: "rotateY(90deg) translateZ(80px)" },
            { name: "LEFT", transform: "rotateY(-90deg) translateZ(80px)" },
            { name: "TOP", transform: "rotateX(90deg) translateZ(80px)" },
            { name: "BOTTOM", transform: "rotateX(-90deg) translateZ(80px)" },
          ].map((face) => (
            <div
              key={face.name}
              className="absolute w-full h-full bg-white dark:bg-black border border-black/10 dark:border-white/10 flex flex-col items-center justify-center p-4"
              style={{ transform: face.transform }}
            >
              <div className="absolute top-2 left-2 w-2 h-2 border border-black dark:border-white" />
              <div className="absolute top-2 right-2 w-2 h-2 border border-black dark:border-white" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border border-black dark:border-white" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border border-black dark:border-white" />

              <span className="text-[10px] font-mono tracking-[0.2em] mb-2 opacity-50">ARCHITECTURAL</span>
              <span className="text-sm font-bold tracking-widest">{face.name}</span>
              <div className="w-8 h-[1px] bg-black dark:bg-white mt-4" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 text-[10px] tracking-widest uppercase items-center">
        <div className="flex gap-4">
          {(["x", "y", "z", "all"] as const).map((axis) => (
            <button
              key={axis}
              onClick={() => setRotationAxis(axis)}
              className={`transition-colors duration-300 ${rotationAxis === axis
                  ? "text-black dark:text-white font-bold"
                  : "text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
            >
              {axis === "all" ? "MULTI" : axis}
            </button>
          ))}
        </div>
        <div className="w-[1px] h-4 bg-neutral-200 dark:bg-neutral-800" />
        <button
          onClick={toggleAutoRotate}
          className={`transition-colors duration-300 ${isAutoRotating
              ? "text-black dark:text-white font-bold"
              : "text-neutral-400 hover:text-black dark:hover:text-white"
            }`}
        >
          {isAutoRotating ? "STOP" : "AUTO"}
        </button>
      </div>
    </div>
  );
});

Transform3DDemo.displayName = "Transform3DDemo";

export default Transform3DDemo;
