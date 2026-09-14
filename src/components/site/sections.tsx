import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";
import { CtaAnchor, CtaLink, Eyebrow, Heading, Lead, Section } from "./primitives";
import { AppFrame, BranchesPanel } from "./product-panels";

/* --------------------------- المشكلة اللي بنحلها --------------------------- */

const gaps = [
  { q: "بعت بكام النهارده؟", a: "الرقم موجود، بس في الدرج وفي دفتر وفي دماغ الكاشير." },
  { q: "فيه إيه ناقص؟", a: "بتعرف إن الصنف خلص لما عميل يطلبه ومايكونش موجود." },
  { q: "المورد ده أخد كام؟", a: "الحساب متفرق بين واتساب وورق فواتير." },
  { q: "مين أحسن موظف؟", a: "إحساس، مش رقم." },
];

export function ProblemSection() {
  return (
    <Section labelledBy="problem-title" tone="sand">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>الواقع</Eyebrow>
          <Heading id="problem-title" className="mt-5 text-ink">
            إدارة المحل مش مفروض تبقى تخمين.
          </Heading>
          <Lead className="mt-5 max-w-md">
            المشكلة مش إنك مش شغّال. المشكلة إن المعلومة متفرقة، وكل قرار بتاخده وإنت ناقص نصف الصورة.
          </Lead>
        </Reveal>

        <Reveal delay={100}>
          <dl className="divide-y divide-hairline border-t border-hairline">
            {gaps.map((g) => (
              <div key={g.q} className="grid gap-1.5 py-5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6">
                <dt className="font-display text-[16px] font-bold text-ink">{g.q}</dt>
                <dd className="text-[15px] leading-[1.85] text-ink-soft">{g.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 max-w-lg font-display text-[19px] font-bold leading-[1.6] text-brand">
            زيرو كشك بيجمع الصورة كلها في مكان واحد — بدون شغل إضافي عليك.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ حلقة التشغيل ------------------------------ */

const loop = [
  { n: "٠١", t: "بيعة", d: "الكاشير يمسح ويحصّل." },
  { n: "٠٢", t: "المخزون ينزل", d: "الرصيد يتحدث في نفس اللحظة." },
  { n: "٠٣", t: "الأرقام تتسجل", d: "الفاتورة تتربط بالفرع والموظف." },
  { n: "٠٤", t: "التقرير يتحدث", d: "مبيعات وربح ومتوسط فاتورة." },
  { n: "٠٥", t: "النظام ينبهك", d: "صنف قرب يخلص أو فرع ناقص." },
];

export function OperationalLoop() {
  return (
    <Section id="how" labelledBy="how-title" tone="card">
      <Reveal className="max-w-2xl">
        <Eyebrow>إزاي بيشتغل</Eyebrow>
        <Heading id="how-title" className="mt-5 text-ink">
          من أول البيعة لحد آخر اليوم.
        </Heading>
        <Lead className="mt-5">
          كل خطوة بتغذّي اللي بعدها تلقائيًا. مفيش إدخال مرتين، ومفيش تقرير محتاج حد يعمله بإيده.
        </Lead>
      </Reveal>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
        {loop.map((s, i) => (
          <li key={s.t} className="bg-card p-5">
            <Reveal delay={i * 70}>
              <span className="font-display text-[13px] font-bold text-brand/70">{s.n}</span>
              <h3 className="mt-3 font-display text-[17px] font-bold text-ink">{s.t}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-ink-soft">{s.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------- الفروع --------------------------------- */

export function BranchesSection() {
  return (
    <Section id="branches" labelledBy="branches-title" tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <Eyebrow>النمو</Eyebrow>
          <Heading id="branches-title" className="mt-5 text-ink">
            كبّر محلك من غير ما تكبّر اللخبطة.
          </Heading>
          <Lead className="mt-5 max-w-md">
            الفرع التاني ما يبقاش نظام تاني. نفس الأصناف، نفس الأسعار، نفس التقارير — وصلاحيات مختلفة لكل فرع.
          </Lead>
          <ul className="mt-7 space-y-3 border-t border-hairline pt-6">
            {[
              "مخزون منفصل لكل فرع مع صورة موحّدة للإدارة",
              "صلاحيات بالدور: كاشير، مسؤول فرع، مالك",
              "سجل عمليات يوضح مين عمل إيه وامتى",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2.5 text-[15px] leading-[1.8] text-ink-soft">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-coral" />
                {l}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={110}>
          <AppFrame label="شاشة مقارنة الفروع في زيرو كشك" path="zerokiosk.com/branches">
            <BranchesPanel />
          </AppFrame>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- الثقة --------------------------------- */

const trust = [
  { t: "بيانات محلك ملكك", d: "تقدر تصدّر بياناتك في أي وقت — مبيعات، أصناف، موردين، وحسابات." },
  { t: "صلاحيات واضحة", d: "كل موظف يشوف اللي يخصه بس. الخصم والمرتجع والتعديل محتاجين إذن." },
  { t: "كل حركة مسجّلة", d: "سجل عمليات كامل يوضح مين عدّل سعر أو حذف فاتورة أو فتح وردية." },
  { t: "بنبدأ معاك", d: "بنجهّز أصنافك وأسعارك ونمشي مع الكاشير أول أسبوع لحد ما يشتغل لوحده." },
];

export function TrustSection() {
  return (
    <Section labelledBy="trust-title" tone="card">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <Eyebrow>الثقة</Eyebrow>
          <Heading id="trust-title" className="mt-5 text-ink">
            نظام تسلّمه محلك بضمير مرتاح.
          </Heading>
          <Lead className="mt-5 max-w-sm">
            إحنا شركة مصرية جديدة، وعارفين إن ده سؤال مشروع. فبنكسب ثقتك بشغل واضح مش بكلام.
          </Lead>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t.t} className="bg-card p-6">
                <h3 className="font-display text-[17px] font-bold text-ink">{t.t}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.85] text-ink-soft">{t.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- البداية -------------------------------- */

const steps = [
  { n: "١", t: "مكالمة ٢٠ دقيقة", d: "نفهم محلك: كام فرع، كام صنف، وإيه اللي بيوجعك." },
  { n: "٢", t: "بنجهّز النظام", d: "بنرفّع أصنافك وأسعارك وموردينك — إنت مش بتدخل حاجة بإيدك." },
  { n: "٣", t: "أول يوم بيع", d: "بنقف مع الكاشير أول وردية، وبنسلّمك تقرير أول يوم." },
];

export function StartSection() {
  return (
    <Section id="start" labelledBy="start-title" tone="sand">
      <Reveal className="max-w-2xl">
        <Eyebrow>البداية</Eyebrow>
        <Heading id="start-title" className="mt-5 text-ink">
          تبدأ في يوم، مش في شهر.
        </Heading>
        <Lead className="mt-5">مش محتاج تجهّز حاجة قبل ما تكلمنا. إحنا اللي بنجهّز.</Lead>
      </Reveal>

      <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
        {steps.map((s, i) => (
          <li key={s.t} className="border-t border-hairline pt-6">
            <Reveal delay={i * 80}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[13px] font-bold text-brand-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-[19px] font-bold text-ink">{s.t}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.85] text-ink-soft">{s.d}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* --------------------------------- الأسئلة -------------------------------- */

const faqs = [
  {
    q: "الإنترنت بيقطع عندي، النظام هيقف؟",
    a: "لا. نقطة البيع بتكمل شغل والفواتير بتتسجل محليًا، وأول ما النت يرجع كل حاجة بتتزامن مع باقي الفروع.",
  },
  {
    q: "لازم أشتري أجهزة جديدة؟",
    a: "غالبًا لا. زيرو كشك بيشتغل على الكمبيوتر أو اللابتوب الموجود، وبيدعم قارئ الباركود وطابعة الفواتير المعتادة.",
  },
  {
    q: "موظفيني مش بيعرفوا كمبيوتر كفاية.",
    a: "شاشة الكاشير مبنية على الباركود ومفتاح واحد للتحصيل. وبنقف معاهم أول وردية لحد ما الشغل يبقى عادي.",
  },
  {
    q: "بياناتي القديمة هتضيع؟",
    a: "إحنا بنرفّع أصنافك وأسعارك وأرصدتك من أي ملف عندك — إكسل أو حتى قائمة مكتوبة — قبل أول يوم شغل.",
  },
  {
    q: "لو حبيت أمشي، بياناتي معايا؟",
    a: "أيوه. تقدر تصدّر مبيعاتك وأصنافك وحسابات موردينك في أي وقت من غير ما تطلب إذن من حد.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" labelledBy="faq-title" tone="card">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <Eyebrow>أسئلة</Eyebrow>
          <Heading id="faq-title" className="mt-5 text-ink" size="lg">
            الأسئلة اللي بتتسأل قبل القرار.
          </Heading>
        </Reveal>
        <Reveal delay={90}>
          <ul className="divide-y divide-hairline border-y border-hairline">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      aria-controls={`faq-a-${i}`}
                      className="flex w-full items-center gap-4 py-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span className="flex-1 font-display text-[17px] font-bold text-ink">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline text-ink-soft transition-transform ${
                          on ? "rotate-45 border-brand/40 text-brand" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} hidden={!on} className="pb-5">
                    <p className="max-w-2xl text-[15px] leading-[1.9] text-ink-soft">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------- الدعوة النهائية ------------------------------- */

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-brand-deep py-20 text-brand-foreground md:py-28">
      <div className="site-container">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="light">ابدأ</Eyebrow>
          <Heading id="cta-title" className="mt-5 text-brand-foreground">
            خليك مسيطر على محلك.
          </Heading>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.9] text-brand-foreground/75">
            ابدأ من مكان واحد، شوف كل حاجة، وخلي زيرو كشك يمسك النظام. مكالمة ٢٠ دقيقة تكفي نعرف إذا كان مناسب لمحلك
            أو لأ.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink to="/dashboard" variant="onDeep" size="lg" className="group">
              اطلب عرض توضيحي
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </CtaLink>
            <CtaAnchor href="#faq" variant="onDeepOutline" size="lg">
              عندي سؤال الأول
            </CtaAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
