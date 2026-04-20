'use client';

type QuantitySelectorProps = {
  label: string;
  value: number;
  increaseLabel: string;
  decreaseLabel: string;
  disableIncrease?: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantitySelector({
  label,
  value,
  increaseLabel,
  decreaseLabel,
  disableIncrease = false,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-text/80">{label}</p>
      <div className="inline-flex items-center rounded-xl border border-border bg-background">
        <button
          type="button"
          onClick={onIncrease}
          disabled={disableIncrease}
          className="h-10 w-10 rounded-s-xl text-lg font-semibold text-text transition-colors hover:bg-secondary/15 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
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
