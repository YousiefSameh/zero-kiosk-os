import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

const reports = [
  { id: 1, name: "Daily sales summary", desc: "Revenue, transactions, method mix by branch", cadence: "Daily", last: "Today, 08:00" },
  { id: 2, name: "Weekly operations", desc: "Sales, inventory, cash, purchasing", cadence: "Weekly", last: "Jun 30, 09:00" },
  { id: 3, name: "Cash reconciliation", desc: "Drawer opens, closes, variances", cadence: "Daily", last: "Yesterday, 23:15" },
  { id: 4, name: "Inventory variance", desc: "Physical count vs ledger", cadence: "Monthly", last: "Jun 30" },
  { id: 5, name: "Supplier scorecard", desc: "On-time delivery, price stability, defect rate", cadence: "Monthly", last: "Jun 30" },
  { id: 6, name: "Tax & receipts", desc: "Egyptian tax authority submission summary", cadence: "Monthly", last: "Jun 30" },
  { id: 7, name: "Shrinkage report", desc: "Voids, refunds, adjustments audit", cadence: "Weekly", last: "Jun 30" },
  { id: 8, name: "Employee performance", desc: "Transactions per cashier, avg basket", cadence: "Weekly", last: "Jun 30" },
];

function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="Scheduled and on-demand operational reports"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><FileText className="w-4 h-4 mr-1.5" />New report</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.id} className="card-elevated p-5 hover:shadow-elevated transition group cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand-soft grid place-items-center text-brand">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{r.cadence}</span>
                  <span>· Last run {r.last}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="w-8 h-8"><Download className="w-4 h-4" /></Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
