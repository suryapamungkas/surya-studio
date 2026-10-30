import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  /** Durasi satu putaran penuh (detik) */
  duration?: number;
  reverse?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Marquee CSS murni (compositor-only transform). Konten diduplikasi sekali
 * agar loop mulus; duplikat disembunyikan dari pembaca layar.
 * Berhenti saat hover/fokus.
 */
export function Marquee({ children, duration = 40, reverse, className, ariaLabel }: MarqueeProps) {
  return (
    <div className={cn("marquee mask-fade-x relative flex overflow-hidden", className)} aria-label={ariaLabel} role={ariaLabel ? "region" : undefined}>
      <div
        className="marquee-track flex w-max shrink-0"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
