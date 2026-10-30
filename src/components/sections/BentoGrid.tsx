"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock3,
  Database,
  Globe,
  LayoutTemplate,
  Lock,
  MessageCircle,
  Paintbrush,
  Search,
  Server,
  Wallet,
  Webhook,
  Zap,
} from "lucide-react";
import { BENTO_ITEMS, SITE_CONFIG } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

type BentoItem = (typeof BENTO_ITEMS)[number];

function CardHeader({ item }: { item: BentoItem }) {
  return (
    <div className="relative z-10">
      <span className="mb-4 inline-flex rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-indigo-300">
        {item.badge}
      </span>
      <h3 className="text-xl font-bold leading-snug text-alabaster md:text-[22px]">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
    </div>
  );
}

/* ---------- Card 1: Gauge performa ---------- */
function Gauge({ value, max, label, suffix, decimals = 0, invert = false }: {
  value: number; max: number; label: string; suffix: string; decimals?: number; invert?: boolean;
}) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const pct = invert ? 1 - value / max : value / max;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative size-32 sm:size-36">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke="url(#gauge-grad)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * (1 - pct) }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.55))" }}
          />
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-extrabold text-alabaster sm:text-4xl">
            <AnimatedNumber value={value} startOnView duration={1.6} format={(n) => n.toFixed(decimals)} />
            <span className="ml-0.5 text-sm font-semibold text-status">{suffix}</span>
          </span>
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
    </div>
  );
}

