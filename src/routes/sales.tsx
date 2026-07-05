import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill, KpiCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { sales, currency } from "@/lib/mock-data";
import { Receipt, RotateCcw, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/sales")({ component: SalesPage });

function SalesPage() {
  const total = sales.reduce((s, x) => s + x.total, 0);
  const refunded = sales.filter((s) => s.status === "Refunded").length;
  return (
    <AppShell
      title="Sales"
      subtitle="Every transaction, every terminal"
      actions={
        <>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1.5" />Filter</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" />Export</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="Transactions today" value={sales.length.toString()} delta="Across 3 branches" icon={Receipt} tone="brand" />
        <KpiCard label="Gross revenue" value={currency(total)} delta="Live" icon={Receipt} tone="success" />
        <KpiCard label="Refunds" value={refunded.toString()} delta="0.8% rate" icon={RotateCcw} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="Transaction log">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Txn</th>
                <th className="text-left font-medium py-2.5">Cashier</th>
                <th className="text-left font-medium py-2.5">Branch</th>
                <th className="text-right font-medium py-2.5">Items</th>
                <th className="text-right font-medium py-2.5">Total</th>
                <th className="text-left font-medium py-2.5">Payment</th>
                <th className="text-left font-medium py-2.5">Time</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                  <td className="py-3 font-medium">{s.cashier}</td>
                  <td className="py-3 text-muted-foreground">{s.branch}</td>
                  <td className="py-3 text-right">{s.items}</td>
                  <td className="py-3 text-right font-semibold">{currency(s.total)}</td>
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
