"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { User } from "lucide-react";

interface AboutPhotoProps {
  imageUrl?: string | null;
  altText?: string | null;
}

export function AboutPhoto({ imageUrl, altText }: AboutPhotoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Motion values for smooth magnetic displacement (capped at 5px)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable effect on touch/coarse pointer devices
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)
    ) {
      return;
    }

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Normalize and clamp between -5 and +5 pixels (strict adherence to 4-6px rule)
    const maxDisplacement = 5;
    const clampedX = Math.max(
      -maxDisplacement,
      Math.min(maxDisplacement, (deltaX / (rect.width / 2)) * maxDisplacement)
    );
    const clampedY = Math.max(
      -maxDisplacement,
      Math.min(maxDisplacement, (deltaY / (rect.height / 2)) * maxDisplacement)
    );

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-4/5 sm:aspect-3/4 bg-stone-100 border border-editorial-border overflow-hidden select-none"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="relative w-full h-full"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText || "Profile photograph"}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover grayscale contrast-105"
            priority
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-editorial-muted p-6 text-center space-y-3">
            <User className="w-16 h-16 text-stone-300 stroke-1" />
            <p className="font-mono text-xs uppercase tracking-wider text-stone-400">
              [Profile photograph]
            </p>
          </div>
        )}
      </motion.div>

      {/* Subtle editorial index badge */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 border border-stone-200">
        <span className="font-mono text-[10px] uppercase tracking-widest text-editorial-fg">
          Fig. 01 // Identity
        </span>
      </div>
    </div>
  );
}
