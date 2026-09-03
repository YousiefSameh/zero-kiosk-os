import { useState, useMemo, type ReactNode } from "react";
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
  ImageIcon, X, ArrowLeft, BookOpen, Compass, Workflow, LayoutGrid,
  Table as TableIcon, MousePointerClick, Star, Lightbulb as LightbulbIcon,
  ShieldAlert, HelpCircle, Film, Link2, ArrowLeftCircle,
} from "lucide-react";
import type {
  HelpPage, HelpBlock, HelpScreenshot, HelpWorkflowStep,
  HelpBestPractice, HelpMistake, HelpFAQ, HelpRelated,
  HelpCard, HelpTableGuide, HelpAction, HelpTip, HelpNextPage,
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

/* ================= Section registry ================= */

type SectionDef = {
  id: string;
  label: string;
  icon: typeof BookOpen;
  show: (p: HelpPage) => boolean;
  render: (p: HelpPage) => ReactNode;
};

const SECTIONS: SectionDef[] = [
  { id: "overview",      label: "نظرة عامة",      icon: BookOpen,        show: () => true,                                       render: (p) => <OverviewSection page={p} /> },
  { id: "why",           label: "لماذا هذه الصفحة", icon: Compass,        show: (p) => !!p.whyExists?.length,                    render: (p) => <RichBlocks eyebrow="السبب والقيمة" title="لماذا توجد هذه الصفحة؟" description="السياق الاستراتيجي الذي دفعنا لبنائها بهذا الشكل." blocks={p.whyExists!} /> },
  { id: "workflow",      label: "سير العمل",      icon: Workflow,        show: (p) => !!p.workflow?.length,                     render: (p) => <WorkflowSection steps={p.workflow} /> },
  { id: "cards",         label: "شرح البطاقات",   icon: LayoutGrid,      show: (p) => !!p.cards?.length,                        render: (p) => <CardsSection items={p.cards!} /> },
  { id: "tables",        label: "شرح الجداول",    icon: TableIcon,       show: (p) => !!p.tables?.length,                       render: (p) => <TablesSection items={p.tables!} /> },
  { id: "actions",       label: "شرح الأزرار",    icon: MousePointerClick, show: (p) => !!p.actions?.length,                    render: (p) => <ActionsSection items={p.actions!} /> },
  { id: "docs",          label: "الدليل التفصيلي", icon: BookOpen,       show: (p) => !!p.blocks?.length,                       render: (p) => <RichBlocks eyebrow="الدليل الكامل" title="كل ما تحتاج معرفته" description="شرح تفصيلي منظم بترتيب منطقي." blocks={p.blocks} /> },
  { id: "best",          label: "أفضل الممارسات", icon: Star,            show: (p) => !!p.bestPractices?.length,                render: (p) => <BestPracticesSection items={p.bestPractices} /> },
  { id: "tips",          label: "نصائح احترافية",  icon: LightbulbIcon,   show: (p) => !!p.tips?.length,                         render: (p) => <TipsSection items={p.tips!} /> },
  { id: "mistakes",      label: "أخطاء شائعة",    icon: ShieldAlert,     show: (p) => !!p.mistakes?.length,                     render: (p) => <MistakesSection items={p.mistakes} /> },
  { id: "faq",           label: "أسئلة شائعة",    icon: HelpCircle,      show: (p) => !!p.faq?.length,                          render: (p) => <FaqSection items={p.faq} /> },
  { id: "screenshots",   label: "لقطات الشاشة",   icon: ImageIcon,       show: (p) => !!p.screenshots?.length,                  render: (p) => <ScreenshotsSection shots={p.screenshots} /> },
  { id: "video",         label: "فيديو تعليمي",   icon: Film,            show: (p) => !!p.video?.title,                         render: (p) => <VideoSection video={p.video} /> },
  { id: "related",       label: "صفحات ذات صلة",  icon: Link2,           show: (p) => !!p.related?.length,                      render: (p) => <RelatedSection items={p.related} /> },
  { id: "next",          label: "الخطوة التالية", icon: ArrowLeftCircle, show: (p) => !!p.nextPage,                             render: (p) => <NextPageSection next={p.nextPage!} /> },
];

/* ================= Drawer content ================= */

function HelpDrawerContent({ page, onClose }: { page: HelpPage; onClose: () => void }) {
  const activeSections = useMemo(() => SECTIONS.filter((s) => s.show(page)), [page]);
  const [activeId, setActiveId] = useState<string>(activeSections[0]?.id ?? "overview");

  const scrollTo = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`help-sec-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SheetContent
      side="left"
      className="p-0 gap-0 w-full sm:max-w-none sm:w-[95vw] md:w-[92vw] lg:w-[1200px] xl:w-[1260px] border-e border-border bg-background overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="relative shrink-0 border-b border-border bg-gradient-to-l from-brand-soft/50 via-background to-background">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "16px 16px" }} />
        <div className="relative px-8 pt-6 pb-5">
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

          <div className="mt-4 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand text-brand-foreground grid place-items-center shadow-elevated shrink-0">
              <page.icon className="w-7 h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-semibold tracking-tight">{page.title}</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{page.short}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <Clock className="w-3 h-3 text-brand" /> {page.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <UsersIcon className="w-3 h-3 text-brand" /> {page.users.join(" · ")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-soft border border-brand/15 text-brand">
                  <BookOpen className="w-3 h-3" /> {activeSections.length} أقسام
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body: TOC + Content */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[240px_1fr] overflow-hidden">
        {/* TOC (sticky sidebar) */}
        <aside className="hidden lg:flex flex-col border-e border-border bg-muted/30 overflow-y-auto">
          <div className="p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground px-2 mb-2">
              محتويات الدليل
            </div>
            <nav className="space-y-0.5">
              {activeSections.map((s) => {
                const Icon = s.icon;
                const active = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-right flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition ${
                      active
                        ? "bg-brand text-brand-foreground shadow-soft"
                        : "text-foreground/75 hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? "" : "text-brand"}`} />
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-border">
            <div className="rounded-xl bg-gradient-to-bl from-brand to-brand/85 text-brand-foreground p-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider opacity-90">
                <Bot className="w-3 h-3" /> مساعد ذكي
              </div>
              <div className="font-display text-sm font-semibold mt-1.5">اسأل عن أي شيء</div>
              <p className="text-[11px] opacity-85 mt-1 leading-relaxed">إجابات فورية مخصصة لعملك ولهذه الصفحة.</p>
              <Button size="sm" variant="secondary" className="w-full mt-3 bg-background text-foreground hover:bg-background/90 h-8">
                فتح المساعد
              </Button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="overflow-y-auto scroll-smooth" onScroll={(e) => {
          // Update active TOC based on scroll position
          const container = e.currentTarget;
          const secs = activeSections.map((s) => {
            const el = document.getElementById(`help-sec-${s.id}`);
            return { id: s.id, top: el ? el.getBoundingClientRect().top - container.getBoundingClientRect().top : Infinity };
          });
          const current = secs.filter((s) => s.top <= 100).pop();
          if (current && current.id !== activeId) setActiveId(current.id);
        }}>
          <div className="max-w-[900px] mx-auto px-6 md:px-10 py-8 space-y-14">
            {activeSections.map((s) => (
              <section key={s.id} id={`help-sec-${s.id}`} className="scroll-mt-6">
                {s.render(page)}
              </section>
            ))}
            <SupportCta />
          </div>
        </div>
      </div>
    </SheetContent>
  );
}

