import Link from "next/link";
import { cn } from "@/shared/lib";
import { ButtonLink, Container, Logo } from "@/shared/ui";

const NAV = [
  { href: "/cursos", label: "Concursos" },
  { href: "/questoes", label: "Questões" },
  { href: "/simulados", label: "Simulados" },
  { href: "/instrutores", label: "Para instrutores" },
];

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center gap-8">
        <Logo />
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active === item.href ? "page" : undefined}
                  className={cn(
                    "border-b-2 py-5 text-[15px] no-underline transition-colors",
                    active === item.href ? "border-action font-semibold text-fg" : "border-transparent text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href="/entrar" variant="ghost" size="sm" className="text-muted">
            Entrar
          </ButtonLink>
          <ButtonLink href="/cadastro" size="sm">
            Criar conta
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
