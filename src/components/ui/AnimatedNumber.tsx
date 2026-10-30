"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
  /** Mulai animasi hanya ketika terlihat di layar */
  startOnView?: boolean;
};

const defaultFormat = (n: number) => Math.round(n).toString();

/**
 * Counter angka beranimasi. Menulis langsung ke textContent
 * (tanpa re-render React per frame) agar tetap 60fps.
 */
export function AnimatedNumber({
  value,
  format = defaultFormat,
  duration = 0.9,
  className,
  startOnView = false,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const formatRef = useRef(format);
  formatRef.current = format;

  const mv = useMotionValue(startOnView ? 0 : value);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    return mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = formatRef.current(v);
    });
  }, [mv]);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (reduce) {
      mv.jump(value);
      if (ref.current) ref.current.textContent = formatRef.current(value);
      return;
    }
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, inView, startOnView, duration, mv, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(startOnView ? 0 : value)}
    </span>
  );
}
