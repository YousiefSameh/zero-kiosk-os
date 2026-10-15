import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Scale, CheckCircle2, AlertTriangle, Info, Usb, RefreshCw, PackagePlus, PlugZap, ScanBarcode, Keyboard } from "lucide-react";
import { type Product, kg, money2, num, isWeighted, scaleDevice, parseScaleBarcode } from "@/lib/mock-data";

/* ---------------- Small atoms ---------------- */

export function WeightBadge({ label = "بالوزن", tone = "brand" }: { label?: string; tone?: "brand" | "coral" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold leading-none ${tone === "brand" ? "bg-brand-soft text-brand" : "bg-coral/15 text-coral"}`}>
      <Scale className="w-3 h-3" />{label}
    </span>
  );
}

const plain = (n: number, d = 2) => new Intl.NumberFormat("ar-EG", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

/** Deterministic pseudo-EAN bars from digits — UI preview only */
export function BarcodeBars({ code, className = "h-12" }: { code: string; className?: string }) {
  const digits = code.replace(/\D/g, "").split("").map(Number);
  const bars: number[] = [1, 0, 1];
  digits.forEach((d) => { bars.push(...[(d >> 0) & 1, 0, (d >> 1) & 1, 1, (d >> 2) & 1, 0, 1]); });
  bars.push(1, 0, 1);
  return (
    <svg viewBox={`0 0 ${bars.length} 10`} preserveAspectRatio="none" className={`w-full ${className}`} aria-hidden>
      {bars.map((b, i) => b ? <rect key={i} x={i} width={i % 3 === 0 ? 1 : 0.6} height="10" className="fill-foreground" /> : null)}
    </svg>
  );
}

export const scaleCode = (plu: string, weight: number) => `${scaleDevice.prefix} ${plu} ${String(Math.round(weight * 1000)).padStart(6, "0")}`;

export function ScaleLabelPreview({ name, plu, weight, price }: { name: string; plu: string; weight: number; price: number }) {
  const code = scaleCode(plu || "0000", weight);
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-lg border border-dashed border-border bg-card p-4 shadow-soft font-mono" dir="rtl">
      <div className="text-center text-[10px] tracking-[0.3em] text-muted-foreground" dir="ltr">ZERO KIOSK</div>
      <div className="text-center font-display text-base font-semibold mt-1 font-sans">{name || "اسم المنتج"}</div>
      <div className="mt-2 grid grid-cols-2 text-xs font-sans">
        <div><div className="text-muted-foreground text-[10px]">الوزن</div><div className="font-semibold">{kg(weight)}</div></div>
        <div className="text-left"><div className="text-muted-foreground text-[10px]">القيمة</div><div className="font-semibold">{money2(weight * price)}</div></div>
      </div>
      <div className="mt-3"><BarcodeBars code={code} className="h-10" /></div>
      <div className="text-center text-[11px] tracking-widest mt-1" dir="ltr">{code}</div>
    </div>
  );
}

/* ---------------- Scale status (POS header) ---------------- */

export function ScaleStatus({ connected, onToggle }: { connected: boolean; onToggle?: () => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 h-8 text-xs text-muted-foreground hover:bg-accent transition">
          <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-success" : "bg-coral"}`} />
          <Scale className="w-3.5 h-3.5" />{connected ? "الميزان متصل" : "الميزان غير متصل"}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-4" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="font-display font-semibold text-sm">الميزان الإلكتروني</div>
          <span className={`text-xs font-medium ${connected ? "text-success" : "text-coral"}`}>{connected ? "متصل ✓" : "غير متصل"}</span>
        </div>
        <div className="mt-3 space-y-1.5 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">الجهاز</span><span dir="ltr">{scaleDevice.model}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">الاتصال</span><span>{scaleDevice.connection}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">آخر قراءة</span><span className="font-medium">{connected ? kg(scaleDevice.lastReading) : "—"}</span></div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button asChild size="sm" variant="outline" className="flex-1 h-8 text-xs"><Link to="/settings" hash="scale">إدارة الأجهزة</Link></Button>
          {onToggle && <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={onToggle}>{connected ? "محاكاة فصل" : "إعادة الاتصال"}</Button>}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ---------------- Inline error card ---------------- */

export type ScaleError = "disconnected" | "invalid" | "unknown" | "weight";
export function ScaleErrorCard({ kind, onRetry, onManual, onDismiss }: { kind: ScaleError; onRetry?: () => void; onManual?: () => void; onDismiss: () => void }) {
  const copy: Record<ScaleError, { title: string; desc: string }> = {
    disconnected: { title: "الميزان غير متصل", desc: "تأكد من توصيل كابل USB بالجهاز، أو كمّل البيع بإدخال الوزن يدويًا." },
    invalid: { title: "لم نتمكن من قراءة باركود الميزان.", desc: "تحقق من إعدادات الباركود أو جرّب المسح مرة أخرى." },
    unknown: { title: "هذا المنتج غير مسجل في Zero Kiosk.", desc: "كود الميزان على الملصق مش مربوط بأي صنف. سجّل المنتج مرة واحدة وهيتعرف عليه تلقائيًا بعد كده." },
    weight: { title: "الوزن غير صالح.", desc: "الوزن على الملصق صفر أو أكبر من حد الميزان. أعد وزن المنتج واطبع ملصق جديد." },
  };
  const c = copy[kind];
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/5 p-3 mb-4">
      <AlertTriangle className="w-4 h-4 text-coral mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{c.title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
        <div className="flex flex-wrap gap-2 mt-2.5">
          {kind === "disconnected" && <>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onRetry}><RefreshCw className="w-3 h-3 ms-1" />إعادة المحاولة</Button>
            <Button size="sm" className="h-7 text-xs bg-brand hover:bg-brand/90" onClick={onManual}><Keyboard className="w-3 h-3 ms-1" />إدخال الوزن يدويًا</Button>
          </>}
          {kind === "unknown" && <Button asChild size="sm" className="h-7 text-xs bg-brand hover:bg-brand/90"><Link to="/products"><PackagePlus className="w-3 h-3 ms-1" />إضافة المنتج</Link></Button>}
          {(kind === "invalid" || kind === "weight") && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onManual}><Keyboard className="w-3 h-3 ms-1" />إدخال الوزن يدويًا</Button>}
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onDismiss}>إغلاق</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Manual weight dialog ---------------- */

