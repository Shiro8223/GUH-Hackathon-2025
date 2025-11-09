import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { type Event } from "../components/EventCard";
import EventsClient from "./EventsClient";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getEvents(): Promise<Event[]> {
  const events = await prisma.event.findMany({
    orderBy: {
      dateISO: "asc",
    },
  });

  // Parse JSON strings back to arrays and convert to Event type
  return events.map((event: Awaited<ReturnType<typeof prisma.event.findMany>>[number]) => ({
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

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Events</h1>
          <Link href="/events/add">
            <Button>Add Event</Button>
          </Link>
        </div>
        <EventsClient initialEvents={events} />
      </section>
      <Footer />
    </main>
  );
}