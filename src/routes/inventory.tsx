import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard, StatusPill } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { products, currency } from "@/lib/mock-data";
import { Boxes, AlertTriangle, TrendingDown, PackageCheck, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const totalValue = products.reduce((s, p) => s + p.stock * p.cost, 0);
  const low = products.filter((p) => p.status !== "متوفر").length;
  const out = products.filter((p) => p.status === "نفد المخزون").length;
  const skus = products.length;

  const perCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.stock * p.cost;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value) }));

  return (
    <AppShell
      title="الجرد"
      subtitle="سجل مخزون لحظي عبر كل الفروع"
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 ml-1.5" />تقرير المخزون</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90">تعديل مخزون</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="قيمة المخزون" value={currency(totalValue)} delta="بسعر التكلفة" icon={Boxes} tone="brand" />
        <KpiCard label="إجمالي الأصناف" value={skus.toString()} delta="عبر ٤ فروع" icon={PackageCheck} tone="success" />
        <KpiCard label="مخزون منخفض" value={low.toString()} delta="يحتاج إعادة طلب" icon={AlertTriangle} tone="warning" />
        <KpiCard label="نفد المخزون" value={out.toString()} delta="خطر خسارة مبيعات" icon={TrendingDown} tone="coral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <SectionCard className="lg:col-span-2" title="قيمة المخزون حسب الفئة">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} orientation="right" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 190)", fontSize: 12 }} />
                <Bar dataKey="value" fill="oklch(0.48 0.08 185)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="قائمة إعادة الطلب" description="مقترحة تلقائيًا من السجل">
          <ul className="space-y-3">
            {products.filter((p) => p.status !== "متوفر").slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40">
                <div className="w-9 h-9 rounded-lg bg-brand-soft grid place-items-center text-brand text-xs font-medium">{p.name.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.stock} متاح · إعادة طلب {p.reorder}</div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">إعادة طلب</Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="سجل المخزون" description="كل حركة قابلة للتتبع" className="mt-4">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">المنتج</th>
                <th className="text-left font-medium py-2.5">الفئة</th>
                <th className="text-right font-medium py-2.5">المتاح</th>
                <th className="text-right font-medium py-2.5">حد إعادة الطلب</th>
                <th className="text-right font-medium py-2.5">القيمة</th>
                <th className="text-left font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.category}</td>
                  <td className="py-3 text-right">{p.stock}</td>
                  <td className="py-3 text-right text-muted-foreground">{p.reorder}</td>
                  <td className="py-3 text-right font-medium">{currency(p.stock * p.cost)}</td>
                  <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
