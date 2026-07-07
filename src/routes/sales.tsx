import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill, KpiCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { sales, currency, num } from "@/lib/mock-data";
import { Receipt, RotateCcw, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/sales")({ component: SalesPage });

function SalesPage() {
  const total = sales.reduce((s, x) => s + x.total, 0);
  const refunded = sales.filter((s) => s.status === "مُسترد").length;
  return (
    <AppShell
      title="المبيعات"
      subtitle="كل معاملة من كل جهاز"
      actions={
        <>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 ms-1.5" />تصفية</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 ms-1.5" />تصدير</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="معاملات اليوم" value={num(sales.length)} delta="عبر ٣ فروع" icon={Receipt} tone="brand" />
        <KpiCard label="إجمالي الإيرادات" value={currency(total)} delta="مباشر" icon={Receipt} tone="success" />
        <KpiCard label="مرتجعات" value={num(refunded)} delta="نسبة ٠٫٨٪" icon={RotateCcw} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="سجل المعاملات">
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
              {sales.map((s) => (
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
      </SectionCard>
    </AppShell>
  );
}
