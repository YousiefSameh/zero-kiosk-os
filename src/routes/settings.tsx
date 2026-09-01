import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2, SlidersHorizontal, CreditCard } from "lucide-react";
import { useDataState, FormSkeleton, RowsSkeleton, Shimmer } from "@/lib/demo-state";
import { RestartTourButton } from "@/lib/onboarding";


export const Route = createFileRoute("/settings")({ component: SettingsPage });

const platformSettings = [
  { label: "الفوترة الإلكترونية للمصلحة", desc: "إرسال فوري لمصلحة الضرائب المصرية", on: true },
  { label: "وضع العمل دون اتصال", desc: "حفظ المعاملات مؤقتًا عند انقطاع الإنترنت", on: true },
  { label: "اعتماد المدير للمرتجعات", desc: "طلب PIN للمرتجعات فوق ٥٠٠ ج.م.", on: true },
  { label: "إعادة الطلب التلقائي", desc: "إنشاء مسودات أوامر شراء عند نقطة إعادة الطلب", on: false },
  { label: "برنامج الولاء", desc: "النقاط والمستويات والمكافآت", on: true },
];

function SettingsPage() {
  const ds = useDataState();
  const toggles = ds.rows(platformSettings);

  return (
    <AppShell title="الإعدادات" subtitle="إعدادات المنشأة والضرائب والمنصة">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-2" title="بيانات المنشأة" description="الكيان القانوني المستخدم في الفواتير والضرائب">
          {ds.isLoading ? (
            <FormSkeleton fields={6} />
          ) : ds.isEmpty ? (
            <EmptyState
              compact
              icon={Building2}
              title="لم تُكمل بيانات المنشأة"
              description="نحتاج الاسم القانوني والرقم الضريبي لإصدار فواتير معتمدة وربطها بمصلحة الضرائب المصرية."
              primary={{ label: "إكمال بيانات المنشأة", icon: Building2 }}
              secondary={{ label: "لاحقًا" }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>الاسم القانوني</Label><Input defaultValue="زيرو كشك للتجارة ش.م.م" className="mt-1.5" /></div>
              <div><Label>الاسم التجاري</Label><Input defaultValue="زيرو كشك" className="mt-1.5" /></div>
              <div><Label>الرقم الضريبي</Label><Input defaultValue="١٢٣-٤٥٦-٧٨٩" className="mt-1.5" /></div>
              <div><Label>الدولة</Label><Input defaultValue="جمهورية مصر العربية" className="mt-1.5" /></div>
              <div><Label>العملة الأساسية</Label><Input defaultValue="ج.م. — الجنيه المصري" className="mt-1.5" /></div>
              <div><Label>نسبة القيمة المضافة</Label><Input defaultValue="١٤٪" className="mt-1.5" /></div>
            </div>
          )}
        </SectionCard>

        <SectionCard title="إعدادات المنصة">
          {ds.isLoading ? (
            <RowsSkeleton rows={5} avatar={false} />
          ) : toggles.length === 0 ? (
            <EmptyState
              compact
              icon={SlidersHorizontal}
              title="لا توجد إعدادات مُفعّلة"
              description="فعّل الوحدات التي يحتاجها متجرك — الفوترة الإلكترونية، العمل دون اتصال، وبرنامج الولاء."
              primary={{ label: "تفعيل الإعدادات الموصى بها" }}
              secondary={{ label: "دليل الإعداد" }}
            />
          ) : (
            <div className="space-y-4">
              {toggles.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                  <Switch defaultChecked={s.on} />
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="الاشتراك" description="زيرو كشك برو · ٤ فروع · ٤٢ مستخدم">
        {ds.isLoading ? (
          <div className="flex items-center justify-between">
            <div className="space-y-2.5">
              <Shimmer className="h-6 w-48" />
              <Shimmer className="h-3 w-72" />
            </div>
            <div className="flex gap-2"><Shimmer className="h-9 w-28 rounded-lg" /><Shimmer className="h-9 w-32 rounded-lg" /></div>
          </div>
        ) : ds.isEmpty ? (
          <EmptyState
            compact
            icon={CreditCard}
            title="لا توجد خطة مفعّلة"
            description="اختر خطة زيرو كشك المناسبة لعدد فروعك ومستخدميك، وابدأ بفترة تجريبية ١٤ يومًا بدون بطاقة."
            primary={{ label: "اختيار خطة", icon: CreditCard }}
            secondary={{ label: "مقارنة الخطط" }}
          />
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-xl font-semibold">٤٬٨٠٠ ج.م. <span className="text-sm text-muted-foreground font-normal">/ شهريًا</span></div>
              <div className="text-xs text-muted-foreground mt-1">الفاتورة القادمة: ١ أغسطس ٢٠٢٦ · الدفع عبر CIB •••• ٤٤٢١</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">عرض الفواتير</Button>
              <Button className="bg-brand hover:bg-brand/90">إدارة الاشتراك</Button>
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard className="mt-4" title="الجولة التعريفية" description="جولة تفاعلية تشرح كل قسم في زيرو كشك خطوة بخطوة">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">أعد تشغيل الجولة الإرشادية</div>
            <div className="text-xs text-muted-foreground mt-1">
              ٢٤ خطوة تُبرز كل عنصر في القائمة وتشرح متى تستخدمه — مناسبة لتدريب موظف جديد.
            </div>
          </div>
          <RestartTourButton />
        </div>
      </SectionCard>

    </AppShell>
  );
}
