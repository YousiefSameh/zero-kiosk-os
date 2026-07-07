import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { suppliers, num } from "@/lib/mock-data";
import { Plus, Star, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/suppliers")({ component: SuppliersPage });

function SuppliersPage() {
  return (
    <AppShell
      title="الموردون"
      subtitle="إدارة العلاقات وشروط التعامل"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />مورد جديد</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {suppliers.map((s) => (
          <div key={s.id} className="card-elevated p-5 hover:shadow-elevated transition">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center text-brand font-display font-semibold">
                {s.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold truncate">{s.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{s.id}</div>
              </div>
              <div className="flex items-center gap-1 text-xs bg-warning/15 text-warning px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-current" />{s.rating}
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />{s.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />{s.contact}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wide">الشروط</div>
                <div className="text-sm font-medium">{s.terms}</div>
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wide">أوامر مفتوحة</div>
                <div className="text-sm font-medium">{num(s.openPOs)}</div>
              </div>
              <Button size="sm" variant="outline" className="h-8">عرض</Button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
