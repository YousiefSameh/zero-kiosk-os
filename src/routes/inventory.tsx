import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, KpiCard, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { useDataState, ListSkeleton, KpiSkeleton, ChartSkeleton, RowsSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, currency, num } from "@/lib/mock-data";
import { Boxes, AlertTriangle, TrendingDown, PackageCheck, Download, Search, BarChart3, PackagePlus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const [q, setQ] = useState("");
  const ds = useDataState();
  const base = ds.rows(products);
  const totalValue = base.reduce((s, p) => s + p.stock * p.cost, 0);
  const low = base.filter((p) => p.status !== "متوفر").length;
  const out = base.filter((p) => p.status === "نفد المخزون").length;
  const skus = base.length;
  const allRows = products.filter((p) => p.name.includes(q) || p.category.includes(q));
  const rows = ds.rows(allRows);
  const reorderList = base.filter((p) => p.status !== "متوفر").slice(0, 5);

  const perCategory = Object.entries(
    base.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.stock * p.cost;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value) }));

  return (
    <AppShell
      title="المخزون"
      subtitle="سجل المخزون الحي في جميع الفروع"
      actions={
        <>
          <Button variant="outline" size="sm" disabled={ds.isLoading || ds.isEmpty}><Download className="w-4 h-4 ms-1.5" />تقرير المخزون</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90" disabled={ds.isLoading}>تعديل المخزون</Button>
        </>
      }
    >
      {ds.isLoading ? (
        <KpiSkeleton count={4} />
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="قيمة المخزون" value={currency(totalValue)} delta={ds.isEmpty ? "لا مخزون مُسجَّل" : "بسعر التكلفة"} icon={Boxes} tone="brand" />
        <KpiCard label="إجمالي الأصناف" value={num(skus)} delta={ds.isEmpty ? "أضف أول منتج" : "عبر ٤ فروع"} icon={PackageCheck} tone="success" />
        <KpiCard label="مخزون منخفض" value={num(low)} delta={ds.isEmpty ? "لا تنبيهات" : "بحاجة إلى إعادة طلب"} icon={AlertTriangle} tone="warning" />
        <KpiCard label="نفد المخزون" value={num(out)} delta={ds.isEmpty ? "لا تنبيهات" : "خطر فقدان مبيعات"} icon={TrendingDown} tone="coral" />
      </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <SectionCard className="lg:col-span-2" title="قيمة المخزون حسب التصنيف">
          {ds.isLoading ? (
            <ChartSkeleton />
          ) : perCategory.length === 0 ? (
            <EmptyState
              compact
              icon={BarChart3}
              title="لا توجد بيانات للرسم البياني"
              description="سيظهر توزيع قيمة المخزون حسب التصنيف تلقائيًا بعد إضافة منتجات وتسجيل أول كميات في المخزون."
              primary={{ label: "إضافة منتج", icon: PackagePlus }}
            />
          ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                <XAxis dataKey="name" reversed tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${num(Math.round(v / 1000))} ألف`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 190)", fontSize: 12 }} />
                <Bar dataKey="value" fill="oklch(0.48 0.08 185)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          )}
        </SectionCard>

        <SectionCard title="قائمة إعادة الطلب" description="مقترحة تلقائيًا من السجل">
          {ds.isLoading ? (
            <RowsSkeleton rows={5} />
          ) : reorderList.length === 0 ? (
            <EmptyState
              compact
              icon={PackageCheck}
              title="لا حاجة لإعادة الطلب"
              description={ds.isEmpty ? "لا توجد منتجات في المخزون بعد، لذلك لم تُقترح أي عملية إعادة طلب حتى الآن." : "كل الأصناف أعلى من نقطة إعادة الطلب. سننبّهك هنا تلقائيًا عند انخفاض أي صنف."}
              primary={{ label: "إضافة منتج", icon: PackagePlus }}
            />
          ) : (
          <ul className="space-y-3">
            {reorderList.map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40">
                <div className="w-9 h-9 rounded-lg bg-brand-soft grid place-items-center text-brand text-xs font-medium">{p.name.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{num(p.stock)} في المخزون · إعادة الطلب {num(p.reorder)}</div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">إعادة طلب</Button>
              </li>
            ))}
          </ul>
          )}
        </SectionCard>
      </div>

      <SectionCard title="سجل المخزون" description="كل حركة قابلة للتتبع" className="mt-4">
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} disabled={ds.isLoading} placeholder="ابحث في سجل المخزون…" className="pr-9 rounded-lg" />
        </div>

        {ds.isLoading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={Boxes}
            title={ds.isEmpty ? "لا يوجد مخزون بعد" : "لا يوجد مخزون مطابق"}
            description={ds.isEmpty ? "سجل المخزون فارغ. أضف منتجات وسجّل أول عملية استلام لتبدأ حركة المخزون في الظهور." : "لم نعثر على أصناف تطابق بحثك في سجل المخزون. جرّب اسم منتج أو تصنيفًا مختلفًا."}
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-right font-medium px-5 py-2.5">المنتج</th>
                <th className="text-right font-medium py-2.5">التصنيف</th>
                <th className="text-left font-medium py-2.5">في المخزون</th>
                <th className="text-left font-medium py-2.5">نقطة إعادة الطلب</th>
                <th className="text-left font-medium py-2.5">القيمة</th>
                <th className="text-right font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.category}</td>
                  <td className="py-3 text-left">{num(p.stock)}</td>
                  <td className="py-3 text-left text-muted-foreground">{num(p.reorder)}</td>
                  <td className="py-3 text-left font-medium">{currency(p.stock * p.cost)}</td>
                  <td className="px-5 py-3"><StatusPill status={p.status} /></td>
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
