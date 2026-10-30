import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        <span className="size-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] text-alabaster sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}
