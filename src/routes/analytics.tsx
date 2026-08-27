import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { salesTrend, categoryMix, num } from "@/lib/mock-data";
import { TrendingUp, ShoppingBag, Users, Percent, Download, BarChart3, LineChart as LineChartIcon, PieChart } from "lucide-react";
import { useDataState, KpiSkeleton, ChartSkeleton } from "@/lib/demo-state";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Bar, BarChart } from "recharts";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

const hourly = Array.from({ length: 12 }, (_, i) => ({
  hour: `${num(8 + i)}:٠٠`,
  txn: Math.round(20 + Math.sin(i / 2) * 15 + Math.random() * 12),
}));

function AnalyticsPage() {
  const ds = useDataState();

  return (
    <AppShell
      title="التحليلات"
      subtitle="ذكاء تشغيلي معمّق"
      actions={<Button variant="outline" size="sm" disabled={ds.isEmpty || ds.isLoading}><Download className="w-4 h-4 ms-1.5" />تصدير</Button>}
    >
      {ds.isLoading ? (
        <>
          <KpiSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="اتجاه الإيرادات" description="جارٍ تحميل آخر ٧ أيام…"><ChartSkeleton height={256} /></SectionCard>
            <SectionCard title="الحركة خلال اليوم" description="جارٍ تحميل المعاملات…"><ChartSkeleton height={256} /></SectionCard>
            <SectionCard className="lg:col-span-2" title="أداء التصنيفات" description="جارٍ حساب الحصص…"><ChartSkeleton height={256} /></SectionCard>
          </div>
        </>
      ) : ds.isEmpty ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="النمو الشهري" value="—" delta="بحاجة إلى شهر بيانات على الأقل" icon={TrendingUp} tone="success" />
            <KpiCard label="حجم الفاتورة" value="—" delta="لا توجد فواتير بعد" icon={ShoppingBag} tone="brand" />
            <KpiCard label="العملاء المتكررون" value="—" delta="فعّل برنامج الولاء للقياس" icon={Users} tone="coral" />
            <KpiCard label="هامش الربح" value="—" delta="أدخل أسعار التكلفة للحساب" icon={Percent} tone="warning" />
          </div>
          <div className="card-elevated mt-4">
            <EmptyState
              icon={BarChart3}
              title="لا توجد بيانات كافية لبناء التحليلات"
              description="تعتمد التحليلات على حركة مبيعات فعلية. بعد أول أسبوع تشغيل ستحصل على اتجاه الإيرادات، وساعات الذروة، وأداء التصنيفات، وهوامش الربح لكل صنف."
              primary={{ label: "تسجيل أول عملية بيع", icon: ShoppingBag }}
              secondary={{ label: "استيراد بيانات سابقة" }}
              hint="التحليلات تُحدَّث تلقائيًا كل ١٥ دقيقة"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="الحركة خلال اليوم" description="عدد المعاملات في الساعة">
              <EmptyState
                compact
                icon={LineChartIcon}
                title="لا توجد معاملات اليوم"
                description="سيظهر هنا منحنى ساعات الذروة لمساعدتك على توزيع الورديات بدقة."
                primary={{ label: "فتح نقطة البيع", icon: ShoppingBag }}
                secondary={{ label: "تغيير الفترة" }}
              />
            </SectionCard>
            <SectionCard title="أداء التصنيفات" description="حصة الإيرادات حسب التصنيف">
              <EmptyState
                compact
                icon={PieChart}
                title="لا توجد تصنيفات مُفعّلة"
                description="نظّم منتجاتك في تصنيفات لتعرف أي قسم يحقق أعلى ربح."
                primary={{ label: "إضافة تصنيف" }}
                secondary={{ label: "استيراد كتالوج" }}
              />
            </SectionCard>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="النمو الشهري" value="+٢٢٫٤٪" delta="مقارنة بالشهر الماضي" icon={TrendingUp} tone="success" />
            <KpiCard label="حجم الفاتورة" value="٦٫٨ صنف" delta="+٠٫٤ عن الأسبوع الماضي" icon={ShoppingBag} tone="brand" />
            <KpiCard label="العملاء المتكررون" value="٤١٪" delta="أثر برنامج الولاء" icon={Users} tone="coral" />
            <KpiCard label="هامش الربح" value="٣٢٫٦٪" delta="مستقر" icon={Percent} tone="warning" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="اتجاه الإيرادات" description="آخر ٧ أيام">
              <div className="h-64">
                <ResponsiveContainer><AreaChart data={salesTrend}>
                  <defs><linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#006D60" stopOpacity={0.3} /><stop offset="100%" stopColor="#006D60" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                  <XAxis dataKey="day" reversed tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${num(v / 1000)} ألف`} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="sales" stroke="#006D60" strokeWidth={2.5} fill="url(#a1)" />
                </AreaChart></ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="الحركة خلال اليوم" description="عدد المعاملات في الساعة">
              <div className="h-64">
                <ResponsiveContainer><LineChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                  <XAxis dataKey="hour" reversed tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="txn" stroke="#E07B69" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart></ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard className="lg:col-span-2" title="أداء التصنيفات" description="حصة الإيرادات حسب التصنيف">
              <div className="h-64">
                <ResponsiveContainer><BarChart data={categoryMix}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                  <XAxis dataKey="name" reversed tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="value" fill="#006D60" radius={[8, 8, 0, 0]} />
                </BarChart></ResponsiveContainer>
              </div>
            </SectionCard>
          </div>
        </>
      )}
    </AppShell>
  );
}
