import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { FeaturedEvents } from "./components/FeaturedEvents";
import { CTA } from "./components/CTA";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import prisma from "@/app/lib/prisma";
import { type Event } from "./components/EventCard";

async function getFeaturedEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    where: {
      isOppositeOfUserMajor: true, // Show opposite major events
    },
    orderBy: {
      dateISO: "asc",
    },
    take: 7, // Limit to 7 events for the carousel
  });

  return events.map((event) => ({
    id: event.id,
    title: event.title,
    dateISO: event.dateISO,
    city: event.city,
    tags: JSON.parse(event.tags),
    imageUrl: event.imageUrl || undefined,
    recommendedMajors: JSON.parse(event.recommendedMajors),
    isPaid: event.isPaid,
    priceGBP: event.priceGBP || undefined,
    distanceBucket: event.distanceBucket as "local" | "nearby" | "city-away",
    isOppositeOfUserMajor: event.isOppositeOfUserMajor,
  }));
}

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedEvents events={featuredEvents} />
      <CTA />
      <Footer />
    </main>
  );
}