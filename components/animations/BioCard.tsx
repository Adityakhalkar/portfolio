"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Import Space Grotesk font
const spaceGrotesk = {
  fontFamily: "'Space Grotesk', 'JetBrains Mono', monospace",
};

export default function BioCard() {
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
  const rotateX = -mousePosition.y * 8;
  const rotateY = mousePosition.x * 8;

  // GSAP Animation Setup - DNA Helix
  useEffect(() => {
    if (!svgRef.current) return;

    const tl = gsap.timeline({ repeat: -1, ease: "none" });
    timelineRef.current = tl;

    // Set initial state for DNA strands
    gsap.set([".dna-strand-1", ".dna-strand-2"], {
      strokeDashoffset: 300,
      opacity: 0,
    });

    gsap.set([".dna-base-1", ".dna-base-2", ".dna-base-3", ".dna-base-4"], {
      opacity: 0,
      scale: 0,
    });

    gsap.set(svgRef.current, {
      opacity: 0,
    });

    // Create DNA animation
    tl.to([".dna-strand-1", ".dna-strand-2"], {
      opacity: 1,
      duration: 0.5,
    }, 0)
    .to(".dna-strand-1", {
      strokeDashoffset: 0,
      duration: 2,
      ease: "none",
    }, 0.5)
    .to(".dna-strand-2", {
      strokeDashoffset: 0,
      duration: 2,
      ease: "none",
    }, 0.7)
    .to([".dna-base-1", ".dna-base-2", ".dna-base-3", ".dna-base-4"], {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }, 1.5)
    .to([".dna-base-1", ".dna-base-2", ".dna-base-3", ".dna-base-4"], {
      opacity: 0.6,
      duration: 1,
      ease: "power2.inOut",
    }, 2.5)
    .to([".dna-strand-1", ".dna-strand-2", ".dna-base-1", ".dna-base-2", ".dna-base-3", ".dna-base-4"], {
      opacity: 0,
      duration: 0.5,
    }, 3.5)
    .set([".dna-strand-1", ".dna-strand-2"], {
      strokeDashoffset: 300,
    }, 4)
    .set([".dna-base-1", ".dna-base-2", ".dna-base-3", ".dna-base-4"], {
      scale: 0,
    }, 4);

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
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(svgRef.current, {
        opacity: 0,
        duration: 0.4,
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
          className="relative w-full h-full rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 border border-emerald-700/50 transform-gpu transition-all duration-300 ease-out shadow-2xl shadow-emerald-900/50"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(16, 185, 129, 0.5)`
              : '0 25px 50px -12px rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Bio Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Card Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-emerald-400 tracking-[4px] mb-1 font-semibold" style={spaceGrotesk}>BIO.TECH</div>
                <div className="text-sm text-gray-300 tracking-[2px] font-medium" style={spaceGrotesk}>GENOME-SEQ</div>
              </div>
              <div className="relative">
                {/* Bio corner element */}
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border border-emerald-400/60 rounded-full">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full" />
                  </div>
                  <div className="absolute inset-1 border border-teal-400/40 rounded-full">
                    <div className="w-full h-full bg-gradient-to-br from-teal-400/15 to-emerald-500/15 rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* GSAP-Powered DNA Helix */}
            <div className="absolute inset-4 pointer-events-none">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="opacity-80"
              >
                <defs>
                  {/* Bio gradients */}
                  <linearGradient id="dnaGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                  </linearGradient>

                  <linearGradient id="dnaTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Bio glow filter */}
                  <filter id="bioGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* DNA Double Helix */}
                <g filter="url(#bioGlow)">
                  {/* DNA Strands */}
                  <path
                    className="dna-strand-1"
                    d="M60 40 Q120 20 180 40 Q240 60 300 40"
                    stroke="url(#dnaGreen)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="150 150"
                    strokeDashoffset="300"
                    opacity="0"
                  />
                  <path
                    className="dna-strand-2"
                    d="M60 60 Q120 80 180 60 Q240 40 300 60"
                    stroke="url(#dnaTeal)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="150 150"
                    strokeDashoffset="300"
                    opacity="0"
                  />

                  {/* DNA Base Pairs */}
                  <line
                    className="dna-base-1"
                    x1="90" y1="30" x2="90" y2="70"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                  <line
                    className="dna-base-2"
                    x1="150" y1="50" x2="150" y2="50"
                    stroke="#14b8a6"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                  <line
                    className="dna-base-3"
                    x1="210" y1="60" x2="210" y2="40"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    opacity="0"
                  />
                  <line
                    className="dna-base-4"
                    x1="270" y1="40" x2="270" y2="60"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    opacity="0"
                  />

                  {/* Molecular nodes */}
                  <circle cx="90" cy="30" r="2" fill="#10b981" className="dna-base-1" opacity="0" />
                  <circle cx="90" cy="70" r="2" fill="#10b981" className="dna-base-1" opacity="0" />
                  <circle cx="150" cy="50" r="2" fill="#14b8a6" className="dna-base-2" opacity="0" />
                  <circle cx="210" cy="60" r="2" fill="#06b6d4" className="dna-base-3" opacity="0" />
                  <circle cx="210" cy="40" r="2" fill="#06b6d4" className="dna-base-3" opacity="0" />
                  <circle cx="270" cy="40" r="2" fill="#10b981" className="dna-base-4" opacity="0" />
                  <circle cx="270" cy="60" r="2" fill="#10b981" className="dna-base-4" opacity="0" />
                </g>
              </svg>
            </div>

            {/* Card Number */}
            <div className="relative z-10">
              <div className="text-emerald-400 text-lg tracking-[3px] mb-4 flex items-center font-medium" style={spaceGrotesk}>
                <span className="text-gray-500 font-normal">DNA:</span>
                <span className="ml-2 font-semibold">B-4A7C.9E3F</span>
                <div className="ml-3 flex space-x-1">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>STRAIN</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>HELIX-3</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>VITALS</div>
                  <div className="text-sm text-emerald-400 tracking-[1px] flex items-center font-semibold" style={spaceGrotesk}>
                    <div className="w-2 h-2 bg-emerald-400 mr-2 rounded-full animate-pulse" />
                    STABLE
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 tracking-[2px] font-medium" style={spaceGrotesk}>GEN</div>
                  <div className="text-sm text-gray-300 tracking-[1px] font-semibold" style={spaceGrotesk}>G4-X</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Corner Accents */}
          <div className="absolute bottom-4 left-4 w-6 h-6">
            <div className="w-full h-full border-l-2 border-b-2 border-emerald-400/40 rounded-bl-lg" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border border-emerald-400/60 rounded-full" />
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-emerald-400 rounded-full" />
          </div>

          <div className="absolute bottom-4 right-4 w-6 h-6">
            <div className="w-full h-full border-r-2 border-b-2 border-teal-500/40 rounded-br-lg" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border border-teal-500/60 rounded-full" />
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-teal-500 rounded-full" />
          </div>

          <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-emerald-500/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-teal-500/40 rounded-tr-lg" />

          {/* Organic Pulse Effect */}
          <div
            className={`
              absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
              ${isHovered ? 'opacity-20' : 'opacity-0'}
            `}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.4) 0%, transparent 70%)',
              animation: isHovered ? 'organicPulse 4s infinite ease-in-out' : 'none',
            }}
          />
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          @keyframes organicPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
            33% { transform: scale(1.05) rotate(1deg); opacity: 0.1; }
            66% { transform: scale(0.95) rotate(-1deg); opacity: 0.25; }
          }
        `}</style>
      </div>
    </div>
  );
}