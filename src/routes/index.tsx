import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { ProductTour } from "@/components/site/product-tour";
import {
  ProblemSection,
  OperationalLoop,
  BranchesSection,
  TrustSection,
  StartSection,
  Faq,
  FinalCta,
} from "@/components/site/sections";
import { SiteFooter } from "@/components/site/site-footer";

const TITLE = "زيرو كشك | نظام تشغيل المحل";
const DESC =
  "زيرو كشك هو نظام تشغيل المحل: البيع والمخزون والمشتريات والموظفين والتقارير في مكان واحد — بالعربي ولفروع متعددة.";
const URL = "https://zero-kiosk-os.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
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
          url: URL,
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
        <ProductTour />
        <ProblemSection />
        <OperationalLoop />
        <BranchesSection />
        <TrustSection />
        <StartSection />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
