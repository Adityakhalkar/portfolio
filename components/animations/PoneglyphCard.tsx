"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Import Space Grotesk font
const spaceGrotesk = {
  fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
};

export default function PoneglyphCard() {
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
  const rotateX = -mousePosition.y * 15; // Invert Y for natural tilt
  const rotateY = mousePosition.x * 15;

  // GSAP Animation Setup - Always Running Loop
  useEffect(() => {
    if (!svgRef.current) return;

    // Create continuous looping timeline that always runs
    const tl = gsap.timeline({ repeat: -1, ease: "none" });
    timelineRef.current = tl;

    // Set initial state
    gsap.set([".stream-1", ".stream-2", ".stream-3", ".stream-4", ".stream-5"], {
      opacity: 0,
      strokeDashoffset: 0,
    });

    // Set overall container opacity based on hover
    gsap.set(svgRef.current, {
      opacity: 0,
    });

    // Create left-to-right flowing animation for each stream
    tl.to(".stream-1", {
      opacity: 1,
      duration: 0.1,
    }, 0)
    .to(".stream-1", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "none",
    }, 0.1)
    .to(".stream-1", {
      opacity: 0,
      duration: 0.1,
    }, 1.5);

    tl.to(".stream-2", {
      opacity: 1,
      duration: 0.1,
    }, 0.3)
    .to(".stream-2", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "none",
    }, 0.4)
    .to(".stream-2", {
      opacity: 0,
      duration: 0.1,
    }, 1.8);

    tl.to(".stream-3", {
      opacity: 1,
      duration: 0.1,
    }, 0.6)
    .to(".stream-3", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "none",
    }, 0.7)
    .to(".stream-3", {
      opacity: 0,
      duration: 0.1,
    }, 2.1);

    tl.to(".stream-4", {
      opacity: 1,
      duration: 0.1,
    }, 0.9)
    .to(".stream-4", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "none",
    }, 1.0)
    .to(".stream-4", {
      opacity: 0,
      duration: 0.1,
    }, 2.4);

    tl.to(".stream-5", {
      opacity: 1,
      duration: 0.1,
    }, 1.2)
    .to(".stream-5", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "none",
    }, 1.3)
    .to(".stream-5", {
      opacity: 0,
      duration: 0.1,
    }, 2.7);

    // Reset all elements for seamless loop (happens at the end)
    tl.set([".stream-1", ".stream-2", ".stream-3", ".stream-4", ".stream-5"], {
      strokeDashoffset: 300,
      opacity: 0,
    }, 3.0);

    // Start the timeline immediately - it runs continuously
    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  // Control visibility based on hover - instant response
  useEffect(() => {
    if (!svgRef.current) return;

    if (isHovered) {
      // Show animations instantly
      gsap.to(svgRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      });
    } else {
      // Hide animations instantly
      gsap.to(svgRef.current, {
        opacity: 0,
        duration: 0.1,
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
          className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700/50 transform-gpu transition-all duration-300 ease-out shadow-2xl shadow-black/50"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(0, 0, 0, 0.8)`
              : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Holographic Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Card Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-cyan-400 tracking-[4px] mb-1 font-semibold" style={spaceGrotesk}>NEXUS.TECH</div>
                <div className="text-sm text-gray-300 tracking-[2px] font-medium" style={spaceGrotesk}>QUANTUM-GRID</div>
              </div>
              <div className="relative">
                {/* Angular tech corner element */}
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border-2 border-cyan-400/60" style={{
                    clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)'
                  }}>
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20" />
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 opacity-80" style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)'
                  }} />
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-500 opacity-60" style={{
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 30%)'
                  }} />
                </div>
              </div>
            </div>

            {/* GSAP-Powered Light Streams */}
            <div className="absolute inset-4 pointer-events-none">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="opacity-80"
              >
                <defs>
                  {/* Blue neon gradient */}
                  <linearGradient id="blueNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                    <stop offset="70%" stopColor="#93c5fd" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Purple neon gradient */}
                  <linearGradient id="purpleNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
                    <stop offset="70%" stopColor="#c4b5fd" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Pink neon gradient */}
                  <linearGradient id="pinkNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="30%" stopColor="#ec4899" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#f472b6" stopOpacity="1" />
                    <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Static base lines - angular tech patterns */}
                <g stroke="#374151" strokeWidth="1" fill="none" opacity="0.2">
                  <path d="M10 60 L50 60 L70 45 L120 45 L140 60 L180 60 L200 75 L250 75 L270 60 L310 60" />
                  <path d="M10 90 L40 90 L60 105 L100 105 L120 90 L160 90 L180 75 L220 75 L240 90 L310 90" />
                  <path d="M10 120 L60 120 L80 135 L140 135 L160 120 L200 120 L220 105 L260 105 L280 120 L310 120" />
                  <path d="M10 150 L45 150 L65 165 L110 165 L130 150 L190 150 L210 135 L270 135 L290 150 L310 150" />
                </g>

                {/* Animated light streams controlled by GSAP */}
                <g filter="url(#glow)">
                  {/* Stream 1 - Blue - Angular tech pattern */}
                  <path
                    className="stream-1"
                    d="M10 60 L50 60 L70 45 L120 45 L140 60 L180 60 L200 75 L250 75 L270 60 L310 60"
                    stroke="url(#blueNeon)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="60 240"
                    strokeDashoffset="300"
                    opacity="0"
                  />

                  {/* Stream 2 - Purple - Angular tech pattern */}
                  <path
                    className="stream-2"
                    d="M10 90 L40 90 L60 105 L100 105 L120 90 L160 90 L180 75 L220 75 L240 90 L310 90"
                    stroke="url(#purpleNeon)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="60 240"
                    strokeDashoffset="300"
                    opacity="0"
                  />

                  {/* Stream 3 - Blue - Angular tech pattern */}
                  <path
                    className="stream-3"
                    d="M10 120 L60 120 L80 135 L140 135 L160 120 L200 120 L220 105 L260 105 L280 120 L310 120"
                    stroke="url(#blueNeon)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="60 240"
                    strokeDashoffset="300"
                    opacity="0"
                  />

                  {/* Stream 4 - Pink - Angular tech pattern */}
                  <path
                    className="stream-4"
                    d="M10 150 L45 150 L65 165 L110 165 L130 150 L190 150 L210 135 L270 135 L290 150 L310 150"
                    stroke="url(#pinkNeon)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="60 240"
                    strokeDashoffset="300"
                    opacity="0"
                  />

                  {/* Stream 5 - Purple - Angular tech pattern */}
                  <path
                    className="stream-5"
                    d="M10 75 L35 75 L55 60 L85 60 L105 75 L145 75 L165 90 L195 90 L215 75 L245 75 L265 60 L295 60 L310 75"
                    stroke="url(#purpleNeon)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="60 240"
                    strokeDashoffset="300"
                    opacity="0"
                  />
                </g>

              </svg>
            </div>

            {/* Card Number */}
            <div className="relative z-10">
              <div className="text-cyan-400 text-lg tracking-[3px] mb-4 flex items-center font-medium" style={spaceGrotesk}>
                <span className="text-gray-500 font-normal">NODE:</span>
                <span className="ml-2 font-semibold">7F3A.B2C9.8E1D</span>
                <div className="ml-3 flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse" />
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>SECTOR</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>ALPHA-7</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>STATUS</div>
                  <div className="text-sm text-green-400 tracking-[1px] flex items-center font-semibold" style={spaceGrotesk}>
                    <div className="w-2 h-2 bg-green-400 mr-2" style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }} />
                    ACTIVE
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>ACCESS</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>TIER-X</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Corner Accents */}
          <div className="absolute bottom-4 left-4 w-6 h-6">
            <div className="w-full h-full border-l-2 border-b-2 border-cyan-400/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-cyan-400/60" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-cyan-400" />
          </div>

          <div className="absolute bottom-4 right-4 w-6 h-6">
            <div className="w-full h-full border-r-2 border-b-2 border-blue-500/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-blue-500/60" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-500" />
          </div>

          <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-purple-500/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-purple-500/40" />

          {/* Shimmer Effect */}
          <div
            className={`
              absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-20' : 'opacity-0'}
            `}
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation: isHovered ? 'shimmer 2s infinite' : 'none',
            }}
          />
        </div>

        {/* Custom CSS for 3D transforms and animations */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}