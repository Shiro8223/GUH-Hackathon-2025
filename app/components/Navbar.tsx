"use client";
import Link from "next/link";
import { useState } from "react";


export function Navbar() {
const [open, setOpen] = useState(false);
return (
<header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/80 backdrop-blur">
<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
<Link href="/" className="text-xl font-bold text-blue-600">bubble</Link>
<button onClick={() => setOpen(!open)} className="rounded-xl border px-3 py-1 md:hidden">Menu</button>
<div className={`md:flex gap-6 ${open ? "block pt-3" : "hidden"} md:pt-0`}>
<Link href="#how" className="hover:underline text-black">How it works</Link>
<Link href="/events" className="hover:underline text-black">Events</Link>
<Link href="#points" className="hover:underline text-black">Bubble Points</Link>
<Link href="/auth" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Sign in</Link>
</div>
</nav>
</header>
);
}