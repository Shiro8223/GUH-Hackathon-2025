"use client";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Bubble. Made with</p>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          </motion.div>
          <p>at a hackathon.</p>
        </motion.div>
      </div>
    </footer>
  );
}