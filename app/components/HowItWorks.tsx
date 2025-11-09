"use client";
import { Compass, Sparkles, TicketPercent } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STEPS = [
  {
    title: "Tell us your major",
    desc: "We map your academic bubble and preferences.",
    Icon: Sparkles,
  },
  {
    title: "Get opposite events",
    desc: "We recommend events outside your usual zone.",
    Icon: Compass,
  },
  {
    title: "Earn Bubble Points",
    desc: "Further + outside major = more points to discount tickets.",
    Icon: TicketPercent,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-3">How it works</h2>
        <p className="text-muted-foreground text-lg">3 simple steps to pop your bubble</p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {STEPS.map(({ title, desc, Icon }, i) => (
          <motion.div
            key={title}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            variants={fadeInUp}
          >
            <Card className="relative h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              {/* Step number */}
              <div className="absolute -top-4 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold text-primary shadow-md group-hover:scale-110 transition-transform">
                {i + 1}
              </div>

              <CardHeader className="pt-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-flex w-fit rounded-xl bg-primary/10 p-3 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-primary" />
                </motion.div>

                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base">{desc}</CardDescription>

                {/* Divider */}
                <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Takes under a minute to get personalised picks.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 mx-auto max-w-3xl text-center rounded-2xl border-2 border-blue-200 bg-linear-to-br from-blue-50 to-purple-50 p-6 text-foreground shadow-sm"
      >
        <p className="text-lg">
          Bubble nudges you across disciplines — think 
          <span className="font-semibold text-blue-600"> Art to STEM</span>, 
          <span className="font-semibold text-purple-600"> Business to Theatre</span> — 
          and rewards you when you show up!
        </p>
      </motion.div>
    </section>
  );
}
