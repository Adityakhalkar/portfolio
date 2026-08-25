"use client";

import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current!;
    el.style.transition = "transform 0.1s linear";
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 → 1
    const y = (e.clientY - rect.top) / rect.height; // 0 → 1
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  function onMouseLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </div>
  );
}

// Demo used in the library preview
export function TiltCardDemo() {
  return (
    <TiltCard className="w-72 border border-concrete/10 bg-white/2 p-8 cursor-none">
      <div
        className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 mb-6"
        style={{ transform: "translateZ(20px)" }}
      />
      <h3
        className="text-concrete text-lg font-['Space_Mono'] mb-2"
        style={{ transform: "translateZ(15px)" }}
      >
        Tilt Card
      </h3>
      <p
        className="text-secondary text-sm leading-relaxed font-['Space_Mono']"
        style={{ transform: "translateZ(10px)" }}
      >
        Hover to see the 3D perspective effect. Each layer has depth.
      </p>
    </TiltCard>
  );
}

export const tiltCardCode = `"use client";

import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current!;
    el.style.transition = "transform 0.1s linear";
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    el.style.transform = \`perspective(900px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)\`;
  }

  function onMouseLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </div>
  );
}`;
