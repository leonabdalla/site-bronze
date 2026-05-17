export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-bronze-500">
      <span aria-hidden className="h-px w-6 bg-bronze-400" />
      {children}
    </span>
  );
}
