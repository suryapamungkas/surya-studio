"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fade + slide-up saat elemen masuk viewport (sekali). */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
