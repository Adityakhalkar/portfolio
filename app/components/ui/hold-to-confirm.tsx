"use client";

import { useRef, useState } from "react";

interface HoldToConfirmProps {
  onConfirm?: () => void;
  duration?: number; // ms to hold
  label?: string;
  confirmLabel?: string;
  className?: string;
}

export function HoldToConfirm({
  onConfirm,
  duration = 1800,
  label = "Hold to confirm",
  confirmLabel = "Confirmed",
  className = "",
}: HoldToConfirmProps) {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const holdingRef = useRef(false);

  function start() {
    if (confirmed) return;
    holdingRef.current = true;
    startRef.current = performance.now();

    function tick(now: number) {
      if (!holdingRef.current) return;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        setConfirmed(true);
        onConfirm?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function stop() {
    holdingRef.current = false;
    cancelAnimationFrame(rafRef.current);
    if (!confirmed) {
      setProgress(0);
    }
  }

  return (
    <button
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      disabled={confirmed}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ WebkitUserSelect: "none" }}
    >
      {/* Progress fill — linear is correct here (time visualization) */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-accent/15 pointer-events-none"
        style={{
          width: `${progress * 100}%`,
          transition: progress === 0 ? "width 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" : "none",
        }}
      />
      <span className="relative z-10 transition-colors duration-200">
        {confirmed ? confirmLabel : label}
      </span>
    </button>
  );
}

// Demo used in the library preview
export function HoldToConfirmDemo() {
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <HoldToConfirm
        onConfirm={() => setDone(true)}
        className="px-10 py-4 border border-concrete/20 text-concrete text-sm tracking-widest uppercase font-['Space_Mono'] hover:border-concrete/40 transition-colors duration-200 cursor-none min-w-60 text-center"
        label="Hold to confirm"
        confirmLabel="✓ Confirmed"
      />
      {done && (
        <button
          onClick={() => setDone(false)}
          className="text-xs text-secondary hover:text-accent transition-colors duration-200 font-['Space_Mono'] tracking-widest uppercase"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export const holdToConfirmCode = `"use client";

import { useRef, useState } from "react";

interface HoldToConfirmProps {
  onConfirm?: () => void;
  duration?: number;
  label?: string;
  confirmLabel?: string;
  className?: string;
}

export function HoldToConfirm({
  onConfirm,
  duration = 1800,
  label = "Hold to confirm",
  confirmLabel = "Confirmed",
  className = "",
}: HoldToConfirmProps) {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const holdingRef = useRef(false);

  function start() {
    if (confirmed) return;
    holdingRef.current = true;
    startRef.current = performance.now();

    function tick(now: number) {
      if (!holdingRef.current) return;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        setConfirmed(true);
        onConfirm?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function stop() {
    holdingRef.current = false;
    cancelAnimationFrame(rafRef.current);
    if (!confirmed) setProgress(0);
  }

  return (
    <button
      onMouseDown={start}
      onMouseUp={stop}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
      disabled={confirmed}
      className={\`relative overflow-hidden select-none \${className}\`}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-accent/15 pointer-events-none"
        style={{
          width: \`\${progress * 100}%\`,
          transition: progress === 0 ? "width 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" : "none",
        }}
      />
      <span className="relative z-10">
        {confirmed ? confirmLabel : label}
      </span>
    </button>
  );
}`;
