import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowDown,
  CreditCard,
  Boxes,
  ShoppingCart,
  Truck,
  Package,
  UserCog,
  Users,
  Store,
  BarChart3,
  ShieldCheck,
  KeyRound,
  ScrollText,
  Building2,
  Check,
} from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { Reveal } from "./reveal";

/* ------------------------------- primitives ------------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "start" | "center";
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-4 flex items-center gap-2.5 text-[13px] font-semibold tracking-wide text-brand"
             style={align === "center" ? { justifyContent: "center" } : undefined}>
          <span className="h-px w-6 bg-brand/40" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.18] tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[17px] leading-[1.9] text-ink-soft">{description}</p>
      )}
    </Reveal>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}

/* ------------------------------ product showcase ------------------------------ */

export function ProductShowcase() {
  return (
    <Section id="product" className="border-t border-hairline bg-sand-deep/40">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeader
          eyebrow="المنتج"
          title={<>مركز التحكم في محلك، من غير لف ودوران.</>}
          description="شاشة واحدة تجمع مبيعات اليوم، حالة المخزون، وآخر العمليات في كل الفروع. كل رقم تشوفه هنا بيتحدث لحظة بلحظة من نقطة البيع نفسها."
        />
        <Reveal delay={100} className="lg:-mx-6">
          <DashboardPreview />
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------- problem -------------------------------- */

const problems = [
  { n: "٠١", t: "مبيعات في كذا مكان", d: "دفتر، كاشير، وواتساب. والحصر في آخر اليوم بالتخمين." },
  { n: "٠٢", t: "مخزون مش واضح", d: "الصنف بيخلص من الرف قبل ما حد ياخد باله." },
  { n: "٠٣", t: "طلبات الموردين يدوي", d: "كل طلب بمزاج اللحظة، ومفيش سجل لسعر ولا كمية." },
  { n: "٠٤", t: "الموظفين محتاجين متابعة", d: "مين باع إيه، ومين فتح الدرج، ومين عمل مرتجع." },
  { n: "٠٥", t: "أرقام كتير بدون صورة كاملة", d: "معلومات موجودة، لكن مفيش حاجة تربطها ببعضها." },
];

export function ProblemSection() {
  return (
    <Section id="solutions" className="border-t border-hairline">
      <SectionHeader
        eyebrow="الواقع اليومي"
        title={<>إدارة المحل مش مفروض تبقى تخمين.</>}
        description="مش عشان في مشكلة في شغلك — لكن عشان المعلومات متفرقة. ولما تتفرق، القرار بيتأخر."
      />

      <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
        {problems.map((p, i) => (
          <Reveal as="li" key={p.n} delay={i * 60}>
            <div className="group grid gap-3 py-7 transition-colors hover:bg-sand-deep/40 md:grid-cols-[auto_1fr_1.2fr] md:items-baseline md:gap-8 md:px-3">
              <span className="font-display text-sm font-bold text-brand/60">{p.n}</span>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{p.t}</h3>
              <p className="text-[15px] leading-[1.9] text-ink-soft">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="mt-14 flex items-start gap-4 md:items-center">
        <span className="mt-1.5 h-10 w-1 shrink-0 rounded-full bg-coral md:mt-0" />
        <p className="font-display text-[clamp(1.35rem,3vw,2.1rem)] font-bold leading-snug text-ink">
          زيرو كشك يجمع الصورة كلها في مكان واحد.
        </p>
      </Reveal>
    </Section>
  );
}

/* -------------------------------- pillars -------------------------------- */

const pillars = [
  { n: "٠١", t: "السيطرة", d: "اعرف كل اللي بيحصل في محلك." , x: "كل بيعة، كل مرتجع، كل تعديل مخزون — مسجّل باسم صاحبه ووقته." },
  { n: "٠٢", t: "الرؤية", d: "بيانات واضحة بدل التخمين.", x: "مقارنات بالأمس وبالأسبوع اللي فات، ومؤشرات بتلفت نظرك قبل المشكلة." },
  { n: "٠٣", t: "البساطة", d: "كل حاجة في مكان واحد.", x: "نظام واحد للبيع والمخزون والمشتريات والتقارير. بدون برامج متفرقة." },
  { n: "٠٤", t: "النمو", d: "نظام يكبر مع محلك.", x: "فرع، فرعين، أو شبكة — نفس النظام ونفس طريقة الشغل." },
];

export function Pillars() {
  return (
    <Section id="features" className="border-t border-hairline bg-ink text-sand">
      <SectionHeader
        eyebrow="القيمة"
        title={<span className="text-sand">أربع حاجات بس هي اللي فارقة.</span>}
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 80} className="bg-ink">
            <div className="group h-full p-8 transition-colors duration-300 hover:bg-white/[0.04] md:p-10">
              <div className="font-display text-sm font-bold text-coral">{p.n}</div>
              <h3 className="mt-6 font-display text-3xl font-bold text-sand md:text-4xl">{p.t}</h3>
              <p className="mt-3 text-lg text-sand/85">{p.d}</p>
              <p className="mt-5 max-w-sm text-[15px] leading-[1.9] text-sand/55">{p.x}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ modules ------------------------------ */

const modules = [
  { icon: Boxes, t: "المخزون", d: "اعرف إيه قرب يخلص قبل ما يخلص." },
  { icon: ShoppingCart, t: "المشتريات", d: "رتب طلباتك قبل ما الرف يفضى." },
  { icon: Truck, t: "الموردين", d: "أسعار وسجل توريد لكل مورد في مكانه." },
  { icon: Package, t: "المنتجات", d: "كتالوج واحد منظم بباركود وسعر بيع وتكلفة." },
  { icon: UserCog, t: "الموظفين", d: "اعرف مين واقف على الكاشير وشغله عامل إيه." },
  { icon: Users, t: "العملاء", d: "الآجل والحساب والمشتريات المتكررة تحت السيطرة." },
  { icon: Store, t: "الفروع", d: "قارن الفروع من شاشة واحدة." },
  { icon: BarChart3, t: "التقارير", d: "اعرف محلك عمل إيه النهارده." },
];

export function ModuleShowcase() {
  return (
    <Section className="border-t border-hairline">
      <SectionHeader
        eyebrow="وحدات النظام"
        title={<>نظام واحد، وكل جزء بيخدم الجزء اللي بعده.</>}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        {/* featured */}
        <Reveal className="overflow-hidden rounded-2xl border border-hairline bg-card">
          <div className="p-8 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[12px] font-semibold text-brand">
              <CreditCard className="h-3.5 w-3.5" /> نقطة البيع
            </span>
            <h3 className="mt-6 font-display text-3xl font-bold text-ink md:text-4xl">
              البيعة تخلص في ثواني، والباقي بيحصل لوحده.
            </h3>
            <p className="mt-4 max-w-lg text-[16px] leading-[1.9] text-ink-soft">
              كاشير سريع بالباركود، أكثر من طريقة دفع، ومرتجعات مسجّلة. كل فاتورة بتنزل على المخزون والتقارير في نفس اللحظة.
            </p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {["بيع بالباركود", "دفع كاش وفيزا وآجل", "مرتجعات وتسويات", "وردية وتقفيل درج"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px] text-ink">
                  <Check className="h-4 w-4 shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-hairline bg-sand-deep/40 p-5 pb-0 md:p-8 md:pb-0">
            <div className="[mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
              <DashboardPreview compact />
            </div>
          </div>
        </Reveal>

        {/* supporting */}
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((m, i) => (
            <Reveal key={m.t} delay={i * 50} className="h-full">
              <div className="group flex h-full flex-col border-b border-hairline pb-6 transition-colors hover:border-brand/40 sm:border-s sm:border-b-0 sm:ps-6 sm:pb-0">
                <m.icon className="h-5 w-5 text-brand transition-transform duration-300 group-hover:-translate-y-0.5" />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{m.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.8] text-ink-soft">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- operational story --------------------------- */

const flow = [
  { t: "بيع", d: "الكاشير يعمل فاتورة." },
  { t: "المخزون يتحدث", d: "الكميات تنقص فورًا في الفرع." },
  { t: "البيانات تتسجل", d: "الفاتورة تُقيَّد باسم الموظف والوردية." },
  { t: "التقارير تتحدث", d: "أرقام اليوم والهامش تتحرك في نفس اللحظة." },
  { t: "النظام يلفت نظرك", d: "صنف قرب يخلص؟ يوصلك تنبيه بأمر شراء مقترح." },
];

export function OperationalStory() {
  return (
    <Section className="border-t border-hairline bg-sand-deep/40">
      <SectionHeader
        eyebrow="دورة اليوم"
        title={<>من أول البيعة لحد آخر اليوم.</>}
        description="زيرو كشك مش مجموعة شاشات منفصلة. البيعة الواحدة بتحرّك النظام كله."
        align="center"
      />
      <ol className="mx-auto mt-14 max-w-3xl">
        {flow.map((s, i) => (
          <Reveal as="li" key={s.t} delay={i * 90}>
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/25 bg-card font-display text-sm font-bold text-brand">
                  {i + 1}
                </span>
                {i < flow.length - 1 && <span className="my-1 h-14 w-px bg-gradient-to-b from-brand/40 to-hairline" />}
              </div>
              <div className="pt-1.5 pb-6">
                <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{s.t}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.9] text-ink-soft">{s.d}</p>
              </div>
              {i < flow.length - 1 && <ArrowDown className="mt-3 hidden h-4 w-4 text-hairline md:block" />}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------------------- dashboard insight ---------------------------- */

const insights = [
  { t: "مبيعات النهارده", d: "الرقم اللحظي لكل الفروع، مقسّم على الورديات." },
  { t: "مقارنة بأمس", d: "أعلى ولا أقل؟ وبكام في المية؟ من غير حساب يدوي." },
  { t: "أصناف قربت تخلص", d: "قائمة إعادة الطلب جاهزة بحد أدنى لكل صنف." },
  { t: "آخر العمليات", d: "بث مباشر للفواتير والمرتجعات باسم الكاشير." },
  { t: "أداء الموظفين", d: "عدد الفواتير ومتوسط الفاتورة لكل موظف." },
  { t: "التنبيهات المهمة", d: "الحاجات اللي محتاجة قرار منك النهارده فقط." },
];

export function InsightSection() {
  return (
    <Section className="border-t border-hairline">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            eyebrow="مركز التحكم"
            title={<>افتح يومك وإنت عارف إيه اللي بيحصل.</>}
            description="زيرو كشك مش بيخزّن بياناتك وبس — بيساعدك تفهم محلك ويقولك تتصرف في إيه."
          />
          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {insights.map((it, i) => (
              <Reveal key={it.t} delay={i * 50}>
                <dt className="flex items-center gap-2 font-display text-[17px] font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {it.t}
                </dt>
                <dd className="mt-1.5 ps-4 text-[14px] leading-[1.85] text-ink-soft">{it.d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Reveal delay={120}>
          <DashboardPreview />
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ multi branch ------------------------------ */

const branchCards = [
  { name: "فرع الزمالك", city: "القاهرة", pct: 92, value: "٢١٤٫٣ ألف" },
  { name: "فرع المعادي", city: "القاهرة", pct: 72, value: "١٦٨٫٤ ألف" },
  { name: "فرع سموحة", city: "الإسكندرية", pct: 52, value: "١٢١٫٥ ألف" },
];

export function MultiBranch() {
  return (
    <Section className="border-t border-hairline bg-sand-deep/40">
      <SectionHeader
        eyebrow="النمو"
        title={<>كبر محلك من غير ما تكبر اللخبطة.</>}
        description="كل فرع بيشتغل لوحده، وإنت بتشوفهم كلهم من شاشة واحدة: مبيعات، مخزون، وموظفين — بنفس المعايير."
        align="center"
      />

      <div className="mx-auto mt-14 max-w-4xl">
        <Reveal className="rounded-2xl border border-hairline bg-card p-6 md:p-8">
          <div className="flex items-center justify-between gap-3 border-b border-hairline pb-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground">
                <Building2 className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="truncate font-display font-semibold text-ink">نظرة موحّدة على الفروع</div>
                <div className="truncate text-[12px] text-ink-soft">إجمالي مبيعات الأسبوع · ٥٠٤٫٢ ألف ج.م</div>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-success/10 px-3 py-1.5 text-[12px] font-semibold text-success">
              كل الفروع متصلة
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {branchCards.map((b, i) => (
              <Reveal key={b.name} delay={i * 90}>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-ink">{b.name}</div>
                    <div className="text-[12px] text-ink-soft">{b.city}</div>
                  </div>
                  <div className="font-display font-bold text-ink">{b.value} ج.م</div>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sand-deep">
                  <div
                    className="h-full rounded-full bg-brand transition-[width] duration-1000 ease-out"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------- philosophy ------------------------------- */

export function Philosophy() {
  return (
    <Section id="about" className="border-t border-hairline">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <SectionHeader
          eyebrow="عن زيرو كشك"
          title={<>مصمم للمحلات اللي عايزة تكبر.</>}
          description="بنينا زيرو كشك بعد ما شوفنا إزاي المحل المصري بيشتغل فعلًا: سرعة على الكاشير، مورّد بيسلّم بدري، صنف بيخلص في نص اليوم، وصاحب محل عايز رقم يثق فيه."
        />
        <Reveal delay={100} className="space-y-6">
          {[
            { t: "عربي من الأساس", d: "مش ترجمة. الواجهة والأرقام والتقارير كلها من اليمين للشمال وبمصطلحات السوق المصري." },
            { t: "سرعة قبل أي حاجة", d: "الكاشير مش بيستنى النظام. كل شاشة مبنية على إنها تفتح فورًا." },
            { t: "بدون تعقيد إداري", d: "مفيش إعدادات مالهاش لازمة. تبدأ في نفس اليوم وتشتغل." },
          ].map((v) => (
            <div key={v.t} className="border-s-2 border-brand/25 ps-5">
              <h3 className="font-display text-xl font-semibold text-ink">{v.t}</h3>
              <p className="mt-2 text-[15px] leading-[1.9] text-ink-soft">{v.d}</p>
            </div>
          ))}
          <p className="pt-2 text-[14px] leading-[1.9] text-ink-soft/80">
            بنشتغل حاليًا مع أول مجموعة محلات. مساحة قصص العملاء دي محفوظة لحد ما يبقى عندنا نتايج حقيقية نقدر نحكيها بالاسم.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- pricing --------------------------------- */

const plans = [
  { t: "محل واحد", d: "لمحل أو ميني ماركت بكاشير واحد أو اتنين.", f: ["نقطة بيع", "مخزون ومنتجات", "تقارير يومية"] },
  { t: "متعدد الفروع", d: "لما تبقى بتدير أكتر من فرع بنفس النظام.", f: ["كل مميزات محل واحد", "نظرة موحّدة على الفروع", "صلاحيات لكل فرع"], featured: true },
  { t: "مؤسسي", d: "لشبكات المحلات اللي محتاجة تخصيص وتكامل.", f: ["أدوار وصلاحيات متقدمة", "سجل تدقيق كامل", "دعم مخصص"] },
];

export function Pricing() {
  return (
    <Section id="pricing" className="border-t border-hairline bg-sand-deep/40">
      <SectionHeader
        eyebrow="الأسعار"
        title={<>خطة على مقاس محلك.</>}
        description="بنحدد السعر على حسب عدد الفروع ونقاط البيع. تواصل معنا ونرشّحلك الخطة المناسبة من غير مبالغة."
        align="center"
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.t} delay={i * 80} className="h-full">
            <div
              className={`flex h-full flex-col rounded-2xl border p-8 transition-shadow ${
                p.featured
                  ? "border-brand/35 bg-card shadow-[0_28px_60px_-40px_rgba(0,109,96,0.45)]"
                  : "border-hairline bg-card/60 hover:shadow-[0_18px_40px_-32px_rgba(0,55,48,0.4)]"
              }`}
            >
              {p.featured && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-coral/15 px-3 py-1 text-[12px] font-semibold text-coral">
                  الأكثر ملاءمة
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-ink">{p.t}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.85] text-ink-soft">{p.d}</p>
              <ul className="mt-6 space-y-2.5">
                {p.f.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[15px] text-ink">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/dashboard"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-colors ${
                  p.featured
                    ? "bg-brand text-brand-foreground hover:bg-brand-deep"
                    : "border border-hairline text-ink hover:bg-sand-deep"
                }`}
              >
                اطلب عرض السعر
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- trust ---------------------------------- */

const trust = [
  { icon: KeyRound, t: "صلاحيات دقيقة", d: "كل موظف يشوف الشاشات اللي تخصه بس، ومفيش تعديل من غير صلاحية." },
  { icon: Building2, t: "تحكم على مستوى الفرع", d: "بيانات كل فرع منفصلة، والإدارة بتشوف الصورة الكاملة." },
  { icon: ScrollText, t: "سجل تدقيق", d: "كل عملية مسجّلة: مين عملها، إمتى، وإيه اللي اتغير." },
  { icon: ShieldCheck, t: "بيانات متسقة", d: "المخزون والفواتير مرتبطين، فمفيش رقم بيتناقض مع رقم." },
];

export function Trust() {
  return (
    <Section className="border-t border-hairline">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="الثقة"
          title={<>بيانات محلك ملكك.</>}
          description="الوضوح مش بس في الأرقام، كمان في مين بيوصل لإيه. زيرو كشك مبني على صلاحيات وسجل واضح لكل حركة."
        />
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {trust.map((t, i) => (
            <Reveal key={t.t} delay={i * 60}>
              <t.icon className="h-5 w-5 text-brand" />
              <h3 className="mt-3.5 font-display text-lg font-semibold text-ink">{t.t}</h3>
              <p className="mt-2 text-[15px] leading-[1.85] text-ink-soft">{t.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------- final CTA --------------------------------- */

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand py-24 text-brand-foreground md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div className="absolute inset-0 hairline-grid [--hairline:rgba(255,255,255,0.35)]" />
      </div>
      <div className="site-container relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.12] tracking-[-0.02em]">
            خليك مسيطر على محلك.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.9] text-brand-foreground/85">
            ابدأ من مكان واحد. شوف كل حاجة. وخلي زيرو كشك يمسك النظام.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sand px-7 py-4 text-base font-semibold text-brand transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand sm:w-auto"
            >
              ابدأ الآن
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <a
              href="mailto:hello@zerokiosk.com"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-7 py-4 text-base font-medium text-brand-foreground transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand sm:w-auto"
            >
              تواصل معنا
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
