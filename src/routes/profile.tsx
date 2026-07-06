import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <AppShell title="الملف الشخصي" subtitle="حسابك الشخصي">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-1">
          <div className="text-center py-4">
            <Avatar className="w-20 h-20 mx-auto"><AvatarFallback className="bg-brand text-brand-foreground text-2xl font-display">ل م</AvatarFallback></Avatar>
            <div className="mt-3 font-display font-semibold text-lg">ليلى مصطفى</div>
            <div className="text-sm text-muted-foreground">مالك · الزمالك — الفرع الرئيسي</div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs bg-brand-soft text-brand px-3 py-1 rounded-full font-medium">زيرو كشك برو</div>
          </div>
          <div className="border-t border-border pt-4 grid grid-cols-3 text-center">
            <div><div className="font-display font-semibold">248</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">جلسات</div></div>
            <div><div className="font-display font-semibold">4</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">فروع</div></div>
            <div><div className="font-display font-semibold">42</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">فريق</div></div>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-2" title="بيانات الحساب">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>الاسم الكامل</Label><Input defaultValue="ليلى مصطفى" className="mt-1.5" /></div>
            <div><Label>البريد الإلكتروني</Label><Input defaultValue="laila@zerokiosk.com" className="mt-1.5" /></div>
            <div><Label>الهاتف</Label><Input defaultValue="+20 100 223 4411" className="mt-1.5" /></div>
            <div><Label>اللغة</Label><Input defaultValue="العربية (مصر)" className="mt-1.5" /></div>
            <div className="md:col-span-2"><Label>الدور</Label><Input defaultValue="مالك" disabled className="mt-1.5" /></div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline">إلغاء</Button>
            <Button className="bg-brand hover:bg-brand/90">حفظ التغييرات</Button>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
