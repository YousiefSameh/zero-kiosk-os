import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <AppShell title="الإعدادات" subtitle="إعدادات المؤسسة والضرائب والمنصة">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-2" title="المؤسسة" description="الكيان القانوني المستخدم للضرائب والفواتير">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>الاسم القانوني</Label><Input defaultValue="زيرو كشك للتجزئة ش.ذ.م.م" className="mt-1.5" /></div>
            <div><Label>الاسم التجاري</Label><Input defaultValue="زيرو كشك" className="mt-1.5" /></div>
            <div><Label>الرقم الضريبي</Label><Input defaultValue="123-456-789" className="mt-1.5" /></div>
            <div><Label>الدولة</Label><Input defaultValue="مصر" className="mt-1.5" /></div>
            <div><Label>العملة الأساسية</Label><Input defaultValue="ج.م — جنيه مصري" className="mt-1.5" /></div>
            <div><Label>نسبة ضريبة القيمة المضافة</Label><Input defaultValue="14٪" className="mt-1.5" /></div>
          </div>
        </SectionCard>

        <SectionCard title="المنصة">
          <div className="space-y-4">
            {[
              { label: "التقديم لمصلحة الضرائب المصرية", desc: "الفوترة الإلكترونية اللحظية", on: true },
              { label: "وضع الاتصال المتقطع", desc: "تخزين المعاملات عند فقدان الاتصال", on: true },
              { label: "اعتماد المدير للمرتجعات", desc: "طلب رقم PIN للمرتجعات فوق ٥٠٠ ج.م", on: true },
              { label: "إعادة الطلب التلقائي عند نقص المخزون", desc: "إنشاء أوامر شراء عند بلوغ الحد", on: false },
              { label: "برنامج الولاء", desc: "نقاط ومستويات ومكافآت", on: true },
            ].map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
                <Switch defaultChecked={s.on} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard className="mt-4" title="الفوترة" description="زيرو كشك برو · ٤ فروع · ٤٢ مقعد">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xl font-semibold">4,800 ج.م <span className="text-sm text-muted-foreground font-normal">/ شهريًا</span></div>
            <div className="text-xs text-muted-foreground mt-1">الفاتورة القادمة: ١ أغسطس ٢٠٢٦ · الدفع عبر CIB •••• 4421</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">عرض الفواتير</Button>
            <Button className="bg-brand hover:bg-brand/90">إدارة الاشتراك</Button>
          </div>
        </div>
      </SectionCard>
    </AppShell>
  );
}
