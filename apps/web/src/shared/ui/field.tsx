"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/shared/lib";

type FieldProps = ComponentProps<"input"> & {
  label: string;
  hint?: ReactNode;
  error?: string;
  /** Elemento à direita do rótulo (ex.: link "Esqueci a senha"). */
  labelAside?: ReactNode;
};

export const inputClass =
  "w-full rounded-md border bg-surface px-4 py-3 text-[15px] text-fg placeholder:text-subtle transition-colors focus:outline-2 focus:outline-offset-1 focus:outline-focus";

export function Field({ label, hint, error, labelAside, className, id, type, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={inputId} className="text-sm font-semibold text-fg">
          {label}
        </label>
        {labelAside}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(inputClass, error ? "border-error" : "border-border-strong", isPassword && "pr-24")}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-3 my-auto h-fit rounded px-1 text-sm font-semibold text-muted hover:text-fg"
            aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          >
            {show ? "Ocultar" : "Mostrar"}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
