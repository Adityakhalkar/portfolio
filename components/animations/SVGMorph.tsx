"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function SVGMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);
  const [currentShape, setCurrentShape] = useState(0);

  const shapes = [
    "M50,10 L90,90 L10,90 Z", // Triangle
    "M10,50 L50,10 L90,50 L50,90 Z", // Diamond
    "M50,10 A40,40 0 1,1 49.99,10", // Circle
    "M10,10 L90,10 L90,90 L10,90 Z", // Square
    "M50,10 L90,30 L70,90 L30,90 L10,30 Z", // Pentagon
  ];

  const shapeNames = ["Triangle", "Diamond", "Circle", "Square", "Pentagon"];

  useEffect(() => {
    // Auto-morph every 3 seconds
    const interval = setInterval(() => {
      morphToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentShape]);

  const morphToNext = () => {
    const nextShape = (currentShape + 1) % shapes.length;
    morphTo(nextShape);
  };

  const morphTo = (index: number) => {
    if (shapeRef.current) {
      gsap.to(shapeRef.current, {
        morphSVG: shapes[index],
        duration: 1,
        ease: "power2.inOut",
      });
      setCurrentShape(index);
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          SVG Morphing
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-6">
          <svg
            viewBox="0 0 100 100"
            className="w-64 h-64 mx-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))" }}
          >
            <path
              ref={shapeRef}
              d={shapes[0]}
              fill="white"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="text-center mb-6">
          <p className="text-white text-lg font-semibold">
            Current: {shapeNames[currentShape]}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {shapeNames.map((name, index) => (
            <button
              key={name}
              onClick={() => morphTo(index)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentShape === index
                  ? "bg-white text-blue-600 scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 SVG Morphing</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>MorphSVG:</strong> Smoothly transforms between SVG paths</li>
          <li>• <strong>Auto-morph:</strong> Changes shape every 3 seconds</li>
          <li>• <strong>Click buttons:</strong> Morph to specific shape instantly</li>
          <li>• <strong>Note:</strong> Requires GSAP Club plugin (MorphSVGPlugin)</li>
        </ul>
      </div>
    </div>
  );
}
