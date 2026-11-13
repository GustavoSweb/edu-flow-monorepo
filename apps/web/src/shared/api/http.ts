import type { ApiResponse } from "@eduflow/contracts";
import { env } from "@/shared/config";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/** Cliente HTTP da API: envia cookies de sessão e desembrulha { data, error, message }. */
export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${env.apiUrl}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    throw new ApiRequestError("Não foi possível conectar. Verifique sua internet e tente de novo.", "NETWORK", 0);
  }
  const body = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok || !body || body.error) {
    throw new ApiRequestError(
      body?.message ?? "Algo deu errado. Tente de novo em instantes.",
      body?.error?.code ?? "UNKNOWN",
      res.status,
    );
  }
  return body.data as T;
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
