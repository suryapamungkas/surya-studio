"use client";

import { motion } from "framer-motion";
import { Check, Crown, ShieldCheck } from "lucide-react";
import { PRICING_TIERS, generateWhatsAppLink } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function PricingSection() {
  return (
    <section id="harga" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Paket Layanan"
          title={<>Harga transparan. <span className="text-gradient">Tanpa biaya tersembunyi.</span></>}
          description="Pilih paket yang sesuai tahap bisnis Anda. Semua paket dibayar bertahap (DP 40% & pelunasan setelah website siap)."
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-3 lg:gap-4">
          {PRICING_TIERS.map((tier, i) => {
            const [prefix, ...rest] = tier.priceLabel.split(" ");
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE_OUT_EXPO }}
                className={cn("relative", tier.isPopular && "lg:-my-4")}
              >
                {tier.isPopular && (
                  <>
                    {/* Border glow berpendar */}
                    <div aria-hidden className="absolute -inset-px rounded-[25px] bg-gradient-to-b from-accent via-accent-2/60 to-accent/10" />
                    <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(99,102,241,0.25),transparent)] blur-xl" />
                  </>
                )}
                <SpotlightCard
                  as="article"
                  glow={tier.isPopular ? "rgba(139,92,246,0.18)" : "rgba(99,102,241,0.12)"}
                  className={cn("flex h-full flex-col p-6 sm:p-8", tier.isPopular && "border-transparent bg-zinc-950")}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-alabaster">{tier.name}</h3>
                      {tier.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent to-accent-2 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                          <Crown className="size-3" aria-hidden /> {tier.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{tier.targetAudience}</p>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-sm text-zinc-500">{prefix}</span>
                      <span className="font-display text-4xl font-extrabold tracking-tight text-alabaster">{rest.join(" ")}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{tier.description}</p>

                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <ul className="flex-1 space-y-3">
                      {tier.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-[13.5px] leading-snug text-zinc-300">
                          <span className={cn("mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full", tier.isPopular ? "bg-accent/20 text-indigo-300" : "bg-white/[0.06] text-zinc-300")}>
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      {tier.isPopular ? (
                        <Magnetic className="w-full">
                          <ButtonLink href={generateWhatsAppLink(tier.waTemplate)} target="_blank" rel="noopener noreferrer" size="lg" className="w-full">
                            <WhatsAppIcon className="size-4" /> {tier.ctaText}
                          </ButtonLink>
                        </Magnetic>
                      ) : (
                        <ButtonLink href={generateWhatsAppLink(tier.waTemplate)} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="w-full">
                          {tier.ctaText}
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-zinc-500">
          <ShieldCheck className="size-4 text-status" aria-hidden />
          Butuh fitur di luar paket? <a href="#calculator" className="font-medium text-indigo-300 underline-offset-4 hover:underline">Gunakan kalkulator biaya</a>
        </p>
      </div>
    </section>
  );
}
