"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

interface TransitionContextValue {
  navigate: (href: string) => void;
  isAnimating: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isAnimating: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAnimating = useRef(false);
  const hasNavigated = useRef(false);
  const [animating, setAnimating] = useState(false);

  // Shape refs
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  // Reset shapes off-screen on mount
  useEffect(() => {
    gsap.set(shape1Ref.current, { yPercent: -110, xPercent: 0 });
    gsap.set(shape2Ref.current, { yPercent: 110, xPercent: 0 });

    // Stroke setup
    [path1Ref.current, path2Ref.current].forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
      });
    });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimating.current || href === pathname) return;
      isAnimating.current = true;
      setAnimating(true);

      const s1 = shape1Ref.current;
      const s2 = shape2Ref.current;
      const p1 = path1Ref.current;
      const p2 = path2Ref.current;

      const tl = gsap.timeline();

      // Reset positions
      tl.set(s1, { yPercent: -110, xPercent: 0 })
        .set(s2, { yPercent: 110, xPercent: 0 });

      // Reset strokes
      if (p1 && p2) {
        const l1 = p1.getTotalLength();
        const l2 = p2.getTotalLength();
        tl.set(p1, { strokeDashoffset: l1, fillOpacity: 0 })
          .set(p2, { strokeDashoffset: l2, fillOpacity: 0 });
      }

      // Stroke draws in
      tl.to(p1, { strokeDashoffset: 0, duration: 0.35, ease: "power3.inOut" }, 0)
        .to(p2, { strokeDashoffset: 0, duration: 0.35, ease: "power3.inOut" }, 0.05);

      // Shapes slide in, fill fades in
      tl.to(s1, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0.1)
        .to(s2, { yPercent: 0, duration: 0.55, ease: "power3.inOut" }, 0.18)
        .to([p1, p2], { fillOpacity: 1, duration: 0.25, ease: "none" }, 0.3);

      // Navigate when covered
      tl.call(() => {
        router.push(href);
      });
    },
    [pathname, router]
  );

  // When pathname changes — exit animation
  useEffect(() => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      return;
    }
    if (!isAnimating.current) return;

    const s1 = shape1Ref.current;
    const s2 = shape2Ref.current;
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;

    gsap.timeline({ delay: 0.05 })
      .to([s1, s2], {
        xPercent: 110,
        duration: 0.55,
        ease: "power3.inOut",
        stagger: 0.07,
      })
      .call(() => {
        isAnimating.current = false;
        setAnimating(false);
        gsap.set(s1, { yPercent: -110, xPercent: 0 });
        gsap.set(s2, { yPercent: 110, xPercent: 0 });
        if (p1 && p2) {
          const l1 = p1.getTotalLength();
          const l2 = p2.getTotalLength();
          gsap.set(p1, { strokeDashoffset: l1, fillOpacity: 0 });
          gsap.set(p2, { strokeDashoffset: l2, fillOpacity: 0 });
        }
      });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, isAnimating: animating }}>
      {children}

      {/* SVG Overlay — fixed, above everything */}
      <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
        {/* Shape 1 — top, enters from above */}
        <div
          ref={shape1Ref}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              ref={path1Ref}
              d="M 0,0 L 100,0 L 100,42 C 72,30 52,58 28,46 C 12,38 0,50 0,50 Z"
              fill="#050505"
              stroke="#00FFC2"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Shape 2 — bottom, enters from below */}
        <div
          ref={shape2Ref}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              ref={path2Ref}
              d="M 0,50 C 18,38 42,62 62,52 C 80,42 100,56 100,58 L 100,100 L 0,100 Z"
              fill="#0d0d0d"
              stroke="#00FFC2"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
