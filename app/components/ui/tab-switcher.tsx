"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  defaultValue?: string;
  variant?: "underline" | "pill";
  onChange?: (value: string) => void;
  className?: string;
}

export function TabSwitcher({
  tabs,
  defaultValue,
  variant = "underline",
  onChange,
  className,
}: TabSwitcherProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const idx = tabs.findIndex((t) => t.value === active);
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    const button = buttonRefs.current[idx];
    if (!container || !indicator || !button) return;

    const cRect = container.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();

    indicator.style.transition = isFirst.current
      ? "none"
      : "transform 250ms cubic-bezier(0.215, 0.61, 0.355, 1), width 250ms cubic-bezier(0.215, 0.61, 0.355, 1)";
    indicator.style.width = `${bRect.width}px`;
    indicator.style.transform = `translateX(${bRect.left - cRect.left}px)`;
    isFirst.current = false;
  }, [active, tabs]);

  function select(value: string) {
    setActive(value);
    onChange?.(value);
  }

  function onKeyDown(e: React.KeyboardEvent, idx: number) {
    let next = idx;
    if (e.key === "ArrowRight") next = Math.min(idx + 1, tabs.length - 1);
    if (e.key === "ArrowLeft") next = Math.max(idx - 1, 0);
    if (next !== idx) {
      select(tabs[next].value);
      buttonRefs.current[next]?.focus();
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={cn(
        "relative flex",
        variant === "pill" ? "gap-0.5 p-1 bg-white/5 rounded-md" : "",
        className
      )}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none",
          variant === "underline"
            ? "bottom-0 h-px bg-current"
            : "inset-y-1 rounded-sm bg-white/10"
        )}
        style={{ width: 0 }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab.value}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          role="tab"
          aria-selected={active === tab.value}
          tabIndex={active === tab.value ? 0 : -1}
          onClick={() => select(tab.value)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm outline-none transition-colors duration-150 select-none",
            variant === "underline" ? "pb-2.5" : "rounded-sm",
            active === tab.value
              ? "text-white"
              : "text-white/40 hover:text-white/70"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Demo used in the library preview
export function TabSwitcherDemo() {
  return (
    <div className="flex flex-col gap-14 items-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-white/30 font-['Space_Mono'] uppercase tracking-widest">
          underline
        </p>
        <TabSwitcher
          tabs={[
            { value: "preview", label: "Preview" },
            { value: "code", label: "Code" },
            { value: "props", label: "Props" },
          ]}
          variant="underline"
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-white/30 font-['Space_Mono'] uppercase tracking-widest">
          pill
        </p>
        <TabSwitcher
          tabs={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual" },
          ]}
          variant="pill"
        />
      </div>
    </div>
  );
}

export const tabSwitcherCode = `"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  defaultValue?: string;
  variant?: "underline" | "pill";
  onChange?: (value: string) => void;
  className?: string;
}

export function TabSwitcher({
  tabs,
  defaultValue,
  variant = "underline",
  onChange,
  className,
}: TabSwitcherProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const idx = tabs.findIndex((t) => t.value === active);
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    const button = buttonRefs.current[idx];
    if (!container || !indicator || !button) return;

    const cRect = container.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();

    indicator.style.transition = isFirst.current
      ? "none"
      : "transform 250ms cubic-bezier(0.215, 0.61, 0.355, 1), width 250ms cubic-bezier(0.215, 0.61, 0.355, 1)";
    indicator.style.width = \`\${bRect.width}px\`;
    indicator.style.transform = \`translateX(\${bRect.left - cRect.left}px)\`;
    isFirst.current = false;
  }, [active, tabs]);

  function select(value: string) {
    setActive(value);
    onChange?.(value);
  }

  function onKeyDown(e: React.KeyboardEvent, idx: number) {
    let next = idx;
    if (e.key === "ArrowRight") next = Math.min(idx + 1, tabs.length - 1);
    if (e.key === "ArrowLeft") next = Math.max(idx - 1, 0);
    if (next !== idx) {
      select(tabs[next].value);
      buttonRefs.current[next]?.focus();
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={cn(
        "relative flex",
        variant === "pill" ? "gap-0.5 p-1 bg-white/5 rounded-md" : "",
        className
      )}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none",
          variant === "underline"
            ? "bottom-0 h-px bg-current"
            : "inset-y-1 rounded-sm bg-white/10"
        )}
        style={{ width: 0 }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab.value}
          ref={(el) => { buttonRefs.current[i] = el; }}
          role="tab"
          aria-selected={active === tab.value}
          tabIndex={active === tab.value ? 0 : -1}
          onClick={() => select(tab.value)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm outline-none transition-colors duration-150 select-none",
            variant === "underline" ? "pb-2.5" : "rounded-sm",
            active === tab.value
              ? "text-white"
              : "text-white/40 hover:text-white/70"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}`;
