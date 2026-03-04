"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CRITICAL_IMAGES = ["/human.png", "/robo.png", "/skeleton.png"];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    let imagesLoaded = false;
    let counterDone = false;

    const finish = () => {
      if (done.current) return;
      done.current = true;

      // Simple fade out -- no redundant clip wipe
      gsap.to(innerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: "power2.inOut",
        onComplete,
      });
    };

    // Preload critical hero images
    let loadedCount = 0;
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount >= CRITICAL_IMAGES.length) {
          imagesLoaded = true;
          if (counterDone) finish();
        }
      };
      img.src = src;
    });

    // Animate counter 0 -> 100
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.val)),
      onComplete: () => {
        counterDone = true;
        if (imagesLoaded) finish();
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-white dark:bg-void flex items-center justify-center"
    >
      {/* Counter inside bracket frame */}
      <div ref={innerRef} className="relative">
        {/* Corner brackets */}
        <span className="absolute -top-4 -left-5 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-black dark:border-white" />
        <span className="absolute -top-4 -right-5 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-black dark:border-white" />
        <span className="absolute -bottom-4 -left-5 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-black dark:border-white" />
        <span className="absolute -bottom-4 -right-5 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-black dark:border-white" />

        <span
          className="block text-5xl md:text-7xl font-bold text-black dark:text-white tabular-nums tracking-tight"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
