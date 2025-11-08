import { Compass, Sparkles, TicketPercent } from "lucide-react";

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

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-14"
    >
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <span className="text-sm text-slate-500">3 simple steps</span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map(({ title, desc, Icon }, i) => (
          <div
            key={title}
            className="relative rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Step number */}
            <span className="absolute -top-3 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-sm font-semibold text-blue-600 shadow-sm">
              {i + 1}
            </span>

            {/* Icon */}
            <div className="mb-4 inline-flex rounded-xl border border-blue-200 bg-white p-2 shadow-sm">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-slate-600">{desc}</p>

            {/* Divider + footnote */}
            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
            <p className="mt-3 text-xs text-slate-500">
              Takes under a minute to get personalised picks.
            </p>
          </div>
        ))}
      </div>

      {/* Info bar */}
      <div className="mt-10 mx-auto max-w-2xl text-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 text-sm text-slate-700 shadow-sm">
        Bubble nudges you across disciplines — think 
        <span className="font-semibold text-blue-600"> Art to STEM</span>, 
        <span className="font-semibold text-blue-600"> Business to Theatre</span> — 
        and rewards you when you show up!
      </div>
    </section>
  );
}
