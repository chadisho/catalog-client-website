interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span aria-hidden="true" className="h-2 w-6 shrink-0 rounded-full bg-primary" />
      <h2 className="shrink-0 text-right text-xl font-semibold text-text">{title}</h2>
      <div aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