export function ManualWeightDialog({ product, onClose, onAdd }: { product: Product | null; onClose: () => void; onAdd: (p: Product, w: number) => void }) {
  const [val, setVal] = useState("1.250");
  useEffect(() => { if (product) setVal("1.250"); }, [product]);
  const w = Number(val.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(",", "."));
  const valid = Number.isFinite(w) && w > 0 && w <= 50;
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm" dir="rtl">
        {product && <>
          <DialogHeader className="text-right">
            <DialogTitle className="font-display flex items-center gap-2">{product.name} <WeightBadge /></DialogTitle>
            <DialogDescription>سعر الكيلو: <span className="font-semibold text-foreground">{money2(product.price)}</span></DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="zk-weight">الوزن</Label>
            <div className="relative mt-1.5">
              <Input id="zk-weight" autoFocus inputMode="decimal" dir="ltr" value={val} onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && valid) onAdd(product, w); }}
                className={`h-14 text-2xl font-display font-semibold text-center pl-14 ${valid ? "" : "border-coral focus-visible:ring-coral"}`} />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">كجم</span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0.25, 0.5, 1, 1.5, 2].map((q) => (
                <button key={q} onClick={() => setVal(q.toFixed(3))} className="flex-1 rounded-md border border-border py-1 text-xs hover:bg-accent">{plain(q, q % 1 ? 2 : 0)}</button>
              ))}
            </div>
            {!valid && <div className="text-xs text-coral mt-2">الوزن غير صالح.</div>}
          </div>
          <div className="flex items-center justify-between rounded-xl bg-brand-soft/60 px-4 py-3">
            <span className="text-sm text-muted-foreground">الإجمالي</span>
            <span className="font-display text-xl font-semibold text-brand">{valid ? money2(w * product.price) : "—"}</span>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={onClose}>إلغاء</Button>
            <Button disabled={!valid} className="bg-brand hover:bg-brand/90" onClick={() => onAdd(product, Math.round(w * 1000) / 1000)}>إضافة للسلة</Button>
          </DialogFooter>
        </>}
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Scale test dialog ---------------- */

