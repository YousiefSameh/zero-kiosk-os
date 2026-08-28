import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard, EmptyState } from "@/components/app-shell";
import { currency, num } from "@/lib/mock-data";
import { Wallet, TrendingUp, TrendingDown, Landmark, Banknote, ArrowLeftRight } from "lucide-react";
import { useDataState, KpiSkeleton, ChartSkeleton, RowsSkeleton } from "@/lib/demo-state";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/finance")({ component: FinancePage });

const cashflow = [
  { week: "الأسبوع ١", in: 320000, out: 210000 },
  { week: "الأسبوع ٢", in: 340000, out: 195000 },
  { week: "الأسبوع ٣", in: 380000, out: 240000 },
  { week: "الأسبوع ٤", in: 412000, out: 220000 },
];

function FinancePage() {
  const ds = useDataState();

  return (
    <AppShell title="المالية" subtitle="النقدية والإيرادات والتسوية">
      {ds.isLoading ? (
        <>
          <KpiSkeleton />
          <SectionCard className="mt-4" title="التدفق النقدي" description="جارٍ تحميل الحركة الأسبوعية…">
            <ChartSkeleton height={288} />
          </SectionCard>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="أدراج النقد" description="جارٍ قراءة الأجهزة…"><RowsSkeleton rows={4} /></SectionCard>
            <SectionCard title="أحدث المعاملات" description="جارٍ مزامنة البنك…"><RowsSkeleton rows={4} avatar={false} /></SectionCard>
          </div>
        </>
      ) : ds.isEmpty ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="الإيرادات هذا الشهر" value="—" delta="لا توجد إيرادات مسجلة" icon={TrendingUp} tone="success" />
            <KpiCard label="المصروفات هذا الشهر" value="—" delta="لم تُسجَّل مصروفات" icon={TrendingDown} tone="warning" />
            <KpiCard label="النقدية المتاحة" value="—" delta="افتح وردية لبدء التتبع" icon={Wallet} tone="brand" />
            <KpiCard label="رصيد البنك" value="—" delta="اربط حسابك البنكي" icon={Landmark} tone="coral" />
          </div>
          <div className="card-elevated mt-4">
            <EmptyState
              icon={Landmark}
              title="مركزك المالي فارغ حتى الآن"
              description="اربط حسابك البنكي وافتح أول وردية نقدية، وسيتولى زيرو كشك بناء التدفق النقدي، وتسوية الأدراج، ومطابقة تسويات البطاقات تلقائيًا."
              primary={{ label: "ربط حساب بنكي", icon: Landmark }}
              secondary={{ label: "فتح وردية نقدية" }}
              hint="التسوية اليومية تُنشأ آليًا في نهاية كل يوم عمل"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="أدراج النقد" description="فروق مباشرة عبر الأجهزة">
              <EmptyState
                compact
                icon={Banknote}
                title="لا توجد أدراج مفتوحة"
                description="عند فتح وردية على أي جهاز ستظهر هنا النقدية والفروق لحظيًا."
                primary={{ label: "فتح درج نقدي", icon: Banknote }}
                secondary={{ label: "إعداد الأجهزة" }}
              />
            </SectionCard>
            <SectionCard title="أحدث المعاملات" description="حركة البنك والمحفظة">
              <EmptyState
                compact
                icon={ArrowLeftRight}
                title="لا توجد حركات مالية"
                description="ستظهر هنا التسويات والتحويلات والإيداعات بمجرد ربط قنوات الدفع."
                primary={{ label: "ربط قناة دفع" }}
                secondary={{ label: "تسجيل حركة يدوية" }}
              />
            </SectionCard>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="الإيرادات هذا الشهر" value={currency(1452000)} delta="+١٨٪ عن الشهر الماضي" icon={TrendingUp} tone="success" />
            <KpiCard label="المصروفات هذا الشهر" value={currency(864000)} delta="ضمن الميزانية" icon={TrendingDown} tone="warning" />
            <KpiCard label="النقدية المتاحة" value={currency(184300)} delta="عبر ٤ أدراج" icon={Wallet} tone="brand" />
            <KpiCard label="رصيد البنك" value={currency(2418000)} delta="حساب CIB للأعمال" icon={Landmark} tone="coral" />
          </div>

          <SectionCard className="mt-4" title="التدفق النقدي" description="الداخل مقابل الخارج أسبوعيًا">
            <div className="h-72">
              <ResponsiveContainer><BarChart data={cashflow}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                <XAxis dataKey="week" reversed tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${num(v / 1000)} ألف`} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="in" fill="#006D60" radius={[8, 8, 0, 0]} name="الداخل" />
                <Bar dataKey="out" fill="#E07B69" radius={[8, 8, 0, 0]} name="الخارج" />
              </BarChart></ResponsiveContainer>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="أدراج النقد" description="فروق مباشرة عبر الأجهزة">
              <div className="space-y-3">
                {[
                  { branch: "فرع الزمالك الرئيسي", drawer: "٠٤", cash: 42800, var: -84 },
                  { branch: "فرع كورنيش المعادي", drawer: "٠١", cash: 38200, var: 0 },
                  { branch: "فرع شيراتون هليوبوليس", drawer: "٠٢", cash: 51600, var: 12 },
                  { branch: "فرع سموحة", drawer: "٠١", cash: 24100, var: 0 },
                ].map((d) => (
                  <div key={d.drawer + d.branch} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <div className="text-sm font-medium">{d.branch}</div>
                      <div className="text-xs text-muted-foreground">جهاز {d.drawer}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold">{currency(d.cash)}</div>
                      <div className={`text-xs ${d.var < 0 ? "text-destructive" : d.var > 0 ? "text-warning" : "text-success"}`}>
                        {d.var === 0 ? "متوازن" : `الفرق ${d.var > 0 ? "+" : ""}${currency(d.var)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="أحدث المعاملات" description="حركة البنك والمحفظة">
              <ul className="divide-y divide-border">
                {[
                  { desc: "تسوية بطاقات — CIB", amt: 128400, in: true, when: "اليوم" },
                  { desc: "تحويل — أمر شراء نستله PO-2041", amt: -48200, in: false, when: "اليوم" },
                  { desc: "إيداع نقدي — الزمالك", amt: 68000, in: true, when: "أمس" },
                  { desc: "إيجار — النيل العقارية", amt: -42000, in: false, when: "١ يوليو" },
                ].map((t, i) => (
                  <li key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{t.desc}</div>
                      <div className="text-xs text-muted-foreground">{t.when}</div>
                    </div>
                    <div className={`text-sm font-semibold ${t.in ? "text-success" : "text-foreground"}`}>
                      {t.in ? "+" : ""}{currency(t.amt)}
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </>
      )}
    </AppShell>
  );
}
