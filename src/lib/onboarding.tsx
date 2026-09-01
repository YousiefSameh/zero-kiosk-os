import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowLeft, ArrowRight, X, Check, Compass, Keyboard,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Tour definition                                                     */
/* ------------------------------------------------------------------ */

export type TourStep = {
  /** data-tour value of the element to highlight. Omit for a centered modal step. */
  target?: string;
  /** Route to navigate to before showing the step. */
  route?: string;
  badge?: string;
  title: string;
  body: string;
  tips?: string[];
};

const STORAGE_KEY = "zk-onboarding-v1";

export const tourSteps: TourStep[] = [
  {
    badge: "مرحبًا",
    title: "أهلًا بك في زيرو كشك 👋",
    body:
      "زيرو كشك هو نظام تشغيل متجرك: البيع، المخزون، الشراء، الموردون، المالية والفروع في مكان واحد. سنأخذك في جولة قصيرة (أقل من دقيقة) لتتعرّف على كل قسم ومتى تستخدمه.",
    tips: ["يمكنك التخطي في أي وقت وإعادة الجولة من الإعدادات", "استخدم ← → للتنقل بين الخطوات"],
  },
  {
    target: "sidebar",
    badge: "التنقل",
    title: "الشريط الجانبي",
    body:
      "كل وحدات النظام مُجمَّعة هنا في خمس مجموعات: نظرة عامة، البيع، المخزون، التشغيل، والحساب. المجموعة تتبع رحلة يوم العمل من الصباح حتى الإغلاق.",
  },
  {
    target: "search",
    badge: "الأسرع",
    title: "ابحث في كل شيء",
    body:
      "لوحة الأوامر تفتح بـ Ctrl + K وتبحث في الصفحات والمنتجات والعملاء والموردين والفواتير وأوامر الشراء — ثم تنتقل إليها بضغطة Enter.",
    tips: ["Ctrl + K في أي مكان داخل النظام"],
  },
  {
    target: "nav-/",
    route: "/",
    badge: "نظرة عامة",
    title: "لوحة التحكم",
    body:
      "نقطة البداية كل صباح: مبيعات اليوم، متوسط قيمة السلة، التنبيهات الحرجة، وأداء الفروع. إن كان رقم واحد غير متوقع، ابدأ التحقيق من هنا.",
  },
  {
    target: "nav-/analytics",
    route: "/analytics",
    badge: "نظرة عامة",
    title: "التحليلات",
    body:
      "الاتجاهات على المدى الأطول: نمو الإيرادات، الأصناف الأكثر ربحية، ساعات الذروة، وسلوك العملاء. استخدمها لقرارات التسعير والتشكيلة.",
  },
  {
    target: "nav-/reports",
    route: "/reports",
    badge: "نظرة عامة",
    title: "التقارير",
    body:
      "تقارير جاهزة للتصدير: المبيعات، الضرائب، الجرد، والمصروفات. مناسبة للمحاسب ولمراجعات نهاية الشهر.",
  },
  {
    target: "nav-/pos",
    route: "/pos",
    badge: "البيع",
    title: "نقطة البيع",
    body:
      "شاشة الكاشير: بحث سريع بالباركود، سلة، خصومات باعتماد المدير، طرق دفع متعددة، وطباعة فاتورة ضريبية. تعمل أيضًا دون اتصال وتُزامن لاحقًا.",
  },
  {
    target: "nav-/sales",
    route: "/sales",
    badge: "البيع",
    title: "المبيعات",
    body:
      "سجل كل الفواتير مع حالتها (مدفوع، مُسترد، مُلغى). من هنا تراجع المرتجعات وتتحقق من ورديات الكاشير.",
  },
  {
    target: "nav-/customers",
    route: "/customers",
    badge: "البيع",
    title: "العملاء",
    body:
      "ملفات العملاء ونقاط الولاء ومتوسط الشراء. اربط الفواتير بالعميل لتفعيل المكافآت والعروض الموجّهة.",
  },
  {
    target: "nav-/products",
    route: "/products",
    badge: "المخزون",
    title: "المنتجات",
    body:
      "الكتالوج ومصدر الحقيقة للأسعار والباركود والتصنيفات. أي خطأ هنا يظهر فورًا في نقطة البيع، فابدأ الإعداد من هذه الصفحة.",
  },
  {
    target: "nav-/inventory",
    route: "/inventory",
    badge: "المخزون",
    title: "المخزون",
    body:
      "الكميات الفعلية، نقاط إعادة الطلب، والأصناف الحرجة. قائمة إعادة الطلب تحوّل النقص إلى أمر شراء بضغطة واحدة.",
  },
  {
    target: "nav-/purchase-orders",
    route: "/purchase-orders",
    badge: "المخزون",
    title: "أوامر الشراء",
    body:
      "من المسودة إلى الاعتماد إلى الاستلام. الاستلام الجزئي مدعوم، وكل استلام يُحدّث المخزون والتكلفة تلقائيًا.",
  },
  {
    target: "nav-/suppliers",
    route: "/suppliers",
    badge: "المخزون",
    title: "الموردون",
    body:
      "بيانات الموردين، شروط السداد، ومؤشرات الالتزام بالتسليم. استخدمها للتفاوض على أسعار أفضل.",
  },
  {
    target: "nav-/finance",
    route: "/finance",
    badge: "التشغيل",
    title: "المالية",
    body:
      "التدفق النقدي، الأرباح، والذمم. تربط المبيعات والمصروفات في صورة واحدة لصحة المتجر.",
  },
  {
    target: "nav-/expenses",
    route: "/expenses",
    badge: "التشغيل",
    title: "المصروفات",
    body:
      "الإيجار، الرواتب، الكهرباء، والصيانة. تسجيلها بانتظام هو ما يجعل رقم الربح صحيحًا.",
  },
  {
    target: "nav-/branches",
    route: "/branches",
    badge: "التشغيل",
    title: "الفروع",
    body:
      "مقارنة أداء الفروع وإدارة إعداداتها ومخزونها. مناسبة لقرارات التوسع ونقل المخزون.",
  },
  {
    target: "nav-/employees",
    route: "/employees",
    badge: "التشغيل",
    title: "الموظفون",
    body:
      "الفريق، الورديات، والصلاحيات الفردية. كل حساب مرتبط بسجل نشاط لتتبّع المسؤولية.",
  },
  {
    target: "nav-/roles",
    route: "/roles",
    badge: "التشغيل",
    title: "الأدوار والصلاحيات",
    body:
      "حدّد ما يمكن لكل دور فعله: كاشير، مشرف، مدير مخزون، مالك. القاعدة الذهبية: أقل صلاحية كافية.",
  },
  {
    target: "nav-/activity",
    route: "/activity",
    badge: "التشغيل",
    title: "سجل النشاط",
    body:
      "أثر تدقيق كامل لكل تغيير: من فعل ماذا ومتى. أول مكان تفتحه عند أي فرق غير مفهوم.",
  },
  {
    target: "nav-/notifications",
    route: "/notifications",
    badge: "الحساب",
    title: "الإشعارات",
    body:
      "كل التنبيهات مُصنّفة: مبيعات، مخزون، موردون، نظام ونسخ احتياطي — مع إجراء مباشر لكل تنبيه.",
  },
  {
    target: "nav-/settings",
    route: "/settings",
    badge: "الحساب",
    title: "الإعدادات",
    body:
      "بيانات المنشأة والرقم الضريبي، الفوترة الإلكترونية، وضع دون اتصال، والاشتراك. ومن هنا أيضًا تعيد تشغيل هذه الجولة في أي وقت.",
  },
  {
    target: "help",
    badge: "المساعدة",
    title: "مركز المساعدة السياقي",
    body:
      "زر المساعدة يفتح دليلًا كاملًا للصفحة التي تقف عليها: شرح كل بطاقة وجدول وزر، أفضل الممارسات، والأخطاء الشائعة.",
  },
  {
    target: "notifications",
    badge: "التنبيهات",
    title: "جرس الإشعارات",
    body: "الشارة المرجانية تعني وجود تنبيهات غير مقروءة. اضغط الجرس لمراجعتها والتعامل معها فورًا.",
  },
  {
    badge: "انتهت الجولة",
    title: "أنت جاهز للبدء 🎉",
    body:
      "الترتيب الموصى به للإعداد: بيانات المنشأة ← المنتجات ← المخزون ← الموردون ← أوامر الشراء ← تدريب الكاشير على نقطة البيع.",
    tips: ["أعد الجولة في أي وقت من الإعدادات ← الجولة التعريفية"],
  },
];

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

