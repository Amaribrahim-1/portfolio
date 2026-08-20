export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-gutter py-section text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        Foundation scaffold
      </p>
      <h1 className="max-w-2xl font-display text-4xl font-semibold text-foreground sm:text-6xl">
        Frontend Developer building real, production-ready products.
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Design tokens, fonts, and the grain texture are wired. Sections land
        in Phase 2.
      </p>
    </main>
  );
}
