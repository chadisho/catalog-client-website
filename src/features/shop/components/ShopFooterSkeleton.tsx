export default function ShopFooterSkeleton() {
  return (
    <footer aria-hidden="true" className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[1126px] grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Column 1: logo + name + description lines */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-base-300/60" />
            <div className="h-5 w-28 animate-pulse rounded bg-base-300/60" />
          </div>
          <div className="h-3 w-full animate-pulse rounded bg-base-300/60" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-base-300/60" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-base-300/60" />
          <div className="mt-2 h-8 w-36 animate-pulse rounded-xl bg-base-300/60" />
        </div>

        {/* Column 2: social link blocks */}
        <div className="space-y-2">
          <div className="mb-3 h-4 w-24 animate-pulse rounded bg-base-300/60" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-full animate-pulse rounded-xl bg-base-300/60" />
          ))}
        </div>

        {/* Column 3: address block */}
        <div className="space-y-2">
          <div className="mb-3 h-4 w-20 animate-pulse rounded bg-base-300/60" />
          <div className="h-3 w-full animate-pulse rounded bg-base-300/60" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-base-300/60" />
          <div className="mt-2 h-8 w-32 animate-pulse rounded-lg bg-base-300/60" />
        </div>
      </div>
    </footer>
  );
}
