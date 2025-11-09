"use client";

import React, { useMemo, useState } from "react";
import { EventCard, type Event } from "../components/EventCard";

type Props = {
  initialEvents: Event[];
};

export default function EventsClient({ initialEvents }: Props) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");
  const [paidOnly, setPaidOnly] = useState(false);

  const cities = useMemo(() => {
    return Array.from(new Set(initialEvents.map((e) => e.city))).sort();
  }, [initialEvents]);

  const tags = useMemo(() => {
    const s = new Set<string>();
    initialEvents.forEach((e) => e.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [initialEvents]);

  const filtered = useMemo(() => {
    return initialEvents.filter((ev) => {
      if (q) {
        const low = q.toLowerCase();
        if (!ev.title.toLowerCase().includes(low) && !(ev.city || "").toLowerCase().includes(low)) return false;
      }
      if (city && ev.city !== city) return false;
      if (tag && !(ev.tags || []).includes(tag)) return false;
      if (paidOnly && !ev.isPaid) return false;
      if (date) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        const d = new Date(ev.dateISO);
        if (d < dayStart || d > dayEnd) return false;
      }
      return true;
    });
  }, [initialEvents, q, city, tag, date, paidOnly]);

  function resetFilters() {
    setQ("");
    setCity("");
    setTag("");
    setDate("");
    setPaidOnly(false);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          className="rounded border px-3 py-2"
          placeholder="Search title or city..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select className="rounded border px-3 py-2" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select className="rounded border px-3 py-2" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input className="rounded border px-3 py-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label className="inline-flex items-center gap-2 px-2">
          <input type="checkbox" checked={paidOnly} onChange={(e) => setPaidOnly(e.target.checked)} />
          <span className="text-sm">Paid only</span>
        </label>

        <button className="ml-2 rounded bg-slate-800 px-3 py-2 text-white" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filtered.length === 0 && <div>No events match your filters.</div>}
        {filtered.map((ev) => (
          <EventCard key={ev.id} e={ev} />
        ))}
      </div>
    </div>
  );
}
