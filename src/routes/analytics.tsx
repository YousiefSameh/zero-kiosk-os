import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { salesTrend, categoryMix } from "@/lib/mock-data";
import { TrendingUp, ShoppingBag, Users, Percent, Download } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Bar, BarChart } from "recharts";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

const hourly = Array.from({ length: 12 }, (_, i) => ({
  hour: `${8 + i}:00`,
  txn: Math.round(20 + Math.sin(i / 2) * 15 + Math.random() * 12),
}));

function AnalyticsPage() {
  return (
    <AppShell
      title="التحليلات"
      subtitle="ذكاء تشغيلي متعمّق"
      actions={<Button variant="outline" size="sm"><Download className="w-4 h-4 ml-1.5" />تصدير</Button>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="نمو شهري" value="+22.4٪" delta="مقارنة بالشهر الماضي" icon={TrendingUp} tone="success" />
        <KpiCard label="حجم السلة" value="٦٫٨ صنف" delta="+0.4 عن الأسبوع الماضي" icon={ShoppingBag} tone="brand" />
        <KpiCard label="العملاء المتكررون" value="41٪" delta="أثر الولاء" icon={Users} tone="coral" />
        <KpiCard label="هامش الربح الإجمالي" value="32.6٪" delta="مستقر" icon={Percent} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SectionCard title="اتجاه الإيرادات" description="آخر ٧ أيام">
          <div className="h-64">
            <ResponsiveContainer><AreaChart data={salesTrend}>
              <defs><linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#006D60" stopOpacity={0.3} /><stop offset="100%" stopColor="#006D60" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} orientation="right" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#006D60" strokeWidth={2.5} fill="url(#a1)" />
            </AreaChart></ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="حركة العملاء بالساعة" description="المعاملات في الساعة اليوم">
          <div className="h-64">
            <ResponsiveContainer><LineChart data={hourly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} orientation="right" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="txn" stroke="#E07B69" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart></ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-2" title="أداء الفئات" description="حصة الإيرادات حسب الفئة">
          <div className="h-64">
            <ResponsiveContainer><BarChart data={categoryMix}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} orientation="right" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="value" fill="#006D60" radius={[8, 8, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
