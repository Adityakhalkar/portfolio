"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { registry, CATEGORIES, type ComponentCategory } from "./registry";

export default function ComponentsPage() {
  const [selectedId, setSelectedId] = useState(registry[0].id);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const selected = registry.find((c) => c.id === selectedId)!;
  const SelectedComponent = selected.component;

  function copyCode() {
    navigator.clipboard.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function select(id: string) {
    setSelectedId(id);
    setTab("preview");
    setCopied(false);
  }

  return (
    <main className="min-h-dvh bg-void text-concrete overflow-x-hidden">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <h1
            className="text-4xl sm:text-6xl text-concrete tracking-tight mb-2 sm:mb-3 text-balance"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            components.
          </h1>
          <p className="text-secondary text-xs sm:text-sm font-['Space_Mono'] leading-relaxed text-pretty">
            Handcrafted UI components. Thoughtful animations, no bloat.{" "}
            <span className="text-concrete/40">{registry.length} components</span>
          </p>
        </div>

        {/* Mobile: horizontal scrollable component list */}
        <div className="md:hidden mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {registry.map((item) => (
              <button
                key={item.id}
                onClick={() => select(item.id)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 border transition-colors duration-150 font-['Space_Mono'] whitespace-nowrap ${
                  selectedId === item.id
                    ? "border-accent text-accent"
                    : "border-white/10 text-secondary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop + Mobile layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Sidebar — desktop only */}
          <aside className="hidden md:block w-48 flex-shrink-0">
            {CATEGORIES.map((cat: ComponentCategory) => {
              const items = registry.filter((c) => c.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat} className="mb-8">
                  <p className="text-xs text-secondary/60 uppercase tracking-[0.15em] font-['Space_Mono'] mb-3 px-3">
                    {cat}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {items.map((item) => {
                      const isActive = selectedId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => select(item.id)}
                          className={`w-full text-left text-sm py-2 px-3 transition-colors duration-150 border-l ${
                            isActive
                              ? "text-accent border-accent"
                              : "text-secondary hover:text-concrete border-transparent"
                          }`}
                          style={{ fontFamily: "var(--font-pixel)" }}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </aside>

          {/* Main panel */}
          <div className="flex-1 min-w-0">
            {/* Component info */}
            <div className="mb-5 sm:mb-6">
              <h2
                className="text-xl sm:text-2xl text-concrete mb-1 sm:mb-1.5 text-balance"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {selected.name}
              </h2>
              <p className="text-secondary text-xs sm:text-sm font-['Space_Mono'] leading-relaxed text-pretty">
                {selected.description}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-6 border-b border-white/8 mb-0">
              {(["preview", "code"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-xs uppercase tracking-[0.15em] font-['Space_Mono'] transition-colors duration-150 border-b -mb-px ${
                    tab === t
                      ? "text-concrete border-concrete"
                      : "text-secondary hover:text-concrete border-transparent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Preview */}
            {tab === "preview" && (
              <div
                className="min-h-64 sm:min-h-80 border border-white/8 border-t-0 flex items-center justify-center p-6"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #1c1c1c 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              >
                <SelectedComponent />
              </div>
            )}

            {/* Code */}
            {tab === "code" && (
              <div className="relative border border-white/8 border-t-0 bg-white/[0.02]">
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/8">
                  <span className="text-xs text-secondary/50 font-['Space_Mono'] truncate mr-4">
                    {selected.id}.tsx
                  </span>
                  <button
                    onClick={copyCode}
                    className="flex-shrink-0 text-xs font-['Space_Mono'] transition-colors duration-150 px-3 py-1 border border-white/10 hover:border-accent/40 hover:text-accent text-secondary"
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-auto text-xs leading-relaxed font-['JetBrains_Mono',_'Space_Mono',_monospace] text-concrete/70 max-h-[60dvh]">
                  <code>{selected.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
