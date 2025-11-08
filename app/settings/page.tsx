"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const MAJORS = [
  "Computer Science",
  "Engineering",
  "Art & Design",
  "Theatre",
  "Business",
  "Humanities",
  "Health Sciences",
  "Mathematics",
  "Physics",
  "Psychology",
];

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState(MAJORS[0]);
  const [city, setCity] = useState("");
  const [eventRecos, setEventRecos] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [openness, setOpenness] = useState(70);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  // hydrate from localStorage (demo only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bubble.settings");
      if (raw) {
        const v = JSON.parse(raw);
        setName(v.name ?? "");
        setEmail(v.email ?? "");
        setMajor(v.major ?? MAJORS[0]);
        setCity(v.city ?? "");
        setEventRecos(v.eventRecos ?? true);
        setReminders(v.reminders ?? true);
        setOpenness(v.openness ?? 70);
      }
    } catch {}
  }, []);

  function save() {
    setSaving(true);
    const payload = { name, email, major, city, eventRecos, reminders, openness };
    try {
      localStorage.setItem("bubble.settings", JSON.stringify(payload));
      setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setTimeout(() => setSaving(false), 400);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Profile</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block">Display name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g. Alex"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="name@uni.ac.uk"
                  type="email"
                />
              </label>
            </div>
          </section>

          {/* Study & Location */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Study & location</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block">Major</span>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {MAJORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block">Home city</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g. Salford"
                />
              </label>
            </div>
          </section>

          {/* Recommendations */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Recommendations</h2>
            <div className="mt-4 space-y-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={eventRecos}
                  onChange={(e) => setEventRecos(e.target.checked)}
                />
                <span>Show event recommendations</span>
              </label>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span>Push me outside my bubble</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs">
                    {openness}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={openness}
                  onChange={(e) => setOpenness(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-xs text-slate-600">
                  Higher means more cross-discipline and further-distance events.
                </p>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="mt-4 space-y-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={reminders}
                  onChange={(e) => setReminders(e.target.checked)}
                />
                <span>Remind me about saved events</span>
              </label>
              <p className="text-xs text-slate-600">Coming soon: email / push preferences.</p>
            </div>
          </section>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-2 text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
          {savedAt && <span className="text-sm text-slate-600">Saved at {savedAt}</span>}
        </div>
      </section>
      <Footer />
    </main>
  );
}
