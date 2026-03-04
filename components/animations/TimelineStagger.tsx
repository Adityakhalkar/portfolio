"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function TimelineStagger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Title animation
      tl.from(".tl-title", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards stagger animation
      tl.from(
        ".tl-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotation: -10,
          duration: 0.6,
          stagger: {
            each: 0.15,
            from: "start",
            ease: "power2.out",
          },
        },
        "-=0.4"
      );

      // Button reveal
      tl.from(
        ".tl-button",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const playAnimation = () => {
    if (timelineRef.current) {
      setIsPlaying(true);
      timelineRef.current.restart();
      timelineRef.current.eventCallback("onComplete", () => {
        setIsPlaying(false);
      });
    }
  };

  const pauseAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.pause();
      setIsPlaying(false);
    }
  };

  const reverseAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
      setIsPlaying(true);
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="min-h-[400px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-8">
        <h2 className="tl-title text-4xl font-bold text-white text-center mb-8">
          Timeline Stagger Animation
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="tl-card bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-white font-semibold">Card 1</h3>
            <p className="text-white/80 text-sm">Appears first</p>
          </div>
          <div className="tl-card bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-white font-semibold">Card 2</h3>
            <p className="text-white/80 text-sm">Then me</p>
          </div>
          <div className="tl-card bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="text-white font-semibold">Card 3</h3>
            <p className="text-white/80 text-sm">Finally me</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={playAnimation}
            disabled={isPlaying}
            className="tl-button px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
          >
            ▶️ Play
          </button>
          <button
            onClick={pauseAnimation}
            className="tl-button px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            ⏸️ Pause
          </button>
          <button
            onClick={reverseAnimation}
            className="tl-button px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            ◀️ Reverse
          </button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Timeline Features</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>Sequential:</strong> Animations happen one after another</li>
          <li>• <strong>Stagger:</strong> Delay between each card (0.15s)</li>
          <li>• <strong>Timeline Control:</strong> Play, pause, reverse anytime</li>
          <li>• <strong>Overlap:</strong> &ldquo;-=0.4&rdquo; starts before previous animation ends</li>
        </ul>
      </div>
    </div>
  );
}
