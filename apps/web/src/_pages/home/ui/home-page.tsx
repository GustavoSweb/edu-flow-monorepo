import type { Metadata } from "next";
import { CatalogQuerySchema } from "@eduflow/contracts";
import { CourseCard, getCourses } from "@/entities/course";
import { ButtonLink, Container, Ponto } from "@/shared/ui";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

export const metadata: Metadata = {
  title: "EduFlow · Do edital à aprovação",
  description: "Cursos, questões comentadas por banca e simulados para concursos públicos.",
};

const STEPS = [
  { title: "Escolha o edital", text: "Cursos organizados por órgão, cargo e banca, seguindo o último edital publicado." },
  { title: "Estude e pratique", text: "Videoaulas, resumos em PDF e questões comentadas logo depois de cada assunto." },
  { title: "Simule a prova", text: "Simulados cronometrados no formato da banca e desempenho por disciplina." },
];

export async function HomePage() {
  const { items } = await getCourses(CatalogQuerySchema.parse({}));
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <section className="border-b border-border bg-surface">
          <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted uppercase">Concursos públicos na prática</p>
              <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
                Do edital à <span className="marca-texto">aprovação</span>.
              </h1>
              <p className="max-w-xl text-lg text-muted">
                Estude pelo conteúdo que cai, responda questões da sua banca e acompanhe o progresso aula a aula. Para
                tribunais, bancos, polícias, área fiscal e TI.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/cadastro" size="lg">
                  Começar grátis
                </ButtonLink>
                <ButtonLink href="/cursos" variant="secondary" size="lg">
                  Ver concursos
                </ButtonLink>
              </div>
            </div>
            <ol aria-label="Como funciona" className="relative flex flex-col gap-8 border-l-2 border-line pl-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <Ponto state={i === 0 ? "feito" : i === 1 ? "cheio" : "vazio"} className="absolute top-1 -left-[41px] size-4" />
                  <p className="font-display text-xl font-bold">{s.title}</p>
                  <p className="mt-1 text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section aria-labelledby="destaques">
          <Container className="flex flex-col gap-8 py-16">
            <div className="flex items-end justify-between gap-4">
              <h2 id="destaques" className="font-display text-3xl font-bold">
                Cursos em destaque
              </h2>
              <ButtonLink href="/cursos" variant="ghost" size="sm">
                Ver todos →
              </ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, 3).map((c, i) => (
                <CourseCard key={c.id} course={c} index={i} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
