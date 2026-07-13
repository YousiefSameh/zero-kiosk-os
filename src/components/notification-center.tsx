import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  Bell, CheckCheck, Settings2, Inbox, TrendingUp, Boxes, Truck,
  Users, ServerCog, DatabaseBackup, ChevronLeft, Sparkles, X,
} from "lucide-react";
import { notificationFeed, type NotificationCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Tab = "all" | "unread" | NotificationCategory;

const categoryMeta: Record<
  NotificationCategory,
  { label: string; icon: any; tone: string; ring: string }
> = {
  sales:     { label: "المبيعات",       icon: TrendingUp,     tone: "bg-brand-soft text-brand",            ring: "ring-brand/20" },
  inventory: { label: "المخزون",        icon: Boxes,          tone: "bg-warning/15 text-warning",          ring: "ring-warning/20" },
  suppliers: { label: "الموردون",       icon: Truck,          tone: "bg-coral/15 text-coral",              ring: "ring-coral/20" },
  customers: { label: "العملاء",        icon: Users,          tone: "bg-success/10 text-success",          ring: "ring-success/20" },
  system:    { label: "النظام",         icon: ServerCog,      tone: "bg-destructive/10 text-destructive",  ring: "ring-destructive/20" },
  backups:   { label: "النسخ الاحتياطي", icon: DatabaseBackup, tone: "bg-muted text-foreground/70",         ring: "ring-border" },
};

const tabs: Array<{ id: Tab; label: string; icon?: any }> = [
  { id: "all",       label: "الكل",           icon: Inbox },
  { id: "unread",    label: "غير المقروءة",   icon: Sparkles },
  { id: "sales",     label: "المبيعات",       icon: TrendingUp },
  { id: "inventory", label: "المخزون",        icon: Boxes },
  { id: "suppliers", label: "الموردون",       icon: Truck },
  { id: "customers", label: "العملاء",        icon: Users },
  { id: "system",    label: "النظام",         icon: ServerCog },
  { id: "backups",   label: "النسخ الاحتياطي", icon: DatabaseBackup },
];

export function useNotifications() {
  const [items, setItems] = useState(notificationFeed);
  const unread = items.filter((n) => n.unread).length;
  const markRead = (id: string) => setItems((p) => p.map((n) => n.id === id ? { ...n, unread: false } : n));
  const markAllRead = () => setItems((p) => p.map((n) => ({ ...n, unread: false })));
  const dismiss = (id: string) => setItems((p) => p.filter((n) => n.id !== id));
  return { items, unread, markRead, markAllRead, dismiss };
}

export function NotificationBellButton({
  unread, onClick,
}: { unread: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="الإشعارات"
      className="relative w-9 h-9 grid place-items-center rounded-lg border border-border bg-card hover:bg-accent transition-colors"
    >
      <Bell className="w-4 h-4" />
      {unread > 0 && (
        <>
          <span className="absolute top-1 start-1 w-4 h-4 rounded-full bg-coral text-coral-foreground text-[9px] font-bold grid place-items-center animate-scale-in shadow-soft">
            {unread > 9 ? "٩+" : new Intl.NumberFormat("ar-EG").format(unread)}
          </span>
          <span className="absolute top-1 start-1 w-4 h-4 rounded-full bg-coral/60 animate-ping opacity-75 pointer-events-none" />
        </>
      )}
    </button>
  );
}

export function NotificationCenter({
  open, onOpenChange, controller,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  controller: ReturnType<typeof useNotifications>;
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("all");
  const { items, unread, markRead, markAllRead, dismiss } = controller;

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length, unread };
    for (const k of Object.keys(categoryMeta)) c[k] = 0;
    for (const n of items) if (n.unread) c[n.category] = (c[n.category] || 0) + 1;
    return c;
  }, [items, unread]);

  const filtered = useMemo(() => {
    if (tab === "all") return items;
    if (tab === "unread") return items.filter((n) => n.unread);
    return items.filter((n) => n.category === tab);
  }, [items, tab]);

  const groups = useMemo(() => {
    const buckets: Record<string, typeof items> = { today: [], week: [], earlier: [] };
    for (const n of filtered) {
      if (n.time.includes("دقيقة") || n.time.includes("دقائق") || n.time.includes("ساعة") || n.time.includes("ساعات")) buckets.today.push(n);
      else if (n.time.includes("أمس") || n.time.includes("يومين")) buckets.week.push(n);
      else buckets.earlier.push(n);
    }
    return buckets;
  }, [filtered]);

  const handleOpen = (id: string, href?: string) => {
    markRead(id);
    if (href) {
      onOpenChange(false);
      navigate({ to: href });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        dir="rtl"
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 border-e border-border bg-background"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-4 border-b border-border space-y-0 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft grid place-items-center text-brand">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="font-display text-base font-semibold">مركز الإشعارات</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-0.5">
                {unread > 0
                  ? `${new Intl.NumberFormat("ar-EG").format(unread)} إشعار غير مقروء بحاجة إلى انتباهك`
                  : "لا توجد إشعارات غير مقروءة — أنت على اطلاع كامل"}
              </SheetDescription>
            </div>
            <button
              onClick={markAllRead}
              disabled={unread === 0}
              className="text-xs font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              تعليم الكل كمقروء
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 -mx-1 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 px-1 pb-1">
              {tabs.map((t) => {
                const active = tab === t.id;
                const count = counts[t.id];
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium whitespace-nowrap border transition",
                      active
                        ? "bg-brand text-brand-foreground border-brand shadow-soft"
                        : "bg-card border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {t.icon && <t.icon className="w-3.5 h-3.5" />}
                    <span>{t.label}</span>
                    {count > 0 && (
                      <span className={cn(
                        "text-[10px] font-semibold px-1.5 rounded-full min-w-[18px] text-center",
                        active ? "bg-brand-foreground/20 text-brand-foreground" : "bg-muted text-foreground/70",
                      )}>
                        {new Intl.NumberFormat("ar-EG").format(count)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </SheetHeader>

        {/* Body */}
        <ScrollArea className="flex-1">
          {filtered.length === 0 ? (
            <EmptyNotifications tab={tab} />
          ) : (
            <div className="p-3 space-y-6">
              {groups.today.length > 0 && (
                <NotificationGroup title="اليوم" items={groups.today} onOpen={handleOpen} onDismiss={dismiss} />
              )}
              {groups.week.length > 0 && (
                <NotificationGroup title="هذا الأسبوع" items={groups.week} onOpen={handleOpen} onDismiss={dismiss} />
              )}
              {groups.earlier.length > 0 && (
                <NotificationGroup title="أقدم" items={groups.earlier} onOpen={handleOpen} onDismiss={dismiss} />
              )}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 px-5 py-3 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <Switch defaultChecked className="scale-75" />
            <span>تفعيل الإشعارات الفورية</span>
          </label>
          <button
            onClick={() => { onOpenChange(false); navigate({ to: "/settings" }); }}
            className="text-xs font-medium flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
          >
            <Settings2 className="w-3.5 h-3.5" />
            إعدادات الإشعارات
            <ChevronLeft className="w-3 h-3" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NotificationGroup({
  title, items, onOpen, onDismiss,
}: {
  title: string;
  items: typeof notificationFeed;
  onOpen: (id: string, href?: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <div className="px-2 mb-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {title}
      </div>
      <div className="space-y-1.5">
        {items.map((n, i) => (
          <NotificationItem
            key={n.id}
            n={n}
            onOpen={onOpen}
            onDismiss={onDismiss}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationItem({
  n, onOpen, onDismiss, index,
}: {
  n: (typeof notificationFeed)[number];
  onOpen: (id: string, href?: string) => void;
  onDismiss: (id: string) => void;
  index: number;
}) {
  const meta = categoryMeta[n.category];
  return (
    <div
      className={cn(
        "group relative p-3 rounded-xl border transition-all cursor-pointer animate-fade-in",
        n.unread
          ? "bg-brand-soft/40 border-brand/15 hover:border-brand/30"
          : "bg-card border-border hover:border-border/80 hover:bg-accent/40",
      )}
      style={{ animationDelay: `${Math.min(index, 6) * 30}ms` }}
      onClick={() => onOpen(n.id, n.actionHref)}
    >
      {n.unread && (
        <span className="absolute top-3.5 start-3 w-2 h-2 rounded-full bg-brand ring-4 ring-brand/15" />
      )}

      <div className={cn("flex gap-3", n.unread && "ps-4")}>
        <div className={cn("w-9 h-9 rounded-lg grid place-items-center shrink-0 ring-1", meta.tone, meta.ring)}>
          <meta.icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <div className={cn("text-sm leading-tight", n.unread ? "font-semibold text-foreground" : "font-medium text-foreground/90")}>
              {n.title}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
              className="ms-auto -mt-1 -me-1 w-6 h-6 grid place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground opacity-0 group-hover:opacity-100 transition"
              aria-label="حذف الإشعار"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {n.desc}
          </p>

          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-medium text-muted-foreground/80">{n.time}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground/80">{meta.label}</span>
            {n.meta && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="text-[10px] font-mono text-muted-foreground/80">{n.meta}</span>
              </>
            )}
            {n.actionLabel && (
              <button
                onClick={(e) => { e.stopPropagation(); onOpen(n.id, n.actionHref); }}
                className="ms-auto text-[11px] font-semibold text-brand hover:text-brand/80 flex items-center gap-0.5 transition"
              >
                {n.actionLabel}
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyNotifications({ tab }: { tab: Tab }) {
  const isUnread = tab === "unread";
  return (
    <div className="text-center py-20 px-6 animate-fade-in">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-3xl bg-brand-soft animate-pulse" />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-soft to-brand/10 grid place-items-center text-brand ring-1 ring-brand/20 shadow-soft">
          {isUnread ? <CheckCheck className="w-8 h-8" /> : <Inbox className="w-8 h-8" />}
        </div>
      </div>
      <div className="mt-5 font-display font-semibold text-base">
        {isUnread ? "أنت على اطلاع كامل" : "لا توجد إشعارات في هذا القسم"}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
        {isUnread
          ? "لقد راجعت كل الإشعارات — سنُبلغك فور وجود أي تحديث يستحق انتباهك."
          : "ستظهر الإشعارات هنا فور وقوع أي حدث ذي صلة في متجرك."}
      </p>
    </div>
  );
}
