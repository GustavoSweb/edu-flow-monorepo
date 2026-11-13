import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib";

export function Checkbox({ label, error, className, ...props }: ComponentProps<"input"> & { label: ReactNode; error?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-0.5 size-[18px] shrink-0 accent-action" aria-invalid={!!error} {...props} />
        <span>{label}</span>
      </label>
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

type BadgeTone = "neutral" | "action" | "success" | "warning" | "dark";
const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-sunken text-muted",
  action: "bg-action-soft text-action",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  dark: "bg-black/25 text-white",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-lg border border-border bg-surface shadow-1", className)} {...props} />;
}

type AlertTone = "error" | "success" | "warning" | "info";
const alertTones: Record<AlertTone, string> = {
  error: "border-error/40 bg-error-soft text-error",
  success: "border-success/40 bg-success-soft text-success",
  warning: "border-warning/40 bg-warning-soft text-warning",
  info: "border-action/30 bg-action-soft text-action",
};

export function Alert({ tone = "info", title, children, className }: { tone?: AlertTone; title: string; children?: ReactNode; className?: string }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-md border px-4 py-3 text-sm", alertTones[tone], className)}>
      <p className="font-semibold">{title}</p>
      {children && <div className="mt-0.5 text-fg/80">{children}</div>}
    </div>
  );
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)} {...props} />;
}

/** O "ponto" do conceito Gabarito em Fluxo: vazio, marcado (lima) ou feito (petróleo). */
export function Ponto({ state = "vazio", className }: { state?: "vazio" | "cheio" | "feito"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-3.5 shrink-0 rounded-full border-2",
        state === "vazio" && "border-line bg-surface",
        state === "cheio" && "border-fg bg-accent",
        state === "feito" && "border-line-done bg-line-done",
        className,
      )}
    />
  );
}
