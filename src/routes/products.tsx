import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { useDataState, ListSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, num, money2, qty, unitPrice, isWeighted, type Product } from "@/lib/mock-data";
import { WeightBadge, ProductDetailsDialog, ProductFormDialog } from "@/components/weighing";
import { Plus, Search, Filter, Download, Package } from "lucide-react";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const [q, setQ] = useState("");
  const [details, setDetails] = useState<Product | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const ds = useDataState();
  const [cat, setCat] = useState("الكل");
  const cats = ["الكل", ...Array.from(new Set(products.map((p) => p.category)))];
  const allRows = products.filter(
    (p) =>
      (cat === "الكل" || p.category === cat) &&
      (p.name.includes(q) || p.id.toLowerCase().includes(q.toLowerCase()))
  );
  const rows = ds.rows(allRows);

  return (
    <AppShell
      title="المنتجات"
      subtitle={`${num(products.length)} صنف في ٤ فروع`}
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 ms-1.5" />تصدير CSV</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={() => { setEditing(null); setFormOpen(true); }}><Plus className="w-4 h-4 ms-1.5" />إضافة منتج</Button>
        </>
      }
    >
      <SectionCard>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن منتج أو كود صنف…" className="pr-9 rounded-lg" />
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
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 ms-1.5" />فلاتر</Button>
        </div>

        {ds.isLoading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={Package}
            title={ds.isEmpty ? "لا توجد منتجات بعد" : "لا توجد منتجات مطابقة"}
            description={ds.isEmpty ? "كتالوجك فارغ حاليًا. أضف أول منتج أو استورد ملف CSV، وستبدأ الأسعار والمخزون والتقارير في الظهور تلقائيًا." : "لم نعثر على أي منتج يطابق بحثك أو الفلاتر الحالية. جرّب كلمة مختلفة، أو أضف المنتج الآن وابدأ البيع فورًا."}
            primary={{ label: "إضافة منتج" }}
            secondary={{ label: "مسح البحث", onClick: () => { setQ(""); setCat("الكل"); } }}
          />
        ) : (
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-right font-medium px-5 py-2.5">المنتج</th>
                  <th className="text-right font-medium py-2.5">كود الصنف</th>
                  <th className="text-right font-medium py-2.5">التصنيف</th>
                  <th className="text-right font-medium py-2.5">المورد</th>
                  <th className="text-left font-medium py-2.5">التكلفة</th>
                  <th className="text-left font-medium py-2.5">السعر</th>
                  <th className="text-left font-medium py-2.5">المخزون</th>
                  <th className="text-right font-medium px-5 py-2.5">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} onClick={() => setDetails(p)} className="border-b border-border/60 hover:bg-accent/40 cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-muted grid place-items-center text-xs font-medium">{p.name.slice(0, 2)}</div>
                        <span className="font-medium">{p.name}</span>
                        {isWeighted(p) && <WeightBadge />}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="py-3">{p.category}</td>
                    <td className="py-3 text-muted-foreground">{p.supplier}</td>
                    <td className="py-3 text-left text-muted-foreground">{money2(p.cost)}</td>
                    <td className="py-3 text-left font-medium whitespace-nowrap">{unitPrice(p)}</td>
                    <td className="py-3 text-left whitespace-nowrap">{qty(p, p.stock)}</td>
                    <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
      <ProductDetailsDialog product={details} onClose={() => setDetails(null)} onEdit={(p) => { setDetails(null); setEditing(p); setFormOpen(true); }} />
      <ProductFormDialog open={formOpen} onOpenChange={setFormOpen} initial={editing} />
    </AppShell>
  );
}
