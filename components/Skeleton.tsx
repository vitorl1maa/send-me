import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>
        <Skeleton className="h-12 w-12 rounded-full mt-2 bg-slate-300 dark:bg-muted" />
      </span>
      <span>
        <Skeleton className="h-4 w-44 my-2 bg-slate-300 dark:bg-muted" />
        <Skeleton className="h-4 w-32 bg-slate-300 dark:bg-muted" />
      </span>
    </div>
  );
}
