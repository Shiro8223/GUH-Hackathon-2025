"use client";
import { Calendar, MapPin, Tag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Event = {
  id: string;
  title: string;
  dateISO: string;
  city: string;
  tags: string[];
  imageUrl?: string;
  recommendedMajors: string[];
  isPaid: boolean;
  priceGBP?: number;
  distanceBucket: "local" | "nearby" | "city-away";
  isOppositeOfUserMajor: boolean;
  hasFirstTimeBonus?: boolean;
};

function pointsFor(event: Event) {
  const base = 10; // showing up
  const majorBonus = event.isOppositeOfUserMajor ? 50 : 0; // opposite major gets big bump
  const distanceBonus = { local: 0, nearby: 20, "city-away": 40 }[event.distanceBucket];
  return base + majorBonus + distanceBonus; // 10..100
}

export function EventCard({ e, clickableCard = true }: { e: Event; clickableCard?: boolean }) {
  const pts = pointsFor(e);

  const cardContent = (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={clickableCard ? "cursor-pointer" : ""}
    >
      <Card className="h-full flex flex-col justify-between overflow-hidden border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={e.imageUrl ?? "https://via.placeholder.com/640x360?text=Event+Image"}
            alt={e.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {e.isOppositeOfUserMajor && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="gap-1 bg-blue-600 text-white">
                  <Sparkles className="h-3 w-3" />
                  Opposite
                </Badge>
              </motion.div>
            )}
            {e.hasFirstTimeBonus && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  <Sparkles className="h-3 w-3" />
                  First Time Bonus
                </Badge>
              </motion.div>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold line-clamp-2">{e.title}</h3>
            <Badge variant="secondary" className="gap-1 shrink-0">
              <Sparkles className="h-3 w-3" />
              +{pts}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(e.dateISO).toLocaleDateString("en-GB", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {e.city}
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Tag className="h-4 w-4 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {e.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 flex items-center justify-between border-t">
          {e.isPaid ? (
            <span className="text-sm font-medium">£{e.priceGBP?.toFixed(2)}</span>
          ) : (
            <span className="text-sm font-medium text-green-600">Free</span>
          )}
          {clickableCard ? (
            <Button size="sm" className="gap-2" type="button">
              View Details
            </Button>
          ) : (
            <Link href={`/events/${e.id}`}>
              <Button size="sm" className="gap-2">
                View Details
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );

  if (clickableCard) {
    return (
      <Link href={`/events/${e.id}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
