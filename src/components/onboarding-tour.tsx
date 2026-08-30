import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowLeft, ArrowRight, Check, X, Command,
  LayoutDashboard, CreditCard, Boxes, Wallet, Settings as SettingsIcon, PartyPopper,
} from "lucide-react";

const STORAGE_KEY = "zk.onboarding.v1";
const TOUR_EVENT = "zk:tour:start";

export function startOnboardingTour() {
  window.dispatchEvent(new Event(TOUR_EVENT));
}

type Step = {
  id: string;
  target?: string;
  title: string;
  body: string;
  icon: any;
  badge?: string;
  placement?: "start" | "center";
};

const steps: Step[] = [
  {
    id: "welcome",
    title: "أهلًا بك في زيرو كشك",
    body: "دقيقة واحدة فقط ونعرّفك على مساحة العمل: من لوحة التحكم إلى نقطة البيع والمخزون والمالية. يمكنك تخطّي الجولة في أي وقت وإعادتها من الإعدادات.",
    icon: Sparkles,
    badge: "جولة تعريفية",
    placement: "center",
  },
  {
    id: "workspace",
    target: "[data-tour='workspace']",
    title: "مساحة العمل والفروع",
    body: "هنا هوية منشأتك. اضغط للتبديل بين الفروع — الزمالك، المعادي، وبقية الفروع — دون الخروج من الشاشة الحالية.",
    icon: Sparkles,
  },
  {
    id: "search",
    target: "[data-tour='search']",
    title: "البحث الشامل ولوحة الأوامر",
    body: "ابحث عن أي منتج أو عميل أو مورّد أو فاتورة، أو نفّذ إجراءً سريعًا. اضغط Ctrl + K من أي مكان.",
    icon: Command,
    badge: "⌘K",
  },
  {
    id: "overview",
    target: "[data-tour='nav-overview']",
    title: "نظرة عامة",
    body: "لوحة التحكم والتحليلات والتقارير: مؤشرات الأداء اليومية، اتجاه المبيعات، وأكثر الأصناف حركة في مكان واحد.",
    icon: LayoutDashboard,
  },
  {
    id: "selling",
    target: "[data-tour='nav-selling']",
    title: "البيع",
    body: "نقطة البيع للكاشير، سجل المبيعات والمرتجعات، وملفات العملاء وبرنامج الولاء.",
    icon: CreditCard,
  },
  {
    id: "inventory",
    target: "[data-tour='nav-inventory']",
    title: "المخزون",
    body: "الكتالوج، أرصدة المخزون وحدود إعادة الطلب، أوامر الشراء، وملفات المورّدين — دورة الشراء كاملة.",
    icon: Boxes,
  },
  {
    id: "operations",
    target: "[data-tour='nav-operations']",
    title: "التشغيل",
    body: "المالية والمصروفات، إدارة الفروع والموظفين، الأدوار والصلاحيات، وسجل النشاط لكل عملية حسّاسة.",
    icon: Wallet,
  },
  {
    id: "account",
    target: "[data-tour='nav-account']",
    title: "الحساب والإعدادات",
    body: "الإشعارات وإعدادات المنشأة والضرائب والاشتراك. ومن هنا تُعيد تشغيل هذه الجولة وقتما تشاء.",
    icon: SettingsIcon,
  },
  {
    id: "help",
    target: "[data-tour='help']",
    title: "مركز المساعدة الذكي",
    body: "زر المساعدة يفتح دليلًا كاملًا للصفحة التي تقف عليها: شرح كل بطاقة وجدول وزر، وأفضل الممارسات والأخطاء الشائعة.",
    icon: Sparkles,
  },
  {
    id: "notifications",
    target: "[data-tour='notifications']",
    title: "مركز الإشعارات",
    body: "تنبيهات المخزون المنخفض، أوامر الشراء المتأخرة، النسخ الاحتياطية، وإغلاق الورديات — مصنّفة وقابلة للتنفيذ فورًا.",
    icon: PartyPopper,
  },
  {
    id: "done",
    title: "أنت جاهز للبدء",
    body: "ابدأ من لوحة التحكم لقراءة أداء اليوم، أو افتح نقطة البيع مباشرة. الجولة متاحة دائمًا من الإعدادات ← الجولة التعريفية.",
    icon: Check,
    badge: "تم",
    placement: "center",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

export function OnboardingTour() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const step = steps[i]!;

  // First-time auto start + manual restart event
  useEffect(() => {
    setMounted(true);
    const begin = () => { setI(0); setOpen(true); };
    window.addEventListener(TOUR_EVENT, begin);
    let done = true;
    try { done = localStorage.getItem(STORAGE_KEY) === "done"; } catch { /* ignore */ }
    if (!done) {
      const t = setTimeout(begin, 700);
      return () => { clearTimeout(t); window.removeEventListener(TOUR_EVENT, begin); };
    }
    return () => window.removeEventListener(TOUR_EVENT, begin);
  }, []);

  const measure = useCallback(() => {
    if (!step.target) { setRect(null); return; }
    const el = document.querySelector(step.target) as HTMLElement | null;
    if (!el) { setRect(null); return; }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step.target]);

  useLayoutEffect(() => {
    if (!open) return;
    measure();
    const onChange = () => measure();
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, true);
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange, true);
    };
  }, [open, measure]);

  const finish = useCallback((complete: boolean) => {
    try { localStorage.setItem(STORAGE_KEY, "done"); } catch { /* ignore */ }
    setOpen(false);
    if (complete) navigate({ to: "/" });
  }, [navigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); finish(false); }
      if (e.key === "ArrowLeft") setI((v) => Math.min(v + 1, steps.length - 1));
      if (e.key === "ArrowRight") setI((v) => Math.max(v - 1, 0));
      if (e.key === "Enter") {
        if (i === steps.length - 1) finish(true); else setI((v) => v + 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, i, finish]);

  if (!mounted || !open) return null;

  const pad = 8;
  const spot = rect
    ? { top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }
    : null;

  // Card position: beside spotlight (to its left in RTL sidebar layout), else centered
  const cardWidth = 380;
  let cardStyle: React.CSSProperties = {};
  if (spot) {
    const gap = 16;
    let left = spot.left - cardWidth - gap;
    if (left < 16) left = Math.min(spot.left + spot.width + gap, window.innerWidth - cardWidth - 16);
    const top = Math.max(16, Math.min(spot.top, window.innerHeight - 300));
    cardStyle = { position: "fixed", top, left, width: cardWidth };
  }

  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[100]" dir="rtl" role="dialog" aria-modal="true" aria-label="الجولة التعريفية">
      {/* Dimmed backdrop with spotlight cutout */}
      {spot ? (
        <div
          className="pointer-events-auto absolute rounded-xl transition-all duration-500 ease-out ring-2 ring-brand/70"
          style={{
            top: spot.top, left: spot.left, width: spot.width, height: spot.height,
            boxShadow: "0 0 0 9999px rgba(3, 25, 22, 0.62)",
          }}
          onClick={() => finish(false)}
        >
          <span className="absolute inset-0 rounded-xl animate-pulse ring-4 ring-brand/20" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[rgba(3,25,22,0.7)] backdrop-blur-[2px] animate-in fade-in duration-300" onClick={() => finish(false)} />
      )}

      {/* Tour card */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={cardStyle}
        className={
          spot
            ? "z-10 rounded-2xl border border-border bg-card shadow-elevated p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,92vw)] rounded-3xl border border-border bg-card shadow-elevated p-8 text-center animate-in fade-in zoom-in-95 duration-300"
        }
      >
        <div className={`flex items-center gap-2.5 ${spot ? "" : "justify-center"}`}>
          <div className={`rounded-xl bg-brand-soft text-brand grid place-items-center ${spot ? "w-9 h-9" : "w-14 h-14"}`}>
            <Icon className={spot ? "w-4.5 h-4.5" : "w-7 h-7"} strokeWidth={1.75} />
          </div>
          {step.badge && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-coral/12 text-coral">{step.badge}</span>
          )}
          {spot && (
            <button
              onClick={() => finish(false)}
              className="ms-auto text-muted-foreground hover:text-foreground"
              aria-label="إغلاق الجولة"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className={`font-display font-semibold ${spot ? "mt-3 text-[16px]" : "mt-5 text-2xl"}`}>{step.title}</div>
        <p className={`text-muted-foreground leading-relaxed ${spot ? "mt-1.5 text-[13px]" : "mt-2.5 text-sm max-w-md mx-auto"}`}>
          {step.body}
        </p>

        {/* Progress */}
        <div className={`flex items-center gap-3 ${spot ? "mt-4" : "mt-6 justify-center"}`}>
          <div className="flex items-center gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                aria-label={`الخطوة ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === i ? "w-6 bg-brand" : idx < i ? "w-1.5 bg-brand/50" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground ms-auto tabular-nums">
            {i + 1} / {steps.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-l from-brand to-coral transition-all duration-500"
            style={{ width: `${((i + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className={`flex items-center gap-2 ${spot ? "mt-4" : "mt-6 justify-center"}`}>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => finish(false)}
          >
            تخطّي الجولة
          </Button>
          <div className={`flex items-center gap-2 ${spot ? "ms-auto" : ""}`}>
            {i > 0 && (
              <Button size="sm" variant="outline" onClick={() => setI(i - 1)}>
                <ArrowRight className="w-4 h-4 ms-1" /> السابق
              </Button>
            )}
            {i === steps.length - 1 ? (
              <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={() => finish(true)}>
                <Check className="w-4 h-4 ms-1" /> ابدأ العمل
              </Button>
            ) : (
              <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={() => setI(i + 1)}>
                {i === 0 ? "لنبدأ" : "التالي"} <ArrowLeft className="w-4 h-4 me-1" />
              </Button>
            )}
          </div>
        </div>

        {!spot && (
          <div className="mt-3 text-[11px] text-muted-foreground">
            استخدم أسهم لوحة المفاتيح للتنقل · Esc للإغلاق
          </div>
        )}
      </div>
    </div>
  );
}
