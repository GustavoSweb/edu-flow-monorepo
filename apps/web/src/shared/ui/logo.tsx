import Link from "next/link";
import { cn } from "@/shared/lib";

/** Símbolo "E de gabarito": três traços do E e três bolhas, a do meio marcada. */
export function LogoSymbol({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className={className}>
      <rect width="64" height="64" rx="14" fill="#0F4C51" />
      <path d="M19 16V48M19 16H32M19 32H32M19 48H32" stroke="#FAF8F3" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <circle cx="40.5" cy="16" r="5.5" fill="none" stroke="#FAF8F3" strokeWidth="4" />
      <circle cx="40.5" cy="32" r="7.5" fill="#CDE832" />
      <circle cx="40.5" cy="48" r="5.5" fill="none" stroke="#FAF8F3" strokeWidth="4" />
    </svg>
  );
}

export function Logo({ href = "/", tone = "default", className }: { href?: string; tone?: "default" | "inverse"; className?: string }) {
  return (
    <Link href={href} aria-label="EduFlow, página inicial" className={cn("inline-flex items-center gap-2 no-underline", className)}>
      <LogoSymbol />
      <span className={cn("font-display text-[22px] leading-none tracking-[-0.03em]", tone === "inverse" ? "text-white" : "text-fg")}>
        <span className="font-bold">Edu</span>
        <span className="font-normal">Flow</span>
      </span>
    </Link>
  );
}
