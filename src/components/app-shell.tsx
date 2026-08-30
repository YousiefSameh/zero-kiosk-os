import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Truck, Users, Receipt,
  BarChart3, Wallet, Store, UserCog, Shield, Settings, Bell,
  Search, Command, ChevronsUpDown, Boxes, ScrollText, CreditCard,
  LineChart,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HelpButton } from "@/components/help-center";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import { CommandPalette } from "@/components/command-palette";
import { NotificationBellButton, NotificationCenter, useNotifications } from "@/components/notification-center";
import { DataStateSwitcher } from "@/lib/demo-state";
import logoAsset from "@/assets/zero-kiosk-logo-teal.png.asset.json";

const nav = [
  {
    label: "نظرة عامة",
    items: [
      { to: "/", label: "لوحة التحكم", icon: LayoutDashboard },
      { to: "/analytics", label: "التحليلات", icon: LineChart },
      { to: "/reports", label: "التقارير", icon: BarChart3 },
    ],
  },
  {
    label: "البيع",
    items: [
      { to: "/pos", label: "نقطة البيع", icon: CreditCard },
      { to: "/sales", label: "المبيعات", icon: Receipt },
      { to: "/customers", label: "العملاء", icon: Users },
    ],
  },
  {
    label: "المخزون",
    items: [
      { to: "/products", label: "المنتجات", icon: Package },
      { to: "/inventory", label: "المخزون", icon: Boxes },
      { to: "/purchase-orders", label: "أوامر الشراء", icon: ShoppingCart },
      { to: "/suppliers", label: "الموردون", icon: Truck },
    ],
  },
  {
    label: "التشغيل",
    items: [
      { to: "/finance", label: "المالية", icon: Wallet },
      { to: "/expenses", label: "المصروفات", icon: Receipt },
      { to: "/branches", label: "الفروع", icon: Store },
      { to: "/employees", label: "الموظفون", icon: UserCog },
      { to: "/roles", label: "الأدوار والصلاحيات", icon: Shield },
      { to: "/activity", label: "سجل النشاط", icon: ScrollText },
    ],
  },
  {
    label: "الحساب",
    items: [
      { to: "/notifications", label: "الإشعارات", icon: Bell },
      { to: "/settings", label: "الإعدادات", icon: Settings },
    ],
  },
] as const;

