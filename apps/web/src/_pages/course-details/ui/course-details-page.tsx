import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/entities/course";
import { Badge, Container, Ponto } from "@/shared/ui";
import { PurchaseCard } from "@/widgets/purchase-card";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await getCourseBySlug((await params).slug);
  return { title: course ? `${course.title} · EduFlow` : "Curso não encontrado · EduFlow", description: course?.subtitle };
}

export async function CourseDetailsPage({ params }: Props) {
  const course = await getCourseBySlug((await params).slug);
  if (!course) notFound();

  const shown = course.modules.slice(0, 5);
  const hidden = course.modulesCount - shown.length;

  return (
    <>
      <SiteHeader active="/cursos" />
      <main id="conteudo">
        <section className="bg-petroleo-800 text-white">
          <Container className="flex flex-col gap-4 py-12">
            <div className="flex gap-2">
              <Badge tone="dark">{course.examBoard}</Badge>
              <Badge tone="dark">{course.area}</Badge>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{course.title}</h1>
            <p className="max-w-2xl text-lg text-white/85">{course.subtitle}</p>
            <p className="text-sm text-white/70">
              Com {course.instructorName} · {course.modulesCount} módulos · {course.lessonsCount} aulas · {course.questionsCount} questões ·{" "}
              {course.mockExamsCount} simulados · {course.hours} h
            </p>
          </Container>
        </section>
        <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-10">
            <section aria-labelledby="conteudo-curso" className="flex flex-col gap-4">
              <h2 id="conteudo-curso" className="font-display text-2xl font-bold">
                O que você vai estudar
              </h2>
              <ol className="flex flex-col gap-3">
                {shown.map((m, i) => (
                  <li key={m.title} className="flex items-center gap-4 rounded-md border border-border bg-surface px-5 py-4">
                    <Ponto state={i === 0 ? "feito" : "vazio"} />
                    <div>
                      <p className="font-semibold">
                        Módulo {i + 1} · {m.title}
                      </p>
                      <p className="text-sm text-muted">
                        {m.lessonsCount} aulas · {m.questionsCount} questões
                      </p>
                    </div>
                  </li>
                ))}
                {hidden > 0 && (
                  <li className="flex items-center gap-4 rounded-md border border-border bg-surface px-5 py-4 font-semibold">
                    <Ponto />+{hidden} módulos
                  </li>
                )}
              </ol>
            </section>
            <section aria-labelledby="para-quem" className="flex flex-col gap-3">
              <h2 id="para-quem" className="font-display text-2xl font-bold">
                Para quem é
              </h2>
              <p className="text-muted">{course.audience}</p>
            </section>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PurchaseCard course={course} />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
