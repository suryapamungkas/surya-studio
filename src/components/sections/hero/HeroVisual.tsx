"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Code2, LayoutDashboard, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "client" | "dev";

const CODE = `// app/dashboard/page.tsx
export default async function Dashboard() {
  const orders = await db.order.findMany({
    where: { status: "PAID", via: "QRIS" },
  });
  const omzet = sum(orders, "total");

  return (
    <Shell title="Ringkasan Bisnis">
      <StatCard label="Omzet" value={idr(omzet)} trend="+32%" />
      <RevenueChart data={orders} />
      <OrderList items={orders.slice(0, 3)} />
    </Shell>
  );
}`;

const TOKEN_RE =
  /(\/\/.*$)|("[^"]*")|(\b(?:export|default|async|function|const|await|return)\b)|(<\/?[A-Z]\w*|\/?>)|(\b[a-zA-Z_]\w*(?=\())|(\b\d+\b)|(\b[a-z]\w*(?==))/gm;

function highlight(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1]
      ? "text-zinc-500 italic"
      : m[2]
        ? "text-emerald-300"
        : m[3]
          ? "text-violet-400"
          : m[4]
            ? "text-sky-300"
            : m[5]
              ? "text-amber-200"
              : m[6]
                ? "text-orange-300"
                : "text-indigo-300";
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const BARS = [38, 52, 44, 68, 58, 82, 74, 96];
const ORDERS = [
  { name: "Rina S.", item: "Paket Skincare Glow", amount: "Rp 485.000", via: "QRIS" },
  { name: "PT Sinar Jaya", item: "Plat Baja 4mm × 20", amount: "Rp 12,4 Jt", via: "BCA VA" },
  { name: "Dimas A.", item: "Booking Konsultasi", amount: "Rp 150.000", via: "GoPay" },
];

function ClientView() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Omzet Bulan Ini", value: "Rp 128,4 Jt", trend: "+32%", icon: TrendingUp },
          { label: "Leads WhatsApp", value: "1.284", trend: "+140%", icon: ArrowUpRight },
          { label: "PageSpeed", value: "99", trend: "0.6s", icon: Zap },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 sm:p-3"
          >
            <div className="flex items-center justify-between">
              <span className="truncate text-[9px] text-muted sm:text-[10px]">{s.label}</span>
              <s.icon className="hidden size-3 text-status sm:block" aria-hidden />
            </div>
            <div className="mt-1 font-display text-sm font-bold text-alabaster sm:text-lg">{s.value}</div>
            <div className="mt-0.5 font-mono text-[9px] text-status sm:text-[10px]">{s.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-medium text-muted sm:text-[11px]">Pendapatan 8 Minggu</span>
          <span className="rounded-full bg-status/10 px-2 py-0.5 font-mono text-[9px] text-status">LIVE</span>
        </div>
        <div className="flex h-[72px] items-end gap-1.5 sm:h-24">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className={cn(
                "flex-1 rounded-t-md",
                i === BARS.length - 1
                  ? "bg-gradient-to-t from-accent to-accent-2 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                  : "bg-white/[0.08]"
              )}
            />
          ))}
        </div>
      </div>

      <ul className="space-y-1.5">
        {ORDERS.map((o, i) => (
          <motion.li
            key={o.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.07, duration: 0.5 }}
            className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5"
          >
            <div className="min-w-0">
              <div className="truncate text-[10px] font-medium text-alabaster sm:text-[11px]">{o.name}</div>
              <div className="truncate text-[9px] text-muted sm:text-[10px]">{o.item}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-[10px] text-alabaster sm:text-[11px]">{o.amount}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-status/10 px-1.5 py-0.5 text-[8px] font-semibold text-status sm:text-[9px]">
                <CheckCircle2 className="size-2.5" aria-hidden />
                {o.via}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function DevView() {
  const lines = CODE.split("\n");
  return (
    <div className="h-full overflow-hidden p-4 font-mono text-[10.5px] leading-[1.7] sm:p-5 sm:text-[12px]">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.025, duration: 0.3 }}
          className="flex whitespace-pre"
        >
          <span className="mr-4 w-4 shrink-0 select-none text-right text-zinc-600">{i + 1}</span>
          <span className="text-zinc-300">{highlight(line)}</span>
        </motion.div>
      ))}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-8 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent"
      />
    </div>
  );
}

/**
 * Visual hero interaktif: toggle "Mode Klien" ↔ "Mode Developer",
 * tilt 3D mengikuti kursor (spring), auto-switch sampai pengguna berinteraksi.
 */
export function HeroVisual() {
  const [mode, setMode] = useState<Mode>("client");
  const [auto, setAuto] = useState(true);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setMode((m) => (m === "client" ? "dev" : "client")), 4500);
    return () => clearInterval(id);
  }, [auto]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function select(m: Mode) {
    setAuto(false);
    setMode(m);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] [perspective:1200px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* Glow di belakang */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),rgba(139,92,246,0.12)_50%,transparent)] blur-2xl"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[22px] border border-white/[0.1] bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 shadow-[0_40px_120px_-30px_rgba(99,102,241,0.45),0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Toggle */}
          <div role="tablist" aria-label="Pilih tampilan" className="relative flex rounded-full border border-white/[0.08] bg-black/40 p-0.5">
            {(
              [
                { id: "client", label: "Mode Klien", icon: LayoutDashboard },
                { id: "dev", label: "Mode Developer", icon: Code2 },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={mode === t.id}
                onClick={() => select(t.id)}
                className={cn(
                  "relative flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] font-medium transition-colors sm:text-xs",
                  mode === t.id ? "text-white" : "text-muted hover:text-alabaster"
                )}
              >
                {mode === t.id && (
                  <motion.span
                    layoutId="hero-toggle"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <t.icon className="relative size-3.5" aria-hidden />
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <span className="hidden font-mono text-[10px] text-zinc-600 sm:block">{mode === "client" ? "app.bisnis.id" : "page.tsx"}</span>
        </div>

        {/* Konten */}
        <div className="relative h-[330px] overflow-hidden sm:h-[380px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {mode === "client" ? <ClientView /> : <DevView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auto-progress */}
        {auto && (
          <motion.div
            key={`p-${mode}`}
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.5, ease: "linear" }}
            className="absolute inset-x-6 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        )}
      </motion.div>

      {/* Floating chips (parallax 3D) */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="pointer-events-none absolute -left-3 top-16 hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs shadow-xl backdrop-blur-xl sm:flex lg:-left-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span className="grid size-6 place-items-center rounded-md bg-status/15 text-status">
          <CheckCircle2 className="size-3.5" aria-hidden />
        </span>
        <span className="text-alabaster">Pembayaran QRIS diterima</span>
      </motion.div>
      <motion.div
        style={{ rotateX, rotateY }}
        className="pointer-events-none absolute -right-2 bottom-12 hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs shadow-xl backdrop-blur-xl sm:flex lg:-right-8"
        animate={{ y: [0, 6, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Zap className="size-3.5 text-amber-300" aria-hidden />
        <span className="font-mono text-alabaster">LCP 0.6s</span>
      </motion.div>
    </div>
  );
}
