"use client";

import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current!;
    el.style.transition = "transform 0.1s linear";
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onMouseLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)";
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}

// Demo used in the library preview
export function MagneticButtonDemo() {
  return (
    <MagneticButton className="px-10 py-5 border border-concrete/20 text-concrete text-sm tracking-widest uppercase font-['Space_Mono'] hover:border-accent hover:text-accent transition-colors duration-200 cursor-none">
      Get Started →
    </MagneticButton>
  );
}

export const magneticButtonCode = `"use client";

import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current!;
    el.style.transition = "transform 0.1s linear";
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = \`translate(\${x * strength}px, \${y * strength}px)\`;
  }

  function onMouseLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)";
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}`;
