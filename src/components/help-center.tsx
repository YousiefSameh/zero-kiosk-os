import { useState, type ReactNode } from "react";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Lightbulb, Clock, Users as UsersIcon, ChevronLeft, Play, Sparkles,
  Info, AlertTriangle, CheckCircle2, StickyNote, ZoomIn, Phone, Bot,
  ImageIcon, X,
} from "lucide-react";
import type {
  HelpPage, HelpBlock, HelpScreenshot, HelpWorkflowStep,
  HelpBestPractice, HelpMistake, HelpFAQ, HelpRelated,
} from "@/lib/help-content";
import { getHelpForRoute } from "@/lib/help-content";
import { useRouterState } from "@tanstack/react-router";

/* ================= Trigger button ================= */

export function HelpButton({ pathname }: { pathname?: string }) {
  const [open, setOpen] = useState(false);
  const active = useRouterState({ select: (s) => s.location.pathname });
  const page = getHelpForRoute(pathname ?? active);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-brand/25 bg-brand-soft/60 text-brand hover:bg-brand-soft hover:text-brand"
        >
          <Lightbulb className="w-4 h-4" />
          <span className="hidden sm:inline">المساعدة</span>
        </Button>
      </SheetTrigger>
      <HelpDrawerContent page={page} onClose={() => setOpen(false)} />
    </Sheet>
  );
}

/* ================= Drawer content ================= */

