// 生成中骨架屏

export function SkeletonResult() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-6 w-28 rounded bg-slatey-100" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-shimmer relative aspect-square overflow-hidden rounded-2xl bg-slatey-100"
          />
        ))}
      </div>
      <div className="mb-4 mt-8 h-6 w-28 rounded bg-slatey-100" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-shimmer relative h-40 overflow-hidden rounded-2xl bg-slatey-100"
          />
        ))}
      </div>
    </div>
  );
}
