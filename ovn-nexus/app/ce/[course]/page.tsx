import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CeCourse } from "@/components/ce-course";
import { getAllCourseSlugs, getCourse } from "@/lib/ce/loader";

export function generateStaticParams() {
  return getAllCourseSlugs().map((course) => ({ course }));
}

export function generateMetadata({ params }: { params: { course: string } }): Metadata {
  const c = getCourse(params.course);
  if (!c) return { title: "Not found — OVN Nexus" };
  return { title: `${c.title} — CE · OVN Nexus`, description: c.subtitle };
}

export default function CeCoursePage({ params }: { params: { course: string } }) {
  const course = getCourse(params.course);
  if (!course) notFound();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container">
          <CeCourse course={course} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
