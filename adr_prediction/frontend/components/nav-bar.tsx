export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite/60 bg-abyssal-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-mono text-caption uppercase tracking-[-0.02em] text-bone-white">
          <span className="h-2 w-2 rounded-full bg-bioluminescent-lime" />
          Integrated Biosciences
          <span className="text-lichen/50">/ ADR</span>
        </div>
        <nav className="flex items-center gap-3">
          <a
            href="#report"
            className="rounded-nav border border-lichen px-4 py-1.5 font-mono text-caption text-lichen transition-colors hover:border-bioluminescent-lime hover:text-bioluminescent-lime"
          >
            Report
          </a>
          <a
            href="#model"
            className="rounded-nav border border-lichen px-4 py-1.5 font-mono text-caption text-lichen transition-colors hover:border-bioluminescent-lime hover:text-bioluminescent-lime"
          >
            Model
          </a>
          <a
            href="#upload"
            className="rounded-btn bg-paper px-4 py-1.5 font-mono text-caption uppercase tracking-[-0.02em] text-abyssal-ink"
          >
            Analyze PDF
          </a>
        </nav>
      </div>
    </header>
  );
}
