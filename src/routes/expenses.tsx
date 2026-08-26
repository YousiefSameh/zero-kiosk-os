import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { useDataState, ListSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { expenses, currency } from "@/lib/mock-data";
import { Plus, Wallet, Search } from "lucide-react";

export const Route = createFileRoute("/expenses")({ component: ExpensesPage });

function ExpensesPage() {
  const [q, setQ] = useState("");
  const ds = useDataState();
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const allRows = expenses.filter((e) => e.id.toLowerCase().includes(q.toLowerCase()) || e.category.includes(q) || e.vendor.includes(q));
  const rows = ds.rows(allRows);
  return (
    <AppShell
      title="المصروفات"
      subtitle={`${expenses.length} قيد · ${currency(total)} هذا الشهر`}
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />مصروف جديد</Button>}
    >
      <SectionCard>
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث بالمرجع أو التصنيف أو الجهة…" className="pr-9 rounded-lg" />
        </div>
        {ds.isLoading ? (
          <ListSkeleton />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title={ds.isEmpty ? "لا توجد مصروفات بعد" : "لا توجد مصروفات مطابقة"}
            description={ds.isEmpty ? "لم تُسجّل أي مصروف حتى الآن. سجّل مصروفاتك أولًا بأول للحصول على صافي ربح دقيق." : "لم نعثر على أي قيد مصروف يطابق بحثك. سجّل المصروفات فور حدوثها للحفاظ على دقة التقارير المالية."}
            primary={{ label: "مصروف جديد" }}
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-right font-medium px-5 py-2.5">المرجع</th>
                <th className="text-right font-medium py-2.5">التصنيف</th>
                <th className="text-right font-medium py-2.5">الجهة</th>
                <th className="text-right font-medium py-2.5">الفرع</th>
                <th className="text-right font-medium py-2.5">التاريخ</th>
                <th className="text-left font-medium py-2.5">المبلغ</th>
                <th className="text-right font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{e.id}</td>
                  <td className="py-3 font-medium">{e.category}</td>
                  <td className="py-3 text-muted-foreground">{e.vendor}</td>
                  <td className="py-3 text-muted-foreground">{e.branch}</td>
                  <td className="py-3 text-muted-foreground">{e.date}</td>
                  <td className="py-3 text-left font-semibold">{currency(e.amount)}</td>
                  <td className="px-5 py-3"><StatusPill status={e.status} /></td>
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