let tourActive = false;
let tourIndex = 0;
const listeners = new Set<(v: { active: boolean; index: number }) => void>();

function emit() {
  const snap = { active: tourActive, index: tourIndex };
  listeners.forEach((l) => l(snap));
}

export function setTourIndex(i: number) {
  tourIndex = i;
  emit();
}

export function startTour() {
  tourActive = true;
  tourIndex = 0;
  emit();
}

export function endTour(completed: boolean) {
  tourActive = false;
  try {
    localStorage.setItem(STORAGE_KEY, completed ? "completed" : "skipped");
  } catch {
    /* ignore */
  }
  emit();
}

export function useTourState() {
  const [snap, setSnap] = useState({ active: tourActive, index: tourIndex });
  useEffect(() => {
    setSnap({ active: tourActive, index: tourIndex });
    listeners.add(setSnap);
    return () => {
      listeners.delete(setSnap);
    };
  }, []);
  return snap;
}

/* ------------------------------------------------------------------ */
/* Overlay                                                             */
/* ------------------------------------------------------------------ */

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 8;

export function OnboardingTour() {
  const { active, index } = useTourState();
  const navigate = useNavigate();
  const [rect, setRect] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ w: 420, h: 260 });

  const step = tourSteps[Math.min(index, tourSteps.length - 1)];
  const total = tourSteps.length;

  /* auto-start for first-time visitors */
  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (!seen) {
      const t = setTimeout(() => startTour(), 700);
      return () => clearTimeout(t);
    }
  }, []);

  /* navigate for steps bound to a route */
  useEffect(() => {
    if (!active || !step?.route) return;
    navigate({ to: step.route as never });
  }, [active, step?.route, navigate]);

  /* measure the highlighted target */
  const measure = useCallback(() => {
    if (!step?.target) {
      setRect(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step?.target]);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
    const id = window.setTimeout(measure, 260);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, measure, index]);

  useLayoutEffect(() => {
    if (!active || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setCardSize({ w: r.width, h: r.height });
  }, [active, index, step?.title]);

  const next = useCallback(() => {
    if (tourIndex >= total - 1) endTour(true);
    else setTourIndex(tourIndex + 1);
  }, [total]);

  const prev = useCallback(() => setTourIndex(Math.max(0, tourIndex - 1)), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") endTour(false);
      // RTL: ArrowLeft moves forward
      else if (e.key === "ArrowLeft") next();
      else if (e.key === "ArrowRight") prev();
      else if (e.key === "Enter") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, next, prev]);

  /* card position */
  const cardStyle = useMemo(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const M = 16;
    if (!rect) {
      return {
        top: Math.max(M, vh / 2 - cardSize.h / 2),
        left: Math.max(M, vw / 2 - cardSize.w / 2),
      };
    }
    const spaceLeft = rect.left;
    const spaceRight = vw - (rect.left + rect.width);
    const spaceBelow = vh - (rect.top + rect.height);

    let left: number;
    let top: number;

    if (spaceLeft >= cardSize.w + M * 2) {
      left = rect.left - cardSize.w - PAD - M;
      top = rect.top + rect.height / 2 - cardSize.h / 2;
    } else if (spaceRight >= cardSize.w + M * 2) {
      left = rect.left + rect.width + PAD + M;
      top = rect.top + rect.height / 2 - cardSize.h / 2;
    } else if (spaceBelow >= cardSize.h + M * 2) {
      left = rect.left + rect.width / 2 - cardSize.w / 2;
      top = rect.top + rect.height + PAD + M;
    } else {
      left = rect.left + rect.width / 2 - cardSize.w / 2;
      top = rect.top - cardSize.h - PAD - M;
    }

    left = Math.min(Math.max(M, left), Math.max(M, vw - cardSize.w - M));
    top = Math.min(Math.max(M, top), Math.max(M, vh - cardSize.h - M));
    return { top, left };
  }, [rect, cardSize.w, cardSize.h]);

  if (!active || !step) return null;

  const pct = Math.round(((index + 1) / total) * 100);

  return (
    <div dir="rtl" className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="الجولة التعريفية">
      {/* Dimmer + spotlight (single element, animated) */}
      {rect ? (
        <div
          className="pointer-events-none fixed rounded-xl transition-all duration-300 ease-out"
          style={{
            top: rect.top - PAD,
            left: rect.left - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            boxShadow: "0 0 0 9999px color-mix(in oklab, var(--foreground) 62%, transparent)",
            outline: "2px solid var(--brand)",
            outlineOffset: "2px",
          }}
        >
          <span className="absolute inset-0 rounded-xl animate-pulse ring-4 ring-brand/25" />
        </div>
      ) : (
        <div
          className="fixed inset-0 animate-in fade-in duration-300"
          style={{ backgroundColor: "color-mix(in oklab, var(--foreground) 62%, transparent)" }}
          onClick={() => endTour(false)}
        />
      )}

      {/* Card */}
      <div
        ref={cardRef}
        className="fixed w-[min(92vw,420px)] rounded-2xl border border-border bg-card shadow-elevated transition-all duration-300 ease-out animate-in fade-in zoom-in-95"
        style={cardStyle}
      >
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
              <Sparkles className="w-3 h-3" />
              {step.badge ?? "الجولة"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              الخطوة {index + 1} من {total}
            </span>
            <button
              onClick={() => endTour(false)}
              aria-label="تخطي الجولة"
              className="ms-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 font-display text-[17px] font-semibold">{step.title}</div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          {step.tips && step.tips.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {step.tips.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[12px] text-foreground/80">
                  <Keyboard className="w-3.5 h-3.5 mt-0.5 text-brand shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Progress */}
        <div className="px-5">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="px-5 py-4 flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => endTour(false)}>
            تخطي الجولة
          </Button>
          <div className="ms-auto flex items-center gap-2">
            {index > 0 && (
              <Button size="sm" variant="outline" onClick={prev}>
                <ArrowRight className="w-4 h-4 ms-1.5" />
                السابق
              </Button>
            )}
            <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={next}>
              {index === total - 1 ? (
                <>
                  <Check className="w-4 h-4 ms-1.5" />
                  ابدأ العمل
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4 ms-1.5" />
                  التالي
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Button to (re)start the guided tour — used in Settings. */
export function RestartTourButton({ className = "" }: { className?: string }) {
  return (
    <Button size="sm" variant="outline" className={className} onClick={() => startTour()}>
      <Compass className="w-4 h-4 ms-1.5" />
      إعادة تشغيل الجولة
    </Button>
  );
}
