import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Page section with consistent vertical rhythm and optional surface treatment. */
export function Section({
  id,
  children,
  className = "",
  tone = "sand",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "sand" | "card" | "deep";
  labelledBy?: string;
}) {
  const surface =
    tone === "card"
      ? "bg-card border-y border-hairline"
      : tone === "deep"
        ? "bg-brand-deep text-brand-foreground"
        : "bg-sand";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${surface} py-20 md:py-28 ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/** Small uppercase-ish label with a leading rule — the site's section marker. */
export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  return (
    <p
      className={`flex items-center gap-3 text-[13px] font-semibold tracking-[0.02em] ${
        tone === "brand" ? "text-brand" : "text-brand-foreground/70"
      }`}
    >
      <span className={`h-px w-7 ${tone === "brand" ? "bg-brand/50" : "bg-brand-foreground/40"}`} />
      {children}
    </p>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  id,
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  size?: "sm" | "lg" | "xl";
  className?: string;
}) {
  const scale =
    size === "xl"
      ? "text-[clamp(2.5rem,7.5vw,4.75rem)] leading-[1.05]"
      : size === "lg"
        ? "text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.15]"
        : "text-[clamp(1.35rem,2.6vw,1.75rem)] leading-[1.3]";
  return (
    <Tag id={id} className={`font-display font-bold tracking-[-0.02em] text-balance ${scale} ${className}`}>
      {children}
    </Tag>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[17px] leading-[1.9] text-ink-soft ${className}`}>{children}</p>;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60";

const sizes = {
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5 text-base",
} as const;

const variants = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-deep hover:shadow-[0_14px_30px_-16px_rgba(0,80,70,0.55)]",
  outline: "border border-hairline bg-card/70 text-ink hover:bg-card hover:border-brand/40",
  quiet: "text-ink-soft hover:text-ink",
  onDeep: "bg-brand-foreground text-brand-deep hover:bg-brand-foreground/90",
  onDeepOutline: "border border-brand-foreground/30 text-brand-foreground hover:bg-brand-foreground/10",
} as const;

type BtnProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function CtaLink({ to, children, variant = "primary", size = "md", className = "" }: BtnProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function CtaAnchor({
  href,
  children,
  variant = "outline",
  size = "md",
  className = "",
}: BtnProps & { href: string }) {
  return (
    <a href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
