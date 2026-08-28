import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/mock-data";
import { Plus, Shield, Check, KeyRound } from "lucide-react";
import { useDataState, CardsSkeleton, ListSkeleton } from "@/lib/demo-state";

export const Route = createFileRoute("/roles")({ component: RolesPage });

const permissions = [
  { name: "عرض لوحة التحكم", owner: true, manager: true, shift: true, cashier: true, clerk: true, accountant: true },
  { name: "معالجة المبيعات", owner: true, manager: true, shift: true, cashier: true, clerk: false, accountant: false },
  { name: "اعتماد الاسترجاعات", owner: true, manager: true, shift: true, cashier: false, clerk: false, accountant: false },
  { name: "إدارة المخزون", owner: true, manager: true, shift: false, cashier: false, clerk: true, accountant: false },
  { name: "إنشاء أوامر الشراء", owner: true, manager: true, shift: false, cashier: false, clerk: true, accountant: false },
  { name: "عرض المالية", owner: true, manager: true, shift: false, cashier: false, clerk: false, accountant: true },
  { name: "إدارة الموظفين", owner: true, manager: true, shift: false, cashier: false, clerk: false, accountant: false },
  { name: "ضبط الإعدادات", owner: true, manager: false, shift: false, cashier: false, clerk: false, accountant: false },
];

function RolesPage() {
  const ds = useDataState();
  const roleRows = ds.rows(roles);
  const permRows = ds.rows(permissions);

  return (
    <AppShell
      title="الأدوار والصلاحيات"
      subtitle="تحكم دقيق في صلاحيات الوصول"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />دور جديد</Button>}
    >
      {ds.isLoading ? (
        <>
          <CardsSkeleton count={6} cols="md:grid-cols-2 xl:grid-cols-3" />
          <SectionCard className="mt-4" title="مصفوفة الصلاحيات" description="جارٍ تحميل الصلاحيات…">
            <ListSkeleton rows={8} cols={6} />
          </SectionCard>
        </>
      ) : roleRows.length === 0 ? (
        <>
          <div className="card-elevated">
            <EmptyState
              icon={Shield}
              title="لم تُعرَّف أي أدوار بعد"
              description="الأدوار هي أساس الأمان في زيرو كشك: حدّد ما يستطيع كل شخص رؤيته وفعله — الكاشير يبيع فقط، أمين المخزون يستلم البضاعة، والمحاسب يرى المالية دون لمس الأسعار."
              primary={{ label: "إنشاء دور جديد" }}
              secondary={{ label: "استخدام الأدوار المقترحة" }}
              hint="نوصي بالبدء من ٦ أدوار جاهزة مناسبة للسوبرماركت"
            />
          </div>
          <SectionCard className="mt-4" title="مصفوفة الصلاحيات">
            <EmptyState
              compact
              icon={KeyRound}
              title="لا توجد صلاحيات لعرضها"
              description="بعد إنشاء أول دور ستظهر هنا مصفوفة كاملة تتيح ضبط كل صلاحية بنقرة واحدة."
              primary={{ label: "إنشاء دور" }}
              secondary={{ label: "دليل الصلاحيات" }}
            />
          </SectionCard>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {roleRows.map((r) => (
              <div key={r.id} className="card-elevated p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-soft grid place-items-center text-brand"><Shield className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="font-display font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.members} عضو</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{r.description}</p>
              </div>
            ))}
          </div>

          <SectionCard className="mt-4" title="مصفوفة الصلاحيات">
            <div className="overflow-x-auto -mx-5">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="text-right font-medium px-5 py-2.5">الصلاحية</th>
                    <th className="text-center font-medium py-2.5">المالك</th>
                    <th className="text-center font-medium py-2.5">مدير الفرع</th>
                    <th className="text-center font-medium py-2.5">مدير الوردية</th>
                    <th className="text-center font-medium py-2.5">الكاشير</th>
                    <th className="text-center font-medium py-2.5">أمين المخزون</th>
                    <th className="text-center font-medium px-5 py-2.5">المحاسب</th>
                  </tr>
                </thead>
                <tbody>
                  {permRows.map((p) => (
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
        </>
      )}
    </AppShell>
  );
}
