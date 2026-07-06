import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Truck, Users, Receipt,
  BarChart3, Wallet, Store, UserCog, Shield, Settings, Bell,
  Search, Command, ChevronsUpDown, Boxes, ScrollText, CreditCard,
  LineChart, Sparkles,
} from "lucide-react";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nav = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/analytics", label: "Analytics", icon: LineChart },
      { to: "/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    label: "Sell",
    items: [
      { to: "/pos", label: "Point of Sale", icon: CreditCard },
      { to: "/sales", label: "Sales", icon: Receipt },
      { to: "/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Stock",
    items: [
      { to: "/products", label: "Products", icon: Package },
      { to: "/inventory", label: "Inventory", icon: Boxes },
      { to: "/purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
      { to: "/suppliers", label: "Suppliers", icon: Truck },
    ],
  },
  {
    label: "Operate",
    items: [
      { to: "/finance", label: "Finance", icon: Wallet },
      { to: "/expenses", label: "Expenses", icon: Receipt },
      { to: "/branches", label: "Branches", icon: Store },
      { to: "/employees", label: "Employees", icon: UserCog },
      { to: "/roles", label: "Roles & Permissions", icon: Shield },
      { to: "/activity", label: "Activity Logs", icon: ScrollText },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

export function AppShell({ title, subtitle, actions, children }: {
  title: string; subtitle?: string; actions?: ReactNode; children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openCmd, setOpenCmd] = useState(false);

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
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="h-16 px-5 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl bg-brand grid place-items-center text-brand-foreground font-bold shadow-soft">
            Z
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-[15px]">Zero Kiosk</div>
            <div className="text-[11px] text-muted-foreground">زيرو كشك</div>
          </div>
          <button className="ml-auto text-muted-foreground hover:text-foreground">
            <ChevronsUpDown className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-3 border-b border-sidebar-border">
          <button
            onClick={() => setOpenCmd(true)}
            className="w-full flex items-center gap-2 text-sm rounded-lg border border-sidebar-border bg-background/60 px-3 py-2 text-muted-foreground hover:bg-accent transition"
          >
            <Search className="w-4 h-4" />
            <span>Search…</span>
            <kbd className="ml-auto text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {nav.map((section) => (
            <div key={section.label}>
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
              <AvatarFallback className="bg-brand text-brand-foreground text-xs">LM</AvatarFallback>
            </Avatar>
            <div className="leading-tight flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Laila Mostafa</div>
              <div className="text-[11px] text-muted-foreground truncate">Owner · Zamalek</div>
            </div>
            <Badge variant="secondary" className="bg-brand-soft text-brand text-[10px]">Pro</Badge>
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
              {actions}
              <button
                onClick={() => setOpenCmd(true)}
                className="hidden md:inline-flex items-center gap-2 text-xs rounded-lg border border-border bg-card px-3 py-1.5 text-muted-foreground hover:bg-accent"
              >
                <Command className="w-3.5 h-3.5" /> Quick actions
              </button>
              <Link to="/notifications" className="relative w-9 h-9 grid place-items-center rounded-lg border border-border bg-card hover:bg-accent">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral" />
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>

      <CommandDialog open={openCmd} onOpenChange={setOpenCmd}>
        <CommandInput placeholder="Search products, orders, customers, actions…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Go to">
            <CmdLink to="/" label="Dashboard" icon={<LayoutDashboard className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/pos" label="Point of Sale" icon={<CreditCard className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/inventory" label="Inventory" icon={<Boxes className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/purchase-orders" label="Purchase Orders" icon={<ShoppingCart className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/suppliers" label="Suppliers" icon={<Truck className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/customers" label="Customers" icon={<Users className="w-4 h-4" />} setOpen={setOpenCmd} />
            <CmdLink to="/analytics" label="Analytics" icon={<LineChart className="w-4 h-4" />} setOpen={setOpenCmd} />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick actions">
            <CommandItem><Sparkles className="w-4 h-4 mr-2 text-coral" />Create new purchase order</CommandItem>
            <CommandItem><Sparkles className="w-4 h-4 mr-2 text-coral" />Add new product</CommandItem>
            <CommandItem><Sparkles className="w-4 h-4 mr-2 text-coral" />Open cash drawer</CommandItem>
            <CommandItem><Sparkles className="w-4 h-4 mr-2 text-coral" />Export today's sales report</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

function CmdLink({ to, label, icon, setOpen }: { to: string; label: string; icon: ReactNode; setOpen: (v: boolean) => void }) {
  return (
    <CommandItem onSelect={() => { setOpen(false); window.location.href = to; }}>
      <span className="mr-2">{icon}</span>{label}
    </CommandItem>
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
    Completed: "bg-success/10 text-success",
    "In Stock": "bg-success/10 text-success",
    Active: "bg-success/10 text-success",
    Delivered: "bg-success/10 text-success",
    Approved: "bg-brand-soft text-brand",
    Paid: "bg-brand-soft text-brand",
    Pending: "bg-warning/15 text-warning",
    "Low Stock": "bg-warning/15 text-warning",
    Onboarding: "bg-warning/15 text-warning",
    "On Leave": "bg-warning/15 text-warning",
    Refunded: "bg-coral/15 text-coral",
    Critical: "bg-destructive/10 text-destructive",
    "Out of Stock": "bg-destructive/10 text-destructive",
    Cancelled: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: {
  icon: any; title: string; description: string; action?: ReactNode;
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-soft grid place-items-center text-brand">
        <Icon className="w-6 h-6" />
      </div>
      <div className="mt-4 font-display font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">{description}</div>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
