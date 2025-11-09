"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { User, LogOut } from "lucide-react";

type Profile = {
  id: string;
  name: string;
  email: string;
  major: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [rsvps, setRsvps] = useState<string[]>([]);
  const [usedDiscounts, setUsedDiscounts] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bubble.profile");
      if (raw) setProfile(JSON.parse(raw));
      const p = localStorage.getItem("bubble.points");
      if (p) setPoints(Number(p));
      else {
        // seed with a demo value
        setPoints(120);
        localStorage.setItem("bubble.points", String(120));
      }

      const r = localStorage.getItem("bubble.rsvps");
      if (r) setRsvps(JSON.parse(r));
      else {
        // seed with demo RSVPs (event ids)
        const seed = ["1", "5"];
        setRsvps(seed);
        localStorage.setItem("bubble.rsvps", JSON.stringify(seed));
      }

      const ud = localStorage.getItem("bubble.usedDiscounts");
      if (ud) setUsedDiscounts(JSON.parse(ud));
    } catch (e) {
      // ignore
    }
  }, []);

  function signOut() {
    localStorage.removeItem("bubble.profile");
    router.push("/");
  }

  // Mock events to display — these mirror the events used elsewhere for demo purposes
  const mockEvents = [
    {
      id: "1",
      title: "Intro to 3D Printing Workshop",
      dateISO: new Date().toISOString(),
      city: "Manchester",
      imageUrl: "https://via.placeholder.com/640x360?text=3D+Printing+Workshop",
      priceGBP: 0,
      discount: null,
    },
    {
      id: "5",
      title: "AI in Healthcare Symposium",
      dateISO: new Date(Date.now() + 4 * 86400000).toISOString(),
      city: "Manchester",
      imageUrl: "https://via.placeholder.com/640x360?text=AI+Healthcare",
      priceGBP: 25,
      discount: { id: 'd1', label: '20% off', costPoints: 50 },
    },
    {
      id: "7",
      title: "Game Development Hackathon",
      dateISO: new Date(Date.now() + 6 * 86400000).toISOString(),
      city: "Manchester",
      imageUrl: "https://via.placeholder.com/640x360?text=Game+Dev+Hackathon",
      priceGBP: 0,
      discount: { id: 'd2', label: 'Free swag pack', costPoints: 30 },
    },
  ];

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
    } catch (e) {
      return iso;
    }
  }

  function cancelRsvp(id: string) {
    const next = rsvps.filter((x) => x !== id);
    setRsvps(next);
    localStorage.setItem("bubble.rsvps", JSON.stringify(next));
  }

  function redeemDiscount(eventId: string, discountId: string, costPoints: number) {
    if (points < costPoints) return;
    const nextPoints = points - costPoints;
    setPoints(nextPoints);
    localStorage.setItem("bubble.points", String(nextPoints));
    const nextUsed = { ...usedDiscounts, [discountId]: true };
    setUsedDiscounts(nextUsed);
    localStorage.setItem("bubble.usedDiscounts", JSON.stringify(nextUsed));
    // For demo, also mark the event as having discount applied — no backend
    alert(`Redeemed ${discountId} for event ${eventId}. Points remaining: ${nextPoints}`);
  }

  return (
  <main className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <aside className="card card-accent">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-3 shadow-sm">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{profile?.name ?? "Your name"}</h2>
                <p className="text-sm text-slate-600">{profile?.major ?? "Major"}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Email</span>
                <span className="font-medium">{profile?.email ?? "—"}</span>
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-500">Bubble Points</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm">{points}</div>
                  <div className="text-sm text-slate-600">Points can be redeemed for discounts and swag.</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={signOut} className="btn btn-ghost inline-flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </aside>

          <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Profile overview</h3>
            <p className="mt-2 text-slate-600">A simple profile summary showing your account details and activity.</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <h4 className="text-sm text-slate-500">Upcoming events</h4>
                <div className="mt-3 space-y-3">
                  {mockEvents.filter(e => rsvps.includes(e.id)).length === 0 && (
                    <p className="text-sm text-slate-700">You haven't signed up to any events yet.</p>
                  )}
                  {mockEvents.filter(e => rsvps.includes(e.id)).map((ev) => (
                    <div key={ev.id} className="flex items-center gap-3 rounded-md border bg-[var(--brand-50)] p-3 shadow-sm">
                      <img src={ev.imageUrl} className="h-14 w-24 rounded-md object-cover" alt={ev.title} />
                      <div className="flex-1">
                        <div className="font-medium">{ev.title}</div>
                        <div className="text-xs text-slate-500">{formatDate(ev.dateISO)} • {ev.city}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-semibold">{ev.priceGBP === 0 ? "Free" : `£${ev.priceGBP}`}</div>
                        <button onClick={() => cancelRsvp(ev.id)} className="btn btn-ghost text-xs">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <h4 className="text-sm text-slate-500">Discounts available</h4>
                <div className="mt-3 space-y-3">
                  {mockEvents.filter(e => e.discount && !usedDiscounts[(e.discount as any).id]).length === 0 && (
                    <p className="text-sm text-slate-700">No discounts available right now.</p>
                  )}

                  {mockEvents.filter(e => e.discount).map((ev) => {
                    const d = ev.discount as any;
                    const used = usedDiscounts[d.id];
                    return (
                      <div key={ev.id} className="flex items-center justify-between gap-3 rounded-md border bg-[var(--brand-50)] p-3 shadow-sm">
                        <div>
                          <div className="font-medium">{d.label} — {ev.title}</div>
                          <div className="text-xs text-slate-500">Cost: {d.costPoints} points</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-slate-700">{used ? "Redeemed" : "Available"}</div>
                          <button
                            disabled={used || points < d.costPoints}
                            onClick={() => redeemDiscount(ev.id, d.id, d.costPoints)}
                            className={`mt-2 btn ${used || points < d.costPoints ? 'btn-ghost text-slate-400' : 'btn-primary'}`}
                          >
                            {used ? 'Used' : `Redeem (${d.costPoints})`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
