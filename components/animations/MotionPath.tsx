"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function MotionPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, repeat: -1 });

      tl.to(rocketRef.current, {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: "#motion-path",
          align: "#motion-path",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      });

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const startAnimation = () => {
    if (tlRef.current) {
      tlRef.current.play();
      setIsAnimating(true);
    }
  };

  const stopAnimation = () => {
    if (tlRef.current) {
      tlRef.current.pause();
      setIsAnimating(false);
    }
  };

  const restartAnimation = () => {
    if (tlRef.current) {
      tlRef.current.restart();
      setIsAnimating(true);
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Motion Path Animation
        </h2>

        <div className="bg-white/5 rounded-lg p-8 mb-6 relative">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-64"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Motion path (visible) */}
            <path
              id="motion-path"
              d="M 50,150 Q 100,50 200,100 T 350,150"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Stars background */}
            <circle cx="80" cy="40" r="1.5" fill="white" opacity="0.6" />
            <circle cx="150" cy="70" r="1" fill="white" opacity="0.4" />
            <circle cx="320" cy="50" r="1.5" fill="white" opacity="0.7" />
            <circle cx="280" cy="200" r="1" fill="white" opacity="0.5" />
            <circle cx="100" cy="250" r="1.5" fill="white" opacity="0.6" />
          </svg>

          {/* Rocket that follows path */}
          <div
            ref={rocketRef}
            className="absolute top-0 left-0 text-4xl"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            🚀
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶️ Start
          </button>
          <button
            onClick={stopAnimation}
            disabled={!isAnimating}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⏸️ Stop
          </button>
          <button
            onClick={restartAnimation}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            🔄 Restart
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Motion Path Features</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>motionPath:</strong> Element follows SVG path coordinates</li>
          <li>• <strong>autoRotate:</strong> Element rotates to face direction</li>
          <li>• <strong>align:</strong> Positions element along the path</li>
          <li>• <strong>alignOrigin:</strong> Sets rotation pivot point [0.5, 0.5]</li>
        </ul>
      </div>
    </div>
  );
}
