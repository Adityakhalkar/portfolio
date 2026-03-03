"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Import Space Grotesk font
const spaceGrotesk = {
  fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
};

export default function QuantumCard() {
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
  const rotateX = -mousePosition.y * 10;
  const rotateY = mousePosition.x * 10;

  // GSAP Animation Setup - Quantum Particles
  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({ repeat: -1, ease: "none" });
    timelineRef.current = tl;

    // Set initial state for particles
    gsap.set([".particle-1", ".particle-2", ".particle-3", ".particle-4", ".particle-5", ".particle-6"], {
      opacity: 0,
      scale: 0,
    });

    gsap.set(svgRef.current, {
      opacity: 0,
    });

    // Create quantum particle animation
    const particles = [".particle-1", ".particle-2", ".particle-3", ".particle-4", ".particle-5", ".particle-6"];

    particles.forEach((particle, index) => {
      const delay = index * 0.4;

      tl.to(particle, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      }, delay)
      .to(particle, {
        opacity: 0.3,
        scale: 0.8,
        duration: 1.2,
        ease: "power2.inOut",
      }, delay + 0.8)
      .to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
      }, delay + 2);
    });

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
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(svgRef.current, {
        opacity: 0,
        duration: 0.3,
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
          className="relative w-full h-full rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-indigo-700/50 transform-gpu transition-all duration-300 ease-out shadow-2xl shadow-purple-900/50"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(147, 51, 234, 0.7)`
              : '0 25px 50px -12px rgba(147, 51, 234, 0.4)',
          }}
        >
          {/* Quantum Overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Card Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-indigo-400 tracking-[4px] mb-1 font-semibold" style={spaceGrotesk}>QUANTUM.CORE</div>
                <div className="text-sm text-gray-300 tracking-[2px] font-medium" style={spaceGrotesk}>ENTANGLEMENT</div>
              </div>
              <div className="relative">
                {/* Quantum corner element */}
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border border-indigo-400/60 rounded-full">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400/20 to-pink-500/20 rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-ping" />
                  <div className="absolute top-1 right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                  <div className="absolute bottom-2 left-1 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
                </div>
              </div>
            </div>

            {/* GSAP-Powered Quantum Particles */}
            <div className="absolute inset-4 pointer-events-none">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="opacity-90"
              >
                <defs>
                  {/* Quantum gradients */}
                  <radialGradient id="quantumBlue" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="quantumPurple" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="quantumPink" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </radialGradient>

                  {/* Quantum glow filter */}
                  <filter id="quantumGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Animated quantum particles */}
                <g filter="url(#quantumGlow)">
                  <circle
                    className="particle-1"
                    cx="80" cy="60"
                    r="4"
                    fill="url(#quantumBlue)"
                    opacity="0"
                  />
                  <circle
                    className="particle-2"
                    cx="160" cy="45"
                    r="3"
                    fill="url(#quantumPurple)"
                    opacity="0"
                  />
                  <circle
                    className="particle-3"
                    cx="240" cy="80"
                    r="5"
                    fill="url(#quantumPink)"
                    opacity="0"
                  />
                  <circle
                    className="particle-4"
                    cx="120" cy="120"
                    r="3"
                    fill="url(#quantumBlue)"
                    opacity="0"
                  />
                  <circle
                    className="particle-5"
                    cx="200" cy="140"
                    r="4"
                    fill="url(#quantumPurple)"
                    opacity="0"
                  />
                  <circle
                    className="particle-6"
                    cx="60" cy="135"
                    r="3"
                    fill="url(#quantumPink)"
                    opacity="0"
                  />

                  {/* Connecting lines */}
                  <path
                    d="M80,60 Q120,80 160,45 Q200,65 240,80"
                    stroke="#6366f1"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    strokeDasharray="2,4"
                  />
                  <path
                    d="M120,120 Q160,100 200,140"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    strokeDasharray="2,4"
                  />
                </g>
              </svg>
            </div>

            {/* Card Number */}
            <div className="relative z-10">
              <div className="text-indigo-400 text-lg tracking-[3px] mb-4 flex items-center font-medium" style={spaceGrotesk}>
                <span className="text-gray-500 font-normal">QID:</span>
                <span className="ml-2 font-semibold">Q-8F7A.3D9C</span>
                <div className="ml-3 flex space-x-1">
                  <div className="w-1 h-1 bg-indigo-400 rounded-full animate-ping" />
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>DIMENSION</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>QM-11</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>STATE</div>
                  <div className="text-sm text-indigo-400 tracking-[1px] flex items-center font-semibold" style={spaceGrotesk}>
                    <div className="w-2 h-2 bg-indigo-400 mr-2 rounded-full animate-ping" />
                    QUANTUM
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>PHASE</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>BETA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantum Corner Accents */}
          <div className="absolute bottom-4 left-4 w-6 h-6">
            <div className="w-full h-full border-l border-b border-indigo-400/40 rounded-bl-lg" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-indigo-400 rounded-full" />
          </div>

          <div className="absolute bottom-4 right-4 w-6 h-6">
            <div className="w-full h-full border-r border-b border-purple-500/40 rounded-br-lg" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-500 rounded-full" />
          </div>

          <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-indigo-500/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-purple-500/40 rounded-tr-lg" />

          {/* Quantum Wave Effect */}
          <div
            className={`
              absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-25' : 'opacity-0'}
            `}
            style={{
              background: 'radial-gradient(circle at center, rgba(99,102,241,0.3) 0%, transparent 70%)',
              animation: isHovered ? 'quantumWave 3s infinite ease-in-out' : 'none',
            }}
          />
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          @keyframes quantumWave {
            0%, 100% { transform: scale(1); opacity: 0.25; }
            50% { transform: scale(1.1); opacity: 0.15; }
          }
        `}</style>
      </div>
    </div>
  );
}