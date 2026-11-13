import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md border transition-[background,border-color,transform] duration-150 active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus whitespace-nowrap no-underline";
const variants: Record<Variant, string> = {
  primary: "bg-action text-on-action border-transparent hover:bg-action-hover",
  secondary: "bg-surface text-fg border-border-strong hover:border-muted",
  accent: "bg-accent text-on-accent border-transparent hover:brightness-95",
  ghost: "bg-transparent text-fg border-transparent hover:bg-sunken",
  danger: "bg-surface text-error border-error hover:bg-error-soft",
};
const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-[15px] px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

type Common = { variant?: Variant; size?: Size; block?: boolean; className?: string; children: ReactNode };

export function buttonClass({ variant = "primary", size = "md", block, className }: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], block && "w-full", className);
}

export function Button({ variant, size, block, className, ...props }: Common & ComponentProps<"button">) {
  return <button className={buttonClass({ variant, size, block, className })} {...props} />;
}

export function ButtonLink({ variant, size, block, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClass({ variant, size, block, className })} {...props} />;
}
