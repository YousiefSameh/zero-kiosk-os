import { currency, num } from "@/lib/mock-data";

/** Shared browser-ish frame for every product moment shown on the site. */
export function AppFrame({
  children,
  label,
  path,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  path: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_30px_70px_-45px_rgba(0,55,48,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-sand-deep/50 px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-coral/60" />
        <span className="h-2 w-2 rounded-full bg-warning/60" />
        <span className="h-2 w-2 rounded-full bg-success/60" />
        <span className="mx-auto hidden rounded-md border border-hairline bg-card px-2.5 py-0.5 text-[10px] text-ink-soft sm:block">
          {path}
        </span>
      </div>
      <div className="min-h-[19rem] p-4 sm:min-h-[21rem] sm:p-5">{children}</div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function PanelHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="truncate font-display text-[15px] font-bold text-ink">{title}</div>
        <div className="truncate text-[11px] text-ink-soft">{hint}</div>
      </div>
      <span className="hidden shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand sm:inline">
        مباشر
      </span>
    </div>
  );
}

/* ------------------------------- نقطة البيع ------------------------------- */

const cart = [
  { name: "زيت عافية ١ لتر", qty: 2, price: 96 },
  { name: "لبن جهينة ١ لتر", qty: 3, price: 38 },
  { name: "جبنة دومتي ٥٠٠ج", qty: 1, price: 72 },
  { name: "شيبسي ٢٠ج", qty: 4, price: 20 },
];

export function PosPanel() {
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  return (
    <div>
      <PanelHead title="نقطة البيع" hint="كاشير ٢ · فرع الزمالك · وردية الصباح" />
      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-lg border border-hairline">
          <div className="flex items-center gap-2 border-b border-hairline px-3 py-2 text-[11px] text-ink-soft">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            امسح الباركود أو اكتب اسم الصنف
          </div>
          <ul className="divide-y divide-hairline/70">
            {cart.map((i) => (
              <li key={i.name} className="flex items-center gap-3 px-3 py-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-sand-deep text-[10px] font-bold text-ink-soft">
                  ×{num(i.qty)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-ink">{i.name}</span>
                <span className="shrink-0 text-[12px] font-semibold text-ink">{currency(i.qty * i.price)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-hairline bg-sand/60 p-3">
          <dl className="space-y-2 text-[12px]">
            <div className="flex justify-between text-ink-soft">
              <dt>الإجمالي</dt>
              <dd>{currency(total)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>خصم عميل دائم</dt>
              <dd>-{currency(24)}</dd>
            </div>
            <div className="flex justify-between border-t border-hairline pt-2 font-display text-base font-bold text-ink">
              <dt>المطلوب</dt>
              <dd>{currency(total - 24)}</dd>
            </div>
          </dl>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px]">
            <span className="rounded-md border border-hairline bg-card py-2 text-ink-soft">آجل</span>
            <span className="rounded-md bg-brand py-2 font-semibold text-brand-foreground">كاش · تحصيل</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- المخزون -------------------------------- */

const lowStock = [
  { name: "سكر ١ كجم", left: 6, cover: "يوم واحد", supplier: "النور للتجارة" },
  { name: "زيت عافية ١ لتر", left: 11, cover: "٢ أيام", supplier: "هايبر المدينة" },
  { name: "لبن جهينة ١ لتر", left: 14, cover: "٣ أيام", supplier: "جهينة" },
  { name: "مكرونة الملكة", left: 18, cover: "٤ أيام", supplier: "إيديتا" },
];

export function InventoryPanel() {
  return (
    <div>
      <PanelHead title="المخزون · قرب يخلص" hint="١٢ صنف تحت حد الطلب في ٤ فروع" />
      <div className="overflow-hidden rounded-lg border border-hairline">
        <table className="w-full text-start text-[12px]">
          <thead className="bg-sand-deep/50 text-[10px] text-ink-soft">
            <tr>
              <th scope="col" className="px-3 py-2 text-start font-semibold">
                الصنف
              </th>
              <th scope="col" className="px-3 py-2 text-start font-semibold">
                المتبقي
              </th>
              <th scope="col" className="px-3 py-2 text-start font-semibold">
                يكفي
              </th>
              <th scope="col" className="hidden px-3 py-2 text-start font-semibold sm:table-cell">
                المورد
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline/70">
            {lowStock.map((r) => (
              <tr key={r.name}>
                <td className="px-3 py-2.5 text-ink">{r.name}</td>
                <td className="px-3 py-2.5 font-semibold text-coral">{num(r.left)}</td>
                <td className="px-3 py-2.5 text-ink-soft">{r.cover}</td>
                <td className="hidden px-3 py-2.5 text-ink-soft sm:table-cell">{r.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-hairline bg-brand-soft/60 px-3 py-2.5 text-[12px] text-ink">
        <span className="font-semibold text-brand">اقتراح</span>
        اجمع الأصناف الأربعة في أمر شراء واحد لمورد النور — يوفر شحنة زيادة.
        <span className="ms-auto rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-brand-foreground">
          جهّز أمر الشراء
        </span>
      </div>
    </div>
  );
}

/* ------------------------------- التقارير -------------------------------- */

const week = [38, 42, 36, 51, 47, 63, 58];
const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

export function ReportsPanel() {
  const max = Math.max(...week);
  return (
    <div>
      <PanelHead title="تقرير اليوم" hint="يتحدث تلقائيًا مع كل فاتورة" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { l: "مبيعات النهارده", v: currency(48210), d: "▲ ١٦٪ عن أمس", tone: "text-success" },
          { l: "عدد الفواتير", v: num(342), d: "متوسط الفاتورة ١٤١ ج.م", tone: "text-ink-soft" },
          { l: "أعلى ربح", v: "المشروبات", d: "٣٢٪ من إجمالي الربح", tone: "text-ink-soft" },
        ].map((k) => (
          <div key={k.l} className="rounded-lg border border-hairline p-3">
            <div className="text-[11px] text-ink-soft">{k.l}</div>
            <div className="mt-1 font-display text-lg font-bold text-ink">{k.v}</div>
            <div className={`mt-0.5 text-[10px] ${k.tone}`}>{k.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-hairline p-3">
        <div className="mb-3 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-ink">مبيعات الأسبوع</span>
          <span className="text-success">+١٨٫٣٪</span>
        </div>
        <div className="flex h-28 items-end gap-2" aria-hidden="true">
          {week.map((v, i) => (
            <div key={days[i]} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`w-full rounded-t-[3px] ${i === week.length - 2 ? "bg-brand" : "bg-brand/25"}`}
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="truncate text-[9px] text-ink-soft">{days[i].replace("ال", "")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- الفروع --------------------------------- */

const branchRows = [
  { name: "الزمالك", sales: 18420, invoices: 132, state: "فوق المستهدف", tone: "success" as const },
  { name: "المعادي", sales: 14110, invoices: 98, state: "مطابق", tone: "muted" as const },
  { name: "هليوبوليس", sales: 9880, invoices: 71, state: "تحت المستهدف", tone: "coral" as const },
  { name: "سموحة", sales: 5800, invoices: 41, state: "افتتح الأسبوع ده", tone: "muted" as const },
];

export function BranchesPanel() {
  return (
    <div>
      <PanelHead title="كل الفروع" hint="مقارنة مباشرة · اليوم" />
      <ul className="space-y-2">
        {branchRows.map((b) => (
          <li
            key={b.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-hairline px-3 py-2.5 sm:flex sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-[11px] font-bold text-brand">
                {b.name.slice(0, 2)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold text-ink">فرع {b.name}</span>
                <span className="block truncate text-[10px] text-ink-soft">{num(b.invoices)} فاتورة</span>
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-display text-[13px] font-bold text-ink">{currency(b.sales)}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  b.tone === "success"
                    ? "bg-success/12 text-success"
                    : b.tone === "coral"
                      ? "bg-coral/12 text-coral"
                      : "bg-sand-deep text-ink-soft"
                }`}
              >
                {b.state}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-lg border border-hairline bg-sand/60 px-3 py-2.5 text-[12px] text-ink-soft">
        كل فرع له مخزونه وموظفينه وصلاحياته — والصورة الكاملة تفضل مكان واحد.
      </div>
    </div>
  );
}
