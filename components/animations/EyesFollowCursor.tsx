"use client";

import { useEffect, useRef, useState } from "react";

export default function EyesFollowCursor() {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isBlinking) return;

      const eyes = [leftEyeRef.current, rightEyeRef.current];

      eyes.forEach((eye) => {
        if (!eye) return;

        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) / 10, 15);

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        const pupil = eye.querySelector(".pupil") as HTMLElement;
        if (pupil) {
          pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        }
      });
    };

    // Blink effect
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, [isBlinking]);

  return (
    <div className="flex items-center justify-center gap-12">
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="relative w-32 h-40 bg-white flex items-center justify-center shadow-lg border-4 border-gray-800 overflow-hidden"
        style={{ borderRadius: "50%" }}
      >
        <div
          className={`pupil w-12 h-12 bg-black rounded-full transition-transform duration-100 ease-out ${
            isBlinking ? "scale-y-0" : "scale-y-100"
          }`}
          style={{ transition: "transform 0.1s ease-out" }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
        </div>
        {/* Eyelid */}
        <div
          className={`absolute inset-0 bg-gray-800 transition-all duration-200 origin-top ${
            isBlinking ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ borderRadius: "50%" }}
        />
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="relative w-32 h-40 bg-white flex items-center justify-center shadow-lg border-4 border-gray-800 overflow-hidden"
        style={{ borderRadius: "50%" }}
      >
        <div
          className={`pupil w-12 h-12 bg-black rounded-full transition-transform duration-100 ease-out ${
            isBlinking ? "scale-y-0" : "scale-y-100"
          }`}
          style={{ transition: "transform 0.1s ease-out" }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
        </div>
        {/* Eyelid */}
        <div
          className={`absolute inset-0 bg-gray-800 transition-all duration-200 origin-top ${
            isBlinking ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
