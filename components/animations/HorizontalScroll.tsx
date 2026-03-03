"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { title: "Section 1", emoji: "🚀", color: "from-red-500 to-pink-500" },
    { title: "Section 2", emoji: "🎨", color: "from-orange-500 to-amber-500" },
    { title: "Section 3", emoji: "⚡", color: "from-yellow-500 to-lime-500" },
    { title: "Section 4", emoji: "🌊", color: "from-cyan-500 to-blue-500" },
    { title: "Section 5", emoji: "🎭", color: "from-purple-500 to-pink-500" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: panelsRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (panelsRef.current?.offsetWidth || 0),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="h-[80px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          👇 Scroll down to move horizontally
        </p>
      </div>

      <div className="overflow-hidden border-2 border-gray-200 dark:border-gray-700 rounded-b-lg">
        <div ref={panelsRef} className="flex w-full h-[400px]">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`panel w-full h-full flex-shrink-0 bg-gradient-to-br ${section.color} flex items-center justify-center`}
            >
              <div className="text-center text-white">
                <div className="text-8xl mb-4">{section.emoji}</div>
                <h3 className="text-4xl font-bold">{section.title}</h3>
                <p className="text-xl mt-2">Panel {index + 1} of {sections.length}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Horizontal Scrolling</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>xPercent:</strong> Translates horizontally based on scroll</li>
          <li>• <strong>Pin:</strong> Locks container while scrolling through</li>
          <li>• <strong>Snap:</strong> Automatically snaps to each section</li>
          <li>• <strong>Scrub:</strong> Smooth 1:1 scroll-to-animation mapping</li>
        </ul>
      </div>
    </div>
  );
}
