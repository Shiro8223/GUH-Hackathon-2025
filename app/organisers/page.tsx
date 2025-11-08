"use client";
import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import type { Event } from "../components/EventCard";
import { computeBubblePoints, type DistanceBucket } from "../lib/points";

const MAJORS = [
  "Computer Science", "Engineering", "Art & Design", "Theatre", "Business",
  "Humanities", "Health Sciences", "Mathematics", "Physics", "Psychology",
];

export default function SubmitEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateISO, setDateISO] = useState<string>("");
  const [city, setCity] = useState("");
  const [tagsText, setTagsText] = useState(""); // comma-separated
  const [recommendedMajors, setRecommendedMajors] = useState<string[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [priceGBP, setPriceGBP] = useState<number>(0);
  const [distanceBucket, setDistanceBucket] = useState<DistanceBucket>("local");
  const [previewOpposite, setPreviewOpposite] = useState(true);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const tags = useMemo(
    () => tagsText.split(",").map(t => t.trim()).filter(Boolean),
    [tagsText]
  );

  const previewPoints = useMemo(
    () => computeBubblePoints({ isOppositeMajor: previewOpposite, distance: distanceBucket }),
    [previewOpposite, distanceBucket]
  );

  function toggleMajor(m: string) {
    setRecommendedMajors(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  function validate(): string[] {
    const e: string[] = [];
    if (!title.trim()) e.push("Title is required");
    if (!dateISO) e.push("Date & time is required");
    if (!city.trim()) e.push("City is required");
    if (isPaid && (isNaN(priceGBP) || priceGBP <= 0)) e.push("Enter a valid price for paid events");
    return e;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;

    // ✅ Build the event object (NO JSX here)
    const event: Event = {
      id: crypto.randomUUID(),
      title: title.trim(),
      dateISO: new Date(dateISO).toISOString(),
      city: city.trim(),
      tags,
      recommendedMajors,
      isPaid,
      priceGBP: isPaid ? Number(priceGBP) : 0,
      distanceBucket,
      isOppositeOfUserMajor: false, // calculated per user later
    };

    // Demo persistence
    const raw = localStorage.getItem("bubble.events");
    const arr = raw ? (JSON.parse(raw) as Event[]) : [];
    arr.push(event);
    localStorage.setItem("bubble.events", JSON.stringify(arr));
    setSubmittedId(event.id);

    // reset a bit
    setTitle(""); setDescription(""); setDateISO(""); setCity("");
    setTagsText(""); setRecommendedMajors([]); setIsPaid(false);
    setPriceGBP(0); setDistanceBucket("local");
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold">Submit an event</h1>
        <p className="mb-6 text-slate-600">Fill in the details below. Events save locally for the demo.</p>

        {errors.length > 0 && (
          <div className="mb-4 rounded-xl border border-blue-300 bg-blue-50 p-3 text-sm text-red-700">
            <ul className="list-disc pl-5">{errors.map((er, i) => <li key={i}>{er}</li>)}</ul>
          </div>
        )}

        {submittedId && (
          <div className="mb-4 rounded-xl border border-blue-300 bg-blue-50 p-3 text-sm">
            <b>Event saved!</b> View it on <a className="underline" href="/events">the Events page</a>.
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
          {/* Left column */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Basics</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block">Title *</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g. Intro to 3D Printing"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-24 w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="What should attendees expect?"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block">Date & time *</span>
                  <input
                    type="datetime-local"
                    value={dateISO}
                    onChange={(e) => setDateISO(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block">City *</span>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="e.g. Manchester"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block">Tags (comma-separated)</span>
                <input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="STEM, Makers, Robotics"
                />
              </label>
            </div>
          </section>

          {/* Right column */}
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold">Audience & pricing</h2>
            <div className="mt-4 space-y-4">
              <div>
                <span className="mb-2 block text-sm">Recommended majors</span>
                <div className="grid grid-cols-2 gap-2">
                  {MAJORS.map((m) => (
                    <label key={m} className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white p-2">
                      <input
                        type="checkbox"
                        checked={recommendedMajors.includes(m)}
                        onChange={() => toggleMajor(m)}
                      />
                      <span className="text-sm">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                  Paid event
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block">Price (GBP)</span>
                  <input
                    type="number"
                    step="0.5"
                    min={0}
                    disabled={!isPaid}
                    value={priceGBP}
                    onChange={(e) => setPriceGBP(parseFloat(e.target.value))}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block">Distance bucket</span>
                <select
                  value={distanceBucket}
                  onChange={(e) => setDistanceBucket(e.target.value as DistanceBucket)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="local">Local</option>
                  <option value="nearby">Nearby</option>
                  <option value="city-away">City away</option>
                </select>
              </label>

              {/* Bubble points preview */}
              <div className="rounded-xl border border-blue-300 bg-white p-3 text-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span>Bubble Points (preview)</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs">+{previewPoints} pts</span>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={previewOpposite}
                    onChange={(e) => setPreviewOpposite(e.target.checked)}
                  />
                  Assume attendee is outside the recommended major
                </label>
                <p className="mt-1 text-xs text-slate-600">Actual points are computed per attendee at check-in.</p>
              </div>
            </div>
          </section>

          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2 text-white">Submit event</button>
            <a href="/events" className="text-sm underline">Go to Events</a>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}
