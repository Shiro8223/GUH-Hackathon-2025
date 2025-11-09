import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { type Event } from "../components/EventCard";
import EventsClient from "./EventsClient";


const events: Event[] = [
{
id: "1",
title: "Intro to 3D Printing Workshop",
dateISO: new Date().toISOString(),
city: "Manchester",
tags: ["STEM", "Makers", "Technology"],
imageUrl: "https://via.placeholder.com/640x360?text=3D+Printing+Workshop",
recommendedMajors: ["Art & Design", "Engineering"],
isPaid: false,
distanceBucket: "city-away",
priceGBP: 0,
isOppositeOfUserMajor: true,
},
{
id: "2",
title: "Stand-up Comedy Night",
dateISO: new Date(Date.now() + 86400000).toISOString(),
city: "Manchester",
tags: ["Arts", "Performance", "Entertainment"],
imageUrl: "https://via.placeholder.com/640x360?text=Comedy+Night",
recommendedMajors: ["Computer Science", "Engineering"],
isPaid: true,
priceGBP: 8,
distanceBucket: "nearby",
isOppositeOfUserMajor: true,
},
{
id: "3",
title: "Startup Pitch Workshop",
dateISO: new Date(Date.now() + 2 * 86400000).toISOString(),
city: "Salford",
tags: ["Business", "Startups", "Networking"],
imageUrl: "https://via.placeholder.com/640x360?text=Pitch+Workshop",
recommendedMajors: ["Business", "Economics"],
isPaid: true,
distanceBucket: "local",
priceGBP: 15,
isOppositeOfUserMajor: false,
},
{
id: "4",
title: "Creative Photography Walk",
dateISO: new Date(Date.now() + 3 * 86400000).toISOString(),
city: "Liverpool",
tags: ["Art", "Photography", "Outdoor"],
imageUrl: "https://via.placeholder.com/640x360?text=Photography+Walk",
recommendedMajors: ["STEM", "Business"],
isPaid: false,
distanceBucket: "city-away",
priceGBP: 0,
isOppositeOfUserMajor: true,
},
{
id: "5",
title: "AI in Healthcare Symposium",
dateISO: new Date(Date.now() + 4 * 86400000).toISOString(),
city: "Manchester",
tags: ["Technology", "Healthcare", "AI"],
imageUrl: "https://via.placeholder.com/640x360?text=AI+Healthcare",
recommendedMajors: ["Medicine", "Computer Science"],
isPaid: true,
distanceBucket: "nearby",
priceGBP: 25,
isOppositeOfUserMajor: false,
},
{
id: "6",
title: "Sustainable Fashion Workshop",
dateISO: new Date(Date.now() + 5 * 86400000).toISOString(),
city: "Salford",
tags: ["Fashion", "Sustainability", "Design"],
imageUrl: "https://via.placeholder.com/640x360?text=Sustainable+Fashion",
recommendedMajors: ["Environmental Science", "Fashion Design"],
isPaid: true,
distanceBucket: "local",
priceGBP: 12,
isOppositeOfUserMajor: true,
},
{
id: "7",
title: "Game Development Hackathon",
dateISO: new Date(Date.now() + 6 * 86400000).toISOString(),
city: "Manchester",
tags: ["Gaming", "Technology", "Development"],
imageUrl: "https://via.placeholder.com/640x360?text=Game+Dev+Hackathon",
recommendedMajors: ["Computer Science", "Digital Arts"],
isPaid: false,
distanceBucket: "nearby",
priceGBP: 0,
isOppositeOfUserMajor: false,
},
{
id: "8",
title: "Mental Health in Tech",
dateISO: new Date(Date.now() + 7 * 86400000).toISOString(),
city: "Liverpool",
tags: ["Wellbeing", "Technology", "Health"],
imageUrl: "https://via.placeholder.com/640x360?text=Tech+Mental+Health",
recommendedMajors: ["Psychology", "Computer Science"],
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
<EventsClient initialEvents={events} />
</section>
<Footer />
</main>
);
}