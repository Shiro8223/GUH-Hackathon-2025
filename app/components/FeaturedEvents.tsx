"use client";

import React, { useEffect, useRef } from "react";
import { EventCard, type Event } from "../components/EventCard";

const mock: Event[] = [
  { id: "1", title: "Intro to 3D Printing", dateISO: new Date().toISOString(), city: "Manchester", tags: ["STEM", "Makers"], recommendedMajors: ["Art & Design", "Business"], isPaid: false, distanceBucket: "city-away", priceGBP: 0, isOppositeOfUserMajor: true },
  { id: "2", title: "Improv Comedy Jam", dateISO: new Date(Date.now() + 86400000).toISOString(), city: "Manchester", tags: ["Arts", "Performance"], recommendedMajors: ["Computer Science", "Engineering"], isPaid: true, priceGBP: 6, distanceBucket: "nearby", isOppositeOfUserMajor: true },
  { id: "3", title: "Finance for Founders", dateISO: new Date(Date.now() + 2 * 86400000).toISOString(), city: "Salford", tags: ["Business", "Startups"], recommendedMajors: ["Theatre", "Fine Art"], isPaid: false, distanceBucket: "local", priceGBP: 0, isOppositeOfUserMajor: false },
  { id: "4", title: "Urban Sketching Walk", dateISO: new Date(Date.now() + 3 * 86400000).toISOString(), city: "Liverpool", tags: ["Art", "Photography"], recommendedMajors: ["STEM", "Business"], isPaid: false, distanceBucket: "city-away", priceGBP: 0, isOppositeOfUserMajor: true },
  { id: "5", title: "AI in Healthcare Symposium", dateISO: new Date(Date.now() + 4 * 86400000).toISOString(), city: "Manchester", tags: ["Technology", "Healthcare"], recommendedMajors: ["Medicine", "Computer Science"], isPaid: true, priceGBP: 25, distanceBucket: "nearby", isOppositeOfUserMajor: false },
  { id: "6", title: "Sustainable Fashion Workshop", dateISO: new Date(Date.now() + 5 * 86400000).toISOString(), city: "Salford", tags: ["Fashion", "Sustainability"], recommendedMajors: ["Environmental Science", "Fashion Design"], isPaid: true, priceGBP: 12, distanceBucket: "local", isOppositeOfUserMajor: true },
  { id: "7", title: "Game Development Hackathon", dateISO: new Date(Date.now() + 6 * 86400000).toISOString(), city: "Manchester", tags: ["Gaming", "Technology"], recommendedMajors: ["Computer Science", "Digital Arts"], isPaid: false, priceGBP: 0, distanceBucket: "nearby", isOppositeOfUserMajor: false },
];

export function FeaturedEvents() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const speed = 0.6; // px per frame
    let running = true;

    function step() {
      if (!running || !container || isDraggingRef.current) return;
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.pageX - container.offsetLeft;
      scrollLeftRef.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * 2;
      container.scrollLeft = scrollLeftRef.current - walk;
    };

    const onEnter = () => (running = false);
    const onLeave = () => {
      running = true;
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    };

    container.style.cursor = 'grab';
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const items = [...mock, ...mock];

  return (
    <section id="events" className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Opposites for you
          </h2>
          <p className="text-gray-600 mt-2">Discover events outside your comfort zone</p>
        </div>
        <a href="/events" className="text-sm btn btn-ghost hover:bg-blue-50 transition-colors">
          See all events →
        </a>
      </div>

      <div className="relative">
        <div ref={containerRef} 
             className="relative overflow-hidden w-full px-4 md:px-8" 
             style={{ touchAction: 'pan-y pinch-zoom' }}>
          <div className="flex gap-6 py-4" 
               style={{ width: 'max-content', WebkitUserSelect: 'none', userSelect: 'none' }}>
            {items.map((e, i) => (
              <div key={`${e.id}-${i}`} 
                   className="transform transition-transform hover:scale-[1.02] hover:-translate-y-1"
                   style={{ minWidth: '300px', flex: '0 0 auto' }}>
                <EventCard e={e} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
