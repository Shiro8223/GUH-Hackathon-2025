"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventCard, type Event } from "../components/EventCard";

type Props = {
  events: Event[];
};

export function FeaturedEvents({ events }: Props) {
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

  const items = [...events, ...events];

  return (
    <section id="events" className="w-full py-20 bg-gradient-to-br from-indigo-600 via-violet-400 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-4 mb-8"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Opposites for you
            </h2>
            <p className="text-white/90 text-lg">Discover events outside your comfort zone</p>
          </div>
          <Button asChild variant="ghost" className="gap-2 text-white hover:bg-white/20">
            <Link href="/events">
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="relative">
        <div ref={containerRef} 
             className="relative overflow-hidden w-full px-4 md:px-8" 
             style={{ touchAction: 'pan-y pinch-zoom' }}>
          <div className="flex gap-6 py-4" 
               style={{ width: 'max-content', WebkitUserSelect: 'none', userSelect: 'none' }}>
            {items.map((e, i) => (
              <div key={`${e.id}-${i}`} 
                   className="transform transition-transform"
                   style={{ minWidth: '320px', flex: '0 0 auto' }}>
                <EventCard e={e} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-indigo-600 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
