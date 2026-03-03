"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Import Space Grotesk font
const spaceGrotesk = {
  fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
};

export default function CyberCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate tilt angles based on mouse position
  const rotateX = -mousePosition.y * 12;
  const rotateY = mousePosition.x * 12;

  // GSAP Animation Setup - Pulsing Grid Pattern
  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({ repeat: -1, ease: "none" });
    timelineRef.current = tl;

    // Set initial state for grid lines
    gsap.set([".grid-line-1", ".grid-line-2", ".grid-line-3", ".grid-line-4"], {
      opacity: 0.3,
      strokeWidth: 1,
    });

    gsap.set(svgRef.current, {
      opacity: 0,
    });

    // Create pulsing grid animation
    tl.to([".grid-line-1", ".grid-line-3"], {
      opacity: 0.8,
      strokeWidth: 2,
      duration: 1,
      ease: "power2.inOut",
    }, 0)
    .to([".grid-line-2", ".grid-line-4"], {
      opacity: 0.8,
      strokeWidth: 2,
      duration: 1,
      ease: "power2.inOut",
    }, 0.5)
    .to([".grid-line-1", ".grid-line-3"], {
      opacity: 0.3,
      strokeWidth: 1,
      duration: 1,
      ease: "power2.inOut",
    }, 1)
    .to([".grid-line-2", ".grid-line-4"], {
      opacity: 0.3,
      strokeWidth: 1,
      duration: 1,
      ease: "power2.inOut",
    }, 1.5);

    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  // Control visibility based on hover
  useEffect(() => {
    if (!svgRef.current) return;

    if (isHovered) {
      gsap.to(svgRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(svgRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div
        ref={cardRef}
        className="relative w-96 h-60 cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card Container */}
        <div
          className="relative w-full h-full rounded-lg bg-gradient-to-br from-red-900 via-black to-orange-900 border border-red-700/50 transform-gpu transition-all duration-300 ease-out shadow-2xl shadow-red-900/50"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(239, 68, 68, 0.6)`
              : '0 25px 50px -12px rgba(239, 68, 68, 0.3)',
          }}
        >
          {/* Cyber Overlay */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Card Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-red-400 tracking-[4px] mb-1 font-semibold" style={spaceGrotesk}>CYBER.NET</div>
                <div className="text-sm text-gray-300 tracking-[2px] font-medium" style={spaceGrotesk}>NEURAL-LINK</div>
              </div>
              <div className="relative">
                {/* Cyber corner element */}
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border-2 border-red-400/60 rotate-45">
                    <div className="w-full h-full bg-gradient-to-br from-red-400/20 to-orange-500/20" />
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 animate-pulse" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* GSAP-Powered Grid Pattern */}
            <div className="absolute inset-4 pointer-events-none">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="opacity-80"
              >
                <defs>
                  {/* Red cyber gradient */}
                  <linearGradient id="redCyber" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0.6" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Animated grid lines */}
                <g filter="url(#cyberGlow)">
                  {/* Vertical lines */}
                  <line
                    className="grid-line-1"
                    x1="80" y1="20" x2="80" y2="160"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    className="grid-line-2"
                    x1="160" y1="20" x2="160" y2="160"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    className="grid-line-3"
                    x1="240" y1="20" x2="240" y2="160"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />

                  {/* Horizontal lines */}
                  <line
                    className="grid-line-4"
                    x1="20" y1="60" x2="300" y2="60"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    className="grid-line-1"
                    x1="20" y1="90" x2="300" y2="90"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    className="grid-line-2"
                    x1="20" y1="120" x2="300" y2="120"
                    stroke="url(#redCyber)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </g>
              </svg>
            </div>

            {/* Card Number */}
            <div className="relative z-10">
              <div className="text-red-400 text-lg tracking-[3px] mb-4 flex items-center font-medium" style={spaceGrotesk}>
                <span className="text-gray-500 font-normal">ID:</span>
                <span className="ml-2 font-semibold">CY-9A4B.7E2F</span>
                <div className="ml-3 flex space-x-1">
                  <div className="w-1 h-1 bg-red-400 animate-pulse" />
                  <div className="w-1 h-1 bg-orange-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 h-1 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>ZONE</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>DELTA-9</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>STATUS</div>
                  <div className="text-sm text-red-400 tracking-[1px] flex items-center font-semibold" style={spaceGrotesk}>
                    <div className="w-2 h-2 bg-red-400 mr-2 animate-pulse" />
                    ONLINE
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>LEVEL</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>OMEGA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute bottom-4 left-4 w-6 h-6">
            <div className="w-full h-full border-l-2 border-b-2 border-red-400/40" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-400" />
          </div>

          <div className="absolute bottom-4 right-4 w-6 h-6">
            <div className="w-full h-full border-r-2 border-b-2 border-orange-500/40" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-orange-500" />
          </div>

          <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-red-500/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-red-500/40" />

          {/* Scan Line Effect */}
          <div
            className={`
              absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-30' : 'opacity-0'}
            `}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.3) 50%, transparent 100%)',
              animation: isHovered ? 'scanLine 2s infinite linear' : 'none',
            }}
          />
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          @keyframes scanLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}