export function ScaleTestDialog({ open, onOpenChange, connected = true, onAdd }: { open: boolean; onOpenChange: (o: boolean) => void; connected?: boolean; onAdd?: (w: number) => void }) {
  const [phase, setPhase] = useState<"wait" | "read">("wait");
  const [ago, setAgo] = useState(0);
  useEffect(() => {
    if (!open) return;
    setPhase("wait"); setAgo(0);
    const t = setTimeout(() => setPhase("read"), 1600);
    const i = setInterval(() => setAgo((a) => a + 1), 1000);
    return () => { clearTimeout(t); clearInterval(i); };
  }, [open]);
  const price = 85, w = 1.25;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="font-display">اختبار الميزان</DialogTitle>
          <DialogDescription>{scaleDevice.name} · <span dir="ltr">{scaleDevice.model}</span></DialogDescription>
        </DialogHeader>
        {!connected ? (
          <div className="rounded-xl border border-coral/30 bg-coral/5 p-5 text-center">
            <PlugZap className="w-6 h-6 text-coral mx-auto" />
            <div className="font-semibold mt-2">الميزان غير متصل</div>
            <div className="text-xs text-muted-foreground mt-1">تأكد من توصيل الكابل وتشغيل الميزان.</div>
          </div>
        ) : (
          <div className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-sm text-success font-medium"><CheckCircle2 className="w-4 h-4" />الميزان متصل</div>
            {phase === "wait" ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <Scale className="w-8 h-8 mx-auto mb-3 text-brand animate-pulse" />ضع المنتج على الميزان…
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">الوزن الحالي</div>
                  <div className="font-display text-4xl font-semibold mt-1">{kg(w)}</div>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-3"><span className="text-muted-foreground">السعر</span><span>{money2(price)} / كجم</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">القيمة</span><span className="font-semibold text-brand">{money2(w * price)}</span></div>
                <div className="text-[11px] text-muted-foreground text-center">آخر قراءة منذ {num(Math.max(1, ago - 1))} ثانية</div>
              </div>
            )}
          </div>
        )}
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>إغلاق</Button>
          <Button disabled={!connected || phase === "wait"} className="bg-brand hover:bg-brand/90" onClick={() => { onAdd?.(w); onOpenChange(false); }}>إضافة للبيع</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Barcode read test ---------------- */

