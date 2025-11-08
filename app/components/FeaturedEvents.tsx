import { EventCard, type Event } from "../components/EventCard";


const mock: Event[] = [
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
dateISO: new Date(Date.now() + 2*86400000).toISOString(),
city: "Salford",
tags: ["Business", "Startups"],
recommendedMajors: ["Theatre", "Fine Art"],
isPaid: false,
distanceBucket: "local",
priceGBP: 0,
isOppositeOfUserMajor: false,
},
];


export function FeaturedEvents() {
return (
<section id="#events" className="mx-auto max-w-6xl px-4 py-12">
<div className="mb-4 flex items-end justify-between">
<h2 className="text-2xl font-bold">Opposites for you</h2>
<a href="/events" className="text-sm underline">See all</a>
</div>
<div className="grid gap-6 md:grid-cols-3">
{mock.map((e) => (
<EventCard key={e.id} e={e} />
))}
</div>
</section>
);
}