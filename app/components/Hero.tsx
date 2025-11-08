import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    // full width background
    <section className="w-full bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      {/* centered content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Pop your bubble.
            <span className="block text-slate-500">
              Meet people outside your course.
            </span>
          </h1>
          <p className="text-lg text-slate-600">
            Bubble recommends events{" "}
            <span className="font-semibold">outside your major</span> and comfort
            zone. Earn Bubble Points for stretching yourself and use them to
            discount paid tickets.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#events"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-white"
            >
              Find events
            </a>
            <a
              href="#organisers"
              className="rounded-2xl border border-blue-300 px-5 py-3"
            >
              Create an event
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="h-4 w-4" />
            <span>
              Opposites attract: Art meets STEM, Business meets Theatre, and more.
            </span>
          </div>
        </div>

        {/* Event widgets */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 p-4 shadow-sm">
            <h3 className="font-semibold">Tonight · 19:00</h3>
            <p className="text-slate-600">Intro to 3D Printing (STEM)</p>
            <span className="mt-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white shadow-sm">
              +60 Bubble Points
            </span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 p-4 shadow-sm">
            <h3 className="font-semibold">Fri · 18:30</h3>
            <p className="text-slate-600">Improv Comedy Jam (Arts)</p>
            <span className="mt-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white shadow-sm">
              +45 Bubble Points
            </span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 p-4 shadow-sm">
            <h3 className="font-semibold">Sat · 14:00</h3>
            <p className="text-slate-600">Finance for Founders (Biz)</p>
            <span className="mt-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white shadow-sm">
              +50 Bubble Points
            </span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 p-4 shadow-sm">
            <h3 className="font-semibold">Sun · 10:00</h3>
            <p className="text-slate-600">Urban Sketching Walk (Design)</p>
            <span className="mt-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white shadow-sm">
              +35 Bubble Points
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
