"use client";
import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const ProjectsDiv: React.FC = () => {
  const [filledBoxes, setFilledBoxes] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0, totalBoxes: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const FIXED_NUMBER_OF_BOXES = 48;
  const BOX_SIZE = 50;

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  

  useEffect(() => {
    const STAGES = [0, 0.3, 0.5, 0.8, 1]; // Scroll progress stages
    let currentStageIndex = 0;
  
    const lenis = new Lenis({
      duration: 1.5, // Smooth scrolling
      easing: (t) => {
        const easeOutExpo = (t: number) =>
          t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        return easeOutExpo(t);
      },
      smoothWheel: true,
      wheelMultiplier: 0.3, // Controlled scrolling sensitivity
    });
  
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  
    // Calculate stage-relative progress
    const getRelativeProgress = (progress: number, stageStart: number, stageEnd: number) => {
      return (progress - stageStart) / (stageEnd - stageStart);
    };
  
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      setScrollProgress(progress);
  
      // Determine the current stage
      const nextStageIndex = STAGES.findIndex(
        (stage, i) => progress >= stage && progress < (STAGES[i + 1] || 1)
      );
  
      if (nextStageIndex !== -1) {
        currentStageIndex = nextStageIndex;
      }
    });
  
    // Calculate grid size for box arrangement
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
  
      if (state === 'random') {
        // Scatter randomly
        targetX = 0;
        targetY = 0;
      } else if (state === 'left') {
        targetX = leftPosition + rectCol * BOX_SIZE - col * BOX_SIZE;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
      } else if (state === 'middle') {
        targetX = middlePosition + rectCol * BOX_SIZE - col * BOX_SIZE;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
      } else if (state === 'right') {
        targetX = rightPosition + rectCol * BOX_SIZE - col * BOX_SIZE;
        targetY = startY + rectRow * BOX_SIZE - row * BOX_SIZE;
      }
  
      return {
        transform: `translate(${targetX}px, ${targetY}px)`,
        transition: 'transform 0.8s ease-out',
      };
    }
  
    // Default position for boxes not part of the rectangle
    return {
      transform: `translate(0px, 0px)`,
      transition: 'transform 0.8s ease-out',
    };
  };
  

  // Easing function for smoother transitions
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
            className="absolute bg-black dark:bg-white"
            style={{
              top: `${Math.floor(boxIndex / gridSize.cols) * BOX_SIZE}px`,
              left: `${(boxIndex % gridSize.cols) * BOX_SIZE}px`,
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`,
              ...getBoxTransform(boxIndex)
            }}
          />
        ))}
        <div className="relative z-2 flex items-center justify-center h-full text-xl text-black dark:text-white font-['Press_Start_2P']">
          Dynamic Mesh Background
        </div>
      </div>
    </div>
  );
};

export default ProjectsDiv;

