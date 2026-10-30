"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import { WORKFLOW_STEPS } from "@/data/content";
import { EASE_OUT_EXPO } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Timeline vertikal: garis progres terisi gradient mengikuti scroll. */
export function WorkflowTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [trackH, setTrackH] = useState(0);
  const glowY = useTransform(progress, (v) => v * trackH);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrackH(el.offsetHeight - 16));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="cara-kerja" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Cara Kerja"
          title={<>Proses jelas, <span className="text-gradient">tanpa drama.</span></>}
          description="Empat langkah sederhana dari obrolan pertama hingga website Anda live dan menghasilkan."
        />

        <ol ref={ref} className="relative mx-auto max-w-3xl">
          {/* Track */}
          <div aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-white/[0.08] md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-status md:left-1/2 md:-translate-x-1/2"
          />
          <div aria-hidden className="pointer-events-none absolute left-[19px] top-2 md:left-1/2">
            <motion.div
              style={{ y: glowY }}
              className="size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(139,92,246,0.8)]"
            />
          </div>

          {WORKFLOW_STEPS.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.stepNumber} className="relative grid grid-cols-[40px_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-2 md:gap-14">
                {/* Node */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 grid size-10 place-items-center rounded-full border border-accent/40 bg-zinc-950 font-mono text-xs font-semibold text-indigo-200 shadow-[0_0_24px_-4px_rgba(99,102,241,0.7)] md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2"
                >
                  {step.stepNumber}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: right ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                  className={right ? "md:col-start-2" : "md:col-start-1 md:text-right"}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2">{step.duration}</span>
                  <h3 className="mt-2 text-xl font-bold text-alabaster md:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
                    <FileCheck2 className="size-3.5 text-status" aria-hidden />
                    {step.deliverable}
                  </span>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
