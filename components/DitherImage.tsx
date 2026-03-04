"use client";

import { useRef, useEffect, useState } from "react";

interface DitherImageProps {
  src: string;
  width: number;
  height: number;
  className?: string;
  threshold?: number;
  invert?: boolean;
}

export default function DitherImage({
  src,
  width,
  height,
  className = "",
  threshold = 128,
  invert = false,
}: DitherImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      floydSteinberg(imageData, threshold, invert);
      ctx.putImageData(imageData, 0, 0);
      setLoaded(true);
    };
    img.src = src;
  }, [src, threshold, invert]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width,
        height,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}

function floydSteinberg(
  imageData: ImageData,
  threshold: number,
  invert: boolean
) {
  const { data, width, height } = imageData;

  // Convert to grayscale first
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }

  // Floyd-Steinberg dithering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const oldPixel = data[idx];
      const newPixel = oldPixel < threshold ? 0 : 255;
      const error = oldPixel - newPixel;

      data[idx] = newPixel;
      data[idx + 1] = newPixel;
      data[idx + 2] = newPixel;

      // Distribute error to neighbors
      if (x + 1 < width) {
        distributeError(data, idx + 4, error, 7 / 16);
      }
      if (y + 1 < height) {
        if (x > 0) {
          distributeError(data, idx + (width - 1) * 4, error, 3 / 16);
        }
        distributeError(data, idx + width * 4, error, 5 / 16);
        if (x + 1 < width) {
          distributeError(data, idx + (width + 1) * 4, error, 1 / 16);
        }
      }
    }
  }

  // Invert if needed
  if (invert) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  }
}

function distributeError(
  data: Uint8ClampedArray,
  idx: number,
  error: number,
  factor: number
) {
  data[idx] = Math.max(0, Math.min(255, data[idx] + error * factor));
  data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + error * factor));
  data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + error * factor));
}
