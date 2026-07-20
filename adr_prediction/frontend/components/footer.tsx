export default function Footer() {
  return (
    <footer className="border-t border-graphite bg-void">
      <div className="mx-auto max-w-page px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-caption uppercase tracking-[-0.02em] text-bone-white">
            <span className="h-2 w-2 rounded-full bg-bioluminescent-lime" />
            Integrated Biosciences
          </div>
          <p className="text-caption text-lichen/50">
            Decision-support tooling. Not a certified clinical device.
          </p>
        </div>
      </div>
    </footer>
  );
}
