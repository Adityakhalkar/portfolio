"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET = "!<>-_\\/[]{}—=+*^?#@$%&";

interface ScrambleTextProps {
  text: string;
  trigger?: "mount" | "hover";
  duration?: number;
  charset?: string;
  className?: string;
}

export function ScrambleText({
  text,
  trigger = "mount",
  duration = 800,
  charset = DEFAULT_CHARSET,
  className,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const scramble = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const chars = charset.split("");
    const len = text.length;
    const start = performance.now();
    const resolveTime = duration / len;

    cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const elapsed = now - start;
      let output = "";

      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (elapsed >= i * resolveTime) {
          output += text[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = output;

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration, charset]);

  // Mount trigger — fires when scrolled into view
  useEffect(() => {
    if (trigger !== "mount") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, scramble]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {text}
    </span>
  );
}

// Demo
export function ScrambleTextDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6">
        <ScrambleText
          key={`a-${key}`}
          text="INITIALIZING SYSTEM"
          duration={1200}
          className="text-2xl font-['Space_Mono'] text-concrete tracking-widest"
        />
        <ScrambleText
          key={`b-${key}`}
          text="ACCESS GRANTED"
          duration={900}
          charset="01"
          className="text-sm font-['Space_Mono'] text-accent tracking-[0.3em]"
        />
        <ScrambleText
          trigger="hover"
          text="Hover over me"
          duration={600}
          className="text-sm font-['Space_Mono'] text-secondary hover:text-concrete transition-colors duration-150 cursor-default tracking-widest"
        />
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-secondary hover:text-accent transition-colors duration-200 font-['Space_Mono'] tracking-widest uppercase border border-secondary/20 hover:border-accent/40 px-4 py-2"
      >
        Replay
      </button>
    </div>
  );
}

export const scrambleTextCode = `"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARSET = "!<>-_\\/[]{}—=+*^?#@$%&";

interface ScrambleTextProps {
  text: string;
  trigger?: "mount" | "hover";
  duration?: number;
  charset?: string;
  className?: string;
}

export function ScrambleText({
  text,
  trigger = "mount",
  duration = 800,
  charset = DEFAULT_CHARSET,
  className,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const scramble = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const chars = charset.split("");
    const len = text.length;
    const start = performance.now();
    const resolveTime = duration / len;

    cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const elapsed = now - start;
      let output = "";

      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (elapsed >= i * resolveTime) {
          output += text[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = output;

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = text;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration, charset]);

  useEffect(() => {
    if (trigger !== "mount") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, scramble]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
    >
      {text}
    </span>
  );
}`;
