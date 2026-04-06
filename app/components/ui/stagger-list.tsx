"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StaggerListProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
}

export function StaggerList({
  children,
  stagger = 80,
  duration = 400,
  className,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];

    // Set initial state
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "none";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        items.forEach((el, i) => {
          el.style.transition = `opacity ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1), transform ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`;
          el.style.transitionDelay = `${i * stagger}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });

        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [stagger, duration]);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}

// Demo used in the library preview
const DEMO_ITEMS = [
  { label: "Design Systems", meta: "12 components" },
  { label: "Motion Principles", meta: "8 patterns" },
  { label: "Typography Scale", meta: "6 variants" },
  { label: "Color Tokens", meta: "24 values" },
  { label: "Spacing Grid", meta: "16 steps" },
];

export function StaggerListDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      <StaggerList key={key} className="w-full divide-y divide-white/8">
        {DEMO_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-3"
          >
            <span className="text-sm text-concrete font-['Space_Mono']">
              {item.label}
            </span>
            <span className="text-xs text-secondary font-['Space_Mono']">
              {item.meta}
            </span>
          </div>
        ))}
      </StaggerList>
      <button
        onClick={() => setKey((k: number) => k + 1)}
        className="text-xs text-secondary hover:text-accent transition-colors duration-200 font-['Space_Mono'] tracking-widest uppercase border border-secondary/20 hover:border-accent/40 px-4 py-2"
      >
        Replay
      </button>
    </div>
  );
}

export const staggerListCode = `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StaggerListProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
}

export function StaggerList({
  children,
  stagger = 80,
  duration = 400,
  className,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "none";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        items.forEach((el, i) => {
          el.style.transition = \`opacity \${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1), transform \${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)\`;
          el.style.transitionDelay = \`\${i * stagger}ms\`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });

        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [stagger, duration]);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}`;
