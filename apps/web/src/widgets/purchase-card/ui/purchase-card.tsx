import type { CourseDetails } from "@eduflow/contracts";
import { ApplyCoupon } from "@/features/apply-coupon";
import { formatInstallments, formatPrice } from "@/shared/lib";
import { ButtonLink, Card } from "@/shared/ui";

const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-success">
    <path d="m4 12 5 5L20 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function PurchaseCard({ course }: { course: CourseDetails }) {
  const free = course.priceCents === 0;
  return (
    <Card className="flex flex-col gap-5 p-6 shadow-2">
      <div>
        <p className="font-display text-4xl font-bold tabular-nums">{formatPrice(course.priceCents)}</p>
        {!free && <p className="mt-1 text-sm text-muted">{formatInstallments(course.priceCents)}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <ButtonLink href={`/checkout/${course.slug}`} size="lg" block>
          {free ? "Matricular grátis" : "Comprar agora"}
        </ButtonLink>
        <ButtonLink href={`/cursos/${course.slug}/aula-gratis`} variant="secondary" size="lg" block>
          Assistir aula grátis
        </ButtonLink>
      </div>
      {!free && <ApplyCoupon courseId={course.id} priceCents={course.priceCents} />}
      <ul className="flex flex-col gap-2.5 border-t border-border pt-5 text-[15px]">
        <li className="flex gap-3"><Check />Acesso por 12 meses</li>
        <li className="flex gap-3"><Check />{course.questionsCount} questões comentadas</li>
        <li className="flex gap-3"><Check />{course.mockExamsCount} simulados cronometrados</li>
        <li className="flex gap-3"><Check />Certificado ao concluir 100%</li>
      </ul>
    </Card>
  );
}
