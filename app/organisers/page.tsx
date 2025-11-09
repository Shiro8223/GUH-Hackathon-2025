"use client";
import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import type { Event } from "../components/EventCard";
import { computeBubblePoints, type DistanceBucket } from "../lib/points";

const MAJORS = [
  "Computer Science", "Engineering", "Art & Design", "Theatre", "Business",
  "Humanities", "Health Sciences", "Mathematics", "Physics", "Psychology",
];

export default function SubmitEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateISO, setDateISO] = useState<string>("");
  const [city, setCity] = useState("");
  const [tagsText, setTagsText] = useState(""); // comma-separated
  const [recommendedMajors, setRecommendedMajors] = useState<string[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [priceGBP, setPriceGBP] = useState<number>(0);
  const [distanceBucket, setDistanceBucket] = useState<DistanceBucket>("local");
  const [previewOpposite, setPreviewOpposite] = useState(true);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const tags = useMemo(
    () => tagsText.split(",").map(t => t.trim()).filter(Boolean),
    [tagsText]
  );

  const previewPoints = useMemo(
    () => computeBubblePoints({ isOppositeMajor: previewOpposite, distance: distanceBucket }),
    [previewOpposite, distanceBucket]
  );

  function toggleMajor(m: string) {
    setRecommendedMajors(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  function validate(): string[] {
    const e: string[] = [];
    if (!title.trim()) e.push("Title is required");
    if (!dateISO) e.push("Date & time is required");
    if (!city.trim()) e.push("City is required");
    if (tags.length === 0) e.push("At least one tag is required");
    if (recommendedMajors.length === 0) e.push("At least one recommended major is required");
    if (isPaid && (isNaN(priceGBP) || priceGBP <= 0)) e.push("Enter a valid price for paid events");
    return e;
  }

  function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(["Image file size must be less than 5MB"]);
        return;
      }
      setImageFile(file);
      setImageUrl(""); // Clear URL if file is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageUrlChange(url: string) {
    setImageUrl(url);
    setImageFile(null);
    setImagePreview("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;

    setLoading(true);
    setErrors([]);

    try {
      // Get image URL - either from file (base64) or URL input
      let finalImageUrl = imageUrl;
      if (imageFile && imagePreview) {
        // Use base64 data URL from file upload
        finalImageUrl = imagePreview;
      }

      const eventData = {
        title: title.trim(),
        dateISO: new Date(dateISO).toISOString(),
        city: city.trim(),
        tags,
        recommendedMajors,
        isPaid,
        priceGBP: isPaid ? Number(priceGBP) : null,
        distanceBucket,
        isOppositeOfUserMajor: false, // calculated per user later
        imageUrl: finalImageUrl || null,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors([errorData.error || "Failed to create event"]);
        setLoading(false);
        return;
      }

      const result = await response.json();
      setSubmittedId(result.event.id);

      // Reset form
      setTitle(""); 
      setDescription(""); 
      setDateISO(""); 
      setCity("");
      setTagsText(""); 
      setRecommendedMajors([]); 
      setIsPaid(false);
      setPriceGBP(0); 
      setDistanceBucket("local");
      setImageUrl("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error submitting event:", error);
      setErrors(["Failed to submit event. Please try again."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold">Submit an event</h1>
        <p className="mb-6 text-slate-600">Fill in the details below. Your event will appear on the events page once submitted.</p>

        {errors.length > 0 && (
          <div className="mb-4 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-sm shadow-sm">
            <ul className="list-disc pl-5 text-red-700">
              {errors.map((er, i) => <li key={i}>{er}</li>)}
            </ul>
          </div>
        )}

        {submittedId && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-4 text-sm shadow-sm">
            <b className="text-green-800">Event created successfully!</b>{" "}
            <span className="text-green-700">Your event has been added to the database. </span>
            <a className="underline text-green-800 font-semibold" href="/events">View it on the Events page</a>.
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
          {/* Left column */}
          <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Basics</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block">Title *</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g. Intro to 3D Printing"
                  aria-required
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-28 w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                  placeholder="What should attendees expect?"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block">Date & time *</span>
                  <input
                    type="datetime-local"
                    value={dateISO}
                    onChange={(e) => setDateISO(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                    aria-required
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block">City *</span>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                    placeholder="e.g. Manchester"
                    aria-required
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block">Tags (comma-separated) *</span>
                <input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                  placeholder="STEM, Makers, Robotics"
                  aria-required
                />
              </label>

              <div className="space-y-2">
                <label className="block text-sm">
                  <span className="mb-1 block">Event Image (optional)</span>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="text-center text-xs text-slate-500">OR</div>
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <span className="text-xs text-slate-500 block mt-1">Max 5MB</span>
                    </label>
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-xl border border-blue-300"
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Right column */}
          <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Audience & pricing</h2>
            <div className="mt-4 space-y-4">
              <div>
                <span className="mb-2 block text-sm">Recommended majors *</span>
                <div className="grid grid-cols-2 gap-2">
                  {MAJORS.map((m) => {
                    const checked = recommendedMajors.includes(m);
                    return (
                      <label
                        key={m}
                        className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white p-2 transition hover:shadow-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleMajor(m)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm">{m}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Paid event
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block">Price (GBP)</span>
                  <input
                    type="number"
                    step="0.5"
                    min={0}
                    disabled={!isPaid}
                    value={priceGBP}
                    onChange={(e) => setPriceGBP(parseFloat(e.target.value))}
                    className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block">Distance bucket</span>
                <select
                  value={distanceBucket}
                  onChange={(e) => setDistanceBucket(e.target.value as DistanceBucket)}
                  className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-blue-300"
                >
                  <option value="local">Local</option>
                  <option value="nearby">Nearby</option>
                  <option value="city-away">City away</option>
                </select>
              </label>

              {/* Bubble points preview */}
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm">Bubble Points (preview)</span>
                  <span className="rounded-full bg-gradient-to-br from-blue-100 to-blue-200 px-2 py-0.5 text-xs font-medium">
                    +{previewPoints} pts
                  </span>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={previewOpposite}
                    onChange={(e) => setPreviewOpposite(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Assume attendee is outside the recommended major
                </label>
                <p className="mt-1 text-xs text-slate-600">
                  Actual points are computed per attendee at check-in.
                </p>
              </div>
            </div>
          </section>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-2 text-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit event"}
            </button>
            <a href="/events" className="text-sm underline">Go to Events</a>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}
