"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Different speed parallax layers
      gsap.to(layer1Ref.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(layer2Ref.current, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(layer3Ref.current, {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(textRef.current, {
        y: 50,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <div className="h-[80px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          👇 Scroll to see parallax effect
        </p>
      </div>

      <div ref={containerRef} className="relative h-[500px] overflow-hidden border-2 border-gray-200 dark:border-gray-700 rounded-b-lg bg-gradient-to-b from-blue-900 to-purple-900">
        {/* Background layer - slowest */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-9xl opacity-20">🌄</div>
        </div>

        {/* Middle layer - medium speed */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex gap-8">
            <div className="text-7xl opacity-40">🌲</div>
            <div className="text-7xl opacity-40">🌲</div>
          </div>
        </div>

        {/* Foreground layer - fastest */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex gap-12">
            <div className="text-5xl">🦌</div>
            <div className="text-5xl">🏕️</div>
          </div>
        </div>

        {/* Text layer */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-2">Parallax Effect</h2>
            <p className="text-lg opacity-80">Different layers, different speeds</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Parallax Layers</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>Layer 1 (Mountains):</strong> Slowest - moves -100px</li>
          <li>• <strong>Layer 2 (Trees):</strong> Medium - moves -50px</li>
          <li>• <strong>Layer 3 (Deer/Camp):</strong> Fastest - moves -150px</li>
          <li>• <strong>Text:</strong> Fades out as you scroll</li>
        </ul>
      </div>
    </div>
  );
}
