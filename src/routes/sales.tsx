import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, KpiCard, EmptyState } from "@/components/app-shell";
import { useDataState, ListSkeleton, KpiSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sales, currency, num } from "@/lib/mock-data";
import { Receipt, RotateCcw, Filter, Download, Search } from "lucide-react";

export const Route = createFileRoute("/sales")({ component: SalesPage });

function SalesPage() {
  const [q, setQ] = useState("");
  const ds = useDataState();
  const base = ds.rows(sales);
  const total = base.reduce((s, x) => s + x.total, 0);
  const refunded = base.filter((s) => s.status === "مُسترد").length;
  const allRows = sales.filter((s) => s.id.toLowerCase().includes(q.toLowerCase()) || s.cashier.includes(q) || s.branch.includes(q));
  const rows = ds.rows(allRows);
  return (
    <AppShell
      title="المبيعات"
      subtitle="كل معاملة من كل جهاز"
      actions={
        <>
          <Button variant="outline" size="sm" disabled={ds.isLoading}><Filter className="w-4 h-4 ms-1.5" />تصفية</Button>
          <Button variant="outline" size="sm" disabled={ds.isLoading || ds.isEmpty}><Download className="w-4 h-4 ms-1.5" />تصدير</Button>
        </>
      }
    >
      {ds.isLoading ? (
        <KpiSkeleton count={3} />
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="معاملات اليوم" value={num(base.length)} delta={ds.isEmpty ? "لا معاملات بعد" : "عبر ٣ فروع"} icon={Receipt} tone="brand" />
        <KpiCard label="إجمالي الإيرادات" value={currency(total)} delta={ds.isEmpty ? "بانتظار أول عملية" : "مباشر"} icon={Receipt} tone="success" />
        <KpiCard label="مرتجعات" value={num(refunded)} delta={ds.isEmpty ? "لا مرتجعات" : "نسبة ٠٫٨٪"} icon={RotateCcw} tone="coral" />
      </div>
      )}


      <SectionCard className="mt-4" title="سجل المعاملات">
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث برقم المعاملة أو الكاشير أو الفرع…" className="pr-9 rounded-lg" />
        </div>
        {ds.isLoading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={Receipt}
            title={ds.isEmpty ? "لا توجد مبيعات بعد" : "لا توجد مبيعات مطابقة"}
            description={ds.isEmpty ? "لم تُسجّل أي معاملة حتى الآن. افتح نقطة البيع وأتمّ أول عملية، وستظهر هنا مباشرة." : "لم يتم تسجيل أي معاملة تطابق هذا البحث. ستظهر المبيعات هنا تلقائيًا فور إتمامها من نقطة البيع."}
            primary={{ label: "فتح نقطة البيع" }}
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-right font-medium px-5 py-2.5">المعاملة</th>
                <th className="text-right font-medium py-2.5">الكاشير</th>
                <th className="text-right font-medium py-2.5">الفرع</th>
                <th className="text-left font-medium py-2.5">الأصناف</th>
                <th className="text-left font-medium py-2.5">الإجمالي</th>
                <th className="text-right font-medium py-2.5">طريقة الدفع</th>
                <th className="text-right font-medium py-2.5">الوقت</th>
                <th className="text-right font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                  <td className="py-3 font-medium">{s.cashier}</td>
                  <td className="py-3 text-muted-foreground">{s.branch}</td>
                  <td className="py-3 text-left">{num(s.items)}</td>
                  <td className="py-3 text-left font-semibold">{currency(s.total)}</td>
                  <td className="py-3">{s.method}</td>
                  <td className="py-3 text-muted-foreground">{s.time}</td>
                  <td className="px-5 py-3"><StatusPill status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </SectionCard>
    </AppShell>
  );
}
