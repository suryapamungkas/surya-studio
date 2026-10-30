import { Cloud, CreditCard, Database } from "lucide-react";
import {
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siPostgresql,
  siXendit,
  siWhatsapp,
  siPrisma,
  type SimpleIcon,
} from "simple-icons";
import { HERO_CONTENT } from "@/data/content";
import { Marquee } from "@/components/ui/Marquee";

const BRAND_ICONS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Xendit: siXendit,
  "WhatsApp API": siWhatsapp,
  Prisma: siPrisma,
};

const FALLBACK: Record<string, React.ComponentType<{ className?: string }>> = {
  Payment: CreditCard,
  Cloud: Cloud,
  Database: Database,
  ORM: Database,
};

function TechIcon({ name, category }: { name: string; category: string }) {
  const brand = BRAND_ICONS[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = FALLBACK[category] ?? Cloud;
  return <Icon className="size-5" />;
}

export function TechMarquee() {
  return (
    <div className="container-x mt-20 md:mt-24">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        Teknologi modern &amp; integrasi ekosistem bisnis Indonesia
      </p>
      <Marquee duration={45} ariaLabel="Teknologi dan integrasi yang didukung">
        {HERO_CONTENT.techAndLocalEcosystem.map((t) => (
          <div
            key={t.name}
            className="mx-2 flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-zinc-400 transition-colors duration-300 hover:border-white/[0.15] hover:text-alabaster"
          >
            <TechIcon name={t.name} category={t.category} />
            <span className="whitespace-nowrap text-sm font-medium">{t.name}</span>
            <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-zinc-600 sm:inline">
              {t.category}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
