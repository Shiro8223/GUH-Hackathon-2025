export function CTA() {
return (
<section id="points" className="mx-auto max-w-6xl px-4 py-16">
<div className="rounded-3xl border bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-sm md:p-12">
<h2 className="text-2xl font-bold">Turn curiosity into discounts</h2>
<p className="mt-2 max-w-2xl text-slate-600">
Bubble Points reward you for stepping outside your comfort zone. Use points at checkout to
reduce ticket prices for paid events.
</p>
<div className="mt-6 flex flex-wrap gap-3">
<a href="#" className="rounded-2xl bg-blue-600 px-5 py-3 text-white">Create account</a>
<a href="/organisers" className="rounded-2xl border border-blue-300 px-5 py-3">For organisers</a>
</div>
</div>
</section>
);
}