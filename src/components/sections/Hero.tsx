"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calculator, ShieldCheck } from "lucide-react";
import { HERO_CONTENT, generateWhatsAppLink } from "@/data/content";
import { EASE_OUT_EXPO } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { HeroVisual } from "./hero/HeroVisual";
import { TechMarquee } from "./hero/TechMarquee";

const highlightSet = new Set(HERO_CONTENT.highlightedWords.join(" ").split(" "));

export function Hero() {
  const words = HERO_CONTENT.headline.split(" ");

  return (
    <section id="hero" className="bg-noise relative isolate overflow-hidden pt-28 pb-10 md:pt-36">
      {/* Latar: grid + aurora */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-20%] -z-10 h-[620px] w-[min(1100px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.28),rgba(139,92,246,0.10)_55%,transparent)] blur-2xl"
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge ketersediaan */}
          <motion.a
            href="#calculator"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="group mb-7 inline-flex min-h-9 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs font-medium backdrop-blur-md transition-colors hover:border-status/40 sm:text-[13px]"
          >
            <span className="relative flex size-2.5 items-center justify-center">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-status" />
              <span className="relative inline-flex size-2 rounded-full bg-status shadow-[0_0_10px_#10b981]" />
            </span>
            <span className="shimmer-text">{HERO_CONTENT.badge}</span>
          </motion.a>

          {/* H1 dengan reveal per kata */}
          <h1 className="font-display text-[2.35rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl xl:text-[4.25rem]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={highlightSet.has(word) ? "text-gradient inline-block" : "text-gradient-subtle inline-block"}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: EASE_OUT_EXPO }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && "\u00A0"}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT_EXPO }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row lg:items-start"
          >
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto lg:items-start">
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink
                  href={generateWhatsAppLink("Halo, saya tertarik konsultasi gratis untuk pembuatan website bisnis saya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className="size-[18px]" />
                  {HERO_CONTENT.primaryCta.label}
                </ButtonLink>
              </Magnetic>
            </div>
            <ButtonLink href={HERO_CONTENT.secondaryCta.targetId} variant="secondary" size="lg" className="w-full sm:w-auto">
              <Calculator className="size-[18px] text-accent-2" aria-hidden />
              {HERO_CONTENT.secondaryCta.label}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </ButtonLink>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-3 text-xs text-zinc-500"
          >
            {HERO_CONTENT.primaryCta.subtext}
          </motion.p>

          {/* Trust badges */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
            className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2.5 lg:justify-start"
          >
            {HERO_CONTENT.trustBadges.map((b) => (
              <motion.li
                key={b}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-1.5 text-[13px] text-zinc-400"
              >
                <ShieldCheck className="size-4 text-status" aria-hidden />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT_EXPO }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
}
