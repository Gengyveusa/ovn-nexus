import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CE_DIR = path.join(process.cwd(), "content", "ce");

export type CeLesson = {
  slug: string;
  order: number;
  title: string;
  subtitle?: string;
  readingTime?: string;
  objectives: string[];
  tiers: string[];
  html: string;
};

export type QuizQ = { q: string; options: string[]; answer: number; explanation: string };

export type CeCourseData = {
  slug: string;
  title: string;
  subtitle?: string;
  creditHours: string;
  audience?: string;
  accreditationStatement: string;
  director?: string;
  passThreshold: number;
  quiz: QuizQ[];
  evaluation: string[];
  lessons: CeLesson[];
};

export function getCourse(slug: string): CeCourseData | null {
  const dir = path.join(CE_DIR, slug);
  const metaFile = path.join(dir, "course.json");
  if (!fs.existsSync(metaFile)) return null;
  const meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  const lessonSlugs: string[] = Array.isArray(meta.lessons) ? meta.lessons : [];
  const lessons: CeLesson[] = lessonSlugs
    .map((ls) => {
      const file = path.join(dir, `${ls}.md`);
      if (!fs.existsSync(file)) return null;
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      return {
        slug: ls,
        order: Number(data.order ?? 0),
        title: String(data.title ?? ""),
        subtitle: data.subtitle ? String(data.subtitle) : undefined,
        readingTime: data.readingTime ? String(data.readingTime) : undefined,
        objectives: Array.isArray(data.objectives) ? data.objectives.map(String) : [],
        tiers: Array.isArray(data.tiers) ? data.tiers.map(String) : [],
        html: marked.parse(content, { async: false, gfm: true }) as string,
      } as CeLesson;
    })
    .filter((l): l is CeLesson => l !== null)
    .sort((a, b) => a.order - b.order);

  return {
    slug: String(meta.slug ?? slug),
    title: String(meta.title ?? ""),
    subtitle: meta.subtitle ? String(meta.subtitle) : undefined,
    creditHours: String(meta.creditHours ?? ""),
    audience: meta.audience ? String(meta.audience) : undefined,
    accreditationStatement: String(meta.accreditationStatement ?? ""),
    director: meta.director ? String(meta.director) : undefined,
    passThreshold: Number(meta.passThreshold ?? 0.7),
    quiz: Array.isArray(meta.quiz) ? meta.quiz : [],
    evaluation: Array.isArray(meta.evaluation) ? meta.evaluation : [],
    lessons,
  };
}

export function getAllCourseSlugs(): string[] {
  if (!fs.existsSync(CE_DIR)) return [];
  return fs
    .readdirSync(CE_DIR)
    .filter((d) => fs.existsSync(path.join(CE_DIR, d, "course.json")));
}
