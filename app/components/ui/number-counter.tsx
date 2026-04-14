"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberCounterProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function format(value: number, decimals: number, separator: string) {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;
  const [int, dec] = fixed.split(".");
  const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return dec !== undefined ? `${intFormatted}.${dec}` : intFormatted;
}

export function NumberCounter({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
  className,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;

    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const value = from + (to - from) * eased;

      if (el) el.textContent = `${prefix}${format(value, decimals, separator)}${suffix}`;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, to, from, duration, decimals, prefix, suffix, separator]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {prefix}{format(from, decimals, separator)}{suffix}
    </span>
  );
}

// Demo used in the library preview
export function NumberCounterDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-wrap justify-center gap-12">
        <div key={`a-${key}`} className="flex flex-col items-center gap-2">
          <NumberCounter
            to={12480}
            duration={2000}
            separator=","
            className="text-5xl font-['Space_Mono'] text-concrete"
          />
          <span className="text-xs text-secondary font-['Space_Mono'] uppercase tracking-widest">
            Users
          </span>
        </div>
        <div key={`b-${key}`} className="flex flex-col items-center gap-2">
          <NumberCounter
            to={99.9}
            duration={2200}
            decimals={1}
            suffix="%"
            className="text-5xl font-['Space_Mono'] text-concrete"
          />
          <span className="text-xs text-secondary font-['Space_Mono'] uppercase tracking-widest">
            Uptime
          </span>
        </div>
        <div key={`c-${key}`} className="flex flex-col items-center gap-2">
          <NumberCounter
            to={4.8}
            from={0}
            duration={1600}
            decimals={1}
            suffix="★"
            className="text-5xl font-['Space_Mono'] text-concrete"
          />
          <span className="text-xs text-secondary font-['Space_Mono'] uppercase tracking-widest">
            Rating
          </span>
        </div>
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

export const numberCounterCode = `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberCounterProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function format(value: number, decimals: number, separator: string) {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;
  const [int, dec] = fixed.split(".");
  const intFormatted = int.replace(/\\B(?=(\\d{3})+(?!\\d))/g, separator);
  return dec !== undefined ? \`\${intFormatted}.\${dec}\` : intFormatted;
}

export function NumberCounter({
  to,
  from = 0,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
  className,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;
    startRef.current = performance.now();
    function tick(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const value = from + (to - from) * eased;
      if (el) el.textContent = \`\${prefix}\${format(value, decimals, separator)}\${suffix}\`;
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, to, from, duration, decimals, prefix, suffix, separator]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{format(from, decimals, separator)}{suffix}
    </span>
  );
}`;
