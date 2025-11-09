"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bubble.profile");
      if (raw) {
        const p = JSON.parse(raw);
        setProfileName(p?.name ?? null);
      }
    } catch (e) {
      setProfileName(null);
    }
  }, []);

  // Listen for storage events (other tabs) and custom bubble:auth event (same tab)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "bubble.profile") {
        try {
          const raw = localStorage.getItem("bubble.profile");
          if (raw) setProfileName(JSON.parse(raw)?.name ?? null);
          else setProfileName(null);
        } catch (err) {
          setProfileName(null);
        }
      }
    }

    function onCustom(e: Event) {
      try {
        // @ts-ignore
        const user = (e as CustomEvent).detail;
        setProfileName(user?.name ?? null);
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("bubble:auth", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bubble:auth", onCustom as EventListener);
    };
  }, []);

  // close menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpenMenu(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
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
          <Link href="#how" className="text-slate-700 hover:text-slate-900 transition-colors">
            How it works
          </Link>
          <Link href="/events" className="text-slate-700 hover:text-slate-900 transition-colors">
            Events
          </Link>
          <Link href="/organisers" className="text-slate-700 hover:text-slate-900 transition-colors">
            Organiser
          </Link>
          {profileName ? (
            <div ref={wrapperRef} className="relative">
              <button
                onClick={() => setOpenMenu((s) => !s)}
                className="btn btn-outline"
                aria-expanded={openMenu}
              >
                {profileName}
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg">
                  <a href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</a>
                  <button
                    onClick={() => {
                      try { localStorage.removeItem("bubble.profile"); window.dispatchEvent(new CustomEvent('bubble:auth', { detail: null })); } catch(e){}
                      // client-side redirect
                      window.location.href = '/';
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="btn btn-primary">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
