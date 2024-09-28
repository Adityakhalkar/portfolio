"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateMousePosition = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", updateMousePosition);
      return () => {
        container.removeEventListener("mousemove", updateMousePosition);
      };
    }
  }, []);

  return (
    <motion.nav
      ref={containerRef}
      className="fixed top-0 left-0 w-full z-50 bg-white text-black flex justify-center items-center px-10 py-5"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      style={{ overflow: "hidden" }}
    >
      {/* Mask effect */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          WebkitMaskImage: `url(/mask.svg)`,
          WebkitMaskPosition: `${mousePosition.x - 150}px ${mousePosition.y - 150}px`,
          WebkitMaskSize: `300px`,
          WebkitMaskRepeat: "no-repeat",
          backgroundColor: "black",
        }}
        animate={{
          WebkitMaskPosition: isHovered
            ? `${mousePosition.x - 150}px ${mousePosition.y - 150}px`
            : "50% 50%",
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <div className="relative flex space-x-16">
        {["Projects", "Contact"].map((item) => (
          <motion.div
            key={item}
            className="relative cursor-pointer text-2xl font-semibold tracking-wide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
              color: "white",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
