import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/zero-kiosk-wordmark.png.asset.json";

const groups: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "المنتج",
    links: [
      { label: "نقطة البيع", href: "#product" },
      { label: "المخزون", href: "#product" },
      { label: "التقارير", href: "#product" },
      { label: "الفروع", href: "#branches" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "إزاي بيشتغل", href: "#how" },
      { label: "البداية", href: "#start" },
      { label: "الأسئلة الشائعة", href: "#faq" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-sand">
      <div className="site-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src={wordmark.url} alt="زيرو كشك" className="h-9 w-auto" loading="lazy" />
            <p className="mt-4 max-w-xs text-[14.5px] leading-[1.85] text-ink-soft">
              نظام تشغيل المحل. البيع والمخزون والمشتريات والتقارير في مكان واحد — بالعربي.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex rounded-full border border-hairline px-5 py-2.5 text-[14.5px] font-medium text-ink transition-colors hover:bg-sand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              اطلب عرض توضيحي
            </Link>
          </div>

          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="font-display text-[13px] font-bold tracking-wide text-ink">{g.title}</h2>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-ink-soft transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-soft">© ٢٠٢٦ زيرو كشك — القاهرة، مصر.</p>
          <p className="text-[13px] text-ink-soft">البيانات المعروضة في شاشات الموقع للعرض التوضيحي فقط.</p>
        </div>
      </div>
    </footer>
  );
}
