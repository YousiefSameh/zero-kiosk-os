import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { branches, currency } from "@/lib/mock-data";
import { Plus, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/branches")({ component: BranchesPage });

function BranchesPage() {
  return (
    <AppShell
      title="Branches"
      subtitle="Operational footprint"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />New branch</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {branches.map((b) => (
          <div key={b.id} className="card-elevated overflow-hidden hover:shadow-elevated transition">
            <div className="h-24 bg-gradient-to-br from-brand to-brand/70 relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%)" }} />
              <div className="absolute bottom-3 left-4 text-brand-foreground">
                <div className="font-display font-semibold text-lg">{b.name}</div>
                <div className="text-xs opacity-90 flex items-center gap-1"><MapPin className="w-3 h-3" />{b.city}</div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Revenue (30d)</div>
                  <div className="font-display font-semibold text-lg">{currency(b.revenue)}</div>
                </div>
                <StatusPill status={b.status} />
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />{b.staff} staff
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
