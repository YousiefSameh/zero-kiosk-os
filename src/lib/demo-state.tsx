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
      if (saved && saved !== current) {
        current = saved;
        setState(saved);
      }
    } catch {
      /* ignore */
    }
    listeners.add(setState);
    return () => listeners.delete(setState);
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
