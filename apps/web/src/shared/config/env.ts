export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/api/v1",
  /** Enquanto a API NestJS não existe, as features respondem com dados de exemplo. */
  useMocks: (process.env.NEXT_PUBLIC_USE_MOCKS ?? "true") === "true",
};
