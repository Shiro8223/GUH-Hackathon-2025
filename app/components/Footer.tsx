export function Footer() {
	return (
		<footer className="border-t py-8">
			<div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
				<p>© {new Date().getFullYear()} Bubble. Made at a hackathon.</p>
			</div>
		</footer>
	);
}