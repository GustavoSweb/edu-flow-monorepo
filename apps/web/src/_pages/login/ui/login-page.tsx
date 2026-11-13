import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/features/login";
import { AuthShell } from "@/widgets/auth-shell";

export const metadata: Metadata = { title: "Entrar · EduFlow" };

export function LoginPage() {
  return (
    <AuthShell
      headline={
        <>
          Sua sessão de estudo continua <span className="text-accent">de onde parou.</span>
        </>
      }
      points={["Aula 7 de Estruturas de Dados", "14 questões FCC respondidas ontem", "Próximo: Pilhas e Filas no sandbox"]}
    >
      <h1 className="font-display text-3xl font-bold">Entrar</h1>
      <p className="mt-2 mb-8 text-muted">Bom ver você de novo.</p>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-semibold text-link underline underline-offset-2">
          Criar conta grátis
        </Link>
      </p>
    </AuthShell>
  );
}
