"use client";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Hero() {
  return (
    <section className="w-full bg-linear-to-br from-blue-50/50 via-purple-50/30 to-background py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4 gap-2">
              <Sparkles className="h-3 w-3" />
              Break out of your bubble
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-extrabold tracking-tight md:text-6xl"
          >
            Pop your bubble.
            <span className="block text-muted-foreground mt-2">
              Meet people outside your course.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
            Bubble recommends events{" "}
            <span className="font-semibold text-foreground">outside your major</span> and comfort
            zone. Earn Bubble Points for stretching yourself and use them to
            discount paid tickets.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/events">
                Find events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-black">
              <Link href="/organisers">Create an event</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 text-sm text-muted-foreground p-4 rounded-lg bg-background/50 backdrop-blur-sm border"
          >
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>
              Opposites attract: Art meets STEM, Business meets Theatre, and more.
            </span>
          </motion.div>
        </motion.div>

        {/* Event widgets */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="grid grid-cols-2 gap-4 text-black"
        >
          <EventWidget
            title="Tonight · 19:00"
            event="Intro to 3D Printing"
            category="STEM"
            points={60}
            delay={0}
          />
          <EventWidget
            title="Fri · 18:30"
            event="Improv Comedy Jam"
            category="Arts"
            points={45}
            delay={0.1}
          />
          <EventWidget
            title="Sat · 14:00"
            event="Finance for Founders"
            category="Biz"
            points={50}
            delay={0.2}
          />
          <EventWidget
            title="Sun · 10:00"
            event="Urban Sketching Walk"
            category="Design"
            points={35}
            delay={0.3}
          />
        </motion.div>
      </div>
    </section>
  );
}

function EventWidget({
  title,
  event,
  category,
  points,
  delay,
}: {
  title: string;
  event: string;
  category: string;
  points: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{event}</p>
      <p className="text-xs text-muted-foreground">({category})</p>
      <Badge variant="secondary" className="mt-2 gap-1">
        <Sparkles className="h-3 w-3" />
        +{points} pts
      </Badge>
    </motion.div>
  );
}
