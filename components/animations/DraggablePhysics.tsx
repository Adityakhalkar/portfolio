"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function DraggablePhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const [dragInfo, setDragInfo] = useState({ x: 0, y: 0, isDragging: false });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Free drag with inertia
      Draggable.create(box1Ref.current, {
        type: "x,y",
        inertia: true,
        bounds: containerRef.current,
        onDrag: function () {
          setDragInfo({ x: this.x, y: this.y, isDragging: true });
        },
        onDragEnd: function () {
          setDragInfo((prev) => ({ ...prev, isDragging: false }));
        },
      });

      // Horizontal only with snap
      Draggable.create(box2Ref.current, {
        type: "x",
        inertia: true,
        bounds: containerRef.current,
        snap: {
          x: (endValue) => Math.round(endValue / 50) * 50,
        },
      });

      // Rotation drag
      Draggable.create(box3Ref.current, {
        type: "rotation",
        inertia: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-8 min-h-[500px]">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Draggable with Physics
        </h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4">
          <div className="relative h-64 bg-white/5 rounded-lg overflow-hidden">
            {/* Free drag box */}
            <div
              ref={box1Ref}
              className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg cursor-move flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xs">Free</span>
            </div>

            {/* Horizontal only box */}
            <div
              ref={box2Ref}
              className="absolute top-32 left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg cursor-move flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xs">X-Only</span>
            </div>

            {/* Rotation box */}
            <div
              ref={box3Ref}
              className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg cursor-move flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xs">Rotate</span>
            </div>
          </div>
        </div>

        {dragInfo.isDragging && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
            <p>
              <strong>Position:</strong> x: {Math.round(dragInfo.x)}px, y:{" "}
              {Math.round(dragInfo.y)}px
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="text-white font-semibold text-sm mb-1">Free Drag</h4>
            <p className="text-white/70 text-xs">Move anywhere with inertia</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">↔️</div>
            <h4 className="text-white font-semibold text-sm mb-1">X-Axis</h4>
            <p className="text-white/70 text-xs">Horizontal with snap</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h4 className="text-white font-semibold text-sm mb-1">Rotation</h4>
            <p className="text-white/70 text-xs">Spin with momentum</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">💡 Draggable Features</h4>
        <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
          <li>• <strong>InertiaPlugin:</strong> Momentum-based throwing</li>
          <li>• <strong>Bounds:</strong> Constrains movement to container</li>
          <li>• <strong>Snap:</strong> Snaps to grid points (50px intervals)</li>
          <li>• <strong>Type:</strong> x,y (free), x (horizontal), rotation (spin)</li>
        </ul>
      </div>
    </div>
  );
}
