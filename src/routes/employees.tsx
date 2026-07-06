import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, StatusPill } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/employees")({ component: EmployeesPage });

function EmployeesPage() {
  return (
    <AppShell
      title="Employees"
      subtitle={`${employees.length} team members across 4 branches`}
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 mr-1.5" />Invite employee</Button>}
    >
      <SectionCard>
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium px-5 py-2.5">Employee</th>
                <th className="text-left font-medium py-2.5">Role</th>
                <th className="text-left font-medium py-2.5">Branch</th>
                <th className="text-left font-medium py-2.5">Shift</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9"><AvatarFallback className="bg-brand-soft text-brand text-xs">{e.name.split(" ").map((x) => x[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium">{e.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{e.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{e.role}</td>
                  <td className="py-3 text-muted-foreground">{e.branch}</td>
                  <td className="py-3">{e.shift}</td>
                  <td className="px-5 py-3"><StatusPill status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AppShell>
  );
}
