import { z } from "zod";

export const AREAS = ["Tribunais", "Bancários", "Policiais", "Fiscal", "TI"] as const;
export const EXAM_BOARDS = ["Vunesp", "FGV", "Cebraspe", "FCC", "Cesgranrio"] as const;
export const PRICE_RANGES = ["gratis", "ate-150", "150-300"] as const;
export const SORTS = ["relevancia", "menor-preco", "mais-questoes"] as const;

export type Area = (typeof AREAS)[number];
export type ExamBoard = (typeof EXAM_BOARDS)[number];

/** Filtros do catálogo (T06), vindos da URL. */
export const CatalogQuerySchema = z.object({
  q: z.string().trim().max(80).optional(),
  area: z.array(z.enum(AREAS)).default([]),
  banca: z.array(z.enum(EXAM_BOARDS)).default([]),
  preco: z.array(z.enum(PRICE_RANGES)).default([]),
  ordem: z.enum(SORTS).default("relevancia"),
});
export type CatalogQuery = z.infer<typeof CatalogQuerySchema>;

export type CourseSummary = {
  id: string;
  slug: string;
  title: string;
  area: Area;
  examBoard: ExamBoard;
  modulesCount: number;
  questionsCount: number;
  hasCodePractice: boolean;
  /** Preço em centavos; 0 = gratuito. */
  priceCents: number;
};

export type CourseModule = { title: string; lessonsCount: number; questionsCount: number };

export type CourseDetails = CourseSummary & {
  subtitle: string;
  instructorName: string;
  lessonsCount: number;
  mockExamsCount: number;
  hours: number;
  modules: CourseModule[];
  audience: string;
};