function HelpDrawerContent({ page, onClose }: { page: HelpPage; onClose: () => void }) {
  return (
    <SheetContent
      side="left"
      className="p-0 gap-0 w-full sm:max-w-none sm:w-[92vw] md:w-[85vw] lg:w-[1100px] xl:w-[1180px] border-e border-border bg-background overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="relative shrink-0 border-b border-border bg-gradient-to-l from-brand-soft/50 via-background to-background">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "16px 16px" }} />
        <div className="relative px-8 pt-7 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-brand">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-soft border border-brand/15">
                <Sparkles className="w-3 h-3" /> مركز المساعدة
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">دليل تفاعلي لهذه الصفحة</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 grid place-items-center rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand text-brand-foreground grid place-items-center shadow-elevated shrink-0">
              <page.icon className="w-7 h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{page.title}</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{page.short}</p>
              <p className="text-sm mt-2 leading-relaxed">{page.purpose}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <Clock className="w-3 h-3 text-brand" /> وقت القراءة: {page.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <UsersIcon className="w-3 h-3 text-brand" /> يستخدمها: {page.users.join(" · ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body scroll */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-[980px] mx-auto px-6 md:px-8 py-8 space-y-10">
          <RichBlocks blocks={page.blocks} />
          <WorkflowSection steps={page.workflow} />
          <ScreenshotsSection shots={page.screenshots} />
          <VideoSection video={page.video} />
          <BestPracticesSection items={page.bestPractices} />
          <MistakesSection items={page.mistakes} />
          <FaqSection items={page.faq} />
          <RelatedSection items={page.related} />
          <SupportCta />
        </div>
      </div>
    </SheetContent>
  );
}

/* ================= Section title ================= */

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="animate-fade-in">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</div>
      <h3 className="font-display text-xl font-semibold mt-1.5">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}

/* ================= Rich blocks ================= */

function RichBlocks({ blocks }: { blocks: HelpBlock[] }) {
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="الدليل الكامل" title="كل ما تحتاج معرفته" description="شرح تفصيلي منظم بترتيب منطقي." />
      <article className="card-elevated p-7 md:p-8 space-y-5 leading-[1.9] text-[15px]">
        {blocks.map((b, i) => <RenderBlock key={i} block={b} />)}
      </article>
    </section>
  );
}

function RenderBlock({ block }: { block: HelpBlock }) {
  switch (block.type) {
    case "h2":
      return <h4 className="font-display text-lg font-semibold pt-3 first:pt-0 border-t first:border-0 border-border">{block.text}</h4>;
    case "h3":
      return <h5 className="font-display text-base font-semibold text-foreground/90 mt-2">{block.text}</h5>;
    case "p":
      return <p className="text-foreground/85">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2 ps-1">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-2.5 items-start text-foreground/85">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2 ps-1 counter-reset-help">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-3 items-start text-foreground/85">
              <span className="mt-0.5 w-6 h-6 rounded-md bg-brand-soft text-brand text-xs font-semibold grid place-items-center shrink-0">{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-right font-medium px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border/60">
                  {row.map((c, ci) => <td key={ci} className="px-4 py-2.5">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const map = {
        info: { icon: Info, cls: "border-brand/25 bg-brand-soft/50 text-brand" },
        warning: { icon: AlertTriangle, cls: "border-warning/30 bg-warning/10 text-warning" },
        success: { icon: CheckCircle2, cls: "border-success/25 bg-success/10 text-success" },
        note: { icon: StickyNote, cls: "border-border bg-muted text-foreground" },
      }[block.variant];
      const Icon = map.icon;
      return (
        <div className={`rounded-xl border p-4 flex gap-3 ${map.cls}`}>
          <Icon className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            {block.title && <div className="font-semibold mb-1">{block.title}</div>}
            <div className="text-foreground/80">{block.text}</div>
          </div>
        </div>
      );
    }
    case "divider":
      return <div className="border-t border-border my-2" />;
    case "highlight":
      return (
        <div className="rounded-xl bg-gradient-to-l from-brand-soft to-transparent border-e-4 border-brand p-4 text-[15px] text-foreground/90">
          {block.text}
        </div>
      );
    case "code":
      return (
        <pre className="rounded-xl bg-foreground/95 text-background text-xs p-4 overflow-x-auto font-mono ltr:text-left" dir="ltr">
          <code>{block.text}</code>
        </pre>
      );
  }
}

/* ================= Workflow ================= */

function WorkflowSection({ steps }: { steps: HelpWorkflowStep[] }) {
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="سير العمل" title="من البداية إلى النهاية" description="خطوات مترابطة تربط هذه الصفحة ببقية النظام." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="relative group">
              <div className="card-elevated p-4 h-full hover:shadow-elevated hover:-translate-y-0.5 transition">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-brand">
                  <span className="w-6 h-6 rounded-lg bg-brand text-brand-foreground grid place-items-center text-[11px]">{i + 1}</span>
                  <span className="uppercase tracking-wider">خطوة</span>
                </div>
                <div className="mt-3 flex items-start gap-2">
                  {Icon && <Icon className="w-4 h-4 text-brand shrink-0 mt-0.5" />}
                  <div className="font-display font-semibold text-[15px] leading-tight">{s.label}</div>
                </div>
                {s.desc && <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{s.desc}</div>}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -start-2 -translate-y-1/2 z-10 items-center justify-center text-brand/60">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ================= Screenshots ================= */

function ScreenshotsSection({ shots }: { shots: HelpScreenshot[] }) {
  const [zoom, setZoom] = useState<number | null>(null);
  if (!shots.length) return null;
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="لقطات الشاشة" title="شاهد الواجهة عن قرب" description="لقطات معلّقة توضح أهم أجزاء الصفحة." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shots.map((s, i) => (
          <button
            key={i}
            onClick={() => setZoom(i)}
            className="group text-right card-elevated overflow-hidden hover:shadow-elevated transition"
          >
            <ScreenshotFrame shot={s} />
            <div className="p-3.5 border-t border-border">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">{s.highlight ?? "لقطة"}</div>
              <div className="text-sm mt-1 leading-snug">{s.caption}</div>
            </div>
          </button>
        ))}
      </div>

      {zoom !== null && (
        <div
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm grid place-items-center p-8 animate-fade-in"
        >
          <div className="max-w-4xl w-full">
            <div className="card-elevated overflow-hidden">
              <div className="aspect-[16/9]"><ScreenshotFrame shot={shots[zoom]} large /></div>
              <div className="p-4 bg-card">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">{shots[zoom].highlight ?? "لقطة"}</div>
                <div className="text-sm mt-1">{shots[zoom].caption}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ScreenshotFrame({ shot, large = false }: { shot: HelpScreenshot; large?: boolean }) {
  const tones: Record<string, string> = {
    brand: "from-brand/15 via-brand-soft to-brand/5",
    coral: "from-coral/15 via-coral/5 to-transparent",
    success: "from-success/15 via-success/5 to-transparent",
    warning: "from-warning/15 via-warning/5 to-transparent",
  };
  const tone = tones[shot.tone ?? "brand"];
  return (
    <div className={`relative ${large ? "h-full" : "aspect-[16/10]"} bg-gradient-to-bl ${tone} overflow-hidden`}>
      {/* mock UI */}
      <div className="absolute inset-4 rounded-lg bg-card border border-border/60 shadow-soft p-3 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-coral" />
          <span className="w-2 h-2 rounded-full bg-warning" />
          <span className="w-2 h-2 rounded-full bg-success" />
          <div className="ms-auto h-2 w-24 rounded bg-muted" />
        </div>
        <div className="h-2 w-1/2 rounded bg-muted" />
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="h-10 rounded-lg bg-brand-soft" />
          <div className="h-10 rounded-lg bg-muted" />
          <div className="h-10 rounded-lg bg-muted" />
        </div>
        <div className="space-y-1.5 mt-1">
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-4/5 rounded bg-muted" />
          <div className="h-2 w-3/5 rounded bg-muted" />
        </div>
      </div>
      <div className="absolute top-3 start-3 flex items-center gap-1.5 text-[10px] font-medium bg-background/80 backdrop-blur border border-border rounded-full px-2 py-0.5 text-muted-foreground">
        <ImageIcon className="w-3 h-3" /> معاينة
      </div>
      <div className="absolute bottom-3 end-3 opacity-0 group-hover:opacity-100 transition bg-background/90 backdrop-blur border border-border rounded-lg px-2 py-1 text-[11px] flex items-center gap-1">
        <ZoomIn className="w-3 h-3" /> تكبير
      </div>
    </div>
  );
}

/* ================= Video ================= */

function VideoSection({ video }: { video: HelpPage["video"] }) {
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="فيديو تعليمي" title="شاهد الشرح المرئي" description="فيديو قصير يشرح الصفحة عمليًا." />
      <div className="card-elevated overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-video md:aspect-auto bg-gradient-to-bl from-brand via-brand/85 to-coral/70 grid place-items-center group cursor-pointer">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2), transparent 40%)"
            }} />
            <div className="relative w-16 h-16 rounded-full bg-background/95 grid place-items-center shadow-elevated group-hover:scale-110 transition">
              <Play className="w-7 h-7 text-brand ms-0.5 fill-brand" />
            </div>
            <div className="absolute bottom-3 end-3 text-[11px] font-medium bg-background/90 backdrop-blur border border-border rounded-full px-2.5 py-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-brand" /> {video.duration}
            </div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">درس فيديو</div>
            <div className="font-display text-lg font-semibold mt-1.5">{video.title}</div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{video.description}</p>
            <Button size="sm" className="mt-4 self-start bg-brand hover:bg-brand/90">
              <Play className="w-3.5 h-3.5 ms-1.5 fill-current" /> تشغيل الفيديو
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Best practices ================= */

function BestPracticesSection({ items }: { items: HelpBestPractice[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="أفضل الممارسات" title="أدر عملك باحتراف" description="نصائح تشغيلية من خبراء التجزئة." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((p, i) => (
          <div key={i} className="card-elevated p-4 flex gap-3 hover:shadow-elevated transition">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-success/10 text-success grid place-items-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold text-[15px]">{p.title}</div>
              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= Mistakes ================= */

function MistakesSection({ items }: { items: HelpMistake[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="أخطاء شائعة" title="تجنّب هذه الأخطاء" description="أخطاء متكررة كلفت أصحاب المتاجر أموالًا حقيقية." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((m, i) => (
          <div key={i} className="rounded-xl border border-warning/25 bg-warning/[0.06] p-4 flex gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-warning/15 text-warning grid place-items-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-semibold text-[15px]">{m.title}</div>
              <div className="text-sm text-foreground/75 mt-1 leading-relaxed">{m.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= FAQ ================= */

function FaqSection({ items }: { items: HelpFAQ[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="الأسئلة الشائعة" title="إجابات سريعة" description="أكثر ما يسأله المستخدمون عن هذه الصفحة." />
      <div className="card-elevated px-5">
        <Accordion type="single" collapsible className="w-full">
          {items.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border-border">
              <AccordionTrigger className="text-right hover:no-underline py-4 text-[15px] font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ================= Related ================= */

function RelatedSection({ items }: { items: HelpRelated[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-4 animate-fade-in">
      <SectionTitle eyebrow="صفحات ذات صلة" title="واصل الاستكشاف" description="مراكز مساعدة أخرى مرتبطة بهذه الصفحة." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="card-elevated p-4 hover:shadow-elevated hover:-translate-y-0.5 transition group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
              <r.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm truncate">{r.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">افتح الصفحة</div>
            </div>
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:-translate-x-0.5 transition" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ================= Support CTA ================= */

function SupportCta() {
  return (
    <section className="animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-bl from-brand via-brand/95 to-brand/85 p-7 text-brand-foreground">
        <div className="absolute -top-16 -end-16 w-64 h-64 rounded-full bg-coral/25 blur-3xl" />
        <div className="absolute -bottom-24 -start-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
          <div className="max-w-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-foreground/80">هل ما زلت بحاجة إلى مساعدة؟</div>
            <h4 className="font-display text-xl font-semibold mt-1.5">فريق زيرو كشك جاهز لدعمك</h4>
            <p className="text-sm text-brand-foreground/85 mt-1.5 leading-relaxed">
              تواصل معنا أو استخدم المساعد الذكي للحصول على إجابة فورية مخصصة لعملك.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Phone className="w-4 h-4 ms-1.5" /> تواصل مع الدعم
            </Button>
            <Button size="sm" className="bg-coral hover:bg-coral/90 text-coral-foreground">
              <Bot className="w-4 h-4 ms-1.5" /> المساعد الذكي
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Utility export ================= */

export function HelpBadge({ children }: { children: ReactNode }) {
  return <span className="text-brand">{children}</span>;
}
