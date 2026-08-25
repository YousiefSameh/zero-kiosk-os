import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { activity } from "@/lib/mock-data";
import { ShoppingCart, Receipt, AlertTriangle, Wallet, Package, User, ScrollText, Search } from "lucide-react";

export const Route = createFileRoute("/activity")({ component: ActivityPage });

const icons: Record<string, any> = {
  purchase: ShoppingCart, sale: Receipt, alert: AlertTriangle,
  cash: Wallet, inventory: Package, user: User,
};

const typeLabels: Record<string, string> = {
  purchase: "شراء",
  sale: "بيع",
  alert: "تنبيه",
  cash: "نقدية",
  inventory: "مخزون",
  user: "مستخدم",
};

function ActivityPage() {
  const [q, setQ] = useState("");
  const rows = [...activity, ...activity].filter((a) => a.action.includes(q) || a.user.includes(q));
  return (
    <AppShell title="سجل النشاط" subtitle="سجل تدقيق غير قابل للتعديل عبر المنصة">
      <SectionCard>
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في سجل النشاط…" className="pr-9 rounded-lg" />
        </div>
        {rows.length === 0 ? (
          <EmptyState
            icon={ScrollText}
            title="لا يوجد نشاط مطابق"
            description="لم نعثر على أي حدث في سجل التدقيق يطابق بحثك. السجل يوثّق كل عملية تلقائيًا ولا يمكن تعديله."
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <ul className="space-y-1">
          {rows.map((a, i) => {
            const Icon = icons[a.type] ?? Receipt;
            return (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/40">
                <div className="w-9 h-9 rounded-lg bg-brand-soft grid place-items-center text-brand shrink-0"><Icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{a.action}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.user} · {a.time}</div>
                </div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{typeLabels[a.type] ?? a.type}</div>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </AppShell>
  );
}
