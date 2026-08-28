import { createFileRoute } from "@tanstack/react-router";
import { AppShell, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ChevronLeft } from "lucide-react";
import { useDataState, CardsSkeleton } from "@/lib/demo-state";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

const reportList = [
  { id: 1, name: "ملخص المبيعات اليومي", desc: "الإيرادات والمعاملات وطرق الدفع لكل فرع", cadence: "يومي", last: "اليوم، ٠٨:٠٠" },
  { id: 2, name: "التقرير التشغيلي الأسبوعي", desc: "المبيعات والمخزون والنقدية والمشتريات", cadence: "أسبوعي", last: "٣٠ يونيو، ٠٩:٠٠" },
  { id: 3, name: "تسوية النقدية", desc: "فتح وإغلاق الأدراج والفروق", cadence: "يومي", last: "أمس، ٢٣:١٥" },
  { id: 4, name: "فروقات المخزون", desc: "الجرد الفعلي مقابل السجل", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 5, name: "تقييم الموردين", desc: "الالتزام بالتسليم واستقرار الأسعار ونسبة العيوب", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 6, name: "الضرائب والإيصالات", desc: "ملخص التقديم إلى مصلحة الضرائب المصرية", cadence: "شهري", last: "٣٠ يونيو" },
  { id: 7, name: "تقرير الفاقد", desc: "الإلغاءات والمرتجعات والتعديلات", cadence: "أسبوعي", last: "٣٠ يونيو" },
  { id: 8, name: "أداء الموظفين", desc: "المعاملات لكل كاشير ومتوسط الفاتورة", cadence: "أسبوعي", last: "٣٠ يونيو" },
];

function ReportsPage() {
  const ds = useDataState();
  const rows = ds.rows(reportList);

  return (
    <AppShell
      title="التقارير"
      subtitle="تقارير تشغيلية مجدولة وعند الطلب"
      actions={<Button size="sm" className="bg-brand hover:bg-brand/90"><FileText className="w-4 h-4 ms-1.5" />تقرير جديد</Button>}
    >
      {ds.isLoading ? (
        <CardsSkeleton count={6} />
      ) : rows.length === 0 ? (
        <div className="card-elevated">
          <EmptyState
            icon={FileText}
            title="لم تُنشئ أي تقرير بعد"
            description="أنشئ تقريرًا مجدولًا يصلك تلقائيًا على البريد أو واتساب — ملخص مبيعات يومي، تسوية نقدية، فروقات مخزون، أو تقرير ضرائب جاهز للتقديم."
            primary={{ label: "إنشاء تقرير", icon: FileText }}
            secondary={{ label: "تصفح القوالب الجاهزة" }}
            hint="لدينا ٨ قوالب معتمدة لسوبرماركت متعدد الفروع"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((r) => (
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
      )}
    </AppShell>
  );
}
