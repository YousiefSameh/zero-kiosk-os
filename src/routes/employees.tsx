import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { employees } from "@/lib/mock-data";
import { Plus, UserCog, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/employees")({ component: EmployeesPage });

function EmployeesPage() {
  const [q, setQ] = useState("");
  const rows = employees.filter((e) => e.name.includes(q) || e.role.includes(q) || e.branch.includes(q));
  return (
    <AppShell
      title="الموظفون"
      subtitle={`${employees.length} عضو في الفريق موزّعون على ٤ فروع`}
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />دعوة موظف</Button>}
    >
      <SectionCard>
        <div className="relative mb-4 md:max-w-sm">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث بالاسم أو الوظيفة أو الفرع…" className="pr-9 rounded-lg" />
        </div>
        {rows.length === 0 ? (
          <EmptyState
            icon={UserCog}
            title="لا يوجد موظفون مطابقون"
            description="لا توجد نتائج لهذا البحث. ادعُ أعضاء فريقك وحدد صلاحياتهم لتبدأ تتبع الأداء عبر الفروع."
            primary={{ label: "دعوة موظف" }}
            secondary={{ label: "مسح البحث", onClick: () => setQ("") }}
          />
        ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-right font-medium px-5 py-2.5">الموظف</th>
                <th className="text-right font-medium py-2.5">الوظيفة</th>
                <th className="text-right font-medium py-2.5">الفرع</th>
                <th className="text-right font-medium py-2.5">الوردية</th>
                <th className="text-right font-medium px-5 py-2.5">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
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
