import { createFileRoute } from "@tanstack/react-router";
import { AppShell, EmptyState } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, currency, num, money2, kg, isWeighted, parseScaleBarcode, type Product } from "@/lib/mock-data";
import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Wallet, Barcode, User, PackageSearch, ShoppingCart, ScanBarcode, CheckCircle2, Receipt } from "lucide-react";
import { useDataState, TilesSkeleton, RowsSkeleton, Shimmer } from "@/lib/demo-state";
import { WeightBadge, ScaleStatus, ScaleErrorCard, ManualWeightDialog, type ScaleError } from "@/components/weighing";

export const Route = createFileRoute("/pos")({
  head: () => ({ meta: [{ title: "نقطة البيع — زيرو كشك" }, { name: "description", content: "نقطة بيع زيرو كشك مع دعم الميزان والمنتجات الموزونة." }] }),
  component: PosPage,
});

type CartLine = { key: string; id: string; name: string; price: number; qty: number; weighted?: boolean; source?: "scale" | "manual" };

const DEMO_SCANS: Array<{ label: string; code: string }> = [
  { label: "ملصق جبنة رومي", code: "2110450012505" },
  { label: "ملصق تالف", code: "21104" },
  { label: "صنف غير مسجل", code: "2199990005001" },
  { label: "وزن صفر", code: "2110450000000" },
];

