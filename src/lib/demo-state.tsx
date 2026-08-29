import { useEffect, useState } from "react";
import { Database, Loader2, Inbox } from "lucide-react";

export type DataState = "filled" | "empty" | "loading";

const KEY = "zk-data-state";
let current: DataState = "filled";
const listeners = new Set<(s: DataState) => void>();

export function getDataState() {
  return current;
}

export function setDataState(next: DataState) {
  current = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(next));
}

/** Global demo-state hook: lets you preview any page as filled / empty / loading. */
export function useDataState() {
  const [state, setState] = useState<DataState>(current);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as DataState | null;
      if (saved) current = saved;
    } catch {
      /* ignore */
    }
    // Always sync to the module value: another consumer may have hydrated it first.
    setState(current);
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    state,
    isEmpty: state === "empty",
    isLoading: state === "loading",
    setState: setDataState,
    /** Returns [] in empty mode so every list page can show its empty state. */
    rows: <T,>(data: T[]) => (state === "empty" ? [] : data),
  };
}

const options: { value: DataState; label: string; icon: any }[] = [
  { value: "filled", label: "ممتلئ", icon: Database },
  { value: "empty", label: "فارغ", icon: Inbox },
  { value: "loading", label: "تحميل", icon: Loader2 },
];

/** Segmented control in the header for switching the preview state. */
export function DataStateSwitcher() {
  const { state, setState } = useDataState();
  return (
    <div className="hidden md:inline-flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5">
      {options.map((o) => {
        const active = state === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setState(o.value)}
            title={`معاينة الصفحة في حالة: ${o.label}`}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
              active ? "bg-brand text-brand-foreground shadow-soft" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <o.icon className={`w-3.5 h-3.5 ${o.value === "loading" && active ? "animate-spin" : ""}`} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Skeleton rows used while a page is in loading preview mode. */
export function ListSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2 py-2" aria-busy>
      <div className="flex gap-3 pb-2 border-b border-border">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 flex-1 rounded bg-muted animate-pulse" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-3 py-2.5">
          <div className="w-9 h-9 rounded-lg bg-muted animate-pulse shrink-0" />
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-3.5 flex-1 rounded bg-muted animate-pulse"
              style={{ animationDelay: `${(r * cols + c) * 40}ms`, opacity: 1 - c * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Shimmering block used to compose every skeleton in the app. */
export function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`rounded bg-muted animate-pulse ${className}`} />;
}

/** Skeleton for a row of KPI cards. */
export function KpiSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" aria-busy>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-elevated p-5">
          <div className="flex items-start justify-between">
            <Shimmer className="h-3 w-24" />
            <Shimmer className="w-9 h-9 rounded-xl" />
          </div>
          <Shimmer className="h-7 w-32 mt-4" />
          <Shimmer className="h-3 w-40 mt-3" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton for a chart area (bars rising like a real chart). */
export function ChartSkeleton({ height = 288 }: { height?: number }) {
  const bars = [45, 62, 38, 74, 55, 88, 66, 50, 79, 42, 68, 58];
  return (
    <div className="w-full" style={{ height }} aria-busy>
      <div className="h-full flex items-end gap-2 px-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-brand/15 to-brand/5 animate-pulse"
            style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {bars.map((_, i) => (
          <Shimmer key={i} className="h-2 flex-1" />
        ))}
      </div>
    </div>
  );
}

/** Skeleton for a vertical list of avatar + two-line rows. */
export function RowsSkeleton({ rows = 5, avatar = true }: { rows?: number; avatar?: boolean }) {
  return (
    <div className="divide-y divide-border" aria-busy>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="py-3.5 flex items-center gap-3">
          {avatar && <Shimmer className="w-10 h-10 rounded-xl shrink-0" />}
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3.5" />
            <Shimmer className="h-2.5 w-2/5" />
          </div>
          <Shimmer className="h-3.5 w-16 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton for a grid of content cards. */
export function CardsSkeleton({ count = 6, cols = "md:grid-cols-2" }: { count?: number; cols?: string }) {
  return (
    <div className={`grid grid-cols-1 ${cols} gap-4`} aria-busy>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-elevated p-5">
          <div className="flex items-start gap-3">
            <Shimmer className="w-11 h-11 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2.5">
              <Shimmer className="h-4 w-1/2" />
              <Shimmer className="h-2.5 w-4/5" />
              <Shimmer className="h-2.5 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skeleton for a form of labelled inputs. */
export function FormSkeleton({ fields = 6 }: { fields?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-busy>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Shimmer className="h-2.5 w-24" />
          <Shimmer className="h-10 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton for the POS product grid. */
export function TilesSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3" aria-busy>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-3">
          <Shimmer className="aspect-square rounded-lg mb-2" />
          <Shimmer className="h-3" />
          <Shimmer className="h-2.5 w-2/3 mt-2" />
          <Shimmer className="h-3 w-1/2 mt-2" />
        </div>
      ))}
    </div>
  );
}
