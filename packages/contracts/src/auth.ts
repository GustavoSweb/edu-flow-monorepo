import { z } from "zod";

const email = z.email({ error: "Informe um e-mail válido." }).trim().toLowerCase();

export const LoginSchema = z.object({
  email,
  password: z.string().min(1, { error: "Informe sua senha." }),
  remember: z.boolean(),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().trim().min(3, { error: "Informe seu nome completo." }).max(120),
  email,
  password: z
    .string()
    .min(8, { error: "A senha precisa de pelo menos 8 caracteres." })
    .regex(/[A-Za-z]/, { error: "Use pelo menos uma letra." })
    .regex(/\d/, { error: "Use pelo menos um número." }),
  acceptTerms: z.boolean().refine((v) => v, { error: "Aceite os Termos de uso para continuar." }),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";
export type SessionUser = { id: string; name: string; email: string; role: Role };
