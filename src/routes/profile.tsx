import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle2, IdCard } from "lucide-react";
import { useDataState, FormSkeleton, Shimmer } from "@/lib/demo-state";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const ds = useDataState();

  return (
    <AppShell title="الملف الشخصي" subtitle="حسابك الشخصي">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-1">
          {ds.isLoading ? (
            <div className="py-4 text-center space-y-3">
              <Shimmer className="w-20 h-20 rounded-full mx-auto" />
              <Shimmer className="h-4 w-32 mx-auto" />
              <Shimmer className="h-3 w-44 mx-auto" />
              <Shimmer className="h-6 w-28 rounded-full mx-auto" />
              <div className="border-t border-border pt-4 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2"><Shimmer className="h-4 w-8 mx-auto" /><Shimmer className="h-2.5 w-12 mx-auto" /></div>
                ))}
              </div>
            </div>
          ) : ds.isEmpty ? (
            <EmptyState
              compact
              icon={UserCircle2}
              title="ملفك الشخصي غير مكتمل"
              description="أضف صورتك واسمك ورقم هاتفك ليعرف فريقك من نفّذ كل عملية داخل النظام."
              primary={{ label: "إكمال الملف", icon: UserCircle2 }}
              secondary={{ label: "تخطي" }}
            />
          ) : (
            <>
              <div className="text-center py-4">
                <Avatar className="w-20 h-20 mx-auto"><AvatarFallback className="bg-brand text-brand-foreground text-2xl font-display">ل م</AvatarFallback></Avatar>
                <div className="mt-3 font-display font-semibold text-lg">ليلى مصطفى</div>
                <div className="text-sm text-muted-foreground">المالك · فرع الزمالك الرئيسي</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs bg-brand-soft text-brand px-3 py-1 rounded-full font-medium">زيرو كشك برو</div>
              </div>
              <div className="border-t border-border pt-4 grid grid-cols-3 text-center">
                <div><div className="font-display font-semibold">٢٤٨</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">جلسة</div></div>
                <div><div className="font-display font-semibold">٤</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">فرع</div></div>
                <div><div className="font-display font-semibold">٤٢</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">عضو فريق</div></div>
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard className="lg:col-span-2" title="بيانات الحساب">
          {ds.isLoading ? (
            <FormSkeleton fields={5} />
          ) : ds.isEmpty ? (
            <EmptyState
              compact
              icon={IdCard}
              title="لا توجد بيانات حساب محفوظة"
              description="بيانات الحساب تُستخدم في تسجيل الدخول، واستعادة كلمة المرور، وتوقيع الفواتير التي تعتمدها."
              primary={{ label: "إضافة بياناتي", icon: IdCard }}
              secondary={{ label: "استيراد من الفريق" }}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>الاسم الكامل</Label><Input defaultValue="ليلى مصطفى" className="mt-1.5" /></div>
                <div><Label>البريد الإلكتروني</Label><Input defaultValue="laila@zerokiosk.com" className="mt-1.5" /></div>
                <div><Label>رقم الهاتف</Label><Input defaultValue="٠١٠٠ ٢٢٣ ٤٤١١" className="mt-1.5" /></div>
                <div><Label>اللغة</Label><Input defaultValue="العربية (مصر)" className="mt-1.5" /></div>
                <div className="md:col-span-2"><Label>الدور</Label><Input defaultValue="المالك" disabled className="mt-1.5" /></div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="outline">إلغاء</Button>
                <Button className="bg-brand hover:bg-brand/90">حفظ التغييرات</Button>
              </div>
            </>
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
