import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill, KpiCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { purchaseOrders, currency } from "@/lib/mock-data";
import { Plus, ShoppingCart, Clock, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/purchase-orders")({ component: POPage });

function POPage() {
  const totals = {
    pending: purchaseOrders.filter((p) => p.status === "قيد الانتظار").length,
    approved: purchaseOrders.filter((p) => p.status === "معتمد").length,
    delivered: purchaseOrders.filter((p) => p.status === "تم التسليم").length,
    cancelled: purchaseOrders.filter((p) => p.status === "ملغى").length,
  };
  const totalValue = purchaseOrders.filter((p) => p.status !== "ملغى").reduce((s, p) => s + p.total, 0);

  return (
    <AppShell
      title="أوامر الشراء"
      subtitle="تتبّع كل أمر من الإنشاء حتى الاستلام"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ml-1.5" />أمر شراء جديد</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="أوامر مفتوحة" value={String(totals.pending + totals.approved)} delta={currency(totalValue)} icon={ShoppingCart} tone="brand" />
        <KpiCard label="بانتظار الاعتماد" value={totals.pending.toString()} delta="بحاجة لمراجعة المدير" icon={Clock} tone="warning" />
        <KpiCard label="تم التسليم" value={totals.delivered.toString()} delta="هذا الشهر" icon={CheckCircle2} tone="success" />
        <KpiCard label="ملغاة" value={totals.cancelled.toString()} delta="اتجاه مستقر" icon={XCircle} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="كل أوامر الشراء">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">الأمر</th>
                <th className="text-left font-medium py-2.5">المورّد</th>
                <th className="text-left font-medium py-2.5">الفرع</th>
                <th className="text-right font-medium py-2.5">أصناف</th>
                <th className="text-right font-medium py-2.5">الإجمالي</th>
                <th className="text-left font-medium py-2.5">تاريخ الإنشاء</th>
                <th className="text-left font-medium py-2.5">الوصول المتوقع</th>
                <th className="text-left font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{po.id}</td>
                  <td className="py-3 font-medium">{po.supplier}</td>
                  <td className="py-3 text-muted-foreground">{po.branch}</td>
                  <td className="py-3 text-right">{po.items}</td>
                  <td className="py-3 text-right font-semibold">{currency(po.total)}</td>
                  <td className="py-3 text-muted-foreground">{po.date}</td>
                  <td className="py-3 text-muted-foreground">{po.eta}</td>
                  <td className="px-5 py-3"><StatusPill status={po.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
