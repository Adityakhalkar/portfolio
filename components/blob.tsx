"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Matter from "matter-js";

const Blob = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blobRef = useRef<Matter.Body | null>(null);

  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);

  const eyesX = useTransform(x, (value) => value - 20); // Offset for eyes
  const eyesY = useTransform(y, (value) => value + 30);

  const radius = 100;

  useEffect(() => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.body,
      canvas: canvasRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    blobRef.current = Matter.Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, radius, {
      render: {
        fillStyle: "black",
      },
    });

    Matter.World.add(engine.world, [blobRef.current]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    const handleMouseMove = (event: MouseEvent) => {
      Matter.Body.setPosition(blobRef.current!, { x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      Matter.World.clear(engine.world, true);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <>
      <motion.canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10" />
      {/* Blob Eyes */}
      <motion.div
        className="absolute"
        style={{
          x: eyesX,
          y: eyesY,
          width: "20px",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          x: eyesX,
          y: eyesY,
          width: "20px",
          height: "20px",
          left: "40px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default Blob;
