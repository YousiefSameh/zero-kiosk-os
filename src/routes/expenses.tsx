import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { expenses, currency } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/expenses")({ component: ExpensesPage });

function ExpensesPage() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <AppShell
      title="المصروفات"
      subtitle={`${expenses.length} قيد · ${currency(total)} هذا الشهر`}
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ml-1.5" />مصروف جديد</Button>}
    >
      <SectionCard>
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">المرجع</th>
                <th className="text-left font-medium py-2.5">الفئة</th>
                <th className="text-left font-medium py-2.5">المورّد</th>
                <th className="text-left font-medium py-2.5">الفرع</th>
                <th className="text-left font-medium py-2.5">التاريخ</th>
                <th className="text-right font-medium py-2.5">المبلغ</th>
                <th className="text-left font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{e.id}</td>
                  <td className="py-3 font-medium">{e.category}</td>
                  <td className="py-3 text-muted-foreground">{e.vendor}</td>
                  <td className="py-3 text-muted-foreground">{e.branch}</td>
                  <td className="py-3 text-muted-foreground">{e.date}</td>
                  <td className="py-3 text-right font-semibold">{currency(e.amount)}</td>
                  <td className="px-5 py-3"><StatusPill status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
