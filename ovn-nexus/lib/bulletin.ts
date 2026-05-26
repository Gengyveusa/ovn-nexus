import editions from "./data/bulletin-editions.json";

export type BulletinEdition = {
  title: string;
  slug: string;
  url: string; // canonical LinkedIn URL
  published_at: string; // ISO date (YYYY-MM-DD)
  excerpt: string;
  tags: string[];
  series: string;
};

const ALL: BulletinEdition[] = (editions as BulletinEdition[]).slice().sort(
  (a, b) => b.published_at.localeCompare(a.published_at)
);

export function getAllEditions(): BulletinEdition[] {
  return ALL;
}

export function getEdition(slug: string): BulletinEdition | undefined {
  return ALL.find((e) => e.slug === slug);
}

export function getRelatedEditions(slug: string, limit = 3): BulletinEdition[] {
  const target = getEdition(slug);
  if (!target) return ALL.slice(0, limit);
  // Prefer same series, then closest in time
  const sameSeries = ALL.filter((e) => e.slug !== slug && e.series === target.series);
  const others = ALL.filter((e) => e.slug !== slug && e.series !== target.series);
  return [...sameSeries, ...others].slice(0, limit);
}

export function getSeriesList(): string[] {
  return Array.from(new Set(ALL.map((e) => e.series)));
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
