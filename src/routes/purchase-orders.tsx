import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill, KpiCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { purchaseOrders, currency } from "@/lib/mock-data";
import { Plus, ShoppingCart, Clock, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/purchase-orders")({ component: POPage });

function POPage() {
  const totals = {
    pending: purchaseOrders.filter((p) => p.status === "Pending").length,
    approved: purchaseOrders.filter((p) => p.status === "Approved").length,
    delivered: purchaseOrders.filter((p) => p.status === "Delivered").length,
    cancelled: purchaseOrders.filter((p) => p.status === "Cancelled").length,
  };
  const totalValue = purchaseOrders.filter((p) => p.status !== "Cancelled").reduce((s, p) => s + p.total, 0);

  return (
    <AppShell
      title="Purchase Orders"
      subtitle="Track every order from creation to receiving"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />New PO</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Open orders" value={String(totals.pending + totals.approved)} delta={currency(totalValue)} icon={ShoppingCart} tone="brand" />
        <KpiCard label="Pending approval" value={totals.pending.toString()} delta="Requires manager review" icon={Clock} tone="warning" />
        <KpiCard label="Delivered" value={totals.delivered.toString()} delta="This month" icon={CheckCircle2} tone="success" />
        <KpiCard label="Cancelled" value={totals.cancelled.toString()} delta="Trend stable" icon={XCircle} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="All purchase orders">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Order</th>
                <th className="text-left font-medium py-2.5">Supplier</th>
                <th className="text-left font-medium py-2.5">Branch</th>
                <th className="text-right font-medium py-2.5">Items</th>
                <th className="text-right font-medium py-2.5">Total</th>
                <th className="text-left font-medium py-2.5">Created</th>
                <th className="text-left font-medium py-2.5">ETA</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
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
