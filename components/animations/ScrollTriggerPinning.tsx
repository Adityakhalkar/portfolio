"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerPinning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the element while scrolling through panels
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        markers: false,
      });

      // Animate panels on scroll
      gsap.to(panel1Ref.current, {
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
          trigger: panel1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        panel2Ref.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: panel2Ref.current,
            start: "top center",
            end: "center top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        panel3Ref.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: panel3Ref.current,
            start: "top center",
            end: "center top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="h-[80px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          👇 Scroll down to see pinning effect
        </p>
      </div>

      <div className="relative h-[600px] overflow-y-auto border-2 border-gray-200 dark:border-gray-700 rounded-b-lg">
        <div ref={pinnedRef} className="sticky top-0 h-[200px] bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-2">📌 Pinned Element</h3>
            <p className="text-sm">I stay in place while you scroll!</p>
          </div>
        </div>

        <div ref={panel1Ref} className="h-[200px] bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-bold">Panel 1</h3>
            <p className="text-sm">Fades out as you scroll</p>
          </div>
        </div>

        <div ref={panel2Ref} className="h-[200px] bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-bold">Panel 2</h3>
            <p className="text-sm">Fades in from the bottom</p>
          </div>
        </div>

        <div ref={panel3Ref} className="h-[200px] bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-bold">Panel 3</h3>
            <p className="text-sm">Final panel with animation</p>
          </div>
        </div>

        <div className="h-[100px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            End of scroll area
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 What&apos;s happening?</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>Pin:</strong> Element stays fixed during scroll</li>
          <li>• <strong>Scrub:</strong> Animation tied to scroll position</li>
          <li>• <strong>Triggers:</strong> start/end points control when animations fire</li>
        </ul>
      </div>
    </div>
  );
}
