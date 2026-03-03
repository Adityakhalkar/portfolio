"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function CustomEasing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedEase, setSelectedEase] = useState("power2.out");

  const easings = [
    { name: "Linear", value: "none", color: "from-gray-400 to-gray-500" },
    { name: "Power2 Out", value: "power2.out", color: "from-blue-400 to-blue-500" },
    { name: "Power4 InOut", value: "power4.inOut", color: "from-purple-400 to-purple-500" },
    { name: "Elastic Out", value: "elastic.out(1, 0.3)", color: "from-pink-400 to-rose-500" },
    { name: "Back Out", value: "back.out(1.7)", color: "from-orange-400 to-amber-500" },
    { name: "Bounce Out", value: "bounce.out", color: "from-green-400 to-emerald-500" },
  ];

  const animateBall = (index: number, ease: string) => {
    const ball = ballRefs.current[index];
    if (!ball) return;

    gsap.fromTo(
      ball,
      { x: 0 },
      {
        x: 300,
        duration: 2,
        ease: ease,
        repeat: -1,
        yoyo: true,
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      easings.forEach((easing, index) => {
        animateBall(index, easing.value);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const animateComparison = () => {
    ballRefs.current.forEach((ball, index) => {
      if (ball) {
        gsap.killTweensOf(ball);
        gsap.fromTo(
          ball,
          { x: 0 },
          {
            x: 300,
            duration: 2,
            ease: easings[index].value,
            repeat: -1,
            yoyo: true,
          }
        );
      }
    });
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Custom Easing Functions
        </h2>

        <div className="space-y-4 mb-6">
          {easings.map((easing, index) => (
            <div key={easing.name} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">
                  {easing.name}
                </span>
                <code className="text-xs text-white/60 font-mono bg-white/10 px-2 py-1 rounded">
                  {easing.value}
                </code>
              </div>
              <div className="relative h-12 bg-white/5 rounded-lg overflow-hidden">
                <div
                  ref={(el) => {
                    ballRefs.current[index] = el;
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${easing.color} shadow-lg`}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={animateComparison}
          className="w-full px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
        >
          🔄 Restart All Animations
        </button>
      </div>

      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Easing Functions Explained</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>Linear:</strong> Constant speed throughout</li>
          <li>• <strong>Power:</strong> Acceleration curves (power2, power3, power4)</li>
          <li>• <strong>Elastic:</strong> Spring-like bounce effect</li>
          <li>• <strong>Back:</strong> Overshoots then settles</li>
          <li>• <strong>Bounce:</strong> Bounces at the end</li>
          <li>• <strong>CustomEase:</strong> Create your own bezier curves!</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">🎨 Easing Visualization</h4>
        <p className="text-xs text-gray-700 dark:text-gray-300">
          Watch how each ball moves differently! The easing function determines the rate of change over time,
          creating different feels: smooth (power), bouncy (elastic), or springy (back).
        </p>
      </div>
    </div>
  );
}
