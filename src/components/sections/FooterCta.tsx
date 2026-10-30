"use client";

import { Check, Copy, Mail } from "lucide-react";
import { siGithub, siInstagram } from "simple-icons";

const LINKEDIN_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FOOTER_CONTENT, NAV_LINKS, SITE_CONFIG, generateWhatsAppLink } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { useToast } from "@/components/ui/Toast";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FooterCta() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
    } catch {
      // Fallback untuk browser lama / konteks non-secure
      const ta = document.createElement("textarea");
      ta.value = SITE_CONFIG.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    toast(FOOTER_CONTENT.copyToast);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer className="relative overflow-hidden pt-24 md:pt-32">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(99,102,241,0.25),transparent)]" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_70%,black,transparent)]" />

      <div className="container-x flex flex-col items-center text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            <span className="text-gradient-subtle">Siap Meningkatkan </span>
            <span className="text-gradient">Kredibilitas &amp; Omzet</span>
            <span className="text-gradient-subtle"> Bisnis Anda?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{FOOTER_CONTENT.subheadline}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Magnetic className="w-full sm:w-auto">
            <ButtonLink href={generateWhatsAppLink(FOOTER_CONTENT.waMessage)} target="_blank" rel="noopener noreferrer" size="lg" className="h-14 w-full px-8 text-base sm:w-auto">
              <WhatsAppIcon className="size-5" /> Mulai Konsultasi Gratis
            </ButtonLink>
          </Magnetic>
          <button
            type="button"
            onClick={copyEmail}
            className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 font-mono text-sm text-zinc-300 backdrop-blur-md transition-colors hover:border-white/[0.2] hover:text-alabaster sm:w-auto"
            aria-label={`Salin email ${SITE_CONFIG.email}`}
          >
            <Mail className="size-4 text-zinc-500" aria-hidden />
            {SITE_CONFIG.email}
            <span className="relative grid size-5 place-items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? "c" : "n"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {copied ? <Check className="size-4 text-status" aria-hidden /> : <Copy className="size-4 text-zinc-500 group-hover:text-alabaster" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </Reveal>
      </div>

      <div className="container-x mt-24 border-t border-white/[0.06] py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="font-display text-base font-bold text-alabaster">{SITE_CONFIG.name}</span>
            <span className="text-xs text-zinc-500">{SITE_CONFIG.role} • {SITE_CONFIG.location}</span>
          </div>
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-zinc-500">
              {NAV_LINKS.slice(1).map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-alabaster">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2">
            {[
              { href: SITE_CONFIG.githubUrl, path: siGithub.path, label: "GitHub" },
              { href: SITE_CONFIG.linkedinUrl, path: LINKEDIN_PATH, label: "LinkedIn" },
              { href: SITE_CONFIG.instagramUrl, path: siInstagram.path, label: "Instagram" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-full border border-white/[0.08] text-zinc-400 transition-colors hover:border-white/[0.2] hover:text-alabaster">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-zinc-600">© {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
