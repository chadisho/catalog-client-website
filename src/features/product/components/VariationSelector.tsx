'use client';

type VariationSelectorProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function VariationSelector({ label, options, selected, onSelect }: VariationSelectorProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-text/80">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                isSelected
                  ? 'border-primary bg-primary text-white'
                  : 'border-secondary/40 bg-background text-text hover:border-primary/50'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}
