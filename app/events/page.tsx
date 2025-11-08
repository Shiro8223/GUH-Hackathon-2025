import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EventCard, type Event } from "../components/EventCard";


const events: Event[] = [
{
id: "1",
title: "Intro to 3D Printing",
dateISO: new Date().toISOString(),
city: "Manchester",
tags: ["STEM", "Makers"],
recommendedMajors: ["Art & Design", "Business"],
isPaid: false,
distanceBucket: "city-away",
priceGBP: 0,
isOppositeOfUserMajor: true,
},
{
id: "2",
title: "Improv Comedy Jam",
dateISO: new Date(Date.now() + 86400000).toISOString(),
city: "Manchester",
tags: ["Arts", "Performance"],
recommendedMajors: ["Computer Science", "Engineering"],
isPaid: true,
priceGBP: 6,
distanceBucket: "nearby",
isOppositeOfUserMajor: true,
},
{
id: "3",
title: "Finance for Founders",
dateISO: new Date(Date.now() + 2 * 86400000).toISOString(),
city: "Salford",
tags: ["Business", "Startups"],
recommendedMajors: ["Theatre", "Fine Art"],
isPaid: false,
distanceBucket: "local",
priceGBP: 0,
isOppositeOfUserMajor: false,
},
{
id: "4",
title: "Urban Sketching Walk",
dateISO: new Date(Date.now() + 3 * 86400000).toISOString(),
city: "Liverpool",
tags: ["Design", "Art"],
recommendedMajors: ["STEM", "Business"],
isPaid: false,
distanceBucket: "city-away",
priceGBP: 0,
isOppositeOfUserMajor: true,
},
];


export default function EventsPage() {
return (
<main className="flex min-h-screen flex-col bg-white text-slate-900">
<Navbar />
<section className="mx-auto max-w-6xl px-4 py-16">
<h1 className="text-4xl font-bold mb-8">All Events</h1>
<div className="grid gap-6 md:grid-cols-3">
{events.map((event) => (
<EventCard key={event.id} e={event} />
))}
</div>
</section>
<Footer />
</main>
);
}