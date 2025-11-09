"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    dateISO: "",
    city: "",
    tags: "",
    imageUrl: "",
    recommendedMajors: "",
    isPaid: false,
    priceGBP: "",
    distanceBucket: "nearby" as "local" | "nearby" | "city-away",
    isOppositeOfUserMajor: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert date to ISO string
      const date = new Date(formData.dateISO);
      
      // Parse comma-separated strings into arrays
      const tags = formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const recommendedMajors = formData.recommendedMajors
        .split(",")
        .map((major) => major.trim())
        .filter(Boolean);

      const eventData = {
        title: formData.title,
        dateISO: date.toISOString(),
        city: formData.city,
        tags,
        imageUrl: formData.imageUrl || undefined,
        recommendedMajors,
        isPaid: formData.isPaid,
        priceGBP: formData.isPaid ? parseFloat(formData.priceGBP) : 0,
        distanceBucket: formData.distanceBucket,
        isOppositeOfUserMajor: formData.isOppositeOfUserMajor,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create event");
      }

      // Redirect to events page on success
      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Add New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded bg-red-50 p-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., AI in Healthcare Symposium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateISO">Date & Time *</Label>
                <Input
                  id="dateISO"
                  type="datetime-local"
                  required
                  value={formData.dateISO}
                  onChange={(e) =>
                    setFormData({ ...formData, dateISO: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="e.g., Manchester"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags * (comma-separated)</Label>
                <Input
                  id="tags"
                  required
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="e.g., Technology, Healthcare, AI"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendedMajors">
                  Recommended Majors * (comma-separated)
                </Label>
                <Input
                  id="recommendedMajors"
                  required
                  value={formData.recommendedMajors}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recommendedMajors: e.target.value,
                    })
                  }
                  placeholder="e.g., Computer Science, Medicine"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distanceBucket">Distance *</Label>
                <select
                  id="distanceBucket"
                  className="w-full rounded border px-3 py-2"
                  value={formData.distanceBucket}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      distanceBucket: e.target.value as
                        | "local"
                        | "nearby"
                        | "city-away",
                    })
                  }
                >
                  <option value="local">Local</option>
                  <option value="nearby">Nearby</option>
                  <option value="city-away">City Away</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="isPaid"
                  type="checkbox"
                  checked={formData.isPaid}
                  onChange={(e) =>
                    setFormData({ ...formData, isPaid: e.target.checked })
                  }
                />
                <Label htmlFor="isPaid" className="cursor-pointer">
                  Is this a paid event?
                </Label>
              </div>

              {formData.isPaid && (
                <div className="space-y-2">
                  <Label htmlFor="priceGBP">Price (GBP) *</Label>
                  <Input
                    id="priceGBP"
                    type="number"
                    step="0.01"
                    min="0"
                    required={formData.isPaid}
                    value={formData.priceGBP}
                    onChange={(e) =>
                      setFormData({ ...formData, priceGBP: e.target.value })
                    }
                    placeholder="e.g., 25.00"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  id="isOppositeOfUserMajor"
                  type="checkbox"
                  checked={formData.isOppositeOfUserMajor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isOppositeOfUserMajor: e.target.checked,
                    })
                  }
                />
                <Label htmlFor="isOppositeOfUserMajor" className="cursor-pointer">
                  Is this opposite to user&apos;s major? (Higher points)
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Creating..." : "Create Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/events")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