export function AppShell({ title, subtitle, actions, children }: {
  title: string; subtitle?: string; actions?: ReactNode; children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openCmd, setOpenCmd] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const notifCtl = useNotifications();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCmd((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex" dir="rtl">
      {/* Sidebar (right in RTL) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-e border-border bg-sidebar">
        <div data-tour="workspace" className="h-16 px-5 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-brand grid place-items-center shadow-soft overflow-hidden">
            <img src={logoAsset.url} alt="زيرو كشك" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-[15px]">زيرو كشك</div>
            <div className="text-[11px] text-muted-foreground">نظام تشغيل السوبرماركت</div>
          </div>
          <button className="ms-auto text-muted-foreground hover:text-foreground">
            <ChevronsUpDown className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-3 border-b border-sidebar-border">
          <button
            data-tour="search"
            onClick={() => setOpenCmd(true)}
            className="w-full flex items-center gap-2 text-sm rounded-lg border border-sidebar-border bg-background/60 px-3 py-2 text-muted-foreground hover:bg-accent transition"
          >
            <Search className="w-4 h-4" />
            <span>ابحث في كل شيء…</span>
            <kbd className="ms-auto text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {nav.map((section) => (
            <div key={section.label} data-tour={`nav-${section.tour}`}>
              <div className="px-2 mb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${active ? "text-brand" : ""}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link to="/profile" className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-sidebar-accent transition">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-brand text-brand-foreground text-xs">ل م</AvatarFallback>
            </Avatar>
            <div className="leading-tight flex-1 min-w-0">
              <div className="text-sm font-medium truncate">ليلى مصطفى</div>
              <div className="text-[11px] text-muted-foreground truncate">المالك · الزمالك</div>
            </div>
            <Badge variant="secondary" className="bg-brand-soft text-brand text-[10px]">برو</Badge>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
          <div className="h-full px-6 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-lg font-semibold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              <DataStateSwitcher />
              {actions}
              <HelpButton pathname={pathname} />
              <button
                onClick={() => setOpenCmd(true)}
                className="hidden md:inline-flex items-center gap-2 text-xs rounded-lg border border-border bg-card px-3 py-1.5 text-muted-foreground hover:bg-accent"
              >
                <Command className="w-3.5 h-3.5" /> إجراءات سريعة
              </button>
              <NotificationBellButton unread={notifCtl.unread} onClick={() => setOpenNotif(true)} />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>

      <CommandPalette open={openCmd} onOpenChange={setOpenCmd} />
      <NotificationCenter open={openNotif} onOpenChange={setOpenNotif} controller={notifCtl} />
    </div>
  );
}

/* ---------- Shared page primitives ---------- */

export function KpiCard({ label, value, delta, icon: Icon, tone = "brand" }: {
  label: string; value: string; delta?: string; icon: any; tone?: "brand" | "coral" | "success" | "warning";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-soft text-brand",
    coral: "bg-coral/10 text-coral",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="mt-2 font-display text-2xl font-semibold tracking-tight">{value}</div>
          {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
        </div>
        <div className={`w-10 h-10 rounded-xl grid place-items-center ${tones[tone]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export function SectionCard({ title, description, actions, children, className = "" }: {
  title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <div className={`card-elevated ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border">
          <div>
            {title && <div className="font-display font-semibold text-[15px]">{title}</div>}
            {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
          </div>
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    "مكتمل": "bg-success/10 text-success",
    "متوفر": "bg-success/10 text-success",
    "نشط": "bg-success/10 text-success",
    "تم التسليم": "bg-success/10 text-success",
    "معتمد": "bg-brand-soft text-brand",
    "مدفوع": "bg-brand-soft text-brand",
    "قيد الانتظار": "bg-warning/15 text-warning",
    "مخزون منخفض": "bg-warning/15 text-warning",
    "قيد التأهيل": "bg-warning/15 text-warning",
    "في إجازة": "bg-warning/15 text-warning",
    "مُسترد": "bg-coral/15 text-coral",
    "حرج": "bg-destructive/10 text-destructive",
    "نفد المخزون": "bg-destructive/10 text-destructive",
    "مُلغى": "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primary,
  secondary,
  action,
  compact = false,
  hint,
}: {
  icon: any;
  title: string;
  description: string;
  primary?: { label: string; onClick?: () => void; icon?: any };
  secondary?: { label: string; onClick?: () => void; icon?: any };
  action?: ReactNode;
  /** Tighter variant for empty states rendered inside a card or panel. */
  compact?: boolean;
  /** Optional micro-copy under the CTAs (e.g. a keyboard shortcut hint). */
  hint?: string;
}) {
  const PrimaryIcon = primary?.icon ?? Plus;
  const SecondaryIcon = secondary?.icon ?? RotateCcw;
  return (
    <div className={`relative overflow-hidden text-center px-6 ${compact ? "py-10" : "py-16"}`}>
      {/* Decorative illustration background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 ${compact ? "w-52 h-52" : "w-72 h-72"}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/20 ${compact ? "w-36 h-36" : "w-52 h-52"}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/10 ${compact ? "w-64 h-64" : "w-[340px] h-[340px]"}`} />
        <div className="absolute top-8 right-10 w-2 h-2 rounded-full bg-coral/40" />
        <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 rounded-full bg-brand/40" />
        <div className="absolute top-14 left-12 w-1.5 h-1.5 rounded-full bg-warning/50" />
        <div className="absolute bottom-8 left-1/3 w-2 h-2 rounded-full bg-brand/30" />
      </div>

      <div className="relative">
        {/* Illustrated icon */}
        <div className={`relative mx-auto ${compact ? "w-16 h-16" : "w-24 h-24"}`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/15 to-brand/5 rotate-6" />
          <div className="absolute inset-0 rounded-3xl bg-card border border-border shadow-card grid place-items-center">
            <Icon className={compact ? "w-7 h-7 text-brand" : "w-10 h-10 text-brand"} strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 rounded-lg bg-coral/15 grid place-items-center">
            <div className="w-2 h-2 rounded-full bg-coral" />
          </div>
        </div>

        <div className={`font-display font-semibold ${compact ? "mt-4 text-base" : "mt-6 text-lg"}`}>{title}</div>
        <p className={`mt-1.5 text-muted-foreground max-w-md mx-auto leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>{description}</p>

        <div className={`flex flex-wrap items-center justify-center gap-2.5 ${compact ? "mt-4" : "mt-6"}`}>
          {primary && (
            <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={primary.onClick}>
              <PrimaryIcon className="w-4 h-4 ms-1.5" />
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button size="sm" variant="outline" onClick={secondary.onClick}>
              <SecondaryIcon className="w-4 h-4 ms-1.5" />
              {secondary.label}
            </Button>
          )}
          {action}
        </div>

        {hint && <div className="mt-3 text-[11px] text-muted-foreground">{hint}</div>}
      </div>
    </div>
  );
}

