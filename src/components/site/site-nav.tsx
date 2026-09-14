import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import wordmark from "@/assets/zero-kiosk-wordmark.png.asset.json";
import { CtaLink } from "./primitives";

const links = [
  { href: "#product", label: "المنتج" },
  { href: "#how", label: "إزاي بيشتغل" },
  { href: "#branches", label: "الفروع" },
  { href: "#start", label: "البداية" },
  { href: "#faq", label: "أسئلة" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-hairline bg-sand/90 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="site-container flex h-16 items-center gap-8">
        <a
          href="#top"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <img src={wordmark.url} alt="زيرو كشك — الصفحة الرئيسية" className="h-8 w-auto md:h-9" loading="eager" />
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto hidden items-center gap-1.5 lg:flex">
          <Link
            to="/dashboard"
            className="rounded-full px-4 py-2 text-[15px] text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            تسجيل الدخول
          </Link>
          <CtaLink to="/dashboard">اطلب عرض توضيحي</CtaLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="zk-mobile-nav"
          className="ms-auto grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-card/70 text-ink transition-colors hover:bg-card lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? "إغلاق القائمة" : "فتح القائمة"}</span>
        </button>
      </div>

      <div
        id="zk-mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-sand/97 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="التنقل على الجوال" className="site-container flex flex-col py-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline/70 py-4 text-[17px] font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-2 pb-6">
            <CtaLink to="/dashboard" size="lg" className="w-full">
              اطلب عرض توضيحي
            </CtaLink>
            <CtaLink to="/dashboard" variant="outline" size="lg" className="w-full">
              تسجيل الدخول
            </CtaLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
