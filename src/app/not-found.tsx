import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { projectsArchive } from "@/content/projects";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col justify-center bg-forest text-cream">
      <div className="mx-auto max-w-5xl px-gutter py-section-lg">
        <p className="font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-pretty md:text-6xl lg:text-7xl">
          Project not found
        </h1>
        <p className="mt-6 max-w-md text-lg text-cream/75">
          That case study isn&apos;t on this site. The write-ups here are Exam.io
          and Areej.
        </p>
        <Link
          href={projectsArchive.seeAllHref}
          className={buttonVariants({
            size: "lg",
            className: "mt-10 h-11 w-fit px-5 duration-200",
          })}
        >
          Back to projects
        </Link>
      </div>
    </section>
  );
}
