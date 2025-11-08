"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600 hover:text-blue-700 transition-colors"
        >
          bubble
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-blue-200 p-2 md:hidden hover:bg-blue-50 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5 text-blue-600" /> : <Menu className="h-5 w-5 text-blue-600" />}
        </button>

        {/* Links */}
        <div
          className={`${
            open ? "flex flex-col space-y-3 mt-4" : "hidden"
          } md:flex md:flex-row md:items-center md:space-y-0 md:space-x-6`}
        >
          <Link href="#how" className="text-slate-700 hover:text-blue-600 transition-colors">
            How it works
          </Link>
          <Link href="/events" className="text-slate-700 hover:text-blue-600 transition-colors">
            Events
          </Link>
          <Link href="/organisers" className="text-slate-700 hover:text-blue-600 transition-colors">
            Organiser
          </Link>
          <Link
            href="/auth"
            className="rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
