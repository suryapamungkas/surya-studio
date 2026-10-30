"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FOOTER_CONTENT, generateWhatsAppLink } from "@/data/content";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Widget WhatsApp mengambang (kanan bawah): glassmorphic, badge notifikasi "1",
 * melebar saat hover memperlihatkan label. Muncul setelah pengguna mulai scroll.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={generateWhatsAppLink(FOOTER_CONTENT.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp: ${FOOTER_CONTENT.floatingLabel}`}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => {
            setHovered(false);
            setSeen(true);
          }}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="fixed bottom-5 right-4 z-[55] flex h-14 items-center overflow-hidden rounded-full border border-white/[0.12] bg-zinc-900/70 p-1.5 shadow-[0_10px_40px_-8px_rgba(16,185,129,0.45)] backdrop-blur-xl md:bottom-8 md:right-8"
          layout
        >
          <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
            <WhatsAppIcon className="size-6" />
            {!seen && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-rose-500" />
                <span className="relative grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-zinc-900">1</span>
              </span>
            )}
          </span>
          <AnimatePresence initial={false}>
            {hovered && (
              <motion.span
                key="label"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="block pl-3 pr-4 text-sm font-semibold text-alabaster">{FOOTER_CONTENT.floatingLabel}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
