import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-1 flex-col justify-center px-gutter py-section-lg">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
        Project not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That case study isn&apos;t on this site. The write-ups here are Exam.io
        and Areej.
      </p>
      <Link
        href="/#work"
        className={buttonVariants({
          size: "lg",
          className: "mt-8 h-11 w-fit px-5",
        })}
      >
        Back to projects
      </Link>
    </section>
  );
}
