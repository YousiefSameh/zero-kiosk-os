import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard } from "@/components/app-shell";
import { currency } from "@/lib/mock-data";
import { Wallet, TrendingUp, TrendingDown, Landmark } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/finance")({ component: FinancePage });

const cashflow = [
  { week: "أسبوع ١", in: 320000, out: 210000 },
  { week: "أسبوع ٢", in: 340000, out: 195000 },
  { week: "أسبوع ٣", in: 380000, out: 240000 },
  { week: "أسبوع ٤", in: 412000, out: 220000 },
];

function FinancePage() {
  return (
    <AppShell title="المالية" subtitle="النقدية والإيرادات والتسويات">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="إيرادات الشهر" value={currency(1452000)} delta="+18٪ عن الشهر الماضي" icon={TrendingUp} tone="success" />
        <KpiCard label="مصروفات الشهر" value={currency(864000)} delta="ضمن الميزانية" icon={TrendingDown} tone="warning" />
        <KpiCard label="النقدية المتاحة" value={currency(184300)} delta="عبر ٤ أدراج" icon={Wallet} tone="brand" />
        <KpiCard label="رصيد البنك" value={currency(2418000)} delta="CIB Business" icon={Landmark} tone="coral" />
      </div>

      <SectionCard className="mt-4" title="التدفق النقدي" description="التدفقات الداخلة مقابل الخارجة أسبوعيًا">
        <div className="h-72">
          <ResponsiveContainer><BarChart data={cashflow}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} orientation="right" />
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="in" fill="#006D60" radius={[8, 8, 0, 0]} name="داخل" />
            <Bar dataKey="out" fill="#E07B69" radius={[8, 8, 0, 0]} name="خارج" />
          </BarChart></ResponsiveContainer>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SectionCard title="أدراج النقدية" description="الفروقات المباشرة عبر الطرفيات">
          <div className="space-y-3">
            {[
              { branch: "الزمالك — الفرع الرئيسي", drawer: "T-04", cash: 42800, var: -84 },
              { branch: "المعادي كورنيش", drawer: "T-01", cash: 38200, var: 0 },
              { branch: "شيراتون هليوبوليس", drawer: "T-02", cash: 51600, var: 12 },
              { branch: "سموحة", drawer: "T-01", cash: 24100, var: 0 },
            ].map((d) => (
              <div key={d.drawer + d.branch} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="text-sm font-medium">{d.branch}</div>
                  <div className="text-xs text-muted-foreground">طرفية {d.drawer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{currency(d.cash)}</div>
                  <div className={`text-xs ${d.var < 0 ? "text-destructive" : d.var > 0 ? "text-warning" : "text-success"}`}>
                    {d.var === 0 ? "متوازن" : `فرق ${d.var > 0 ? "+" : ""}${currency(d.var)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="آخر المعاملات" description="نشاط البنك والمحفظة">
          <ul className="divide-y divide-border">
            {[
              { desc: "تسوية بطاقات — CIB", amt: 128400, in: true, when: "اليوم" },
              { desc: "تحويل — نستله مصر PO-2041", amt: -48200, in: false, when: "اليوم" },
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
    </AppShell>
  );
}
