import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { activity } from "@/lib/mock-data";
import { ShoppingCart, Receipt, AlertTriangle, Wallet, Package, User } from "lucide-react";

export const Route = createFileRoute("/activity")({ component: ActivityPage });

const icons: Record<string, any> = {
  purchase: ShoppingCart, sale: Receipt, alert: AlertTriangle,
  cash: Wallet, inventory: Package, user: User,
};

const typeLabel: Record<string, string> = {
  purchase: "مشتريات", sale: "مبيعات", alert: "تنبيه",
  cash: "نقدية", inventory: "مخزون", user: "مستخدم",
};

function ActivityPage() {
  return (
    <AppShell title="سجل النشاط" subtitle="سجل تدقيق دائم عبر المنصة">
      <SectionCard>
        <ul className="space-y-1">
          {[...activity, ...activity].map((a, i) => {
            const Icon = icons[a.type] ?? Receipt;
            return (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/40">
                <div className="w-9 h-9 rounded-lg bg-brand-soft grid place-items-center text-brand shrink-0"><Icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{a.action}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.user} · {a.time}</div>
                </div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{typeLabel[a.type] ?? a.type}</div>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </AppShell>
  );
}
