import { useRef, useState } from "react";
import { Reveal } from "./reveal";
import { Eyebrow, Heading, Lead } from "./primitives";
import { AppFrame, BranchesPanel, InventoryPanel, PosPanel, ReportsPanel } from "./product-panels";

const tabs = [
  {
    id: "pos",
    label: "البيع",
    outcome: "بيعة في ثوانٍ، وبدون أخطاء سعر",
    body: "الكاشير بيمسح الباركود، الخصم بيتحسب لوحده، والفاتورة بتتسجل على الفرع والوردية والموظف.",
    path: "zerokiosk.com/pos",
    alt: "شاشة نقطة البيع في زيرو كشك مع سلة فاتورة وإجمالي مطلوب",
    Panel: PosPanel,
  },
  {
    id: "inventory",
    label: "المخزون",
    outcome: "تعرف إيه قرب يخلص قبل ما يخلص",
    body: "كل بيعة بتنزّل الرصيد فورًا. النظام بيحسب الصنف بيكفي كام يوم، ويجمع الناقص في أمر شراء واحد للمورد.",
    path: "zerokiosk.com/inventory",
    alt: "جدول المخزون في زيرو كشك يعرض الأصناف التي قربت تخلص ومدة كفايتها",
    Panel: InventoryPanel,
  },
  {
    id: "reports",
    label: "التقارير",
    outcome: "تقفل يومك وإنت عارف عملت إيه",
    body: "مبيعات اليوم مقارنة بأمس، متوسط الفاتورة، والقسم اللي بيجيب ربح فعلي — بدون ما تفتح إكسل.",
    path: "zerokiosk.com/reports",
    alt: "تقرير اليوم في زيرو كشك مع مؤشرات المبيعات ورسم لمبيعات الأسبوع",
    Panel: ReportsPanel,
  },
  {
    id: "branches",
    label: "الفروع",
    outcome: "الفروع كلها في شاشة واحدة",
    body: "قارن الفروع في نفس اللحظة، وشوف مين فوق المستهدف ومين محتاج متابعة — وكل فرع له صلاحياته.",
    path: "zerokiosk.com/branches",
    alt: "مقارنة الفروع في زيرو كشك مع مبيعات كل فرع وحالته",
    Panel: BranchesPanel,
  },
] as const;

export function ProductTour() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const current = tabs[active]!;

  return (
    <section id="product" aria-labelledby="product-title" className="border-b border-hairline bg-card py-20 md:py-28">
      <div className="site-container">
        <Reveal className="max-w-2xl">
          <Eyebrow>المنتج</Eyebrow>
          <Heading id="product-title" className="mt-5 text-ink">
            مش شاشة كاشير. نظام بيمسك المحل من أول البيعة لآخر اليوم.
          </Heading>
          <Lead className="mt-5">اختار أي جزء وشوفه بنفسك — نفس الشاشات اللي هتشتغل عليها.</Lead>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
          <Reveal>
            <div
              role="tablist"
              aria-label="أجزاء النظام"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {tabs.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    role="tab"
                    id={`zk-tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`zk-panel-${t.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        focusTab(i + 1);
                      }
                      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
                        e.preventDefault();
                        focusTab(i - 1);
                      }
                    }}
                    className={`shrink-0 rounded-lg border-s-2 px-4 py-3.5 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:w-full ${
                      on
                        ? "border-s-brand bg-brand-soft/70"
                        : "border-s-hairline hover:border-s-brand/40 hover:bg-sand/70"
                    }`}
                  >
                    <span className={`block font-display text-[15px] font-bold ${on ? "text-brand" : "text-ink"}`}>
                      {t.label}
                    </span>
                    <span className="mt-0.5 hidden text-[12.5px] leading-[1.6] text-ink-soft lg:block">
                      {t.outcome}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div>
            {tabs.map((t, i) => (
              <div
                key={t.id}
                role="tabpanel"
                id={`zk-panel-${t.id}`}
                aria-labelledby={`zk-tab-${t.id}`}
                hidden={i !== active}
              >
                <AppFrame label={t.alt} path={t.path}>
                  <t.Panel />
                </AppFrame>
              </div>
            ))}
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-ink-soft">
              <span className="font-semibold text-ink">{current.outcome}. </span>
              {current.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
