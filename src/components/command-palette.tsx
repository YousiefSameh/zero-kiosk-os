import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, ArrowLeft, ArrowUp, ArrowDown, CornerDownLeft, Command as CmdIcon,
  LayoutDashboard, LineChart, BarChart3, CreditCard, Receipt, Users,
  Package, Boxes, ShoppingCart, Truck, Wallet, Store, UserCog, Shield,
  ScrollText, Bell, Settings, Sparkles, Clock, Plus, FileDown, DoorOpen,
  Sun, Moon, Globe, KeyRound, Building2, User, ChevronLeft,
} from "lucide-react";
import { products, customers, suppliers, sales, purchaseOrders, currency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: any;
  section: string;
  onSelect: () => void;
  badge?: string;
  meta?: string;
};

const RECENT_KEY = "zk_cmd_recent_v1";

function useRecent() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);
  const push = (id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, 5);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return { ids, push };
}

export function CommandPalette({ open, onOpenChange }: {
  open: boolean; onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<"root" | "settings" | "theme">("root");
  const { ids: recentIds, push } = useRecent();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setQuery(""); setPage("root"); }, 150);
      return () => clearTimeout(t);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const go = (to: string, id: string) => {
    push(id);
    onOpenChange(false);
    navigate({ to });
  };

  const rootItems = useMemo<Item[]>(() => {
    const pages: Item[] = [
      { id: "p:/", label: "لوحة التحكم", hint: "نظرة عامة على الأداء", icon: LayoutDashboard, section: "الصفحات", onSelect: () => go("/", "p:/") },
      { id: "p:/analytics", label: "التحليلات", hint: "مؤشرات الأداء التفصيلية", icon: LineChart, section: "الصفحات", onSelect: () => go("/analytics", "p:/analytics") },
      { id: "p:/reports", label: "التقارير", hint: "تقارير مالية ومبيعات", icon: BarChart3, section: "الصفحات", onSelect: () => go("/reports", "p:/reports") },
      { id: "p:/pos", label: "نقطة البيع", hint: "افتح شاشة البيع السريعة", icon: CreditCard, section: "الصفحات", onSelect: () => go("/pos", "p:/pos") },
      { id: "p:/sales", label: "المبيعات", hint: "سجل الفواتير والمعاملات", icon: Receipt, section: "الصفحات", onSelect: () => go("/sales", "p:/sales") },
      { id: "p:/customers", label: "العملاء", hint: "قاعدة عملاء الولاء", icon: Users, section: "الصفحات", onSelect: () => go("/customers", "p:/customers") },
      { id: "p:/products", label: "المنتجات", hint: "الكتالوج الرئيسي", icon: Package, section: "الصفحات", onSelect: () => go("/products", "p:/products") },
      { id: "p:/inventory", label: "المخزون", hint: "أرصدة الفروع", icon: Boxes, section: "الصفحات", onSelect: () => go("/inventory", "p:/inventory") },
      { id: "p:/purchase-orders", label: "أوامر الشراء", hint: "طلبات التوريد", icon: ShoppingCart, section: "الصفحات", onSelect: () => go("/purchase-orders", "p:/purchase-orders") },
      { id: "p:/suppliers", label: "الموردون", hint: "بيانات وشروط الموردين", icon: Truck, section: "الصفحات", onSelect: () => go("/suppliers", "p:/suppliers") },
      { id: "p:/finance", label: "المالية", hint: "الحسابات والدفاتر", icon: Wallet, section: "الصفحات", onSelect: () => go("/finance", "p:/finance") },
      { id: "p:/expenses", label: "المصروفات", hint: "متابعة النفقات", icon: Receipt, section: "الصفحات", onSelect: () => go("/expenses", "p:/expenses") },
      { id: "p:/branches", label: "الفروع", hint: "إدارة نقاط البيع", icon: Store, section: "الصفحات", onSelect: () => go("/branches", "p:/branches") },
      { id: "p:/employees", label: "الموظفون", hint: "الفريق والورديات", icon: UserCog, section: "الصفحات", onSelect: () => go("/employees", "p:/employees") },
      { id: "p:/roles", label: "الأدوار والصلاحيات", hint: "التحكم في الوصول", icon: Shield, section: "الصفحات", onSelect: () => go("/roles", "p:/roles") },
      { id: "p:/activity", label: "سجل النشاط", hint: "تتبع كل الإجراءات", icon: ScrollText, section: "الصفحات", onSelect: () => go("/activity", "p:/activity") },
      { id: "p:/notifications", label: "الإشعارات", hint: "تنبيهات النظام", icon: Bell, section: "الصفحات", onSelect: () => go("/notifications", "p:/notifications") },
      { id: "p:/profile", label: "الملف الشخصي", hint: "حسابك وبياناتك", icon: User, section: "الصفحات", onSelect: () => go("/profile", "p:/profile") },
    ];

    const actions: Item[] = [
      { id: "a:new-po", label: "إنشاء أمر شراء جديد", hint: "ابدأ طلب توريد فارغ", icon: Plus, section: "إجراءات سريعة", onSelect: () => go("/purchase-orders", "a:new-po") },
      { id: "a:new-product", label: "إضافة منتج جديد", hint: "أدخل صنفًا إلى الكتالوج", icon: Plus, section: "إجراءات سريعة", onSelect: () => go("/products", "a:new-product") },
      { id: "a:open-drawer", label: "فتح درج النقد", hint: "افتح الدرج من الكاشير", icon: DoorOpen, section: "إجراءات سريعة", onSelect: () => go("/pos", "a:open-drawer") },
      { id: "a:export-sales", label: "تصدير مبيعات اليوم", hint: "تحميل CSV بمبيعات اليوم", icon: FileDown, section: "إجراءات سريعة", onSelect: () => go("/sales", "a:export-sales") },
      { id: "a:new-customer", label: "إضافة عميل جديد", hint: "أنشئ ملف ولاء", icon: Plus, section: "إجراءات سريعة", onSelect: () => go("/customers", "a:new-customer") },
    ];

    const prod: Item[] = products.map((p) => ({
      id: `pr:${p.id}`, label: p.name, hint: `${p.category} · ${p.supplier}`, meta: currency(p.price),
      keywords: `${p.id} ${p.category} ${p.supplier}`, icon: Package, section: "المنتجات",
      onSelect: () => go("/products", `pr:${p.id}`), badge: p.status,
    }));

    const cust: Item[] = customers.map((c) => ({
      id: `cu:${c.id}`, label: c.name, hint: `${c.phone} · ${c.visits} زيارة`, meta: currency(c.spend),
      keywords: `${c.id} ${c.phone}`, icon: Users, section: "العملاء",
      onSelect: () => go("/customers", `cu:${c.id}`), badge: c.loyalty,
    }));

    const sup: Item[] = suppliers.map((s) => ({
      id: `su:${s.id}`, label: s.name, hint: `${s.contact} · ${s.terms}`, meta: `${s.openPOs} أوامر مفتوحة`,
      keywords: `${s.id} ${s.phone}`, icon: Truck, section: "الموردون",
      onSelect: () => go("/suppliers", `su:${s.id}`),
    }));

    const inv: Item[] = sales.map((s) => ({
      id: `in:${s.id}`, label: `فاتورة ${s.id}`, hint: `${s.cashier} · ${s.branch} · ${s.time}`, meta: currency(s.total),
      keywords: `${s.method} ${s.status}`, icon: Receipt, section: "الفواتير",
      onSelect: () => go("/sales", `in:${s.id}`), badge: s.status,
    }));

    const pos: Item[] = purchaseOrders.map((o) => ({
      id: `po:${o.id}`, label: `أمر شراء ${o.id}`, hint: `${o.supplier} · ${o.branch}`, meta: currency(o.total),
      keywords: `${o.status} ${o.date}`, icon: ShoppingCart, section: "أوامر الشراء",
      onSelect: () => go("/purchase-orders", `po:${o.id}`), badge: o.status,
    }));

    const settings: Item[] = [
      { id: "s:general", label: "الإعدادات العامة", hint: "اسم المتجر واللغة", icon: Settings, section: "الإعدادات", onSelect: () => go("/settings", "s:general") },
      { id: "s:theme", label: "المظهر والسمة", hint: "فاتح / داكن / تلقائي", icon: Sun, section: "الإعدادات", onSelect: () => setPage("theme") },
      { id: "s:language", label: "اللغة والمنطقة", hint: "العربية · مصر (EGP)", icon: Globe, section: "الإعدادات", onSelect: () => go("/settings", "s:language") },
      { id: "s:roles", label: "الأدوار والصلاحيات", hint: "إدارة صلاحيات الفريق", icon: KeyRound, section: "الإعدادات", onSelect: () => go("/roles", "s:roles") },
      { id: "s:branches", label: "إدارة الفروع", hint: "إضافة أو تعديل الفروع", icon: Building2, section: "الإعدادات", onSelect: () => go("/branches", "s:branches") },
      { id: "s:notifications", label: "تفضيلات الإشعارات", hint: "بريد وتنبيهات فورية", icon: Bell, section: "الإعدادات", onSelect: () => go("/notifications", "s:notifications") },
    ];

    return [...pages, ...actions, ...prod, ...cust, ...sup, ...inv, ...pos, ...settings];
  }, []);

  const recentItems = useMemo(
    () => recentIds.map((id) => rootItems.find((i) => i.id === id)).filter(Boolean) as Item[],
    [recentIds, rootItems],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of rootItems) {
      if (!map.has(it.section)) map.set(it.section, []);
      map.get(it.section)!.push(it);
    }
    return Array.from(map.entries());
  }, [rootItems]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="p-0 gap-0 max-w-2xl overflow-hidden rounded-2xl border-border/60 shadow-elevated bg-popover/95 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-[0.98] data-[state=closed]:zoom-out-[0.98] data-[state=open]:slide-in-from-top-2"
      >
        <VisuallyHidden><DialogTitle>لوحة الأوامر</DialogTitle></VisuallyHidden>

        <CommandPrimitive
          shouldFilter={page === "root"}
          loop
          className="flex flex-col"
          onKeyDown={(e) => {
            if (e.key === "Escape" && page !== "root") {
              e.preventDefault();
              setPage("root");
              setQuery("");
            }
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 h-14 border-b border-border/60">
            {page !== "root" ? (
              <button
                onClick={() => { setPage("root"); setQuery(""); }}
                className="w-7 h-7 grid place-items-center rounded-md hover:bg-accent text-muted-foreground"
                aria-label="رجوع"
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
            <CommandPrimitive.Input
              ref={inputRef}
              value={query}
              onValueChange={setQuery}
              placeholder={
                page === "theme" ? "اختر سمة العرض…" :
                page === "settings" ? "ابحث في الإعدادات…" :
                "ابحث عن صفحة، منتج، عميل، فاتورة، أو إجراء…"
              }
              className="flex-1 h-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium bg-muted/70 text-muted-foreground px-1.5 py-0.5 rounded border border-border/60">
              ESC
            </kbd>
          </div>

          {/* List */}
          <CommandPrimitive.List className="max-h-[440px] overflow-y-auto overscroll-contain p-2 scroll-py-2">
            <CommandPrimitive.Empty className="py-12 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand mb-3">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium">لا توجد نتائج مطابقة</div>
              <div className="text-xs text-muted-foreground mt-1">جرّب كلمة أخرى أو رمز الصنف / رقم الفاتورة</div>
            </CommandPrimitive.Empty>

            {page === "theme" && (
              <PaletteGroup heading="سمة العرض">
                <PaletteItem value="theme-light" label="الوضع الفاتح" hint="مناسب للنهار" icon={Sun} onSelect={() => onOpenChange(false)} />
                <PaletteItem value="theme-dark" label="الوضع الداكن" hint="مناسب لبيئات الإضاءة المنخفضة" icon={Moon} onSelect={() => onOpenChange(false)} />
                <PaletteItem value="theme-auto" label="تلقائي حسب النظام" hint="يتبع إعدادات الجهاز" icon={Sparkles} onSelect={() => onOpenChange(false)} />
              </PaletteGroup>
            )}

            {page === "root" && query === "" && recentItems.length > 0 && (
              <PaletteGroup heading="آخر ما استخدمت" icon={Clock}>
                {recentItems.map((it) => (
                  <PaletteItem
                    key={`r-${it.id}`}
                    value={`recent-${it.id}`}
                    label={it.label}
                    hint={it.hint}
                    meta={it.meta}
                    badge={it.badge}
                    icon={it.icon}
                    onSelect={it.onSelect}
                  />
                ))}
              </PaletteGroup>
            )}

            {page === "root" && grouped.map(([section, items]) => (
              <PaletteGroup key={section} heading={section}>
                {items.map((it) => (
                  <PaletteItem
                    key={it.id}
                    value={`${it.id} ${it.label} ${it.keywords ?? ""} ${it.section}`}
                    label={it.label}
                    hint={it.hint}
                    meta={it.meta}
                    badge={it.badge}
                    icon={it.icon}
                    onSelect={it.onSelect}
                  />
                ))}
              </PaletteGroup>
            ))}
          </CommandPrimitive.List>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 px-4 h-11 border-t border-border/60 bg-muted/30 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-brand grid place-items-center">
                <CmdIcon className="w-2.5 h-2.5 text-brand-foreground" />
              </div>
              <span className="font-medium">زيرو كشك</span>
              <span className="text-muted-foreground/60">·</span>
              <span>لوحة الأوامر</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <FooterHint icon={ArrowUp} label="تنقل">
                <ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" />
              </FooterHint>
              <FooterHint label="اختيار">
                <CornerDownLeft className="w-3 h-3" />
              </FooterHint>
              <FooterHint label="إغلاق">
                <span className="font-semibold">ESC</span>
              </FooterHint>
            </div>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}

function PaletteGroup({ heading, icon: Icon, children }: { heading: string; icon?: any; children: React.ReactNode }) {
  return (
    <CommandPrimitive.Group
      heading={
        <div className="flex items-center gap-1.5 px-2 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {Icon && <Icon className="w-3 h-3" />}
          <span>{heading}</span>
        </div>
      }
      className="[&_[cmdk-group-heading]]:!p-0"
    >
      {children}
    </CommandPrimitive.Group>
  );
}

function PaletteItem({
  value, label, hint, meta, badge, icon: Icon, onSelect,
}: {
  value: string; label: string; hint?: string; meta?: string; badge?: string; icon: any; onSelect: () => void;
}) {
  return (
    <CommandPrimitive.Item
      value={value}
      onSelect={onSelect}
      className={cn(
        "group flex items-center gap-3 px-2.5 py-2 rounded-lg cursor-pointer text-sm",
        "data-[selected=true]:bg-brand-soft data-[selected=true]:text-foreground",
        "transition-colors",
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-muted/60 grid place-items-center text-muted-foreground group-data-[selected=true]:bg-brand group-data-[selected=true]:text-brand-foreground transition-colors shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground truncate">{hint}</div>}
      </div>
      {badge && (
        <span className="hidden sm:inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-background border border-border/60 text-muted-foreground shrink-0">
          {badge}
        </span>
      )}
      {meta && <div className="text-xs font-medium text-muted-foreground tabular-nums shrink-0">{meta}</div>}
      <CornerDownLeft className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-data-[selected=true]:opacity-100 transition-opacity shrink-0" />
    </CommandPrimitive.Item>
  );
}

function FooterHint({ label, children }: { icon?: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background border border-border/60 text-foreground">
        {children}
      </span>
      <span>{label}</span>
    </div>
  );
}
