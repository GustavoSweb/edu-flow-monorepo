import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/register";
import { AuthShell } from "@/widgets/auth-shell";

export const metadata: Metadata = { title: "Criar conta · EduFlow" };

export function RegisterPage() {
  return (
    <AuthShell
      headline="Comece a estudar para o seu concurso hoje."
      points={["Questões comentadas por banca", "Simulados no formato da prova", "Progresso salvo a cada aula"]}
    >
      <h1 className="font-display text-3xl font-bold">Criar conta</h1>
      <p className="mt-2 mb-8 text-muted">Leva menos de um minuto. Grátis para começar.</p>
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted">
        Já tem conta?{" "}
        <Link href="/entrar" className="font-semibold text-link underline underline-offset-2">
          Entrar
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-muted">Enviaremos um link para confirmar seu e-mail antes da primeira compra.</p>
    </AuthShell>
  );
}
