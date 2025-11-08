export type Event = {
  id: string;
  title: string;
  dateISO: string;
  city: string;
  tags: string[];
  recommendedMajors: string[];
  isPaid: boolean;
  priceGBP?: number;
  distanceBucket: "local" | "nearby" | "city-away";
  isOppositeOfUserMajor: boolean;
};

function pointsFor(event: Event) {
  const base = 10; // showing up
  const majorBonus = event.isOppositeOfUserMajor ? 50 : 0; // opposite major gets big bump
  const distanceBonus = { local: 0, nearby: 20, "city-away": 40 }[event.distanceBucket];
  return base + majorBonus + distanceBonus; // 10..100
}

export function EventCard({ e }: { e: Event }) {
  const pts = pointsFor(e);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{e.title}</h3>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">+{pts} pts</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{new Date(e.dateISO).toLocaleString()}</p>
        <p className="text-sm text-slate-600">
          {e.city} · {e.tags.join(" · ")}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {e.isPaid ? (
          <span className="text-sm text-slate-700">
            £{e.priceGBP?.toFixed(2)} before points
          </span>
        ) : (
          <span className="text-sm text-green-700">Free</span>
        )}
        <button className="rounded-xl bg-blue-600 px-4 py-2 text-white">View</button>
      </div>
    </div>
  );
}
