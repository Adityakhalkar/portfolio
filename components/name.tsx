"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Name: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const totalFrames = 21; // Total frames in the GIF
  const duration = 1.5; // GIF duration in seconds
  const frameInterval = (duration / totalFrames) * 1000; // Time per frame in ms
  const [cycleCount, setCycleCount] = useState(0);
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => {
        // When frame reaches the end of a cycle
        if (prev + 1 >= totalFrames) {
          setCycleCount((currentCycle) => {
            // Increment cycle count
            const newCycleCount = currentCycle + 1;
            
            // Reset GIF after 5 cycles
            if (newCycleCount >= 5) {
              setGifKey(prev => prev + 1);
              return 0; // Reset cycle count
            }
            
            return newCycleCount;
          });
        }
        return (prev + 1) % totalFrames;
      });
    }, frameInterval);
    return () => clearInterval(interval);
  }, [frameInterval, totalFrames]);

  return (
    <div className="relative inline-block font-['Press_Start_2P'] text-black dark:text-white text-4xl text-center">
      {/* First line */}
      <span className="block relative z-10 text-zinc-500">Hey!</span>
      {/* Second line */}
      <span className="z-10">
        <span className="text-zinc-500">I am </span>
        Aditya Khalk
        <span
          className={`
            ${frame >= 15 && frame <= 20 ? "animate-[lower_1s_ease-in-out]" : ""}
            inline-block
          `}
        >a</span>
        <span
          className={`
            ${frame >= 5 && frame <= 10  ? "animate-[lower_1s_ease-in-out]" : ""}
            inline-block
          `}
        >r</span>
        <span className="text-zinc-500">!</span>
      </span>
      {/* Jumping cat GIF */}
      <Image
        key={gifKey}
        src="/pixel-cat-unscreen.gif"
        alt="Jumping Cat"
        className="absolute sm:top-[-3.8rem] sm:left-[42rem] top-[-0.8rem] left-[7.6rem] transform -translate-x-1/2 z-20 h-16 sm:h-28 pointer-events-none"
        width={180}
        height={64}
      />
    </div>
  );
};

export default Name;
