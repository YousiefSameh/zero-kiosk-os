import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, currency } from "@/lib/mock-data";
import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Wallet, Barcode, User } from "lucide-react";

export const Route = createFileRoute("/pos")({ component: PosPage });

type CartLine = { id: string; name: string; price: number; qty: number };

function PosPage() {
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<CartLine[]>([
    { id: "SKU-1001", name: "Coca-Cola 330ml", price: 12, qty: 4 },
    { id: "SKU-1004", name: "Oreo Original", price: 18, qty: 2 },
    { id: "SKU-1006", name: "Juhayna Full Cream 1L", price: 42, qty: 1 },
  ]);
  const [method, setMethod] = useState<"Cash" | "Card" | "Wallet">("Card");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 12);
  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const vat = subtotal * 0.14;
  const total = subtotal + vat;

  const add = (p: typeof products[number]) =>
    setCart((c) => {
      const ex = c.find((l) => l.id === p.id);
      if (ex) return c.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });

  return (
    <AppShell title="Point of Sale" subtitle="Terminal 04 · Zamalek Flagship · Cashier: Menna Tarek">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Catalog */}
        <div className="lg:col-span-3 card-elevated p-5">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Barcode className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Scan or search product…" className="pl-9 h-11 rounded-lg" />
            </div>
            <Button variant="outline" className="h-11"><Search className="w-4 h-4 mr-1.5" />Search</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => add(p)}
                className="text-left rounded-xl border border-border bg-card hover:border-brand hover:shadow-soft transition p-3 group"
              >
                <div className="aspect-square rounded-lg bg-brand-soft grid place-items-center text-brand font-display font-semibold text-lg mb-2 group-hover:scale-[1.02] transition">
                  {p.name.slice(0, 2)}
                </div>
                <div className="text-xs font-medium line-clamp-2 min-h-[2rem]">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.category}</div>
                <div className="text-sm font-semibold text-brand mt-1">{currency(p.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-2 card-elevated flex flex-col">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-display font-semibold">Current sale</div>
              <div className="text-xs text-muted-foreground">Ticket #A-88428</div>
            </div>
            <Button variant="outline" size="sm"><User className="w-4 h-4 mr-1.5" />Attach customer</Button>
          </div>

          <div className="flex-1 divide-y divide-border max-h-[380px] overflow-y-auto">
            {cart.map((l) => (
              <div key={l.id} className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted grid place-items-center text-xs font-medium shrink-0">{l.name.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{currency(l.price)} each</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCart((c) => c.map((x) => x.id === l.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} className="w-7 h-7 rounded-md border border-border hover:bg-accent grid place-items-center"><Minus className="w-3 h-3" /></button>
                  <span className="w-8 text-center text-sm font-medium">{l.qty}</span>
                  <button onClick={() => setCart((c) => c.map((x) => x.id === l.id ? { ...x, qty: x.qty + 1 } : x))} className="w-7 h-7 rounded-md border border-border hover:bg-accent grid place-items-center"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="w-20 text-right text-sm font-semibold">{currency(l.price * l.qty)}</div>
                <button onClick={() => setCart((c) => c.filter((x) => x.id !== l.id))} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-border space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">VAT (14%)</span><span>{currency(vat)}</span></div>
            <div className="flex justify-between font-display text-lg font-semibold pt-2 border-t border-border"><span>Total</span><span className="text-brand">{currency(total)}</span></div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {(["Cash", "Card", "Wallet"] as const).map((m) => {
                const Icon = m === "Cash" ? Banknote : m === "Card" ? CreditCard : Wallet;
                return (
                  <button key={m} onClick={() => setMethod(m)} className={`p-3 rounded-lg border text-xs font-medium transition ${
                    method === m ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-accent"
                  }`}>
                    <Icon className="w-4 h-4 mx-auto mb-1" />{m}
                  </button>
                );
              })}
            </div>

            <Button className="w-full h-11 bg-coral hover:bg-coral/90 text-coral-foreground font-semibold mt-2">
              Charge {currency(total)}
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
