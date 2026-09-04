import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import wordmark from "@/assets/zero-kiosk-wordmark.png.asset.json";

const links = [
  { href: "#product", label: "المنتج" },
  { href: "#solutions", label: "الحلول" },
  { href: "#features", label: "المميزات" },
  { href: "#pricing", label: "الأسعار" },
  { href: "#about", label: "عن زيرو كشك" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-hairline bg-sand/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,109,96,0.04)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="site-container flex h-16 items-center gap-6 md:h-[72px]">
        <a href="#top" className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <img src={wordmark.url} alt="زيرو كشك" className="h-9 w-auto md:h-10" loading="eager" />
          <span className="sr-only">زيرو كشك — الصفحة الرئيسية</span>
        </a>

        <nav aria-label="التنقل الرئيسي" className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-2 text-[15px] text-ink-soft transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto hidden items-center gap-2 lg:flex">
          <Link
            to="/dashboard"
            className="rounded-full px-4 py-2 text-[15px] text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            تسجيل الدخول
          </Link>
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[15px] font-semibold text-brand-foreground transition-all hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            ابدأ الآن
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="ms-auto grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-card/70 text-ink transition-colors hover:bg-card lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-hairline bg-sand/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="التنقل على الجوال" className="site-container flex flex-col py-3">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? i * 40 : 0}ms` }}
              className="flex items-center justify-between border-b border-hairline/70 py-4 text-lg font-medium text-ink"
            >
              {l.label}
              <ArrowLeft className="h-4 w-4 text-brand" />
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-2.5 pb-6">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-brand px-5 py-3.5 text-center text-base font-semibold text-brand-foreground"
            >
              ابدأ الآن
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-hairline px-5 py-3.5 text-center text-base font-medium text-ink"
            >
              تسجيل الدخول
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
