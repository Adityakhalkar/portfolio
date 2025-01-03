"use client"
import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion } from "framer-motion";

const ProjectsDiv: React.FC = () => {
  const [filledBoxes, setFilledBoxes] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0, totalBoxes: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const FIXED_NUMBER_OF_BOXES = 48;
  const BOX_SIZE = 50;
  const projectRanges = {
    project1: { start: 0.25, end: 0.35 },
    project2: { start: 0.45, end: 0.55 },
    project3: { start: 0.65, end: 0.75 }
  };
  const projects = [
    {
      title: "Dataset Finder",
      image: "/dataset-finder.png",
      link: "https://huggingface.co/spaces/AdityaKhalkar/Dataset-finder",
      top: 200,
      left: 100,
      range: projectRanges.project1,
      height: "400px"
    },
    {
      title: "Seat Algo",
      image: "/SeatAlgo.jpg",
      link: "https://seatalgo.streamlit.app",
      top: 200,
      left: 550,
      range: projectRanges.project2,
      height: "100px"
    },
    {
      title: "Eye from above",
      image: "/eye-from-above.png",
      link: "https://eye-from-above.vercel.app",
      top: 200,
      left: 1075,
      range: projectRanges.project3,
      height: "350px"
    },
  ];
  const getCurrentProject = () => {
    return projects.find(project => 
      scrollProgress >= project.range.start && 
      scrollProgress <= project.range.end
    );
  };


  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    const STAGES = [0, 0.3, 0.5, 0.8, 1];
    let currentStageIndex = 0;
  
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => {
        const easeOutExpo = (t: number) =>
          t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        return easeOutExpo(t);
      },
      smoothWheel: true,
      wheelMultiplier: 0.3,
    });
  
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
    });
  
    const calculateGridSize = () => {
      const cols = Math.ceil(window.innerWidth / BOX_SIZE);
      const rows = Math.ceil(window.innerHeight / BOX_SIZE);
      const totalBoxes = cols * rows;
      setGridSize({ cols, rows, totalBoxes });
    };
  
    const throttledResize = debounce(calculateGridSize, 100);
    calculateGridSize();
    window.addEventListener("resize", throttledResize);
  
    return () => {
      window.removeEventListener("resize", throttledResize);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (gridSize.totalBoxes > 0) {
      const boxes: number[] = [];
      while (boxes.length < FIXED_NUMBER_OF_BOXES) {
        const randomIndex = Math.floor(Math.random() * gridSize.totalBoxes);
        if (!boxes.includes(randomIndex)) {
          boxes.push(randomIndex);
        }
      }
      setFilledBoxes(boxes);
    }
  }, [gridSize]);

  const getBoxTransform = (boxIndex: number) => {
    const row = Math.floor(boxIndex / gridSize.cols);
    const col = boxIndex % gridSize.cols;
  
    const rectWidth = 6;
    const rectHeight = Math.ceil(FIXED_NUMBER_OF_BOXES / rectWidth);
  
    const leftPosition = BOX_SIZE * 2;
    const middlePosition = Math.floor((window.innerWidth - rectWidth * BOX_SIZE) / 2 / BOX_SIZE) * BOX_SIZE;
    const rightPosition = window.innerWidth - (rectWidth + 2) * BOX_SIZE;
  
    const startY = Math.floor((window.innerHeight - rectHeight * BOX_SIZE) / 2 / BOX_SIZE) * BOX_SIZE;
  
    let state: 'random' | 'left' | 'middle' | 'right' = 'random';
    if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
      state = 'left';
    } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
      state = 'middle';
    } else if (scrollProgress >= 0.6 && scrollProgress < 0.8) {
      state = 'right';
    }
  
    const boxPosition = filledBoxes.indexOf(boxIndex);
    if (boxPosition !== -1) {
      const rectRow = Math.floor(boxPosition / rectWidth);
      const rectCol = boxPosition % rectWidth;
  
      let targetX = 0;
      let targetY = 0;
      let className = '';
  
      if (state === 'random') {
        targetX = 0;
        targetY = 0;
      } else if (state === 'left') {
        targetX = leftPosition + rectCol * BOX_SIZE - col * BOX_SIZE;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
        className = 'left-position';
      } else if (state === 'middle') {
        targetX = middlePosition + rectCol * BOX_SIZE - col * BOX_SIZE;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
        className = 'middle-position';
      } else if (state === 'right') {
        targetX = rightPosition + rectCol * BOX_SIZE - col * BOX_SIZE-20;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
        className = 'right-position';
      }
  
      return {
        transform: `translate(${targetX}px, ${targetY}px)`,
        transition: 'transform 0.8s ease-out',
        className
      };
    }
  
    return {
      transform: `translate(0px, 0px)`,
      transition: 'transform 0.8s ease-out',
    };
  };
  const openLink = () => {
    window.open(getCurrentProject()?.link, "_blank");
  }

  // Get project position based on current state
  const getProjectPosition = () => {
    const leftPosition = BOX_SIZE * 2;
    const middlePosition = 550;
    const rightPosition = 1050;
  
    if (scrollProgress >= projectRanges.project1.start && scrollProgress <= projectRanges.project1.end) {
      return leftPosition;
    } else if (scrollProgress >= projectRanges.project2.start && scrollProgress <= projectRanges.project2.end) {
      return middlePosition;
    } else if (scrollProgress >= projectRanges.project3.start && scrollProgress <= projectRanges.project3.end) {
      return rightPosition;
    }
    return undefined; 
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-white dark:bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, var(--tw-mesh-line-color) 1px, transparent 1px),
              linear-gradient(180deg, var(--tw-mesh-line-color) 1px, transparent 1px)
            `,
            backgroundSize: `${BOX_SIZE}px ${BOX_SIZE}px`,
            '--tw-mesh-line-color': '#52525b',
          } as any}
        />
        {filledBoxes.map((boxIndex) => (
          <div
            key={boxIndex}
            className={`absolute bg-black dark:bg-white ${getBoxTransform(boxIndex).className}`}
            style={{
              top: `${Math.floor(boxIndex / gridSize.cols) * BOX_SIZE}px`,
              left: `${(boxIndex % gridSize.cols) * BOX_SIZE}px`,
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`,
              ...getBoxTransform(boxIndex)
            }}
          />
        ))}
        {getProjectPosition() !== undefined && (
          <motion.div
            className="absolute z-10 pointer-events-auto"
            style={{
              width: "300px",
              height: "400px",
              top: "200px",
              transform: `translateX(${getProjectPosition()}px)`,
            }}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0}}
          >
            <AnimatePresence mode="wait">
  {getCurrentProject() && (
    <>
      <motion.p
        key={getCurrentProject()?.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-['Press_Start_2P'] text-white dark:text-black mb-4 text-center pt-6"
      >
        {getCurrentProject()?.title}
      </motion.p>
      <motion.img
        key={getCurrentProject()?.image}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={getCurrentProject()?.image}
        alt={getCurrentProject()?.title}
        className="w-full max-w-[250px] h-auto object-cover mx-auto mb-4"
      />
      <motion.button
        key={getCurrentProject()?.link}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={openLink}
        className="font-['Press_Start_2P'] text-white w-full text-center py-2 px-4 mt-2 rounded-full dark:text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
      >
        View Project
      </motion.button>
    </>
  )}
</AnimatePresence>

          </motion.div>
        )}

        <div className="relative z-2 flex flex-col items-center justify-start h-full text-xl text-black dark:text-white font-['Press_Start_2P']">
          <h1 className="mt-16">Projects</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDiv;