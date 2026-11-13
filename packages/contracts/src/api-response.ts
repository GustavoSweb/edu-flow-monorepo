/** Formato único de resposta da API (seção 5.2.6 do relatório). */
export type ApiError = { code: string; details?: Record<string, unknown> };

export type ApiResponse<T> =
  | { data: T; error: null; message: string }
  | { data: null; error: ApiError; message: string };

export type Paginated<T> = {
  items: T[];
  meta: { total: number; page: number; pageSize: number };
};
