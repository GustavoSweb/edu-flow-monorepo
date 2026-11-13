"use client";

import { RegisterSchema, type RegisterDto } from "@eduflow/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ApiRequestError, delay, http } from "@/shared/api";
import { env } from "@/shared/config";
import { Alert, Button, Checkbox, Field } from "@/shared/ui";

async function registerAccount(dto: RegisterDto) {
  if (env.useMocks) {
    await delay(600);
    return;
  }
  await http<{ id: string }>("/auth/register", { method: "POST", body: JSON.stringify(dto) });
}

export function RegisterForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", acceptTerms: false },
  });

  const onSubmit = handleSubmit(async (dto) => {
    setServerError(null);
    try {
      await registerAccount(dto);
      setSentTo(dto.email);
    } catch (e) {
      setServerError(e instanceof ApiRequestError ? e.message : "Não foi possível criar a conta agora.");
    }
  });

  if (sentTo) {
    return (
      <Alert tone="success" title="Conta criada. Confirme seu e-mail.">
        Enviamos um link de confirmação para <strong>{sentTo}</strong>. Depois de confirmar, você já pode comprar cursos.
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {serverError && <Alert tone="error" title={serverError} />}
      <Field label="Nome completo" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <Field label="E-mail" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Field
        label="Senha"
        type="password"
        autoComplete="new-password"
        hint="Mínimo de 8 caracteres, com letras e números."
        error={errors.password?.message}
        {...register("password")}
      />
      <Checkbox
        label={
          <>
            Li e aceito os{" "}
            <Link href="/termos" className="text-link underline underline-offset-2">
              Termos de uso
            </Link>{" "}
            e a{" "}
            <Link href="/privacidade" className="text-link underline underline-offset-2">
              Política de privacidade
            </Link>
          </>
        }
        error={errors.acceptTerms?.message}
        {...register("acceptTerms")}
      />
      <Button type="submit" size="lg" block disabled={isSubmitting}>
        {isSubmitting ? "Criando conta…" : "Criar conta"}
      </Button>
    </form>
  );
}
