"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Calendar, MapPin, Tag, Sparkles, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Event } from "../../components/EventCard";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRsvped, setIsRsvped] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        const foundEvent = data.events.find((e: Event) => e.id === params.id);
        if (foundEvent) {
          setEvent(foundEvent);
          // Check if already RSVPed
          const rsvps = localStorage.getItem("bubble.rsvps");
          if (rsvps) {
            const rsvpArray = JSON.parse(rsvps);
            setIsRsvped(rsvpArray.includes(foundEvent.id));
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [params.id]);

  function handleRsvp() {
    if (!event) return;
    
    const rsvps = localStorage.getItem("bubble.rsvps");
    const rsvpArray = rsvps ? JSON.parse(rsvps) : [];
    
    if (!rsvpArray.includes(event.id)) {
      rsvpArray.push(event.id);
      localStorage.setItem("bubble.rsvps", JSON.stringify(rsvpArray));
      setIsRsvped(true);
      alert(event.isPaid ? "Redirecting to payment..." : "Successfully RSVPed! Check your profile for upcoming events.");
      
      if (event.isPaid) {
        // In a real app, this would redirect to payment gateway
        console.log("Payment flow would start here");
      } else {
        // Redirect to profile after RSVP
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      }
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-white text-slate-900">
        <Navbar />
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">Loading event details...</div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!event) {
    return (
      <main className="flex min-h-screen flex-col bg-white text-slate-900">
        <Navbar />
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event not found</h1>
            <Button onClick={() => router.push("/events")}>Back to Events</Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Enlarged Image */}
        <div className="relative overflow-hidden rounded-xl mb-6 h-96 bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={event.imageUrl ?? "https://via.placeholder.com/640x360?text=Event+Image"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.isOppositeOfUserMajor && (
            <Badge className="absolute top-4 right-4 gap-1 bg-blue-600 text-white">
              <Sparkles className="h-3 w-3" />
              Opposite Major
            </Badge>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 text-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold">Date & Time</div>
                <div className="text-sm text-slate-600">
                  {new Date(event.dateISO).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold">Location</div>
                <div className="text-sm text-slate-600">{event.city}</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Recommended Majors</h2>
            <div className="flex flex-wrap gap-2">
              {event.recommendedMajors.map((major) => (
                <Badge key={major} variant="secondary">
                  {major}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {event.isPaid ? `£${event.priceGBP?.toFixed(2)}` : "Free"}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {event.distanceBucket === "local" && "📍 Local event"}
                  {event.distanceBucket === "nearby" && "📍 Nearby event"}
                  {event.distanceBucket === "city-away" && "📍 City away"}
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleRsvp}
                disabled={isRsvped}
                className="px-8"
              >
                {isRsvped
                  ? "Already RSVPed"
                  : event.isPaid
                  ? "Pay Now"
                  : "RSVP"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

