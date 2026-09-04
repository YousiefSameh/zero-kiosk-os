import { salesTrend, currency, num } from "@/lib/mock-data";
import logo from "@/assets/zero-kiosk-logo-teal.png.asset.json";

const navItems = [
  "لوحة التحكم",
  "نقطة البيع",
  "المبيعات",
  "المنتجات",
  "المخزون",
  "المشتريات",
  "الموردون",
  "الموظفون",
  "التقارير",
];

const kpiRow = [
  { label: "مبيعات النهارده", value: currency(48210), delta: "▲ ١٦٪ عن أمس", tone: "brand" as const },
  { label: "عدد الفواتير", value: num(342), delta: "متوسط الفاتورة ١٤١ ج.م", tone: "coral" as const },
  { label: "أصناف قربت تخلص", value: num(12), delta: "٧ أوامر شراء مفتوحة", tone: "warning" as const },
];

const rows = [
  { id: "INV-2841", who: "منى سعيد", branch: "الزمالك", total: 412, state: "مكتملة" },
  { id: "INV-2840", who: "أحمد فؤاد", branch: "المعادي", total: 189, state: "مكتملة" },
  { id: "INV-2839", who: "سارة حسن", branch: "هليوبوليس", total: 1240, state: "آجل" },
  { id: "INV-2838", who: "كريم لطفي", branch: "سموحة", total: 76, state: "مكتملة" },
];

function Sparkline() {
  const values = salesTrend.map((d) => d.sales);
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.88;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / (max - min)) * 100;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L100,100 L0,100 Z`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="zk-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#zk-spark)" />
      <path d={line} fill="none" stroke="var(--brand)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * A faithful, lightweight recreation of the Zero Kiosk control center.
 * Pure markup + inline SVG so the landing page stays fast.
 */
export function DashboardPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div
      dir="rtl"
      role="img"
      aria-label="واجهة زيرو كشك: لوحة تحكم تعرض مبيعات اليوم، تنبيهات المخزون وآخر العمليات"
      className="overflow-hidden rounded-2xl border border-hairline bg-card shadow-[0_40px_80px_-40px_rgba(0,55,48,0.35),0_2px_8px_rgba(0,55,48,0.06)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-sand-deep/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <div className="mx-auto hidden rounded-md border border-hairline bg-card px-3 py-1 text-[11px] text-ink-soft sm:block">
          app.zerokiosk.com/dashboard
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[188px] shrink-0 flex-col border-e border-hairline bg-sand/70 p-3 md:flex">
          <div className="mb-4 flex items-center gap-2">
            <img src={logo.url} alt="" className="h-7 w-7 rounded-lg" />
            <div className="text-[12px] font-semibold text-ink">زيرو كشك</div>
          </div>
          <div className="space-y-1">
            {navItems.map((n, i) => (
              <div
                key={n}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] ${
                  i === 0 ? "bg-brand-soft font-semibold text-brand" : "text-ink-soft"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-brand" : "bg-hairline"}`} />
                {n}
              </div>
            ))}
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-display text-base font-semibold text-ink sm:text-lg">لوحة التحكم</div>
              <div className="truncate text-[11px] text-ink-soft">مباشر عبر ٤ فروع · تحديث كل دقيقة</div>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <span className="rounded-full border border-hairline px-3 py-1.5 text-[11px] text-ink-soft">تصدير</span>
              <span className="rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold text-brand-foreground">بيع جديد</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {kpiRow.map((k) => (
              <div key={k.label} className="rounded-xl border border-hairline bg-card p-3">
                <div className="text-[11px] text-ink-soft">{k.label}</div>
                <div className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">{k.value}</div>
                <div
                  className={`mt-1 text-[10px] ${
                    k.tone === "brand" ? "text-success" : k.tone === "warning" ? "text-warning" : "text-ink-soft"
                  }`}
                >
                  {k.delta}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-3 grid gap-3 ${compact ? "" : "lg:grid-cols-[1.6fr_1fr]"}`}>
            <div className="rounded-xl border border-hairline bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[12px] font-semibold text-ink">مبيعات الأسبوع</div>
                <div className="text-[10px] text-success">+١٨٫٣٪</div>
              </div>
              <div className="h-28 sm:h-36">
                <Sparkline />
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-ink-soft">
                {salesTrend.map((d) => (
                  <span key={d.day}>{d.day.replace("ال", "")}</span>
                ))}
              </div>
            </div>

            {!compact && (
              <div className="rounded-xl border border-hairline bg-card p-3">
                <div className="mb-2 text-[12px] font-semibold text-ink">آخر العمليات</div>
                <ul className="space-y-2.5">
                  {rows.map((r) => (
                    <li key={r.id} className="flex items-center gap-2">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-[9px] font-semibold text-brand">
                        {r.who.slice(0, 2)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] text-ink">{r.who}</span>
                        <span className="block truncate text-[10px] text-ink-soft">
                          {r.branch} · {r.id}
                        </span>
                      </span>
                      <span className="shrink-0 text-[11px] font-semibold text-ink">{currency(r.total)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
