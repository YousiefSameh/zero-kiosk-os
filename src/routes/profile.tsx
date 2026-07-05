import { createFileRoute } from "@tanstack/react-router";
import { AppShell, SectionCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Your personal account">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard className="lg:col-span-1">
          <div className="text-center py-4">
            <Avatar className="w-20 h-20 mx-auto"><AvatarFallback className="bg-brand text-brand-foreground text-2xl font-display">LM</AvatarFallback></Avatar>
            <div className="mt-3 font-display font-semibold text-lg">Laila Mostafa</div>
            <div className="text-sm text-muted-foreground">Owner · Zamalek Flagship</div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs bg-brand-soft text-brand px-3 py-1 rounded-full font-medium">Zero Kiosk Pro</div>
          </div>
          <div className="border-t border-border pt-4 grid grid-cols-3 text-center">
            <div><div className="font-display font-semibold">248</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Sessions</div></div>
            <div><div className="font-display font-semibold">4</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Branches</div></div>
            <div><div className="font-display font-semibold">42</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Team</div></div>
          </div>
        </SectionCard>

        <SectionCard className="lg:col-span-2" title="Account details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Full name</Label><Input defaultValue="Laila Mostafa" className="mt-1.5" /></div>
            <div><Label>Email</Label><Input defaultValue="laila@zerokiosk.com" className="mt-1.5" /></div>
            <div><Label>Phone</Label><Input defaultValue="+20 100 223 4411" className="mt-1.5" /></div>
            <div><Label>Language</Label><Input defaultValue="English (Egypt)" className="mt-1.5" /></div>
            <div className="md:col-span-2"><Label>Role</Label><Input defaultValue="Owner" disabled className="mt-1.5" /></div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-brand hover:bg-brand/90">Save changes</Button>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