/* ================= Section title ================= */

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="animate-fade-in mb-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</div>
      <h3 className="font-display text-xl font-semibold mt-1.5">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}

/* ================= Overview ================= */

function OverviewSection({ page }: { page: HelpPage }) {
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="نظرة عامة" title="ملخص الصفحة" description="ما ستحصل عليه من هذه الصفحة في دقيقة واحدة." />
      <div className="card-elevated p-6 md:p-7">
        <p className="text-[15px] leading-[1.9] text-foreground/85">{page.purpose}</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-brand-soft/50 border border-brand/15 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">وقت القراءة</div>
            <div className="font-display font-semibold mt-1">{page.readingTime}</div>
          </div>
          <div className="rounded-xl bg-muted border border-border p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">المستخدمون</div>
            <div className="font-display font-semibold mt-1 text-sm">{page.users.join(" · ")}</div>
          </div>
          <div className="rounded-xl bg-success/10 border border-success/20 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-success">جاهزية</div>
            <div className="font-display font-semibold mt-1 text-success">دليل تفاعلي</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= Rich blocks ================= */

function RichBlocks({ blocks, eyebrow, title, description }: { blocks: HelpBlock[]; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />
      <article className="card-elevated p-6 md:p-8 space-y-5 leading-[1.9] text-[15px]">
        {blocks.map((b, i) => <RenderBlock key={i} block={b} />)}
      </article>
    </div>
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
        <ol className="space-y-2 ps-1">
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
        info:    { icon: Info,           cls: "border-brand/25 bg-brand-soft/50 text-brand" },
        warning: { icon: AlertTriangle,  cls: "border-warning/30 bg-warning/10 text-warning" },
        success: { icon: CheckCircle2,   cls: "border-success/25 bg-success/10 text-success" },
        note:    { icon: StickyNote,     cls: "border-border bg-muted text-foreground" },
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
    case "image": {
      const tones: Record<string, string> = {
        brand:   "from-brand/15 via-brand-soft to-brand/5",
        coral:   "from-coral/15 via-coral/5 to-transparent",
        success: "from-success/15 via-success/5 to-transparent",
        warning: "from-warning/15 via-warning/5 to-transparent",
      };
      return (
        <figure className="rounded-xl overflow-hidden border border-border">
          <div className={`aspect-[16/8] bg-gradient-to-bl ${tones[block.tone ?? "brand"]} relative grid place-items-center`}>
            <ImageIcon className="w-10 h-10 text-brand/40" />
            <span className="absolute bottom-3 end-3 text-[10px] font-medium bg-background/90 border border-border rounded-full px-2 py-0.5 text-muted-foreground">صورة توضيحية</span>
          </div>
          {block.caption && <figcaption className="p-3 text-xs text-muted-foreground bg-muted/40">{block.caption}</figcaption>}
        </figure>
      );
    }
  }
}

/* ================= Workflow ================= */

function WorkflowSection({ steps }: { steps: HelpWorkflowStep[] }) {
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= Cards explanation ================= */

function CardsSection({ items }: { items: HelpCard[] }) {
  const toneMap: Record<string, string> = {
    brand: "bg-brand-soft text-brand border-brand/20",
    coral: "bg-coral/10 text-coral border-coral/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="شرح البطاقات" title="كل بطاقة على حدة" description="ما تعنيه كل بطاقة في الصفحة، ومصدر بياناتها، ومتى تنتبه إليها." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((c, i) => {
          const Icon = c.icon;
          const tone = toneMap[c.tone ?? "brand"];
          return (
            <div key={i} className="card-elevated p-4 flex gap-3 hover:shadow-elevated transition">
              <div className={`w-11 h-11 shrink-0 rounded-xl border grid place-items-center ${tone}`}>
                {Icon && <Icon className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-display font-semibold text-[15px]">{c.name}</div>
                  {c.metric && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {c.metric}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Tables explanation ================= */

function TablesSection({ items }: { items: HelpTableGuide[] }) {
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="شرح الجداول" title="فهم كل جدول وأعمدته" description="دليل لكل عمود ومعناه لتقرأ الجدول بثقة." />
      <div className="space-y-4">
        {items.map((t, i) => (
          <div key={i} className="card-elevated overflow-hidden">
            <div className="p-5 border-b border-border bg-gradient-to-l from-brand-soft/30 to-transparent">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-brand">
                <TableIcon className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">جدول</span>
              </div>
              <div className="font-display text-lg font-semibold mt-1.5">{t.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-right font-medium px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground w-1/3">العمود</th>
                      <th className="text-right font-medium px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground">الوصف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.columns.map((col, ci) => (
                      <tr key={ci} className="border-t border-border/60">
                        <td className="px-4 py-2.5 font-medium">{col.name}</td>
                        <td className="px-4 py-2.5 text-foreground/75">{col.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Actions explanation ================= */

function ActionsSection({ items }: { items: HelpAction[] }) {
  const variantMap: Record<string, string> = {
    primary: "bg-brand text-brand-foreground border-brand",
    secondary: "bg-card text-foreground border-border",
    destructive: "bg-coral/10 text-coral border-coral/25",
  };
  const labelMap: Record<string, string> = {
    primary: "رئيسي",
    secondary: "ثانوي",
    destructive: "حساس",
  };
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="شرح الأزرار" title="ماذا يفعل كل زر؟" description="دليل لكل زر إجرائي في الصفحة، ومتى تستخدمه، ومن يحتاج صلاحيته." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((a, i) => {
          const Icon = a.icon;
          const variant = a.variant ?? "secondary";
          return (
            <div key={i} className="card-elevated p-4 hover:shadow-elevated transition">
              <div className="flex items-start justify-between gap-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-medium text-sm ${variantMap[variant]}`}>
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{a.label}</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-full bg-muted border border-border">
                  {labelMap[variant]}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Screenshots ================= */

function ScreenshotsSection({ shots }: { shots: HelpScreenshot[] }) {
  const [zoom, setZoom] = useState<number | null>(null);
  if (!shots.length) return null;
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
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
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= Best practices ================= */

function BestPracticesSection({ items }: { items: HelpBestPractice[] }) {
  if (!items.length) return null;
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= Professional Tips ================= */

function TipsSection({ items }: { items: HelpTip[] }) {
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="نصائح احترافية" title="أسرار من الميدان" description="ممارسات متقدمة يستخدمها كبار تجار التجزئة." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((t, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl border border-brand/20 bg-gradient-to-bl from-brand-soft/60 via-background to-background p-4 hover:shadow-elevated transition">
            <div className="absolute -top-8 -end-8 w-24 h-24 rounded-full bg-brand/10 blur-2xl" />
            <div className="relative flex gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-brand text-brand-foreground grid place-items-center shadow-soft">
                <LightbulbIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">نصيحة {i + 1}</span>
                </div>
                <div className="font-display font-semibold text-[15px] mt-0.5">{t.title}</div>
                <div className="text-sm text-foreground/75 mt-1 leading-relaxed">{t.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Mistakes ================= */

function MistakesSection({ items }: { items: HelpMistake[] }) {
  if (!items.length) return null;
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= FAQ ================= */

function FaqSection({ items }: { items: HelpFAQ[] }) {
  if (!items.length) return null;
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= Related ================= */

function RelatedSection({ items }: { items: HelpRelated[] }) {
  if (!items.length) return null;
  return (
    <div className="animate-fade-in space-y-4">
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
    </div>
  );
}

/* ================= Next page recommendation ================= */

function NextPageSection({ next }: { next: HelpNextPage }) {
  const Icon = next.icon;
  return (
    <div className="animate-fade-in space-y-4">
      <SectionTitle eyebrow="الخطوة التالية" title="أين تذهب بعد هذه الصفحة؟" description="مسار موصى به لإكمال رحلتك في زيرو كشك." />
      <Link
        to={next.to}
        className="block relative overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-bl from-brand-soft/70 via-background to-coral/10 p-6 hover:shadow-elevated transition group"
      >
        <div className="absolute -bottom-16 -start-10 w-64 h-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand text-brand-foreground grid place-items-center shadow-elevated shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">التوصية التالية</div>
            <div className="font-display text-lg font-semibold mt-1">{next.label}</div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{next.description}</p>
          </div>
          <div className="shrink-0 hidden md:flex items-center gap-2 text-sm font-medium text-brand group-hover:-translate-x-1 transition">
            انتقل الآن
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ================= Support CTA ================= */

function SupportCta() {
  return (
    <div className="animate-fade-in pt-4">
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
    </div>
  );
}

/* ================= Utility export ================= */

export function HelpBadge({ children }: { children: ReactNode }) {
  return <span className="text-brand">{children}</span>;
}
