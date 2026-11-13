"use client";

import { AREAS, EXAM_BOARDS, type CatalogQuery } from "@eduflow/contracts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, type FormEvent } from "react";
import { inputClass } from "@/shared/ui";
import { cn } from "@/shared/lib";

const PRICE_LABELS: Record<CatalogQuery["preco"][number], string> = {
  gratis: "Grátis",
  "ate-150": "Até R$ 150",
  "150-300": "R$ 150 a R$ 300",
};
const SORT_LABELS: Record<CatalogQuery["ordem"], string> = {
  relevancia: "Mais relevantes",
  "menor-preco": "Menor preço",
  "mais-questoes": "Mais questões",
};

/** Atualiza a URL do catálogo; a página (server component) refaz a busca. */
function useCatalogUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const push = (next: URLSearchParams) => startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  return { params, pending, push };
}

export function CatalogSearch() {
  const { params, push } = useCatalogUrl();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    push(next);
  };
  return (
    <form role="search" onSubmit={onSubmit} className="relative flex-1">
      <label htmlFor="busca" className="sr-only">
        Buscar cursos
      </label>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input id="busca" name="q" defaultValue={params.get("q") ?? ""} placeholder="Cargo, órgão ou assunto" className={cn(inputClass, "border-border-strong pl-12")} />
    </form>
  );
}

export function CatalogSort({ value }: { value: CatalogQuery["ordem"] }) {
  const { params, push } = useCatalogUrl();
  return (
    <>
      <label htmlFor="ordem" className="sr-only">
        Ordenar por
      </label>
      <select
        id="ordem"
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params);
          next.set("ordem", e.target.value);
          push(next);
        }}
        className={cn(inputClass, "border-border-strong sm:w-64")}
      >
        {Object.entries(SORT_LABELS).map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}

function Group({ title, name, options, selected }: { title: string; name: string; options: Array<[string, string]>; selected: string[] }) {
  const { params, push, pending } = useCatalogUrl();
  const toggle = (value: string) => {
    const next = new URLSearchParams(params);
    const current = next.getAll(name);
    next.delete(name);
    (current.includes(value) ? current.filter((v) => v !== value) : [...current, value]).forEach((v) => next.append(name, v));
    push(next);
  };
  return (
    <fieldset className={cn("flex flex-col gap-2.5", pending && "opacity-70")}>
      <legend className="mb-1 text-sm font-semibold">{title}</legend>
      {options.map(([value, label]) => (
        <label key={value} className="flex cursor-pointer items-center gap-3 text-[15px] text-muted">
          <input type="checkbox" className="size-[18px] accent-action" checked={selected.includes(value)} onChange={() => toggle(value)} />
          {label}
        </label>
      ))}
    </fieldset>
  );
}

export function CatalogFilters({ query }: { query: CatalogQuery }) {
  return (
    <div className="flex flex-col gap-6">
      <Group title="Área" name="area" options={AREAS.map((a) => [a, a])} selected={query.area} />
      <Group title="Banca" name="banca" options={EXAM_BOARDS.map((b) => [b, b])} selected={query.banca} />
      <Group title="Preço" name="preco" options={Object.entries(PRICE_LABELS)} selected={query.preco} />
    </div>
  );
}