function PosPage() {
  const ds = useDataState();
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<CartLine[]>([
    { key: "SKU-1001", id: "SKU-1001", name: "كوكاكولا ٣٣٠ مل", price: 12, qty: 4 },
    { key: "SKU-1004", id: "SKU-1004", name: "بسكويت أوريو", price: 18, qty: 2 },
  ]);
  const [method, setMethod] = useState<"نقدي" | "بطاقة" | "محفظة">("بطاقة");
  const [scaleOn, setScaleOn] = useState(true);
  const [err, setErr] = useState<ScaleError | null>(null);
  const [weighFor, setWeighFor] = useState<Product | null>(null);
  const [flash, setFlash] = useState<{ key: string; text: string } | null>(null);

  const catalog = ds.rows(products).filter((p) => p.name.includes(q)).slice(0, 12);
  const lines = ds.rows(cart);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const vat = subtotal * 0.14;
  const total = subtotal + vat;

  const addWeighted = (p: Product, w: number, source: "scale" | "manual") => {
    const key = `${p.id}-${Date.now()}`;
    setCart((c) => [...c, { key, id: p.id, name: p.name, price: p.price, qty: w, weighted: true, source }]);
    setFlash({ key, text: `المخزون: ${kg(p.stock)} ← ${kg(Math.round((p.stock - w) * 1000) / 1000)}` });
    setTimeout(() => setFlash((f) => (f?.key === key ? null : f)), 4000);
    setErr(null); setWeighFor(null); setQ("");
  };

  const add = (p: Product) => {
    if (isWeighted(p)) { if (!scaleOn) setErr("disconnected"); setWeighFor(p); return; }
    setCart((c) => {
      const ex = c.find((l) => l.id === p.id && !l.weighted);
      if (ex) return c.map((l) => (l === ex ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { key: p.id, id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const scan = (raw: string) => {
    const r = parseScaleBarcode(raw);
    if (!r) return false; // regular search/barcode
    if (r.ok) addWeighted(r.product, r.weight, "scale");
    else setErr(r.reason);
    return true;
  };

  const lastWeighted = [...lines].reverse().find((l) => l.weighted);

  return (
    <AppShell
      title="نقطة البيع"
      subtitle="جهاز ٠٤ · سوبر ماركت Zero — فرع سيدي بشر · الكاشير: منة طارق"
      actions={<ScaleStatus connected={scaleOn} onToggle={() => setScaleOn((s) => !s)} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 card-elevated p-5">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Barcode className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && scan(q)) setQ(""); }}
                placeholder="امسح الباركود أو ابحث عن منتج…"
                className="pr-9 h-11 rounded-lg"
                disabled={ds.isLoading}
                aria-label="مسح أو بحث"
              />
            </div>
            <Button variant="outline" className="h-11" disabled={ds.isLoading}><Search className="w-4 h-4 ms-1.5" />بحث</Button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px] text-muted-foreground">
            <ScanBarcode className="w-3.5 h-3.5" />محاكاة مسح:
            {DEMO_SCANS.map((d) => (
              <button key={d.label} onClick={() => scan(d.code)} disabled={ds.isLoading} className="rounded-md border border-border px-2 py-0.5 hover:bg-accent hover:text-foreground transition">{d.label}</button>
            ))}
          </div>

          {err && <ScaleErrorCard kind={err} onDismiss={() => setErr(null)}
            onRetry={() => { setScaleOn(true); setErr(null); }}
            onManual={() => { setErr(null); setWeighFor(products.find((p) => p.plu === "1045")!); }} />}

          {ds.isLoading ? (
            <TilesSkeleton count={8} />
          ) : catalog.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title={ds.isEmpty ? "لا توجد منتجات متاحة للبيع" : `لا نتائج مطابقة لـ «${q}»`}
              description={ds.isEmpty ? "نقطة البيع تعرض المنتجات المفعّلة في الكتالوج فقط. أضف منتجاتك أو استورد ملف أسعار وسيصبح البيع جاهزًا في دقائق." : "تأكد من الباركود أو جرّب اسمًا أقصر. يمكنك أيضًا إضافة الصنف الجديد فورًا وإكمال بياناته لاحقًا."}
              primary={{ label: ds.isEmpty ? "إضافة منتج" : "إضافة صنف جديد" }}
              secondary={ds.isEmpty ? { label: "استيراد كتالوج" } : { label: "مسح البحث", onClick: () => setQ("") }}
              hint="نصيحة: استخدم قارئ الباركود لإضافة الأصناف فورًا إلى الفاتورة"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {catalog.map((p) => {
                const w = isWeighted(p);
                return (
                  <button key={p.id} onClick={() => add(p)} className="relative text-right rounded-xl border border-border bg-card hover:border-brand hover:shadow-soft transition p-3 group">
                    {w && <span className="absolute top-2 left-2"><WeightBadge /></span>}
                    <div className="aspect-square rounded-lg bg-brand-soft grid place-items-center text-brand font-display font-semibold text-lg mb-2 group-hover:scale-[1.02] transition">{p.name.slice(0, 2)}</div>
                    <div className="text-xs font-medium line-clamp-2 min-h-[2rem]">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                    <div className="text-sm font-semibold text-brand mt-1">{money2(p.price)} <span className="text-[11px] font-normal text-muted-foreground">/ {w ? "كجم" : "قطعة"}</span></div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="card-elevated flex flex-col">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-display font-semibold">الفاتورة الحالية</div>
                <div className="text-xs text-muted-foreground">{ds.isLoading ? "جارٍ تحميل التذكرة…" : "تذكرة #أ-٨٨٤٢٨"}</div>
              </div>
              <Button variant="outline" size="sm" disabled={ds.isLoading}><User className="w-4 h-4 ms-1.5" />ربط عميل</Button>
            </div>

            <div className="flex-1 divide-y divide-border max-h-[380px] overflow-y-auto">
              {ds.isLoading ? (
                <div className="px-4"><RowsSkeleton rows={3} /></div>
              ) : lines.length === 0 ? (
                <EmptyState compact icon={ShoppingCart} title="الفاتورة فارغة" description="ابدأ بمسح الباركود أو اختر منتجًا من الكتالوج، وستحسب الضريبة والإجمالي تلقائيًا." primary={{ label: "مسح باركود", icon: Barcode }} secondary={{ label: "فاتورة معلّقة" }} hint="F2 لتعليق الفاتورة · F4 للتحصيل" />
              ) : (
                lines.map((l) => (
                  <div key={l.key} className={`p-4 flex items-center gap-3 ${flash?.key === l.key ? "bg-brand-soft/40" : ""} transition-colors`}>
                    <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center text-xs font-medium shrink-0">{l.name.slice(0, 2)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate flex items-center gap-1.5">
                        {l.name}
                        {l.source === "scale" && <WeightBadge label="باركود ميزان" />}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {l.weighted ? <>{kg(l.qty)} × {money2(l.price)}</> : <>{money2(l.price)} / قطعة</>}
                      </div>
                      {flash?.key === l.key && <div className="text-[11px] text-success mt-0.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{flash.text}</div>}
                    </div>
                    {!l.weighted && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => setCart((c) => c.map((x) => x.key === l.key ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} className="w-7 h-7 rounded-md border border-border hover:bg-accent grid place-items-center"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-medium">{num(l.qty)}</span>
                        <button onClick={() => setCart((c) => c.map((x) => x.key === l.key ? { ...x, qty: x.qty + 1 } : x))} className="w-7 h-7 rounded-md border border-border hover:bg-accent grid place-items-center"><Plus className="w-3 h-3" /></button>
                      </div>
                    )}
                    <div className="shrink-0 whitespace-nowrap text-left text-sm font-semibold">{money2(l.price * l.qty)}</div>
                    <button onClick={() => setCart((c) => c.filter((x) => x.key !== l.key))} className="text-muted-foreground hover:text-destructive" aria-label="حذف"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t border-border space-y-2">
              {ds.isLoading ? (
                <div className="space-y-3"><Shimmer className="h-3.5" /><Shimmer className="h-3.5 w-4/5" /><Shimmer className="h-6 w-1/2" /><Shimmer className="h-11 rounded-lg" /></div>
              ) : (
                <>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">المجموع الفرعي</span><span>{money2(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">ضريبة القيمة المضافة (١٤٪)</span><span>{money2(vat)}</span></div>
                  <div className="flex justify-between font-display text-lg font-semibold pt-2 border-t border-border"><span>الإجمالي</span><span className="text-brand">{money2(total)}</span></div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {(["نقدي", "بطاقة", "محفظة"] as const).map((m) => {
                      const Icon = m === "نقدي" ? Banknote : m === "بطاقة" ? CreditCard : Wallet;
                      return (
                        <button key={m} onClick={() => setMethod(m)} disabled={lines.length === 0} className={`p-3 rounded-lg border text-xs font-medium transition disabled:opacity-50 ${method === m ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-accent"}`}>
                          <Icon className="w-4 h-4 mx-auto mb-1" />{m}
                        </button>
                      );
                    })}
                  </div>
                  <Button disabled={lines.length === 0} className="w-full h-11 bg-coral hover:bg-coral/90 text-coral-foreground font-semibold mt-2">
                    {lines.length === 0 ? "أضف أصنافًا للتحصيل" : `تحصيل ${currency(total)}`}
                  </Button>
                </>
              )}
            </div>
          </div>

          {!ds.isLoading && lines.length > 0 && (
            <div className="card-elevated p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3"><Receipt className="w-3.5 h-3.5" />معاينة الإيصال{lastWeighted ? "" : " — امسح ملصق ميزان لترى الأصناف الموزونة"}</div>
              <div className="mx-auto max-w-[280px] rounded-md border border-dashed border-border bg-card px-4 py-3 font-mono text-[12px] leading-relaxed">
                <div className="text-center font-sans font-semibold">سوبر ماركت Zero — سيدي بشر</div>
                <div className="border-b border-dashed border-border my-2" />
                {lines.map((l) => (
                  <div key={l.key} className="mb-1.5">
                    <div className="font-sans">{l.name}</div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{l.weighted ? `${kg(l.qty)} × ${new Intl.NumberFormat("ar-EG", { minimumFractionDigits: 2 }).format(l.price)}` : `${num(l.qty)} قطعة × ${new Intl.NumberFormat("ar-EG", { minimumFractionDigits: 2 }).format(l.price)}`}</span>
                      <span className="text-foreground">{new Intl.NumberFormat("ar-EG", { minimumFractionDigits: 2 }).format(l.price * l.qty)}</span>
                    </div>
                  </div>
                ))}
                <div className="border-b border-dashed border-border my-2" />
                <div className="flex justify-between font-sans font-semibold"><span>الإجمالي</span><span>{money2(total)}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ManualWeightDialog product={weighFor} onClose={() => setWeighFor(null)} onAdd={(p, w) => addWeighted(p, w, "manual")} />
    </AppShell>
  );
}
