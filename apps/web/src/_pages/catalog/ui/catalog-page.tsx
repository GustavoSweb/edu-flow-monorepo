import { CatalogQuerySchema } from "@eduflow/contracts";
import type { Metadata } from "next";
import { CourseCard, getCourses } from "@/entities/course";
import { CatalogFilters, CatalogSearch, CatalogSort } from "@/features/catalog-filters";
import { ButtonLink, Container } from "@/shared/ui";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

export const metadata: Metadata = { title: "Cursos para concursos · EduFlow" };

type SearchParams = Record<string, string | string[] | undefined>;
const asArray = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

/** Converte a URL em filtros válidos; valores desconhecidos são descartados. */
function parseQuery(sp: SearchParams) {
  const parsed = CatalogQuerySchema.safeParse({
    q: typeof sp.q === "string" ? sp.q : undefined,
    area: asArray(sp.area),
    banca: asArray(sp.banca),
    preco: asArray(sp.preco),
    ordem: typeof sp.ordem === "string" ? sp.ordem : undefined,
  });
  return parsed.success ? parsed.data : CatalogQuerySchema.parse({});
}

export async function CatalogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseQuery(await searchParams);
  const { items, meta } = await getCourses(query);

  return (
    <>
      <SiteHeader active="/cursos" />
      <main id="conteudo">
        <Container className="flex flex-col gap-8 pt-10">
          <header>
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted uppercase">Catálogo</p>
            <h1 className="mt-1 font-display text-4xl font-bold">Cursos para concursos</h1>
            <p className="mt-2 text-muted">Filtre por área, banca e preço.</p>
          </header>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CatalogSearch />
            <CatalogSort value={query.ordem} />
          </div>
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <aside aria-label="Filtros">
              <CatalogFilters query={query} />
            </aside>
            <section aria-live="polite" className="flex flex-col gap-4">
              <p className="text-sm text-muted">
                {meta.total} {meta.total === 1 ? "curso" : "cursos"}
                {query.q ? ` para “${query.q}”` : ""}
              </p>
              {items.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((c, i) => (
                    <CourseCard key={c.id} course={c} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-border-strong p-8">
                  <p className="font-display text-xl font-bold">Nenhum curso com esses filtros.</p>
                  <p className="text-muted">Tente outra palavra na busca ou remova algum filtro.</p>
                  <ButtonLink href="/cursos" variant="secondary" size="sm">
                    Limpar filtros
                  </ButtonLink>
                </div>
              )}
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
