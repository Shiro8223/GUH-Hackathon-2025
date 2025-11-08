export function HowItWorks() {
return (
<section id="how" className="mx-auto max-w-6xl px-4 py-12">
<h2 className="text-2xl font-bold">How it works</h2>
<div className="mt-6 grid gap-6 md:grid-cols-3">
{[{
title: "Tell us your major",
desc: "We map your academic bubble and preferences.",
},{
title: "Get opposite events",
desc: "Algorithms recommend events outside your usual zone.",
},{
title: "Earn Bubble Points",
desc: "Travel further + outside major = more points to discount tickets.",
}].map((s, i) => (
<div key={i} className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
<h3 className="font-semibold">{s.title}</h3>
<p className="mt-2 text-slate-600">{s.desc}</p>
</div>
))}
</div>
</section>
);
}