import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/mock-data";
import { Plus, Shield, Check } from "lucide-react";

export const Route = createFileRoute("/roles")({ component: RolesPage });

const permissions = [
  { name: "View dashboard", owner: true, manager: true, shift: true, cashier: true, clerk: true, accountant: true },
  { name: "Process sales", owner: true, manager: true, shift: true, cashier: true, clerk: false, accountant: false },
  { name: "Approve refunds", owner: true, manager: true, shift: true, cashier: false, clerk: false, accountant: false },
  { name: "Manage inventory", owner: true, manager: true, shift: false, cashier: false, clerk: true, accountant: false },
  { name: "Create purchase orders", owner: true, manager: true, shift: false, cashier: false, clerk: true, accountant: false },
  { name: "View finance", owner: true, manager: true, shift: false, cashier: false, clerk: false, accountant: true },
  { name: "Manage employees", owner: true, manager: true, shift: false, cashier: false, clerk: false, accountant: false },
  { name: "Configure settings", owner: true, manager: false, shift: false, cashier: false, clerk: false, accountant: false },
];

function RolesPage() {
  return (
    <AppShell
      title="Roles & Permissions"
      subtitle="Fine-grained access control"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />New role</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div key={r.id} className="card-elevated p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-soft grid place-items-center text-brand"><Shield className="w-5 h-5" /></div>
              <div className="flex-1">
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.members} members</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{r.description}</p>
          </div>
        ))}
      </div>

      <SectionCard className="mt-4" title="Permissions matrix">
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Permission</th>
                <th className="text-center font-medium py-2.5">Owner</th>
                <th className="text-center font-medium py-2.5">Branch Manager</th>
                <th className="text-center font-medium py-2.5">Shift Manager</th>
                <th className="text-center font-medium py-2.5">Cashier</th>
                <th className="text-center font-medium py-2.5">Clerk</th>
                <th className="text-center font-medium px-5 py-2.5">Accountant</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p) => (
                <tr key={p.name} className="border-b border-border/60">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  {[p.owner, p.manager, p.shift, p.cashier, p.clerk, p.accountant].map((v, i) => (
                    <td key={i} className="py-3 text-center">
                      {v ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