export function BarcodeTestDialog({ open, onOpenChange, mode }: { open: boolean; onOpenChange: (o: boolean) => void; mode: "weight" | "price" }) {
  const [code, setCode] = useState("21 1045 001250");
  const r = parseScaleBarcode(code, mode);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="font-display">اختبار قراءة باركود</DialogTitle>
          <DialogDescription>امسح ملصق مطبوع من الميزان أو اكتب الكود.</DialogDescription>
        </DialogHeader>
        <Input dir="ltr" value={code} onChange={(e) => setCode(e.target.value)} className="h-11 font-mono text-center tracking-widest" />
        <div className="rounded-xl border border-border p-4 text-sm space-y-1.5">
          {!r ? <div className="text-muted-foreground">ده مش باركود ميزان (البادئة لازم تكون {scaleDevice.prefix}).</div>
            : !r.ok ? <div className="text-coral font-medium">{r.reason === "unknown" ? `كود الميزان ${r.plu} غير مسجل.` : r.reason === "weight" ? "الوزن غير صالح." : "لم نتمكن من قراءة باركود الميزان."}</div>
            : <>
              <div className="flex items-center gap-2 text-success font-medium"><CheckCircle2 className="w-4 h-4" />تمت القراءة</div>
              <div className="flex justify-between"><span className="text-muted-foreground">المنتج</span><span className="font-medium">{r.product.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">الوزن</span><span>{kg(r.weight)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">القيمة</span><span className="font-semibold text-brand">{money2(r.total)}</span></div>
            </>}
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>تم</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Scale settings section ---------------- */

export function ScaleSettings() {
  const [mode, setMode] = useState<"weight" | "price">("weight");
  const [prefix, setPrefix] = useState(scaleDevice.prefix);
  const [test, setTest] = useState(false);
  const [bc, setBc] = useState(false);
  const [saved, setSaved] = useState(false);
  const example = mode === "weight" ? `${prefix} 1045 001250` : `${prefix} 1045 010625`;
  return (
    <div id="scale" className="card-elevated mt-4 scroll-mt-24">
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <div className="text-xs text-muted-foreground">الأجهزة والميزان</div>
        <div className="font-display font-semibold text-[15px]">الميزان الإلكتروني</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-5">
        <div className="lg:col-span-2 rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-soft grid place-items-center text-brand"><Scale className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="font-medium text-sm">{scaleDevice.name}</div>
              <div className="text-xs text-success flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" />متصل</div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">الموديل</dt><dd dir="ltr">{scaleDevice.model}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">الاتصال</dt><dd className="flex items-center gap-1"><Usb className="w-3.5 h-3.5" />{scaleDevice.connection}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">الفرع</dt><dd>سيدي بشر</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">آخر قراءة</dt><dd>{kg(scaleDevice.lastReading)}</dd></div>
          </dl>
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="font-medium text-sm">إعدادات الباركود</div>
          <div className="grid grid-cols-2 gap-2">
            {([["weight", "باركود يحتوي على الوزن"], ["price", "باركود يحتوي على السعر"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setMode(k)} className={`rounded-lg border p-3 text-xs font-medium text-right transition ${mode === k ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-accent"}`}>{l}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>البادئة (Prefix)</Label><Input dir="ltr" value={prefix} maxLength={2} onChange={(e) => setPrefix(e.target.value)} className="mt-1.5 font-mono" /></div>
            <div><Label>طول كود المنتج (PLU)</Label><Input dir="ltr" defaultValue="4" className="mt-1.5 font-mono" /></div>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="text-xs text-muted-foreground mb-2">مثال</div>
            <div dir="ltr" className="font-mono text-lg tracking-widest text-center">
              <span className="text-brand">{example.split(" ")[0]}</span> <span>{example.split(" ")[1]}</span> <span className="text-coral">{example.split(" ")[2]}</span>
            </div>
            <div className="flex justify-center gap-4 text-[11px] text-muted-foreground mt-1.5">
              <span><span className="text-brand">●</span> البادئة</span><span>● كود المنتج</span><span><span className="text-coral">●</span> {mode === "weight" ? "الوزن بالجرام" : "السعر بالقرش"}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />يُستخدم هذا الإعداد لتفسير الباركود المطبوع من الميزان عند مسحه في نقطة البيع.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" onClick={() => setTest(true)}><Scale className="w-4 h-4 ms-1.5" />اختبار الميزان</Button>
            <Button variant="outline" onClick={() => setBc(true)}><ScanBarcode className="w-4 h-4 ms-1.5" />اختبار قراءة باركود</Button>
            <Button className="bg-brand hover:bg-brand/90" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>{saved ? "تم الحفظ ✓" : "حفظ الإعدادات"}</Button>
          </div>
        </div>
      </div>
      <ScaleTestDialog open={test} onOpenChange={setTest} />
      <BarcodeTestDialog open={bc} onOpenChange={setBc} mode={mode} />
    </div>
  );
}

/* ---------------- Product form (create/edit) ---------------- */

export function ProductFormDialog({ open, onOpenChange, initial }: { open: boolean; onOpenChange: (o: boolean) => void; initial?: Product | null }) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<"piece" | "kg">("piece");
  const [wUnit, setWUnit] = useState<"كجم" | "جرام">("كجم");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [plu, setPlu] = useState("");
  const [scale, setScale] = useState(true);
  useEffect(() => {
    if (!open) return;
    const p = initial;
    setName(p?.name ?? "جبنة رومي"); setMethod(p ? (p.unit ?? "piece") : "kg");
    setPrice(String(p?.price ?? 85)); setCost(String(p?.cost ?? 62)); setPlu(p?.plu ?? "1045"); setScale(p?.scaleBarcode ?? true);
  }, [open, initial]);
  const pr = Number(price) || 0, co = Number(cost) || 0;
  const per = method === "kg" ? `/ ${wUnit}` : "/ قطعة";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="font-display">{initial ? "تعديل المنتج" : "إضافة منتج"}</DialogTitle>
        </DialogHeader>
        <div className={`grid gap-6 ${method === "kg" ? "md:grid-cols-[1fr_260px]" : ""}`}>
          <div className="space-y-4">
            <div><Label>اسم المنتج</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
            <div>
              <Label>طريقة البيع</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {([["piece", "بالقطعة"], ["kg", "بالوزن"]] as const).map(([k, l]) => (
                  <button key={k} onClick={() => setMethod(k)} className={`h-10 rounded-lg border text-sm font-medium transition ${method === k ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-accent"}`}>{l}</button>
                ))}
              </div>
            </div>
            {method === "kg" && (
              <div>
                <Label>وحدة الوزن</Label>
                <div className="flex gap-2 mt-1.5">
                  {(["كجم", "جرام"] as const).map((u) => (
                    <button key={u} onClick={() => setWUnit(u)} className={`px-4 h-9 rounded-lg border text-xs font-medium ${wUnit === u ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-accent"}`}>{u}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><Label>سعر البيع <span className="text-muted-foreground font-normal">ج.م {per}</span></Label><Input dir="ltr" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" /></div>
              <div><Label>تكلفة الشراء <span className="text-muted-foreground font-normal">ج.م {per}</span></Label><Input dir="ltr" inputMode="decimal" value={cost} onChange={(e) => setCost(e.target.value)} className="mt-1.5" /></div>
            </div>
            {pr > 0 && <div className="text-xs text-muted-foreground">هامش الربح: <span className="font-semibold text-success">{plain(pr > 0 ? ((pr - co) / pr) * 100 : 0, 1)}٪</span> · {money2(pr - co)} {per}</div>}
            {method === "kg" && <>
              <div><Label>كود المنتج على الميزان (PLU)</Label><Input dir="ltr" value={plu} maxLength={4} onChange={(e) => setPlu(e.target.value.replace(/\D/g, ""))} className="mt-1.5 font-mono" /></div>
              <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium">تفعيل باركود الميزان</div>
                  <div className="text-xs text-muted-foreground mt-0.5">يُستخدم باركود الميزان لطباعة ملصق يحتوي على بيانات المنتج والوزن أو السعر، ثم يتم مسحه عند الكاشير.</div>
                </div>
                <Switch checked={scale} onCheckedChange={setScale} />
              </div>
            </>}
          </div>
          {method === "kg" && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">معاينة ملصق الميزان</div>
              <div className={scale ? "" : "opacity-40"}><ScaleLabelPreview name={name} plu={plu} weight={1.25} price={pr} /></div>
              {!scale && <div className="text-[11px] text-muted-foreground text-center mt-2">فعّل باركود الميزان لطباعة الملصق</div>}
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
          <Button className="bg-brand hover:bg-brand/90" onClick={() => onOpenChange(false)}>حفظ المنتج</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Product details ---------------- */

export function ProductDetailsDialog({ product, onClose, onEdit }: { product: Product | null; onClose: () => void; onEdit: (p: Product) => void }) {
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        {product && (() => {
          const w = isWeighted(product);
          const u = w ? "كجم" : "قطعة";
          const margin = ((product.price - product.cost) / product.price) * 100;
          return <>
            <DialogHeader className="text-right">
              <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
              <div className="flex items-center gap-2 pt-1">
                {w && <WeightBadge label="يُباع بالوزن" />}
                <span className="font-display font-semibold text-brand">{money2(product.price)} / {u}</span>
              </div>
            </DialogHeader>
            <dl className="divide-y divide-border rounded-xl border border-border text-sm">
              {[
                [`سعر البيع / ${u}`, money2(product.price)],
                [`تكلفة الشراء / ${u}`, money2(product.cost)],
                ["هامش الربح", `${plain(margin, 1)}٪`],
                ["المخزون الحالي", w ? kg(product.stock) : `${num(product.stock)} قطعة`],
                ...(w ? [["كود الميزان", product.plu ?? "—"], ["حالة ربط الميزان", product.scaleBarcode ? "مربوط ✓" : "غير مفعّل"]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className={`font-medium ${v === "مربوط ✓" ? "text-success" : ""}`}>{v}</dd></div>
              ))}
            </dl>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={onClose}>إغلاق</Button>
              <Button className="bg-brand hover:bg-brand/90" onClick={() => onEdit(product)}>تعديل</Button>
            </DialogFooter>
          </>;
        })()}
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Receiving weighted stock ---------------- */

export function ReceiveDialog({ product, onClose, onReceive }: { product: Product | null; onClose: () => void; onReceive: (p: Product, q: number) => void }) {
  const [q, setQ] = useState("25.500");
  const [c, setC] = useState("62");
  useEffect(() => { if (product) { setQ(isWeighted(product) ? "25.500" : "24"); setC(String(product.cost)); } }, [product]);
  const qn = Number(q) || 0, cn = Number(c) || 0;
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm" dir="rtl">
        {product && (() => {
          const w = isWeighted(product); const u = w ? "كجم" : "قطعة";
          return <>
            <DialogHeader className="text-right">
              <DialogTitle className="font-display flex items-center gap-2">استلام: {product.name} {w && <WeightBadge />}</DialogTitle>
              <DialogDescription>من {product.supplier}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>الكمية ({u})</Label><Input dir="ltr" inputMode="decimal" value={q} onChange={(e) => setQ(e.target.value)} className="mt-1.5" /></div>
              <div><Label>تكلفة الشراء / {u}</Label><Input dir="ltr" inputMode="decimal" value={c} onChange={(e) => setC(e.target.value)} className="mt-1.5" /></div>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">إجمالي التكلفة</span><span className="font-semibold">{money2(qn * cn)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">المخزون بعد الاستلام</span><span>{w ? kg(product.stock) : num(product.stock)} ← <span className="text-success font-semibold">{w ? kg(product.stock + qn) : num(product.stock + qn)}</span></span></div>
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={onClose}>إلغاء</Button>
              <Button disabled={qn <= 0} className="bg-brand hover:bg-brand/90" onClick={() => onReceive(product, qn)}>تأكيد الاستلام +{w ? kg(qn) : num(qn)}</Button>
            </DialogFooter>
          </>;
        })()}
      </DialogContent>
    </Dialog>
  );
}
