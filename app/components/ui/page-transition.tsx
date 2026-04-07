"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export function PageTransitionDemo() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const playing = useRef(false);

  useLayoutEffect(() => {
    gsap.set(shape1Ref.current, { yPercent: -110 });
    gsap.set(shape2Ref.current, { yPercent: 110 });
  }, []);

  function play() {
    if (playing.current) return;
    playing.current = true;

    const s1 = shape1Ref.current;
    const s2 = shape2Ref.current;
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    if (!s1 || !s2 || !p1 || !p2) {
      playing.current = false;
      return;
    }

    const l1 = p1.getTotalLength();
    const l2 = p2.getTotalLength();

    gsap.timeline({ onComplete: () => { playing.current = false; } })
      .set(s1, { yPercent: -110, xPercent: 0 })
      .set(s2, { yPercent: 110, xPercent: 0 })
      .set(p1, { strokeDasharray: l1, strokeDashoffset: l1, fillOpacity: 0 })
      .set(p2, { strokeDasharray: l2, strokeDashoffset: l2, fillOpacity: 0 })
      .to(p1, { strokeDashoffset: 0, duration: 0.35, ease: "power3.inOut" }, 0)
      .to(p2, { strokeDashoffset: 0, duration: 0.35, ease: "power3.inOut" }, 0.05)
      .to(s1, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0.1)
      .to(s2, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0.18)
      .to([p1, p2], { fillOpacity: 1, duration: 0.25 }, 0.3)
      .to({}, { duration: 0.3 })
      .to([s1, s2], { xPercent: 110, duration: 0.55, ease: "power3.inOut", stagger: 0.07 })
      .call(() => {
        gsap.set(s1, { yPercent: -110, xPercent: 0 });
        gsap.set(s2, { yPercent: 110, xPercent: 0 });
        gsap.set(p1, { strokeDashoffset: l1, fillOpacity: 0 });
        gsap.set(p2, { strokeDashoffset: l2, fillOpacity: 0 });
      });
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full h-56 sm:h-72 border border-white/10 overflow-hidden bg-void/50">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none">
          <div className="w-32 h-2 bg-white/10 rounded-full" />
          <div className="w-24 h-2 bg-white/6 rounded-full" />
          <div className="w-20 h-2 bg-white/4 rounded-full" />
        </div>

        <div ref={shape1Ref} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              ref={path1Ref}
              d="M 0,0 L 100,0 L 100,42 C 72,30 52,58 28,46 C 12,38 0,50 0,50 Z"
              fill="#050505"
              stroke="#00FFC2"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div ref={shape2Ref} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              ref={path2Ref}
              d="M 0,50 C 18,38 42,62 62,52 C 80,42 100,56 100,58 L 100,100 L 0,100 Z"
              fill="#0d0d0d"
              stroke="#00FFC2"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <button
        onClick={play}
        className="text-xs text-secondary hover:text-accent transition-colors duration-200 font-['Space_Mono'] tracking-widest uppercase border border-secondary/20 hover:border-accent/40 px-6 py-2"
      >
        Play Transition
      </button>

      <p className="text-xs text-white/20 font-['Space_Mono'] text-center text-pretty">
        Live on every nav link — click Home ↔ Components to see it in action
      </p>
    </div>
  );
}

export const pageTransitionCode = `// 1. Wrap your layout
// app/layout.tsx
import { PageTransition } from "@/components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

// 2. Use navigate() instead of router.push()
import { usePageTransition } from "@/components/PageTransition";

const { navigate } = usePageTransition();

<button onClick={() => navigate("/about")}>Go to About</button>

// Or intercept a Link:
<Link href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>
  About
</Link>`;
