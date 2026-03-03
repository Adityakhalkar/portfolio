"use client";

import { useEffect, useRef, useState } from "react";
import type { GSAPTechnique } from "./techniques";
import LiquidDistortionDemo from "./demos/LiquidDistortionDemo";
import MagneticElementsDemo from "./demos/MagneticElementsDemo";
import TextScrambleDemo from "./demos/TextScrambleDemo";
import ScrollTriggerPinDemo from "./demos/ScrollTriggerPinDemo";
import ScrollTriggerParallaxDemo from "./demos/ScrollTriggerParallaxDemo";
import HorizontalScrollDemo from "./demos/HorizontalScrollDemo";
import TimelineStaggerDemo from "./demos/TimelineStaggerDemo";
import Transform3DDemo from "./demos/Transform3DDemo";
import DraggableDemo from "./demos/DraggableDemo";
import CustomEasingDemo from "./demos/CustomEasingDemo";
import MotionPathDemo from "./demos/MotionPathDemo";
import SVGMorphDemo from "./demos/SVGMorphDemo";
import ScrollSmootherDemo from "./demos/ScrollSmootherDemo";
import DollyZoomDemo from "./demos/DollyZoomDemo";
import WhipPanDemo from "./demos/WhipPanDemo";
import RackFocusDemo from "./demos/RackFocusDemo";
import KenBurnsDemo from "./demos/KenBurnsDemo";
import CrashZoomDemo from "./demos/CrashZoomDemo";
import HolographicCardDemo from "./demos/HolographicCardDemo";
import KineticTypographyDemo from "./demos/KineticTypographyDemo";
import InteractiveMarqueeDemo from "./demos/InteractiveMarqueeDemo";

import CinemagraphDemo from "./demos/CinemagraphDemo";
import DutchAngleDemo from "./demos/DutchAngleDemo";
import SpeedRampDemo from "./demos/SpeedRampDemo";
import ParallaxDepthDemo from "./demos/ParallaxDepthDemo";
import LightLeakDemo from "./demos/LightLeakDemo";

interface GSAPDemoProps {
  technique: GSAPTechnique;
}

interface DemoControls {
  play: () => void;
  reset: () => void;
}

export default function GSAPDemo({ technique }: GSAPDemoProps) {
  const demoRef = useRef<DemoControls>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(60);
  const [duration, setDuration] = useState(0);

  // FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Reset on technique change
  useEffect(() => {
    setIsPlaying(false);
    setDuration(0);
  }, [technique.id]);

  const handlePlay = () => {
    setIsPlaying(true);
    const startTime = performance.now();

    if (demoRef.current) {
      demoRef.current.play();
    }

    setTimeout(() => {
      setIsPlaying(false);
      setDuration(performance.now() - startTime);
    }, 3000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setDuration(0);
    if (demoRef.current) {
      demoRef.current.reset();
    }
  };

  const renderDemo = () => {
    switch (technique.id) {
      case "liquid-distortion":
        return <LiquidDistortionDemo ref={demoRef} />;
      case "magnetic-elements":
        return <MagneticElementsDemo ref={demoRef} />;
      case "text-scramble":
        return <TextScrambleDemo ref={demoRef} />;
      case "scrolltrigger-pin":
        return <ScrollTriggerPinDemo ref={demoRef} />;
      case "scrolltrigger-parallax":
        return <ScrollTriggerParallaxDemo ref={demoRef} />;
      case "horizontal-scroll":
        return <HorizontalScrollDemo ref={demoRef} />;
      case "timeline-stagger":
        return <TimelineStaggerDemo ref={demoRef} />;
      case "transform-3d":
        return <Transform3DDemo ref={demoRef} />;
      case "draggable":
        return <DraggableDemo ref={demoRef} />;
      case "custom-easing":
        return <CustomEasingDemo ref={demoRef} />;
      case "motion-path":
        return <MotionPathDemo ref={demoRef} />;
      case "svg-morph":
        return <SVGMorphDemo ref={demoRef} />;
      case "scrollsmoother":
        return <ScrollSmootherDemo ref={demoRef} />;
      case "dolly-zoom":
        return <DollyZoomDemo ref={demoRef} />;
      case "whip-pan":
        return <WhipPanDemo ref={demoRef} />;
      case "rack-focus":
        return <RackFocusDemo ref={demoRef} />;
      case "ken-burns":
        return <KenBurnsDemo ref={demoRef} />;
      case "crash-zoom":
        return <CrashZoomDemo ref={demoRef} />;
      case "holographic-card":
        return <HolographicCardDemo />;
      case "kinetic-typography":
        return <KineticTypographyDemo />;
      case "interactive-marquee":
        return <InteractiveMarqueeDemo />;
      case "cinemagraph":
        return <CinemagraphDemo ref={demoRef} />;
      case "dutch-angle":
        return <DutchAngleDemo ref={demoRef} />;
      case "speed-ramp":
        return <SpeedRampDemo ref={demoRef} />;
      case "parallax-depth":
        return <ParallaxDepthDemo ref={demoRef} />;
      case "light-leak":
        return <LightLeakDemo ref={demoRef} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-xs text-gray-600 dark:text-gray-400">
            DEMO IN DEVELOPMENT
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="border border-black dark:border-white">
        <div className="border-b border-black dark:border-white p-3 bg-black dark:bg-white text-white dark:text-black">
          <h3 className="text-xs font-bold uppercase tracking-wider">Performance Metrics</h3>
        </div>
        <div className="p-4 grid grid-cols-3 gap-4 text-sm font-mono">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">FPS</div>
            <div className="text-2xl font-bold">{fps}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</div>
            <div className="text-2xl font-bold">{duration.toFixed(0)}ms</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</div>
            <div className="text-2xl font-bold">{isPlaying ? "ACTIVE" : "IDLE"}</div>
          </div>
        </div>
      </div>

      {/* Demo Canvas */}
      <div className="border border-black dark:border-white">
        <div className="border-b border-black dark:border-white p-3 bg-black dark:bg-white text-white dark:text-black">
          <h3 className="text-xs font-bold uppercase tracking-wider">Live Demo</h3>
        </div>
        <div className="h-[400px] bg-white dark:bg-black">
          {renderDemo()}
        </div>
      </div>

      {/* Controls */}
      <div className="border border-black dark:border-white">
        <div className="border-b border-black dark:border-white p-3 bg-black dark:bg-white text-white dark:text-black">
          <h3 className="text-xs font-bold uppercase tracking-wider">Controls</h3>
        </div>
        <div className="p-4 flex gap-2">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="px-6 py-3 border border-black dark:border-white font-mono text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            PLAY
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-black dark:border-white font-mono text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
