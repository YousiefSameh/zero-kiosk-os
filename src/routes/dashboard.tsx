import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, SectionCard, StatusPill, EmptyState } from "@/components/app-shell";
import { useDataState, KpiSkeleton, ChartSkeleton, ListSkeleton, RowsSkeleton } from "@/lib/demo-state";
import { Button } from "@/components/ui/button";
import { kpis, salesTrend, categoryMix, sales, activity, products, currency, num } from "@/lib/mock-data";
import {
  Wallet, ShoppingBag, Store, AlertTriangle, TrendingUp, Download, Plus,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | زيرو كشك" },
      { name: "description", content: "مركز التحكم في زيرو كشك: مبيعات اليوم، تنبيهات المخزون، آخر العمليات وأداء الفروع." },
      { property: "og:title", content: "لوحة التحكم | زيرو كشك" },
      { property: "og:description", content: "مبيعات اليوم، تنبيهات المخزون، وأداء الفروع في شاشة واحدة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const ds = useDataState();
  const delta = ((kpis.revenueToday - kpis.revenueYesterday) / kpis.revenueYesterday) * 100;
  return (
    <AppShell
      title="لوحة التحكم"
      subtitle="الأحد ٥ يوليو ٢٠٢٦ · مباشر عبر ٤ فروع"
      actions={
        <>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 ms-1.5" />تصدير</Button>
          <Button size="sm" className="bg-brand hover:bg-brand/90"><Plus className="w-4 h-4 ms-1.5" />بيع جديد</Button>
        </>
      }
    >
      {ds.isLoading ? (
        <>
          <KpiSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <SectionCard className="lg:col-span-2" title="مبيعات هذا الأسبوع" description="جارٍ تحميل بيانات الإيرادات…">
              <ChartSkeleton height={288} />
            </SectionCard>
            <SectionCard title="توزيع التصنيفات" description="جارٍ تحميل الحصص…">
              <div className="h-72 grid place-items-center">
                <div className="w-44 h-44 rounded-full border-[18px] border-muted animate-pulse" />
              </div>
            </SectionCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <SectionCard className="lg:col-span-2" title="أحدث المبيعات" description="جارٍ استقبال المعاملات…">
              <ListSkeleton rows={6} cols={5} />
            </SectionCard>
            <SectionCard title="النشاط" description="جارٍ تحميل السجل…">
              <RowsSkeleton rows={6} />
            </SectionCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="مخزون منخفض" description="جارٍ الفحص…"><RowsSkeleton rows={5} /></SectionCard>
            <SectionCard title="أفضل الفروع" description="جارٍ الترتيب…"><RowsSkeleton rows={4} avatar={false} /></SectionCard>
          </div>
        </>
      ) : ds.isEmpty ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard label="إيرادات اليوم" value="—" delta="لا توجد مبيعات مسجلة بعد" icon={Wallet} tone="brand" />
            <KpiCard label="عدد المعاملات" value="—" delta="ابدأ أول فاتورة من نقطة البيع" icon={ShoppingBag} tone="coral" />
            <KpiCard label="الفروع النشطة" value="—" delta="أضف فرعك الأول" icon={Store} tone="success" />
            <KpiCard label="تنبيهات المخزون" value="—" delta="لا يوجد مخزون لمراقبته" icon={AlertTriangle} tone="warning" />
          </div>
          <div className="card-elevated mt-4">
            <EmptyState
              icon={TrendingUp}
              title="لوحة التحكم جاهزة، وتنتظر أول عملية بيع"
              description="بمجرد تسجيل أول فاتورة من نقطة البيع ستظهر هنا الإيرادات اللحظية، ومقارنات الفروع، وتنبيهات المخزون، وسجل النشاط — كل ذلك محدَّثًا لحظة بلحظة."
              primary={{ label: "فتح نقطة البيع", icon: ShoppingBag }}
              secondary={{ label: "استيراد بيانات تجريبية" }}
              hint="نصيحة: اضغط Ctrl + K للتنقل السريع بين وحدات النظام"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <SectionCard title="مخزون منخفض" description="أصناف تحتاج إلى إعادة طلب">
              <EmptyState
                compact
                icon={AlertTriangle}
                title="لا توجد تنبيهات مخزون"
                description="أضف منتجاتك وحدّد نقطة إعادة الطلب لكل صنف، وسننبهك قبل النفاد."
                primary={{ label: "إضافة منتج" }}
                secondary={{ label: "استيراد كتالوج" }}
              />
            </SectionCard>
            <SectionCard title="أفضل الفروع" description="حسب الإيرادات هذا الأسبوع">
              <EmptyState
                compact
                icon={Store}
                title="لا توجد فروع لمقارنتها"
                description="أضف فرعًا واحدًا على الأقل لبدء مقارنة الأداء والإيرادات بين المواقع."
                primary={{ label: "إضافة فرع" }}
                secondary={{ label: "معرفة المزيد" }}
              />
            </SectionCard>
          </div>
        </>
      ) : (
        <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="إيرادات اليوم" value={currency(kpis.revenueToday)} delta={`▲ ${num(Number(delta.toFixed(1)))}٪ مقارنة بالأمس`} icon={Wallet} tone="brand" />
        <KpiCard label="عدد المعاملات" value={num(kpis.transactionsToday)} delta={`متوسط الفاتورة ${currency(kpis.avgBasket)}`} icon={ShoppingBag} tone="coral" />
        <KpiCard label="الفروع النشطة" value={num(kpis.activeBranches)} delta="جميع الأنظمة تعمل بشكل طبيعي" icon={Store} tone="success" />
        <KpiCard label="تنبيهات المخزون" value={num(kpis.stockAlerts)} delta={`${num(kpis.openPOs)} أوامر شراء مفتوحة`} icon={AlertTriangle} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <SectionCard
          className="lg:col-span-2"
          title="مبيعات هذا الأسبوع"
          description="الإيرادات والمعاملات في جميع الفروع"
          actions={<div className="text-xs text-muted-foreground flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-success" />+١٨٫٣٪ عن الأسبوع الماضي</div>}
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.48 0.08 185)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.48 0.08 185)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.008 190)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} reversed tick={{ fontSize: 12, fill: "oklch(0.52 0.02 210)" }} />
                <YAxis tickLine={false} axisLine={false} orientation="right" tick={{ fontSize: 12, fill: "oklch(0.52 0.02 210)" }} tickFormatter={(v) => `${num(v / 1000)} ألف`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 190)", fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.48 0.08 185)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="توزيع التصنيفات" description="حصة الإيرادات اليوم">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryMix} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {categoryMix.map((_, i) => (
                    <Cell key={i} fill={["#006D60", "#E07B69", "#4ea394", "#6c8fbd", "#e5b062"][i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 190)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <SectionCard className="lg:col-span-2" title="أحدث المبيعات" description="بث مباشر من كل نقاط البيع">
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-right font-medium px-5 py-2.5">رقم المعاملة</th>
                  <th className="text-right font-medium py-2.5">الكاشير</th>
                  <th className="text-right font-medium py-2.5">الفرع</th>
                  <th className="text-left font-medium py-2.5">الأصناف</th>
                  <th className="text-left font-medium py-2.5">الإجمالي</th>
                  <th className="text-right font-medium py-2.5">طريقة الدفع</th>
                  <th className="text-right font-medium px-5 py-2.5">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 6).map((s) => (
                  <tr key={s.id} className="border-b border-border/60 hover:bg-accent/40">
                    <td className="px-5 py-3 font-mono text-xs">{s.id}</td>
                    <td className="py-3">{s.cashier}</td>
                    <td className="py-3 text-muted-foreground">{s.branch}</td>
                    <td className="py-3 text-left">{num(s.items)}</td>
                    <td className="py-3 text-left font-medium">{currency(s.total)}</td>
                    <td className="py-3"><span className="text-xs">{s.method}</span></td>
                    <td className="px-5 py-3"><StatusPill status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="النشاط" description="ما يحدث الآن">
          <ul className="space-y-4">
            {activity.slice(0, 6).map((a) => (
              <li key={a.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-soft grid place-items-center text-brand text-xs font-semibold shrink-0">
                  {a.user.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="text-sm">{a.action}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.user} · {a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SectionCard title="مخزون منخفض" description="أصناف تحتاج إلى إعادة طلب">
          <ul className="divide-y divide-border">
            {products.filter((p) => p.status !== "متوفر").slice(0, 5).map((p) => (
              <li key={p.id} className="py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center text-xs font-medium">{p.name.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.supplier} · إعادة الطلب عند {num(p.reorder)}</div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">{num(p.stock)}</div>
                  <StatusPill status={p.status} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="أفضل الفروع" description="حسب الإيرادات هذا الأسبوع">
          <div className="space-y-3">
            {[
              { name: "فرع الزمالك الرئيسي", city: "القاهرة", value: 214300, pct: 92 },
              { name: "فرع كورنيش المعادي", city: "القاهرة", value: 168400, pct: 72 },
              { name: "فرع شيراتون هليوبوليس", city: "القاهرة", value: 142800, pct: 62 },
              { name: "فرع سموحة", city: "الإسكندرية", value: 121500, pct: 52 },
            ].map((b) => (
              <div key={b.name}>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.city}</div>
                  </div>
                  <div className="font-semibold">{currency(b.value)}</div>
                </div>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
        </>
      )}
    </AppShell>
  );
}
