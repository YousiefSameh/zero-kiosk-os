import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";
import { Bell, BellOff, CheckCircle2, AlertTriangle, Info, Settings2 } from "lucide-react";
import { useDataState, RowsSkeleton } from "@/lib/demo-state";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

const icons = { success: CheckCircle2, warning: AlertTriangle, info: Info } as const;

function NotificationsPage() {
  const ds = useDataState();
  const rows = ds.rows(notifications);
  const unread = rows.filter((n) => n.unread).length;

  return (
    <AppShell
      title="الإشعارات"
      subtitle={ds.isLoading ? "جارٍ التحديث…" : `${unread} غير مقروء`}
      actions={<Button variant="outline" size="sm" disabled={unread === 0}>تعليم الكل كمقروء</Button>}
    >
      <SectionCard>
        {ds.isLoading ? (
          <RowsSkeleton rows={7} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="لا توجد إشعارات — كل شيء تحت السيطرة"
            description="سننبهك فورًا عند نفاد صنف، أو تأخر أمر شراء، أو فرق في تسوية الدرج، أو اكتمال النسخة الاحتياطية. لا ضجيج، تنبيهات تشغيلية فقط."
            primary={{ label: "ضبط تفضيلات التنبيه", icon: Settings2 }}
            secondary={{ label: "تحديث الآن" }}
            hint="يمكنك استلام التنبيهات المهمة على واتساب أيضًا"
          />
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((n) => {
              const Icon = icons[n.kind as keyof typeof icons] ?? Bell;
              const tone = n.kind === "warning" ? "bg-warning/15 text-warning" : n.kind === "success" ? "bg-success/10 text-success" : "bg-brand-soft text-brand";
              return (
                <li key={n.id} className={`py-4 flex items-start gap-3 ${n.unread ? "" : "opacity-70"}`}>
                  <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${tone}`}><Icon className="w-5 h-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{n.title}</div>
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-coral" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">{n.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>
    </AppShell>
  );
}
