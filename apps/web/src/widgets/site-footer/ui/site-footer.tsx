import Link from "next/link";
import { Container, Logo } from "@/shared/ui";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-petroleo-900 text-white/80">
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo tone="inverse" />
          <p className="max-w-sm text-sm">Do edital à aprovação. Cursos, questões comentadas e simulados para concursos públicos.</p>
        </div>
        <nav aria-label="Plataforma" className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-white">Plataforma</p>
          <Link href="/cursos" className="text-white/80 no-underline hover:text-white">Catálogo</Link>
          <Link href="/instrutores" className="text-white/80 no-underline hover:text-white">Seja instrutor</Link>
          <Link href="/certificados/verificar" className="text-white/80 no-underline hover:text-white">Verificar certificado</Link>
        </nav>
        <nav aria-label="Institucional" className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-white">Institucional</p>
          <Link href="/termos" className="text-white/80 no-underline hover:text-white">Termos de uso</Link>
          <Link href="/privacidade" className="text-white/80 no-underline hover:text-white">Privacidade</Link>
        </nav>
      </Container>
      <Container className="border-t border-white/10 py-6 text-xs text-white/60">
        Desenvolvido no curso de ADS · AESA-CESA, Arcoverde-PE
      </Container>
    </footer>
  );
}
