"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HolographicCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const glare = glareRef.current;

    if (!card || !content || !glare) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation (max 10 degrees for subtle feel)
      const rotateX = (mouseY / (rect.height / 2)) * -10;
      const rotateY = (mouseX / (rect.width / 2)) * 10;

      // Glare position
      const glareX = (mouseX / (rect.width / 2)) * 100;
      const glareY = (mouseY / (rect.height / 2)) * 100;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      });

      gsap.to(content, {
        x: mouseX * 0.05,
        y: mouseY * 0.05,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(glare, {
        x: `${glareX}%`,
        y: `${glareY}%`,
        opacity: 0.3, // Reduced opacity for subtlety
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out", // Smoother ease
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(glare, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px] perspective-1000 bg-gray-50 dark:bg-neutral-900 transition-colors duration-500">
      <div
        ref={cardRef}
        className="relative w-80 h-52 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl cursor-pointer border border-white/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* Glare Effect - White for monochrome */}
        <div
          ref={glareRef}
          className="absolute -inset-full w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 pointer-events-none z-50 mix-blend-overlay"
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Content Layer (Parallax) */}
        <div
          ref={contentRef}
          className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="font-mono text-xs tracking-widest opacity-50">001</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight">Holographic</h3>
            <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Interaction Design</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="font-mono text-xs text-white/40">
              **** **** **** 4023
            </div>
            <div className="text-xs font-medium">
              EXP 12/28
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
