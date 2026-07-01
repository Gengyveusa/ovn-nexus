import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "education");

export type ModuleMeta = {
  module: number;
  series: string;
  title: string;
  subtitle?: string;
  summary: string;
  readingTime?: string;
  tiers: string[];
  slug: string;
};

function toMeta(data: Record<string, unknown>, slug: string): ModuleMeta {
  return {
    module: Number(data.module ?? 0),
    series: String(data.series ?? ""),
    title: String(data.title ?? ""),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    summary: String(data.summary ?? ""),
    readingTime: data.readingTime ? String(data.readingTime) : undefined,
    tiers: Array.isArray(data.tiers) ? data.tiers.map(String) : [],
    slug,
  };
}

export function getAllModules(): ModuleMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return toMeta(data, f.replace(/\.md$/, ""));
    })
    .sort((a, b) => a.module - b.module);
}

export function getModule(slug: string): { meta: ModuleMeta; html: string } | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const html = marked.parse(content, { async: false, gfm: true }) as string;
  return { meta: toMeta(data, slug), html };
}

export function tierClass(tier: string): string {
  const s = tier.toLowerCase();
  if (s.startsWith("establish")) return "tier-established";
  if (s.startsWith("support")) return "tier-supported";
  if (s.startsWith("hypoth")) return "tier-hypothesis";
  return "";
}

export function tierLabel(tier: string): string {
  const s = tier.toLowerCase();
  if (s.startsWith("establish")) return "Established";
  if (s.startsWith("support")) return "Supported";
  if (s.startsWith("hypoth")) return "Hypothesis";
  return tier;
}

export function getSeriesGroups(): { series: string; modules: ModuleMeta[] }[] {
  const mods = getAllModules();
  const order: string[] = [];
  const map = new Map<string, ModuleMeta[]>();
  for (const m of mods) {
    if (!map.has(m.series)) {
      map.set(m.series, []);
      order.push(m.series);
    }
    map.get(m.series)!.push(m);
  }
  return order.map((series) => ({ series, modules: map.get(series)! }));
}
