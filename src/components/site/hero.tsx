import { ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";
import { CtaAnchor, CtaLink } from "./primitives";
import { ReportsPanel } from "./product-panels";
import { AppFrame } from "./product-panels";

const proofPoints = [
  "تشتغل بالعربي من أول شاشة",
  "من فرع واحد لحد شبكة فروع",
  "تشتغل على جهاز الكاشير الموجود عندك",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-hairline pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[440px] hairline-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_70%_0%,black,transparent)]" />
      </div>

      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[13px] font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              نظام تشغيل المحل
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,7.5vw,4.6rem)] font-bold leading-[1.06] tracking-[-0.025em] text-ink">
              محلك كله.
              <br />
              <span className="text-brand">قدامك.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-[1.9] text-ink-soft">
              البيع والمخزون والمشتريات والموظفين والتقارير في نظام واحد. كل بيعة بتنزّل المخزون، وكل يوم بيقفل بأرقام
              تقدر تتصرف على أساسها.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink to="/dashboard" size="lg" className="group">
                اطلب عرض توضيحي
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </CtaLink>
              <CtaAnchor href="#product" size="lg">
                شوف النظام بنفسك
              </CtaAnchor>
            </div>

            <ul className="mt-9 space-y-2.5 border-t border-hairline pt-6">
              {proofPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative">
            <AppFrame label="تقرير يوم في زيرو كشك: مبيعات النهارده، عدد الفواتير، وأعلى قسم ربحًا" path="zerokiosk.com/reports">
              <ReportsPanel />
            </AppFrame>
            <p className="mt-3 text-center text-[12px] text-ink-soft/90">
              شاشة حقيقية من زيرو كشك — البيانات هنا للعرض فقط.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
