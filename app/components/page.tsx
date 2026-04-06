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
    <main className="min-h-screen bg-void text-concrete overflow-x-hidden">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1
            className="text-6xl text-concrete tracking-tight mb-3"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            components.
          </h1>
          <p className="text-secondary text-sm font-['Space_Mono'] max-w-md leading-relaxed">
            Handcrafted UI components. Thoughtful animations, no bloat.
            <br />
            <span className="text-concrete/40">{registry.length} components</span>
          </p>
        </div>

        {/* Layout */}
        <div className="flex gap-12 min-h-[560px]">
          {/* Sidebar */}
          <aside className="w-48 flex-shrink-0">
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
            <div className="mb-6">
              <h2
                className="text-2xl text-concrete mb-1.5"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {selected.name}
              </h2>
              <p className="text-secondary text-sm font-['Space_Mono'] leading-relaxed">
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
                className="min-h-80 border border-white/8 border-t-0 flex items-center justify-center"
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
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                  <span className="text-xs text-secondary/50 font-['Space_Mono']">
                    {selected.id}.tsx
                  </span>
                  <button
                    onClick={copyCode}
                    className="text-xs font-['Space_Mono'] transition-colors duration-150 px-3 py-1 border border-white/10 hover:border-accent/40 hover:text-accent text-secondary"
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
                <pre className="p-5 overflow-auto text-xs leading-relaxed font-['JetBrains_Mono',_'Space_Mono',_monospace] text-concrete/70 max-h-[480px]">
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
