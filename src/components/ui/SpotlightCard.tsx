"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentPropsWithoutRef<"div"> & {
  /** Warna glow (rgba) */
  glow?: string;
  /** Radius lingkaran spotlight dalam px */
  size?: number;
  as?: "div" | "article" | "li";
};

/**
 * Kartu dengan spotlight radial mengikuti kursor (permukaan + border).
 * Posisi disimpan dalam MotionValue sehingga TIDAK memicu re-render React.
 */
export function SpotlightCard({
  className,
  children,
  glow = "rgba(99,102,241,0.12)",
  size = 600,
  as = "div",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const surface = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 40%)`;
  const border = useMotionTemplate`radial-gradient(${Math.round(size * 0.6)}px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.55), transparent 40%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/80 backdrop-blur-md",
        "transition-colors duration-300 hover:border-white/[0.2]",
        className
      )}
      {...(props as ComponentPropsWithoutRef<typeof motion.div>)}
    >
      {/* Glow permukaan */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: surface }}
      />
      {/* Glow border (mask: hanya area 1px tepi) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: border,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </Comp>
  );
}
