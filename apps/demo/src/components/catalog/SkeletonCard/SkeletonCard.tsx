export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="h-7 w-3/4 rounded bg-gray-200" />
          <div className="mt-1.5 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-full rounded bg-gray-200" />
        </div>
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3  rounded bg-gray-200" />
          <div className="h-4 w-1/3  rounded bg-gray-200" />
        </div>
        <div className="flex flex-wrap justify-between gap-3 mt-3">
          <div className="h-8 w-2/5 rounded-lg bg-gray-200" />
          <div className="h-8 w-1/2 rounded-lg bg-gray-200" />
          <div className="h-9 w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
