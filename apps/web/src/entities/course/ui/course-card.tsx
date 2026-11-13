import type { CourseSummary } from "@eduflow/contracts";
import { cn, formatPrice } from "@/shared/lib";
import { Badge, ButtonLink } from "@/shared/ui";

// Capas em tons de petróleo, alternadas para dar ritmo à grade.
const covers = ["bg-petroleo-800", "bg-[#1f757b]", "bg-[#2a2825]", "bg-petroleo-900", "bg-petroleo-700", "bg-[#1f757b]"];

export function CourseCard({ course, index = 0 }: { course: CourseSummary; index?: number }) {
  const href = `/cursos/${course.slug}`;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-1 transition-shadow hover:shadow-2">
      <div className={cn("flex min-h-[132px] flex-col justify-between gap-6 p-4", covers[index % covers.length])}>
        <Badge tone="dark" className="self-start">
          {course.examBoard}
        </Badge>
        <h3 className="font-display text-lg font-bold leading-tight text-white">{course.title}</h3>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <p className="text-sm text-muted">
          {course.modulesCount} módulos · {course.hasCodePractice ? "práticas de código" : `${course.questionsCount} questões`}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-display text-xl font-bold tabular-nums">{formatPrice(course.priceCents)}</span>
          <ButtonLink href={href} variant="secondary" size="sm" aria-label={`Ver curso ${course.title}`}>
            Ver curso
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
