interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return <h2 className="mb-4 text-right text-xl font-semibold text-text">{title}</h2>;
}
