"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Gauge, Layers, Rocket, Sparkles, Wallet } from "lucide-react";
import {
  CALCULATOR_CONFIG,
  buildCalculatorWhatsAppMessage,
  formatIDR,
  generateWhatsAppLink,
} from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const { projectTypes, addons, urgencyMultipliers } = CALCULATOR_CONFIG;

/** Bulatkan ke kelipatan Rp 50.000 agar angka terlihat rapi */
const roundPrice = (n: number) => Math.round(n / 50_000) * 50_000;

function StepLabel({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h3 className="flex items-center gap-3 text-base font-semibold text-alabaster">
        <span className="grid size-6 place-items-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-[11px] text-indigo-300">{n}</span>
        {title}
      </h3>
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </div>
  );
}

export function InteractiveCostCalculator() {
  const groupId = useId();
  const [typeId, setTypeId] = useState(projectTypes[0].id);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [urgencyIndex, setUrgencyIndex] = useState(0);

  const toggleAddon = useCallback((id: string) => {
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }, []);

  // Seluruh perhitungan dimemo → instan tanpa lag re-render
  const result = useMemo(() => {
    const selectedType = projectTypes.find((t) => t.id === typeId) ?? projectTypes[0];
    const selectedAddons = addons.filter((a) => addonIds.includes(a.id));
    const urgency = urgencyMultipliers[urgencyIndex];

    const basePrice = selectedType.price + selectedAddons.reduce((s, a) => s + a.price, 0);
    const baseDays = selectedType.estimatedDays + selectedAddons.reduce((s, a) => s + a.estimatedDays, 0);

    const totalPrice = roundPrice(basePrice * urgency.priceMultiplier);
    const totalDays = Math.max(3, Math.ceil(baseDays * urgency.timeMultiplier));
    const surcharge = totalPrice - basePrice;

    const message = buildCalculatorWhatsAppMessage(selectedType, selectedAddons, urgency.label, totalPrice, totalDays);

    return { selectedType, selectedAddons, urgency, basePrice, totalPrice, totalDays, surcharge, waLink: generateWhatsAppLink(message) };
  }, [typeId, addonIds, urgencyIndex]);

  const weeks = Math.max(1, Math.round(result.totalDays / 5));
  const sliderPct = (urgencyIndex / (urgencyMultipliers.length - 1)) * 100;

  return (
    <section id="calculator" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.14),transparent)] blur-2xl" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Simulasi Biaya Instan"
          title={<>Hitung investasi website Anda <span className="text-gradient">dalam 30 detik.</span></>}
          description="Transparan sejak awal. Pilih kebutuhan Anda, lihat estimasi biaya & waktu secara real-time, lalu klaim penawarannya langsung via WhatsApp."
        />

        <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
          {/* ---------- Kontrol ---------- */}
          <SpotlightCard className="p-5 sm:p-7 md:p-8">
            <div className="relative z-10 space-y-10">
              {/* 1. Tipe proyek */}
              <fieldset>
                <legend className="sr-only">Tipe Proyek</legend>
                <StepLabel n={1} title="Tipe Proyek" hint="Pilih satu" />
                <div role="radiogroup" aria-label="Tipe proyek" className="grid gap-2.5 sm:grid-cols-2">
                  {projectTypes.map((t) => {
                    const selected = t.id === typeId;
                    return (
                      <label
                        key={t.id}
                        className={cn(
                          "relative flex min-h-11 cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors duration-300",
                          selected ? "border-accent/50 bg-accent/[0.08]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.04]"
                        )}
                      >
                        <input
                          type="radio"
                          name={`${groupId}-type`}
                          value={t.id}
                          checked={selected}
                          onChange={() => setTypeId(t.id)}
                          className="peer sr-only"
                        />
                        {selected && (
                          <motion.span
                            layoutId="calc-type-ring"
                            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-accent/60 shadow-[0_0_30px_-8px_rgba(99,102,241,0.6)]"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        )}
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-alabaster">{t.label}</span>
                          <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border transition-all", selected ? "border-accent bg-accent text-white" : "border-white/20")}>
                            {selected && <Check className="size-3" strokeWidth={3} aria-hidden />}
                          </span>
                        </span>
                        <span className="text-xs leading-relaxed text-zinc-500">{t.description}</span>
                        <span className="mt-1 font-mono text-[11px] text-indigo-300">Mulai {formatIDR(t.price)}</span>
                        <span className="absolute inset-0 rounded-2xl peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" aria-hidden />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* 2. Fitur tambahan */}
              <fieldset>
                <legend className="sr-only">Fitur Tambahan</legend>
                <StepLabel n={2} title="Fitur Tambahan" hint={`${addonIds.length} dipilih`} />
                <div className="grid gap-2">
                  {addons.map((a) => {
                    const checked = addonIds.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={cn(
                          "group relative flex min-h-11 cursor-pointer items-center gap-3.5 rounded-2xl border p-3.5 transition-colors duration-300",
                          checked ? "border-accent/40 bg-accent/[0.06]" : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.16]"
                        )}
                      >
                        <input type="checkbox" checked={checked} onChange={() => toggleAddon(a.id)} className="peer sr-only" />
                        <span
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
                            checked ? "border-accent bg-gradient-to-br from-accent to-accent-2 text-white" : "border-white/20 bg-transparent"
                          )}
                        >
                          <AnimatePresence>
                            {checked && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                                <Check className="size-3.5" strokeWidth={3} aria-hidden />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-medium text-alabaster">{a.label}</span>
                          <span className="block text-xs text-zinc-500">{a.description}</span>
                        </span>
                        <span className="shrink-0 text-right font-mono text-[11px] text-zinc-400">
                          +{formatIDR(a.price).replace("Rp", "").trim()}
                          <span className="block text-[10px] text-zinc-600">+{a.estimatedDays} hari</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* 3. Target kecepatan */}
              <div>
                <StepLabel n={3} title="Target Kecepatan" />
                <div className="relative">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                      animate={{ width: `${sliderPct}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={urgencyMultipliers.length - 1}
                    step={1}
                    value={urgencyIndex}
                    onChange={(e) => setUrgencyIndex(Number(e.target.value))}
                    aria-label="Target kecepatan pengerjaan"
                    aria-valuetext={result.urgency.label}
                    className="range-input relative"
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {urgencyMultipliers.map((u, i) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgencyIndex(i)}
                      aria-pressed={urgencyIndex === i}
                      className={cn(
                        "flex min-h-11 flex-col rounded-2xl border p-3.5 text-left transition-colors duration-300",
                        i === 1 ? "text-right" : "",
                        urgencyIndex === i ? "border-accent/40 bg-accent/[0.06]" : "border-white/[0.06] hover:border-white/[0.16]"
                      )}
                    >
                      <span className={cn("flex items-center gap-1.5 text-sm font-semibold text-alabaster", i === 1 && "justify-end")}>
                        {i === 0 ? <Clock className="size-3.5 text-zinc-400" aria-hidden /> : <Rocket className="size-3.5 text-amber-300" aria-hidden />}
                        {u.label}
                      </span>
                      <span className="mt-0.5 text-xs text-zinc-500">{u.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* ---------- Output ---------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl p-px">
              {/* Border gradient berputar */}
              <div aria-hidden className="absolute inset-[-50%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgba(99,102,241,0.9)_10%,transparent_25%,transparent_50%,rgba(139,92,246,0.9)_60%,transparent_75%)] motion-reduce:animate-none" />
              <div className="relative rounded-[23px] bg-zinc-950/95 p-6 backdrop-blur-xl sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                    <Sparkles className="size-3.5 text-accent-2" aria-hidden /> Estimasi Real-time
                  </span>
                  <span className="rounded-full bg-status/10 px-2 py-0.5 font-mono text-[10px] text-status">LIVE</span>
                </div>

                <div className="mt-6" aria-live="polite" aria-atomic="true">
                  <p className="flex items-center gap-2 text-xs text-zinc-500"><Wallet className="size-3.5" aria-hidden /> Estimasi Investasi</p>
                  <p className="mt-1 font-display text-[2.4rem] font-extrabold leading-none tracking-tight text-alabaster sm:text-5xl">
                    <AnimatedNumber value={result.totalPrice} format={(n) => formatIDR(roundPrice(n))} duration={0.7} />
                  </p>
                  <span className="sr-only">{formatIDR(result.totalPrice)}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] text-zinc-500"><Gauge className="size-3.5" aria-hidden /> Waktu Pengerjaan</p>
                    <p className="mt-1 font-display text-2xl font-bold text-alabaster">
                      <AnimatedNumber value={result.totalDays} duration={0.6} /> <span className="text-sm font-medium text-zinc-400">hari</span>
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500">≈ {weeks} minggu kerja</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] text-zinc-500"><Layers className="size-3.5" aria-hidden /> Fitur Tambahan</p>
                    <p className="mt-1 font-display text-2xl font-bold text-alabaster">
                      <AnimatedNumber value={result.selectedAddons.length} duration={0.4} />
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500">{result.urgency.id === "express" ? "Prioritas Express" : "Jadwal Standar"}</p>
                  </div>
                </div>

                {/* Rincian */}
                <ul className="mt-5 space-y-2 border-t border-dashed border-white/[0.08] pt-5 text-[13px]">
                  <li className="flex justify-between gap-3">
                    <span className="truncate text-zinc-400">{result.selectedType.label}</span>
                    <span className="shrink-0 font-mono text-zinc-300">{formatIDR(result.selectedType.price)}</span>
                  </li>
                  <AnimatePresence initial={false}>
                    {result.selectedAddons.map((a) => (
                      <motion.li
                        key={a.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                        className="flex justify-between gap-3 overflow-hidden"
                      >
                        <span className="truncate text-zinc-500">+ {a.label}</span>
                        <span className="shrink-0 font-mono text-zinc-400">{formatIDR(a.price)}</span>
                      </motion.li>
                    ))}
                    {result.surcharge > 0 && (
                      <motion.li
                        key="surcharge"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between gap-3 overflow-hidden"
                      >
                        <span className="text-amber-300/90">+ Biaya Prioritas Express</span>
                        <span className="shrink-0 font-mono text-amber-300/90">{formatIDR(result.surcharge)}</span>
                      </motion.li>
                    )}
                  </AnimatePresence>
                </ul>

                <Magnetic className="mt-6 w-full">
                  <ButtonLink href={result.waLink} target="_blank" rel="noopener noreferrer" size="lg" className="w-full">
                    <WhatsAppIcon className="size-[18px]" />
                    Klaim Estimasi Ini via WhatsApp
                  </ButtonLink>
                </Magnetic>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-500">
                  Estimasi awal, bukan harga final. Harga akhir disepakati setelah sesi konsultasi gratis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
