import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, KpiCard, EmptyState } from "@/components/app-shell";
import { useDataState, ListSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { purchaseOrders, currency, num } from "@/lib/mock-data";
import { Plus, ShoppingCart, Clock, CheckCircle2, XCircle, Search } from "lucide-react";

export const Route = createFileRoute("/purchase-orders")({ component: POPage });

function POPage() {
  const [q, setQ] = useState("");
  const ds = useDataState();
  const allRows = purchaseOrders.filter((p) => p.id.toLowerCase().includes(q.toLowerCase()) || p.supplier.includes(q) || p.branch.includes(q));
  const rows = ds.rows(allRows);
  const totals = {
    pending: purchaseOrders.filter((p) => p.status === "قيد الانتظار").length,
    approved: purchaseOrders.filter((p) => p.status === "معتمد").length,
    delivered: purchaseOrders.filter((p) => p.status === "تم التسليم").length,
    cancelled: purchaseOrders.filter((p) => p.status === "مُلغى").length,
  };
  const totalValue = purchaseOrders.filter((p) => p.status !== "مُلغى").reduce((s, p) => s + p.total, 0);

  return (
    <AppShell
      title="أوامر الشراء"
      subtitle="تتبّع كل أمر شراء من الإصدار إلى الاستلام"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />أمر شراء جديد</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="أوامر مفتوحة" value={num(totals.pending + totals.approved)} delta={currency(totalValue)} icon={ShoppingCart} tone="brand" />
        <KpiCard label="بانتظار الاعتماد" value={num(totals.pending)} delta="بحاجة إلى مراجعة المدير" icon={Clock} tone="warning" />
        <KpiCard label="تم التسليم" value={num(totals.delivered)} delta="هذا الشهر" icon={CheckCircle2} tone="success" />
        <KpiCard label="ملغاة" value={num(totals.cancelled)} delta="المعدل مستقر" icon={XCircle} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="جميع أوامر الشراء">
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث برقم الأمر أو المورد أو الفرع…" className="pr-9 rounded-lg" />
        </div>
        {ds.isLoading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title={ds.isEmpty ? "لا توجد أوامر شراء بعد" : "لا توجد أوامر شراء مطابقة"}
            description={ds.isEmpty ? "لم تُنشئ أي أمر شراء حتى الآن. أنشئ أول أمر لتجديد المخزون ومتابعة الاستلام خطوة بخطوة." : "لا توجد نتائج لهذا البحث. أنشئ أمر شراء جديدًا لتجديد المخزون قبل الوصول لنقطة إعادة الطلب."}
            primary={{ label: "أمر شراء جديد" }}
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-right font-medium px-5 py-2.5">الأمر</th>
                <th className="text-right font-medium py-2.5">المورد</th>
                <th className="text-right font-medium py-2.5">الفرع</th>
                <th className="text-left font-medium py-2.5">الأصناف</th>
                <th className="text-left font-medium py-2.5">الإجمالي</th>
                <th className="text-right font-medium py-2.5">تاريخ الإصدار</th>
                <th className="text-right font-medium py-2.5">الوصول المتوقع</th>
                <th className="text-right font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((po) => (
                <tr key={po.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{po.id}</td>
                  <td className="py-3 font-medium">{po.supplier}</td>
                  <td className="py-3 text-muted-foreground">{po.branch}</td>
                  <td className="py-3 text-left">{num(po.items)}</td>
                  <td className="py-3 text-left font-semibold">{currency(po.total)}</td>
                  <td className="py-3 text-muted-foreground">{po.date}</td>
                  <td className="py-3 text-muted-foreground">{po.eta}</td>
                  <td className="px-5 py-3"><StatusPill status={po.status} /></td>
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
