import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, KpiCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { customers, currency } from "@/lib/mock-data";
import { Plus, Users, Crown, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/customers")({ component: CustomersPage });

function CustomersPage() {
  const totalSpend = customers.reduce((s, c) => s + c.spend, 0);
  return (
    <AppShell
      title="Customers"
      subtitle="Loyalty members and repeat shoppers"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />Add customer</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="Total customers" value={customers.length.toString()} delta="+12 this week" icon={Users} tone="brand" />
        <KpiCard label="Lifetime value" value={currency(totalSpend)} delta="Avg per customer 11,987" icon={TrendingUp} tone="success" />
        <KpiCard label="Loyalty members" value="3" delta="Gold + Platinum" icon={Crown} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="All customers">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Customer</th>
                <th className="text-left font-medium py-2.5">Phone</th>
                <th className="text-right font-medium py-2.5">Visits</th>
                <th className="text-right font-medium py-2.5">Lifetime spend</th>
                <th className="text-left font-medium py-2.5">Loyalty</th>
                <th className="text-left font-medium px-5 py-2.5">Last visit</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8"><AvatarFallback className="bg-brand-soft text-brand text-xs">{c.name.split(" ").map((x) => x[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.phone}</td>
                  <td className="py-3 text-right">{c.visits}</td>
                  <td className="py-3 text-right font-medium">{currency(c.spend)}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      c.loyalty === "Platinum" ? "bg-brand text-brand-foreground" :
                      c.loyalty === "Gold" ? "bg-warning/20 text-warning" :
                      c.loyalty === "Silver" ? "bg-muted text-foreground" :
                      "bg-accent text-accent-foreground"
                    }`}>{c.loyalty}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
