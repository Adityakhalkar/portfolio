"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);
  
  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const container = containerRef.current;
  
    container.addEventListener("mousemove", updateMousePosition);
  
    return () => {
      if (container) {
        container.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  

  // Change color of elements behind the mask
  let maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={"h-screen relative"}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center text-6xl absolute bg-white bg-grid-white/[0.2] text-white"
        style={{
          maskImage: `url(/mask.svg)`,
          maskSize: `${maskSize}px`,
          maskRepeat: "no-repeat",
          maskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
        }}
        transition={{
          duration: 0,
        }}
      >
        {/* Make background or text color change behind mask */}
        <div className="absolute inset-0 bg-black h-full w-full z-0 opacity-50 transition-colors duration-300" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="max-w-4xl mx-auto text-center text-white text-4xl font-bold relative z-20"
        >
          {children}
        </div>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center text-white">
        {revealText}
      </div>
    </motion.div>
  );
};
