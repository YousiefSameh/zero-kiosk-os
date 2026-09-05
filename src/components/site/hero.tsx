import { Link } from "@tanstack/react-router";
import { ArrowLeft, Play, TrendingUp, PackageCheck, Store } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { Reveal } from "./reveal";

const annotations = ["المبيعات", "المخزون", "الموردين", "التقارير", "الموظفين"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* ambient brand treatment */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[560px] hairline-grid opacity-[0.55] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 start-1/4 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute -top-24 end-10 h-[280px] w-[280px] rounded-full bg-coral/10 blur-[110px]" />
      </div>

      <div className="site-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card/70 px-3.5 py-1.5 text-[13px] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            نظام تشغيل المحل — عربي من أول سطر
          </span>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
            محلك كله.
            <br />
            <span className="text-brand">قدامك.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-[17px] leading-[1.85] text-ink-soft sm:text-lg">
            زيرو كشك هو نظام تشغيل المحل الذي يجمع المبيعات، المخزون، المشتريات، الموظفين والتقارير في مكان واحد.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-brand-foreground transition-all hover:bg-brand-deep hover:shadow-[0_16px_32px_-16px_rgba(0,109,96,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
            >
              ابدأ إدارة محلك
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <a
              href="#product"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-card/60 px-7 py-4 text-base font-medium text-ink transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
            >
              <Play className="h-4 w-4 text-brand" />
              شوف زيرو كشك
            </a>
          </div>

          <p className="mt-5 text-[13px] text-ink-soft/80">من فرع واحد لحد شبكة فروع · بدون تعقيد</p>
        </Reveal>

        {/* product preview */}
        <Reveal delay={140} className="relative mt-16 md:mt-20">
          <div className="relative mx-auto max-w-6xl">
            <div className="lg:[perspective:2000px]">
              <div className="transition-transform duration-700 ease-out lg:[transform:rotateX(3deg)] lg:hover:[transform:rotateX(0deg)]">
                <DashboardPreview />
              </div>
            </div>

            {/* floating contextual chips */}
            <div className="pointer-events-none absolute -start-16 top-28 hidden 2xl:block">
              <FloatChip icon={TrendingUp} title="مبيعات النهارده" value="٤٨٫٢ ألف ج.م" tone="brand" />
            </div>
            <div className="pointer-events-none absolute -end-20 top-1/2 hidden 2xl:block">
              <FloatChip icon={PackageCheck} title="قرب يخلص" value="١٢ صنف" tone="coral" />
            </div>
            <div className="pointer-events-none absolute -end-14 bottom-10 hidden 2xl:block">
              <FloatChip icon={Store} title="الفروع النشطة" value="٤ فروع" tone="brand" />
            </div>
          </div>

          {/* annotations */}
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {annotations.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[13px] text-ink-soft">
                <span className="h-px w-5 bg-brand/50" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FloatChip({
  icon: Icon,
  title,
  value,
  tone,
}: {
  icon: typeof TrendingUp;
  title: string;
  value: string;
  tone: "brand" | "coral";
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline bg-card/95 px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,55,48,0.4)] backdrop-blur">
      <span
        className={`grid h-9 w-9 place-items-center rounded-lg ${
          tone === "brand" ? "bg-brand-soft text-brand" : "bg-coral/15 text-coral"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-[11px] text-ink-soft">{title}</span>
        <span className="block font-display text-sm font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}
