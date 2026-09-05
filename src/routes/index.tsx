import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import {
  ProductShowcase,
  ProblemSection,
  Pillars,
  ModuleShowcase,
  OperationalStory,
  InsightSection,
  MultiBranch,
  Philosophy,
  Pricing,
  Trust,
  FinalCTA,
} from "@/components/site/sections";
import { SiteFooter } from "@/components/site/site-footer";

const TITLE = "زيرو كشك | نظام تشغيل المحل";
const DESC =
  "زيرو كشك هو نظام تشغيل المحل لإدارة المبيعات، المخزون، المشتريات، الموظفين والتقارير من مكان واحد.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zero-kiosk-os.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zero-kiosk-os.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "زيرو كشك",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          inLanguage: "ar-EG",
          description: DESC,
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-sand text-ink antialiased">
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
      >
        تجاوز إلى المحتوى
      </a>
      <SiteNav />
      <main>
        <Hero />
        <ProductShowcase />
        <ProblemSection />
        <Pillars />
        <ModuleShowcase />
        <OperationalStory />
        <InsightSection />
        <MultiBranch />
        <Philosophy />
        <Pricing />
        <Trust />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
