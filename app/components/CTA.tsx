export function CTA() {
	return (
		<section id="points" className="mx-auto max-w-6xl px-4 py-16">
			<div className="card card-accent md:p-12 p-8">
				<h2 className="text-2xl font-bold">Turn curiosity into discounts</h2>
				<p className="mt-2 max-w-2xl text-slate-600">
					Bubble Points reward you for stepping outside your comfort zone. Use points at checkout to
					reduce ticket prices for paid events.
				</p>
				<div className="mt-6 flex flex-wrap gap-3">
					<a href="#" className="btn btn-primary">Create account</a>
					<a href="/organisers" className="btn btn-ghost">For organisers</a>
				</div>
			</div>
		</section>
	);
}