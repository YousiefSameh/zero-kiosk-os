import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Tenant, tax, and platform configuration">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-2" title="Organization" description="Legal entity used for tax and receipts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Business name</Label><Input defaultValue="Zero Kiosk Retail LLC" className="mt-1.5" /></div>
            <div><Label>Trade name</Label><Input defaultValue="Zero Kiosk (زيرو كشك)" className="mt-1.5" /></div>
            <div><Label>Tax ID</Label><Input defaultValue="123-456-789" className="mt-1.5" /></div>
            <div><Label>Country</Label><Input defaultValue="Egypt" className="mt-1.5" /></div>
            <div><Label>Base currency</Label><Input defaultValue="EGP — Egyptian Pound" className="mt-1.5" /></div>
            <div><Label>VAT rate</Label><Input defaultValue="14%" className="mt-1.5" /></div>
          </div>
        </SectionCard>

        <SectionCard title="Platform">
          <div className="space-y-4">
            {[
              { label: "Egyptian tax authority submission", desc: "Real-time e-invoicing", on: true },
              { label: "Offline resilience mode", desc: "Buffer transactions when offline", on: true },
              { label: "Manager approval for refunds", desc: "Require PIN on refunds > EGP 500", on: true },
              { label: "Auto low-stock reordering", desc: "Draft POs when reorder point hit", on: false },
              { label: "Loyalty program", desc: "Points, tiers, and rewards", on: true },
            ].map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
                <Switch defaultChecked={s.on} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="Billing" description="Zero Kiosk Pro · 4 branches · 42 seats">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xl font-semibold">EGP 4,800 <span className="text-sm text-muted-foreground font-normal">/ month</span></div>
            <div className="text-xs text-muted-foreground mt-1">Next invoice: Aug 1, 2026 · Payment via CIB •••• 4421</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">View invoices</Button>
            <Button className="bg-brand hover:bg-brand/90">Manage plan</Button>
          </div>
        </div>
      </SectionCard>
    </AppShell>
  );
}
