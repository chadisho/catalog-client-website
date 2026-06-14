export default function ShopFooterSkeleton() {
  return (
    <footer aria-hidden="true" className="border-t border-border bg-surface">
      {/* Top accent gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1126px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-3 lg:gap-12">

        {/* Column 1: identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 flex-shrink-0 animate-pulse rounded-2xl bg-base-300/60" />
            <div className="h-5 w-32 animate-pulse rounded-lg bg-base-300/60" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full animate-pulse rounded bg-base-300/60" />
            <div className="h-3.5 w-5/6 animate-pulse rounded bg-base-300/60" />
            <div className="h-3.5 w-4/6 animate-pulse rounded bg-base-300/60" />
          </div>
          <div className="mt-auto h-10 w-full animate-pulse rounded-xl bg-base-300/60" />
        </div>

        {/* Column 2: social links */}
        <div className="flex flex-col gap-2">
          <div className="mb-2 h-3 w-20 animate-pulse rounded bg-base-300/60" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
              <div className="h-7 w-7 animate-pulse rounded-lg bg-base-300/60" />
              <div className="h-3.5 w-16 animate-pulse rounded bg-base-300/60" />
              <div className="ms-auto h-3 w-24 animate-pulse rounded bg-base-300/60" />
            </div>
          ))}
        </div>

        {/* Column 3: address */}
        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
          <div className="mb-2 h-3 w-16 animate-pulse rounded bg-base-300/60" />
          <div className="rounded-xl border border-border px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-base-300/60" />
            <div className="mt-2 h-3.5 w-full animate-pulse rounded bg-base-300/60" />
            <div className="mt-1.5 h-3.5 w-4/5 animate-pulse rounded bg-base-300/60" />
          </div>
          <div className="mt-2 h-10 w-full animate-pulse rounded-xl bg-base-300/60" />
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="mx-auto flex w-full max-w-[1126px] items-center justify-between px-4 py-3.5">
          <div className="h-3 w-24 animate-pulse rounded bg-base-300/60" />
          <div className="h-3 w-28 animate-pulse rounded bg-base-300/60" />
        </div>
      </div>
    </footer>
  );
}
