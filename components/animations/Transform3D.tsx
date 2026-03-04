"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Transform3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const rotate3D = (axis: "x" | "y" | "z") => {
    if (!cubeRef.current || isAnimating) return;

    setIsAnimating(true);
    const rotations = {
      x: { rotateX: "+=360" },
      y: { rotateY: "+=360" },
      z: { rotateZ: "+=360" },
    };

    gsap.to(cubeRef.current, {
      ...rotations[axis],
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => setIsAnimating(false),
    });
  };

  const flip = () => {
    if (!cubeRef.current || isAnimating) return;

    setIsAnimating(true);
    gsap.to(cubeRef.current, {
      rotateY: "+=180",
      rotateX: "+=180",
      duration: 1,
      ease: "back.inOut(1.5)",
      onComplete: () => setIsAnimating(false),
    });
  };

  const wobble = () => {
    if (!cubeRef.current || isAnimating) return;

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(cubeRef.current, {
      rotateX: 20,
      rotateY: 20,
      duration: 0.2,
    })
      .to(cubeRef.current, {
        rotateX: -20,
        rotateY: -20,
        duration: 0.2,
      })
      .to(cubeRef.current, {
        rotateX: 15,
        rotateY: 15,
        duration: 0.15,
      })
      .to(cubeRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.15,
      });
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          3D Transforms
        </h2>

        <div
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
          className="mb-8 flex items-center justify-center h-64"
        >
          <div
            ref={cubeRef}
            className="relative w-32 h-32"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "translateZ(64px)",
              }}
            >
              Front
            </div>
            {/* Back face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "rotateY(180deg) translateZ(64px)",
              }}
            >
              Back
            </div>
            {/* Right face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "rotateY(90deg) translateZ(64px)",
              }}
            >
              Right
            </div>
            {/* Left face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "rotateY(-90deg) translateZ(64px)",
              }}
            >
              Left
            </div>
            {/* Top face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "rotateX(90deg) translateZ(64px)",
              }}
            >
              Top
            </div>
            {/* Bottom face */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
              style={{
                transform: "rotateX(-90deg) translateZ(64px)",
              }}
            >
              Bottom
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => rotate3D("x")}
            disabled={isAnimating}
            className="px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            🔄 Rotate X
          </button>
          <button
            onClick={() => rotate3D("y")}
            disabled={isAnimating}
            className="px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            🔄 Rotate Y
          </button>
          <button
            onClick={() => rotate3D("z")}
            disabled={isAnimating}
            className="px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            🔄 Rotate Z
          </button>
          <button
            onClick={flip}
            disabled={isAnimating}
            className="px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            🌀 Flip
          </button>
          <button
            onClick={wobble}
            disabled={isAnimating}
            className="px-4 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors disabled:opacity-50 col-span-2 backdrop-blur-sm"
          >
            📳 Wobble
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 3D Transform Properties</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>rotateX/Y/Z:</strong> Rotation around each axis</li>
          <li>• <strong>perspective:</strong> Creates 3D depth (1000px)</li>
          <li>• <strong>transformStyle: preserve-3d:</strong> Maintains 3D space</li>
          <li>• <strong>translateZ:</strong> Moves elements in 3D space</li>
        </ul>
      </div>
    </div>
  );
}
