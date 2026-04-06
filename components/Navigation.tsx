"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
];

export default function Navigation() {
  const pathname = usePathname();
  const innerRef = useRef<HTMLDivElement>(null);
  const bracketLeftRef = useRef<HTMLSpanElement>(null);
  const bracketRightRef = useRef<HTMLSpanElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const inHeroRef = useRef(true);
  const [inHero, setInHero] = useState(true);

  // Find active index from pathname
  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.href === pathname);
    if (idx !== -1) setActiveIndex(idx);
  }, [pathname]);

  // Throttled scroll detection
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const hero = window.scrollY < window.innerHeight * 0.8;
        if (hero !== inHeroRef.current) {
          inHeroRef.current = hero;
          setInHero(hero);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapsed = inHero && !expanded;

  // Position brackets around the active item
  const positionBrackets = useCallback((instant = false) => {
    const el = activeItemRef.current;
    const container = innerRef.current;
    if (!el || !container) return;

    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();

    const lx = eRect.left - cRect.left - 7;
    const ly = eRect.top - cRect.top + eRect.height / 2 - 7;
    const rx = eRect.right - cRect.left - 7;
    const ry = ly;

    const dur = instant ? 0 : 0.4;
    gsap.to(bracketLeftRef.current, { x: lx, y: ly, duration: dur, ease: "power3.out" });
    gsap.to(bracketRightRef.current, { x: rx, y: ry, duration: dur, ease: "power3.out" });
  }, []);

  // Reposition when collapsed/expanded or active changes
  useEffect(() => {
    const id = requestAnimationFrame(() => positionBrackets(false));
    return () => cancelAnimationFrame(id);
  }, [collapsed, activeIndex, positionBrackets]);

  // Reposition on resize
  useEffect(() => {
    const onResize = () => positionBrackets(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionBrackets]);

  // Initial position
  useEffect(() => {
    const id = setTimeout(() => positionBrackets(true), 100);
    return () => clearTimeout(id);
  }, [positionBrackets]);

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{ fontFamily: "var(--font-pixel)" }}
      onMouseEnter={() => inHero && setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div ref={innerRef} className="relative flex items-center px-3 py-2.5 backdrop-blur-sm bg-white/5 dark:bg-black/10 rounded-sm">
        {/* Bracket left */}
        <span
          ref={bracketLeftRef}
          className="absolute pointer-events-none z-10 text-black dark:text-white"
          style={{ top: 0, left: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M0 14V0H14" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>

        {/* Bracket right */}
        <span
          ref={bracketRightRef}
          className="absolute pointer-events-none z-10 text-black dark:text-white"
          style={{ top: 0, left: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M14 0V14H0" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>

        {NAV_ITEMS.map((item, i) => {
          const isActive = i === activeIndex;
          const hidden = collapsed && !isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              ref={isActive ? activeItemRef : undefined}
              className={`
                relative py-1.5 text-sm tracking-wider uppercase whitespace-nowrap
                transition-all duration-300 ease-out
                ${hidden
                  ? "max-w-0 px-0 opacity-0 overflow-hidden pointer-events-none"
                  : "max-w-[8rem] px-5 opacity-100"
                }
                ${isActive
                  ? "text-black dark:text-white font-bold"
                  : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
