"use client";
import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function CTA() {
  return (
    <section id="points" className="mx-auto max-w-6xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-2 bg-linear-to-br from-blue-50 via-purple-50 to-background p-8 md:p-12 shadow-xl">
          {/* Animated background decoration */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold mb-3">Turn curiosity into discounts</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Bubble Points reward you for stepping outside your comfort zone. Use points at checkout to
                reduce ticket prices for paid events.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/auth">
                  <Sparkles className="h-4 w-4" />
                  Create account
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/organisers">For organisers</Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}