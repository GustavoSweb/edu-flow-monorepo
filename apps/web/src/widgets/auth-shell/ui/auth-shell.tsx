import type { ReactNode } from "react";
import { Logo, Ponto } from "@/shared/ui";

/** Layout das telas de acesso (T02/T03): painel da marca à esquerda, formulário à direita. */
export function AuthShell({ headline, points, children }: { headline: ReactNode; points: string[]; children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-petroleo-800 p-12 text-white lg:flex">
        <Logo tone="inverse" />
        <div className="flex flex-col gap-8">
          <h2 className="max-w-md font-display text-5xl leading-[1.05] font-bold tracking-tight">{headline}</h2>
          <ul className="flex flex-col gap-3">
            {points.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-[15px] text-white/85">
                <Ponto state={i === points.length - 1 ? "vazio" : "cheio"} className={i === points.length - 1 ? "border-white/70 bg-transparent" : "border-accent"} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-white/60">Concursos públicos na prática.</p>
      </aside>
      <main id="conteudo" className="flex flex-col items-center justify-center bg-bg px-4 py-12 sm:px-6">
        <div className="mb-10 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
    </div>
  );
}
