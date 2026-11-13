"use client";

import { LoginSchema, type LoginDto, type SessionUser } from "@eduflow/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ApiRequestError, delay, http } from "@/shared/api";
import { env } from "@/shared/config";
import { Alert, Button, Checkbox, Field } from "@/shared/ui";

async function login(dto: LoginDto): Promise<SessionUser> {
  if (env.useMocks) {
    await delay(500);
    return { id: "u-1", name: "Maria Clara Souza", email: dto.email, role: "STUDENT" };
  }
  return http<SessionUser>("/auth/login", { method: "POST", body: JSON.stringify(dto) });
}

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({ resolver: zodResolver(LoginSchema), defaultValues: { email: "", password: "", remember: true } });

  const onSubmit = handleSubmit(async (dto) => {
    setServerError(null);
    try {
      await login(dto);
      router.push("/cursos");
    } catch (e) {
      setServerError(e instanceof ApiRequestError ? e.message : "E-mail ou senha incorretos.");
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {serverError && <Alert tone="error" title={serverError} />}
      <Field label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" error={errors.email?.message} {...register("email")} />
      <Field
        label="Senha"
        type="password"
        autoComplete="current-password"
        placeholder="Sua senha"
        error={errors.password?.message}
        labelAside={
          <Link href="/recuperar-senha" className="text-sm font-medium text-link underline underline-offset-2">
            Esqueci a senha
          </Link>
        }
        {...register("password")}
      />
      <Checkbox label="Manter conectado neste dispositivo" {...register("remember")} />
      <Button type="submit" size="lg" block disabled={isSubmitting}>
        {isSubmitting ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
