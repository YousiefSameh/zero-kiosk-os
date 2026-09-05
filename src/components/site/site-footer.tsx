import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/zero-kiosk-wordmark.png.asset.json";

const groups = [
  { title: "المنتج", links: ["المبيعات", "المخزون", "المشتريات", "التقارير"] },
  { title: "الشركة", links: ["عن زيرو كشك", "تواصل معنا"] },
  { title: "المصادر", links: ["مركز المساعدة", "الأسعار"] },
  { title: "قانوني", links: ["سياسة الخصوصية", "الشروط والأحكام"] },
];

const socials = ["فيسبوك", "لينكدإن", "إنستجرام", "يوتيوب"];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-sand">
      <div className="site-container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img src={wordmark.url} alt="زيرو كشك" className="h-10 w-auto" loading="lazy" />
            <p className="mt-5 max-w-xs text-[15px] leading-[1.9] text-ink-soft">
              نظام تشغيل المحل. المبيعات والمخزون والمشتريات والتقارير في مكان واحد.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex rounded-full border border-hairline px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-sand-deep"
            >
              ابدأ الآن
            </Link>
          </div>

          <nav aria-label="روابط الموقع" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-display text-[13px] font-bold tracking-wide text-ink">{g.title}</h2>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[14px] text-ink-soft transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-soft">© ٢٠٢٦ زيرو كشك. جميع الحقوق محفوظة.</p>
          <ul className="flex flex-wrap items-center gap-5">
            {socials.map((s) => (
              <li key={s}>
                <a href="#top" className="text-[13px] text-ink-soft transition-colors hover:text-brand">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
