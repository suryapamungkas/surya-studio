import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex min-h-11 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_8px_30px_-6px_rgba(99,102,241,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)_inset,0_10px_44px_-6px_rgba(139,92,246,0.85)]",
  secondary:
    "text-alabaster bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/[0.2]",
  ghost: "text-muted hover:text-alabaster hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size };

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = "primary", size = "md", className, children, ...props },
  ref
) {
  return (
    <a ref={ref} className={buttonClass(variant, size, className)} {...props}>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-[left,opacity] duration-700 group-hover:left-[120%] group-hover:opacity-100" />
        </span>
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </a>
  );
});
