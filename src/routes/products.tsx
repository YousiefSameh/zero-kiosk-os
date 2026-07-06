import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, currency } from "@/lib/mock-data";
import { Plus, Search, Filter, Download, Package } from "lucide-react";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const rows = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AppShell
      title="Products"
      subtitle={`${products.length} SKUs across 4 branches`}
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" />Export CSV</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />Add product</Button>
        </>
      }
    >
      <SectionCard>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products or SKU…" className="pl-9 rounded-lg" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition ${
                  cat === c ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1.5" />Filters</Button>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={Package} title="No products found" description="Try adjusting search or filters." />
        ) : (
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left font-medium px-5 py-2.5">Product</th>
                  <th className="text-left font-medium py-2.5">SKU</th>
                  <th className="text-left font-medium py-2.5">Category</th>
                  <th className="text-left font-medium py-2.5">Supplier</th>
                  <th className="text-right font-medium py-2.5">Cost</th>
                  <th className="text-right font-medium py-2.5">Price</th>
                  <th className="text-right font-medium py-2.5">Stock</th>
                  <th className="text-left font-medium px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 hover:bg-accent/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-muted grid place-items-center text-xs font-medium">{p.name.slice(0, 2)}</div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3 text-muted-foreground">{p.supplier}</td>
                    <td className="py-3 text-right text-muted-foreground">{currency(p.cost)}</td>
                    <td className="py-3 text-right font-medium">{currency(p.price)}</td>
                    <td className="py-3 text-right">{p.stock}</td>
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
