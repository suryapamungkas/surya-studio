"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Home, Sparkles, FolderKanban, Calculator, Tags, MessageCircleQuestion } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG, generateWhatsAppLink } from "@/data/content";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  hero: Home,
  keunggulan: Sparkles,
  portofolio: FolderKanban,
  calculator: Calculator,
  harga: Tags,
  faq: MessageCircleQuestion,
};

/** Floating glass dock dengan pill indikator aktif (layoutId) + scroll-spy. */
export function DockNav() {
  const [active, setActive] = useState("hero");
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 40));

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5"
    >
      <nav
        aria-label="Navigasi utama"
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08] bg-zinc-900/70 p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-[box-shadow,background-color] duration-500",
          compact && "bg-zinc-900/80 shadow-[0_12px_50px_-10px_rgba(0,0,0,0.9),0_0_0_1px_rgba(99,102,241,0.08)]"
        )}
      >
        <a
          href="#hero"
          className="mr-1 hidden h-10 items-center gap-2 rounded-full pl-2 pr-3 font-display text-sm font-bold tracking-tight text-alabaster sm:flex"
          aria-label={`${SITE_CONFIG.name} — kembali ke atas`}
        >
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[11px] font-extrabold text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            {SITE_CONFIG.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
          <span className="hidden lg:inline">{SITE_CONFIG.name}</span>
        </a>

        <ul className="flex items-center">
          {NAV_LINKS.map((link) => {
            const Icon = ICONS[link.id] ?? Home;
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={link.label}
                  className={cn(
                    "relative flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-alabaster" : "text-muted hover:text-alabaster"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-pill"
                      className="absolute inset-0 -z-0 rounded-full border border-white/[0.1] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative size-4 md:hidden" aria-hidden />
                  <span className="relative hidden md:inline">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={generateWhatsAppLink("Halo, saya ingin konsultasi gratis mengenai pembuatan website.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi via WhatsApp"
          className="ml-1 flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-alabaster px-3 text-[13px] font-semibold text-obsidian transition-transform duration-300 hover:scale-[1.03] active:scale-95 md:px-4"
        >
          <WhatsAppIcon className="size-4" />
          <span className="hidden md:inline">Hubungi</span>
        </a>
      </nav>
    </motion.header>
  );
}
