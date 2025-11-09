export type Event = {
  id: string;
  title: string;
  dateISO: string;
  city: string;
  tags: string[];
  imageUrl?: string;
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
    <div className="card card-accent flex flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Image (uniform size). Falls back to a placeholder if no imageUrl provided */}
      <div className="mb-3 overflow-hidden rounded-xl">
        <img
          src={e.imageUrl ?? "https://via.placeholder.com/640x360?text=Event+Image"}
          alt={e.title}
          className="card-img"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{e.title}</h3>
          <span className="badge">+{pts} pts</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{new Date(e.dateISO).toLocaleString()}</p>
        <p className="text-sm text-slate-600">
          {e.city} · {e.tags.join(" · ")}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {e.isPaid ? (
          <span className="text-sm text-slate-700">£{e.priceGBP?.toFixed(2)} before points</span>
        ) : (
          <span className="text-sm text-green-700">Free</span>
        )}
        <button className="btn btn-primary">View</button>
      </div>
    </div>
  );
}
