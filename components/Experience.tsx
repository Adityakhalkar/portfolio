"use client";
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const ExperienceDiv: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const companies = [
    {
      name: "Deep-ML",
      role: "Full Stack Developer",
      duration: "Sept '24 - Present",
      url: "https://example.com",
      name_x: 50,
      role_x: 0,
      duration_x: 10,
      name_y: 50,
      role_y: 80,
      duration_y: 140,
    },
    {
      name: "ShinobiAI",
      role: "Full stack developer intern",
      duration: "Jan '23 - Aug '24",
      url: "https://another-example.com",
      name_x: 35,
      role_x: 0,
      duration_x: 10,
      name_y: 50,
      role_y: 80,
      duration_y: 140,
    },
  ];
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 100, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0]);
  
  const dropletY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8],
    [0, 100, 200, 250]
  );

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const newIndex = Math.min(Math.floor(latest * companies.length), companies.length - 1);
      setCurrentCompanyIndex(newIndex);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted ? resolvedTheme === "dark" : false;

  return (
    <div
      ref={containerRef}
      className="min-h-[300vh] relative w-full bg-black dark:bg-white"
    >
      <div ref={ref} className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-items-center">
        <motion.svg
          viewBox="0 0 1280 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
          }}
        >
          <motion.path
            d="M641.5 200.5C378.5 200.5 310 0.5 0.5 0.5H1280C993.5 8.5 904.5 200.5 641.5 200.5Z"
            className={`${
              isDarkTheme ? "fill-black stroke-black" : "fill-white stroke-white"
            }`}
            style={{
              pathLength: pathProgress
            }}
          />
          <motion.text
            x="640"
            y={textY}
            textAnchor="middle"
            className={`text-2xl font-bold font-['Press_Start_2P'] ${
              isDarkTheme ? "fill-white" : "fill-black"
            }`}
            style={{
              opacity: textOpacity
            }}
          >
            Experience
          </motion.text>
        </motion.svg>

        {/* Centered Combined Shape SVG */}
        <motion.svg
          width="296"
          height="314"
          viewBox="0 0 296 314"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-4 droplet"
          style={{
            y: dropletY,
          }}
        >
          <motion.path
            d="M296 164.5C296 246.79 229.738 313.5 148 313.5C66.2619 313.5 0 246.79 0 164.5C0 82.2096 66.2619 15.5 148 15.5C229.738 15.5 296 82.2096 296 164.5Z"
            className={isDarkTheme ? "fill-black" : "fill-white"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M147.5 0C118 1.76431e-05 50.5 52 50.5 52H245C245 52 177 -1.76431e-05 147.5 0Z"
            className={isDarkTheme ? "fill-black" : "fill-white"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <g transform="translate(30,100)" className="font-['Press_Start_2P'] text-center"> {/* Adjust position as needed */}
            <AnimatePresence>
            <motion.text
              x={companies[currentCompanyIndex].name_x}
              y={companies[currentCompanyIndex].name_y}
              className={`text-lg text-center ${isDarkTheme ? 'fill-white' : 'fill-black'}`}
              style={{
                opacity: dropletY,
                cursor: 'pointer'
              }}
              onClick={() => window.open(companies[currentCompanyIndex].url, "_blank")} // Open company URL on click
              key={companies[currentCompanyIndex].name}
            >
              {companies[currentCompanyIndex].name}
            </motion.text>
            <motion.text
              key={`role-${currentCompanyIndex}`} 
              x={companies[currentCompanyIndex].role_x}
              y={companies[currentCompanyIndex].role_y}
              className={`text-xs font-bold ${isDarkTheme ? 'fill-white' : 'fill-black'}`}
              style={{
                opacity: dropletY,
              }}
            >
              {companies[currentCompanyIndex].role}
            </motion.text>
            <motion.text
              key={`duration-${currentCompanyIndex}`}
              x={companies[currentCompanyIndex].duration_x}
              y={companies[currentCompanyIndex].duration_y}
              className={`text-xs ${isDarkTheme ? 'fill-zinc-400' : 'fill-black'}`}
              style={{
                opacity: dropletY,
              }}
            >
              {companies[currentCompanyIndex].duration}
            </motion.text>
            </AnimatePresence>
          </g>
        </motion.svg>
      </div>
    </div>
);
};

export default ExperienceDiv;
