"use client";

import { useState, type FormEvent } from "react";
import { delay, http } from "@/shared/api";
import { env } from "@/shared/config";
import { cn, formatPrice } from "@/shared/lib";

type CouponResult = { code: string; discountPercent: number };

/** Cupons de exemplo do protótipo (T25). */
const MOCK_COUPONS: Record<string, number> = { EDITAL30: 30, PRIMEIRA10: 10 };

async function validateCoupon(courseId: string, code: string): Promise<CouponResult> {
  if (env.useMocks) {
    await delay(400);
    const pct = MOCK_COUPONS[code];
    if (!pct) throw new Error("Cupom inválido ou expirado.");
    return { code, discountPercent: pct };
  }
  return http<CouponResult>("/cart/coupon", { method: "POST", body: JSON.stringify({ courseId, code }) });
}

export function ApplyCoupon({ courseId, priceCents }: { courseId: string; priceCents: number }) {
  const [state, setState] = useState<{ status: "idle" | "loading" | "ok" | "error"; message?: string }>({ status: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = new FormData(e.currentTarget).get("cupom")?.toString().trim().toUpperCase() ?? "";
    if (!code) return;
    setState({ status: "loading" });
    try {
      const res = await validateCoupon(courseId, code);
      const discount = Math.round((priceCents * res.discountPercent) / 100);
      setState({ status: "ok", message: `Cupom aplicado: −${formatPrice(discount)}. Total: ${formatPrice(priceCents - discount)}.` });
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Cupom inválido ou expirado." });
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1.5">
      <label htmlFor="cupom" className="text-sm font-semibold">
        Cupom de desconto
      </label>
      <div
        className={cn(
          "flex items-center rounded-md border bg-surface focus-within:outline-2 focus-within:outline-focus",
          state.status === "error" ? "border-error" : "border-border-strong",
        )}
      >
        <input id="cupom" name="cupom" placeholder="Digite o cupom" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[15px] uppercase outline-none placeholder:normal-case" />
        <button type="submit" disabled={state.status === "loading"} className="px-4 text-sm font-semibold text-muted hover:text-fg disabled:opacity-50">
          {state.status === "loading" ? "…" : "Aplicar"}
        </button>
      </div>
      {state.message && (
        <p role={state.status === "error" ? "alert" : "status"} className={cn("text-sm", state.status === "error" ? "text-error" : "text-success")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
