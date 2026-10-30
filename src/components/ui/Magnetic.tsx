"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Radius tarikan di luar batas elemen (px) */
  radius?: number;
  /** Kekuatan tarikan 0..1 */
  strength?: number;
};

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * Pembungkus magnetik: elemen anak tertarik ke kursor saat kursor berada
 * dalam radius 40px dari tepi elemen. Pakai spring physics Framer Motion.
 */
export function Magnetic({ children, className, radius = 40, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const withinX = Math.abs(dx) < r.width / 2 + radius;
    const withinY = Math.abs(dy) < r.height / 2 + radius;
    if (withinX && withinY) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    // Area hit diperluas sebesar radius agar tarikan dimulai sebelum kursor menyentuh tombol
    <div
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
      style={{ padding: radius, margin: -radius }}
    >
      <motion.div ref={ref} style={{ x, y }} className="inline-flex w-full">
        {children}
      </motion.div>
    </div>
  );
}