function PerformanceCard({ item }: { item: BentoItem }) {
  const metrics = ("metrics" in item && item.metrics) || [];
  return (
    <div className="grid h-full gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
      <CardHeader item={item} />
      <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10">
        {metrics.map((m) => (
          <Gauge
            key={m.label}
            label={m.label}
            value={m.value}
            suffix={m.suffix}
            max={m.suffix === "s" ? 3 : 100}
            invert={m.suffix === "s"}
            decimals={m.value % 1 === 0 ? 0 : 1}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Card 2: Node ekosistem lokal ---------- */
const NODES = [
  { id: "web", label: "Website Anda", sub: "Next.js & React 19", icon: Globe },
  { id: "pay", label: "Payment Gateway", sub: "QRIS • VA • Midtrans/Xendit", icon: Wallet },
  { id: "cms", label: "Admin CMS & Database", sub: "Kelola konten, data & leads", icon: LayoutTemplate },
  { id: "wa", label: "WhatsApp Automation", sub: "Invoice & notifikasi otomatis", icon: MessageCircle },
];

function EcosystemCard({ item }: { item: BentoItem }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % NODES.length), 1600);
    return () => clearInterval(id);
  }, [paused]);

  const integrations = ("integrations" in item && item.integrations) || [];

  return (
    <div className="flex h-full flex-col gap-6 p-6 md:p-8">
      <CardHeader item={item} />
      <ol
        className="relative z-10 flex flex-col"
        onPointerLeave={() => setPaused(false)}
        aria-label="Alur integrasi"
      >
        {NODES.map((n, i) => {
          const on = i <= active;
          return (
            <li key={n.id} className="relative">
              {i > 0 && (
                <div className="relative ml-[19px] h-5 w-px overflow-hidden bg-white/[0.08]" aria-hidden>
                  <motion.div
                    className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-accent to-accent-2"
                    initial={false}
                    animate={{ scaleY: on ? 1 : 0 }}
                    style={{ transformOrigin: "top" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}
              <button
                type="button"
                onPointerEnter={() => { setPaused(true); setActive(i); }}
                onFocus={() => { setPaused(true); setActive(i); }}
                className="flex w-full items-center gap-3 rounded-xl p-0.5 text-left"
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-500",
                    on
                      ? "border-accent/40 bg-accent/15 text-indigo-300 shadow-[0_0_24px_-4px_rgba(99,102,241,0.7)]"
                      : "border-white/[0.08] bg-white/[0.03] text-zinc-500"
                  )}
                >
                  <n.icon className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-sm font-semibold transition-colors", on ? "text-alabaster" : "text-zinc-500")}>{n.label}</span>
                  <span className="block truncate font-mono text-[10.5px] text-zinc-500">{n.sub}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="relative z-10 mt-auto flex flex-wrap gap-1.5">
        {integrations.map((t) => (
          <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-zinc-400">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card 3: Toggle Frontend / Backend ---------- */
const STACK = {
  frontend: [
    { icon: Paintbrush, label: "UI/UX Premium", desc: "Desain eksklusif, bukan template" },
    { icon: Search, label: "SEO Teknis", desc: "Schema, sitemap, Core Web Vitals" },
    { icon: Zap, label: "Animasi Halus", desc: "60fps, ringan di HP" },
    { icon: LayoutTemplate, label: "Admin Panel Simpel", desc: "Edit konten tanpa koding" },
  ],
  backend: [
    { icon: Database, label: "Database", desc: "PostgreSQL, backup otomatis" },
    { icon: Webhook, label: "API & Integrasi", desc: "Payment, WA Bot, CRM, ERP" },
    { icon: Lock, label: "Keamanan Server", desc: "SSL, enkripsi, rate-limit" },
    { icon: Server, label: "Cloud Skalabel", desc: "Vercel / AWS, uptime 99.9%" },
  ],
};

function StackCard({ item }: { item: BentoItem }) {
  const [tab, setTab] = useState<"frontend" | "backend">("frontend");
  return (
    <div className="flex h-full flex-col gap-6 p-6 md:p-8">
      <CardHeader item={item} />
      <div className="relative z-10 mt-auto">
        <div role="tablist" aria-label="Lapisan arsitektur" className="mb-4 grid grid-cols-2 rounded-full border border-white/[0.08] bg-black/30 p-1">
          {(["frontend", "backend"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn("relative h-10 rounded-full text-xs font-semibold capitalize transition-colors", tab === t ? "text-white" : "text-muted hover:text-alabaster")}
            >
              {tab === t && (
                <motion.span layoutId="stack-pill" className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-white/[0.1]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{t === "frontend" ? "Frontend" : "Backend"}</span>
            </button>
          ))}
        </div>
        <div className="relative min-h-[212px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.ul
              key={tab}
              initial={{ opacity: 0, x: tab === "frontend" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "frontend" ? 16 : -16 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="space-y-2"
            >
              {STACK[tab].map((s) => (
                <li key={s.label} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5">
                  <span className={cn("grid size-8 place-items-center rounded-lg", tab === "frontend" ? "bg-sky-400/10 text-sky-300" : "bg-violet-400/10 text-violet-300")}>
                    <s.icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-alabaster">{s.label}</span>
                    <span className="block text-[11px] text-zinc-500">{s.desc}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------- Card 4: Jam zona waktu live ---------- */
const ZONES = [
  { code: "WIB", tz: "Asia/Jakarta", city: "Jakarta" },
  { code: "WITA", tz: "Asia/Makassar", city: "Makassar" },
  { code: "WIT", tz: "Asia/Jayapura", city: "Jayapura" },
];

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function TimezoneCard({ item }: { item: BentoItem }) {
  const now = useNow();
  const hourWIB = now ? Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Jakarta" }).format(now)) : 10;
  const online = hourWIB >= 8 && hourWIB < 22;

  return (
    <div className="grid h-full gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
      <CardHeader item={item} />
      <div className="relative z-10 flex flex-col justify-center gap-3">
        <div className="grid grid-cols-3 gap-2">
          {ZONES.map((z) => {
            const time = now
              ? new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: z.tz }).format(now).replace(/\./g, ":")
              : "--:--:--";
            return (
              <div key={z.code} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <div className="font-mono text-[10px] font-semibold tracking-wider text-indigo-300">{z.code}</div>
                <div className="mt-1 font-mono text-[15px] font-medium tabular-nums text-alabaster sm:text-lg" suppressHydrationWarning>
                  {time}
                </div>
                <div className="text-[10px] text-zinc-500">{z.city}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-status/20 bg-status/[0.06] p-3">
          <span className="relative flex size-2.5 shrink-0">
            <span className={cn("absolute inline-flex size-full rounded-full", online ? "animate-pulse-ring bg-status" : "bg-amber-400")} />
            <span className={cn("relative inline-flex size-2.5 rounded-full", online ? "bg-status" : "bg-amber-400")} />
          </span>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-alabaster">{online ? "Online sekarang" : "Di luar jam kerja — tetap tinggalkan pesan"}</div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
              <Clock3 className="size-3" aria-hidden />
              {SITE_CONFIG.availability.responseGuarantee}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 font-mono text-[11px]">
          <span className="text-zinc-500">staging.proyek-anda.id</span>
          <span className="flex items-center gap-1.5 text-status">
            <span className="size-1.5 rounded-full bg-status" /> Deploy #42 • Live
          </span>
        </div>
      </div>
    </div>
  );
}

const RENDERERS: Record<string, (p: { item: BentoItem }) => React.ReactElement> = {
  "speed-performance": PerformanceCard,
  "local-integration": EcosystemCard,
  "code-vs-client": StackCard,
  "transparent-communication": TimezoneCard,
};

export function BentoGrid() {
  return (
    <section id="keunggulan" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kenapa Memilih Saya"
          title={<>Dibangun untuk <span className="text-gradient">hasil bisnis</span>, bukan sekadar tampilan.</>}
          description="Setiap baris kode dirancang untuk satu tujuan: membuat bisnis Anda lebih cepat, lebih dipercaya, dan lebih mudah menghasilkan penjualan."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BENTO_ITEMS.map((item, i) => {
            const Render = RENDERERS[item.id];
            return (
              <motion.div
                key={item.id}
                className={item.colSpan}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE_OUT_EXPO }}
              >
                <SpotlightCard as="article" className="h-full">
                  {Render ? <Render item={item} /> : <div className="p-8"><CardHeader item={item} /></div>}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
