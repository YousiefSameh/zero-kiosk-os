import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

const reports = [
  { id: 1, name: "ملخص المبيعات اليومي", desc: "الإيرادات، المعاملات، توزيع طرق الدفع حسب الفرع", cadence: "يومي", last: "اليوم، ٠٨:٠٠" },
  { id: 2, name: "العمليات الأسبوعية", desc: "المبيعات والمخزون والنقدية والمشتريات", cadence: "أسبوعي", last: "٣٠ يونيو، ٠٩:٠٠" },
  { id: 3, name: "تسوية النقدية", desc: "فتح وإغلاق الأدراج والفروقات", cadence: "يومي", last: "أمس، ٢٣:١٥" },
  { id: 4, name: "فرق الجرد", desc: "الجرد الفعلي مقابل السجل", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 5, name: "بطاقة أداء الموردين", desc: "الالتزام بالمواعيد، ثبات الأسعار، نسبة العيوب", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 6, name: "الضرائب والفواتير", desc: "ملخص التقديم لمصلحة الضرائب المصرية", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 7, name: "تقرير الفاقد", desc: "الإلغاءات والمرتجعات وتعديلات التدقيق", cadence: "أسبوعي", last: "٣٠ يونيو" },
  { id: 8, name: "أداء الموظفين", desc: "معاملات كل كاشير، متوسط السلة", cadence: "أسبوعي", last: "٣٠ يونيو" },
];

function ReportsPage() {
  return (
    <AppShell
      title="التقارير"
      subtitle="تقارير تشغيلية مجدولة وعند الطلب"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><FileText className="w-4 h-4 ml-1.5" />تقرير جديد</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.id} className="card-elevated p-5 hover:shadow-elevated transition group cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand-soft grid place-items-center text-brand">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{r.cadence}</span>
                  <span>· آخر تشغيل {r.last}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="w-8 h-8"><Download className="w-4 h-4" /></Button>
                <ChevronLeft className="w-4 h-4 text-muted-foreground mt-2 group-hover:-translate-x-0.5 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
