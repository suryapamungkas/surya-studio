"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Play, TrendingUp, X } from "lucide-react";
import { PROJECTS_DATA, PROJECT_FILTERS, generateWhatsAppLink, type ProjectItem } from "@/data/content";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { lockScroll } from "@/lib/lenis";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FilterId = (typeof PROJECT_FILTERS)[number]["id"];

/* ---------- Kartu proyek ---------- */
function ProjectCard({ project, large, onOpen, priority }: { project: ProjectItem; large: boolean; onOpen: () => void; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    videoRef.current?.play().catch(() => {});
  }
  function handleLeave() {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/80 transition-colors duration-500 hover:border-white/[0.2]",
        large && "md:col-span-2 md:grid md:grid-cols-[1.35fr_1fr]"
      )}
    >
      {/* Media */}
      <div className={cn("relative overflow-hidden bg-zinc-900", large ? "aspect-[16/10] md:aspect-auto md:min-h-[420px]" : "aspect-[16/10]")}>
        <Image
          src={project.imageUrl}
          alt={`Tampilan website ${project.client}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
          className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {/* Sapuan cahaya + gradient */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[left,opacity] duration-[1.1s] group-hover:left-[130%] group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-200 backdrop-blur-md">
            {project.categoryLabel}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Play className="size-3 fill-current" aria-hidden /> Live preview
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{project.client}</p>
        <h3 className={cn("mt-2 font-bold leading-snug text-alabaster", large ? "text-2xl" : "text-xl")}>{project.title}</h3>
        {large && <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>}

        <ul className="mt-5 flex flex-col gap-2">
          {project.impactMetrics.slice(0, large ? 3 : 2).map((m) => (
            <li key={m} className="flex items-start gap-2 rounded-xl border border-status/15 bg-status/[0.06] px-3 py-2 text-[13px] font-medium text-emerald-200">
              <TrendingUp className="mt-0.5 size-3.5 shrink-0 text-status" aria-hidden />
              {m}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="flex-1 sm:flex-none">
            Lihat Live Demo <ArrowUpRight className="size-4" aria-hidden />
          </ButtonLink>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-indigo-300 transition-colors hover:bg-accent/10 hover:text-indigo-200 sm:flex-none"
          >
            <BookOpen className="size-4" aria-hidden /> Baca Studi Kasus
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Drawer studi kasus ---------- */
function CaseStudyDrawer({ project, onClose }: { project: ProjectItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="case-title">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto overscroll-contain border-l border-white/[0.08] bg-zinc-950 shadow-2xl"
          >
            <div className="relative aspect-[16/10]">
              <Image src={project.imageUrl} alt={`Tampilan website ${project.client}`} fill sizes="600px" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Tutup studi kasus"
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="-mt-10 relative px-6 pb-10 md:px-8">
              <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-indigo-300">
                Studi Kasus • {project.categoryLabel}
              </span>
              <h3 id="case-title" className="mt-4 text-2xl font-bold leading-tight text-alabaster md:text-3xl">{project.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">Klien: {project.client}</p>

              <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">Tantangan &amp; Solusi</h4>
              <p className="mt-3 leading-relaxed text-zinc-300">{project.description}</p>

              <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">Dampak Bisnis Terukur</h4>
              <ul className="mt-3 grid gap-2">
                {project.impactMetrics.map((m, i) => (
                  <motion.li
                    key={m}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-2xl border border-status/15 bg-status/[0.06] p-4 text-sm font-medium text-emerald-100"
                  >
                    <TrendingUp className="mt-0.5 size-4 shrink-0 text-status" aria-hidden />
                    {m}
                  </motion.li>
                ))}
              </ul>

              <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">Teknologi</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300">{t}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-2 sm:flex-row">
                <ButtonLink
                  href={generateWhatsAppLink(`Halo, saya melihat studi kasus "${project.title}" dan ingin membuat proyek serupa. Bisa diskusi?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <WhatsAppIcon className="size-4" /> Buat Proyek Serupa
                </ButtonLink>
                <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="flex-1">
                  Lihat Live Demo <ArrowUpRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openProject, setOpenProject] = useState<ProjectItem | null>(null);
  const closeDrawer = useCallback(() => setOpenProject(null), []);

  const projects = PROJECTS_DATA.filter((p) => p.featured && (filter === "all" || p.category === filter));

  return (
    <section id="portofolio" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Studi Kasus"
          title={<>Hasil nyata, <span className="text-gradient">angka yang terukur.</span></>}
          description="Bukan sekadar portofolio cantik. Setiap proyek dirancang untuk menggerakkan metrik bisnis klien."
        />

        <LayoutGroup>
          <div role="tablist" aria-label="Filter kategori proyek" className="mb-10 flex justify-start gap-1 overflow-x-auto pb-1 [scrollbar-width:none] md:justify-center">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative h-11 shrink-0 rounded-full px-4 text-[13px] font-medium transition-colors",
                  filter === f.id ? "text-alabaster" : "text-muted hover:text-alabaster"
                )}
              >
                {filter === f.id && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full border border-white/[0.12] bg-white/[0.07]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  large={i === 0 && projects.length !== 2}
                  onOpen={() => setOpenProject(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          {projects.length === 0 && (
            <p className="py-16 text-center text-muted">Proyek untuk kategori ini segera hadir.</p>
          )}
        </LayoutGroup>
      </div>

      <CaseStudyDrawer project={openProject} onClose={closeDrawer} />
    </section>
  );
}
