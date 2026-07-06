import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard, StatusPill } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { products, currency } from "@/lib/mock-data";
import { Boxes, AlertTriangle, TrendingDown, PackageCheck, Download } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const totalValue = products.reduce((s, p) => s + p.stock * p.cost, 0);
  const low = products.filter((p) => p.status !== "In Stock").length;
  const out = products.filter((p) => p.status === "Out of Stock").length;
  const skus = products.length;

  const perCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.stock * p.cost;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value) }));

  return (
    <AppShell
      title="Inventory"
      subtitle="Real-time stock ledger across all branches"
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" />Stock report</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90">Adjust stock</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Inventory value" value={currency(totalValue)} delta="At cost basis" icon={Boxes} tone="brand" />
        <KpiCard label="Total SKUs" value={skus.toString()} delta="Across 4 branches" icon={PackageCheck} tone="success" />
        <KpiCard label="Low stock" value={low.toString()} delta="Need reorder" icon={AlertTriangle} tone="warning" />
        <KpiCard label="Out of stock" value={out.toString()} delta="Lost sales risk" icon={TrendingDown} tone="coral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <SectionCard className="lg:col-span-2" title="Inventory value by category">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 190)", fontSize: 12 }} />
                <Bar dataKey="value" fill="oklch(0.48 0.08 185)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Reorder queue" description="Auto-suggested by ledger">
          <ul className="space-y-3">
            {products.filter((p) => p.status !== "In Stock").slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/40">
                <div className="w-9 h-9 rounded-lg bg-brand-soft grid place-items-center text-brand text-xs font-medium">{p.name.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.stock} on hand · reorder {p.reorder}</div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">Reorder</Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Stock ledger" description="Every movement is traceable" className="mt-4">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Product</th>
                <th className="text-left font-medium py-2.5">Category</th>
                <th className="text-right font-medium py-2.5">On hand</th>
                <th className="text-right font-medium py-2.5">Reorder point</th>
                <th className="text-right font-medium py-2.5">Value</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
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
