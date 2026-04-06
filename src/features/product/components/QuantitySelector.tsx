'use client';

type QuantitySelectorProps = {
  label: string;
  value: number;
  increaseLabel: string;
  decreaseLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantitySelector({
  label,
  value,
  increaseLabel,
  decreaseLabel,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-text/80">{label}</p>
      <div className="inline-flex items-center rounded-xl border border-secondary/40 bg-background">
        <button
          type="button"
          onClick={onIncrease}
          className="h-10 w-10 rounded-s-xl text-lg font-semibold text-text transition-colors hover:bg-secondary/15"
          aria-label={increaseLabel}
        >
          +
        </button>
        <span className="min-w-10 px-3 text-center text-sm font-semibold text-text">{value}</span>
        <button
          type="button"
          onClick={onDecrease}
          className="h-10 w-10 rounded-e-xl text-lg font-semibold text-text transition-colors hover:bg-secondary/15"
          aria-label={decreaseLabel}
        >
          −
        </button>
      </div>
    </section>
  );
}
