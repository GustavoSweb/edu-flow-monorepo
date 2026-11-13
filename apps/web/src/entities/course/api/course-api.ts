import type { CatalogQuery, CourseDetails, CourseSummary, Paginated } from "@eduflow/contracts";
import { delay, http } from "@/shared/api";
import { env } from "@/shared/config";
import { MOCK_COURSES } from "./mock-data";

function matchesPrice(cents: number, ranges: CatalogQuery["preco"]) {
  if (ranges.length === 0) return true;
  return ranges.some((r) => (r === "gratis" ? cents === 0 : r === "ate-150" ? cents > 0 && cents <= 15000 : cents > 15000 && cents <= 30000));
}

function filterMock(query: CatalogQuery): CourseSummary[] {
  const q = query.q?.toLowerCase();
  const list = MOCK_COURSES.filter(
    (c) =>
      (!q || `${c.title} ${c.subtitle} ${c.examBoard} ${c.area}`.toLowerCase().includes(q)) &&
      (query.area.length === 0 || query.area.includes(c.area)) &&
      (query.banca.length === 0 || query.banca.includes(c.examBoard)) &&
      matchesPrice(c.priceCents, query.preco),
  );
  if (query.ordem === "menor-preco") list.sort((a, b) => a.priceCents - b.priceCents);
  if (query.ordem === "mais-questoes") list.sort((a, b) => b.questionsCount - a.questionsCount);
  return list;
}

function toSearchParams(query: CatalogQuery) {
  const sp = new URLSearchParams();
  if (query.q) sp.set("q", query.q);
  query.area.forEach((a) => sp.append("area", a));
  query.banca.forEach((b) => sp.append("banca", b));
  query.preco.forEach((p) => sp.append("preco", p));
  sp.set("ordem", query.ordem);
  return sp.toString();
}

/** GET /courses — lista do catálogo com filtros. */
export async function getCourses(query: CatalogQuery): Promise<Paginated<CourseSummary>> {
  if (env.useMocks) {
    const items = filterMock(query);
    return { items, meta: { total: items.length, page: 1, pageSize: items.length } };
  }
  return http<Paginated<CourseSummary>>(`/courses?${toSearchParams(query)}`, { cache: "no-store" });
}

/** GET /courses/{slug} — página de detalhes do curso. */
export async function getCourseBySlug(slug: string): Promise<CourseDetails | null> {
  if (env.useMocks) {
    await delay(0);
    return MOCK_COURSES.find((c) => c.slug === slug) ?? null;
  }
  return http<CourseDetails>(`/courses/${encodeURIComponent(slug)}`).catch(() => null);
}
