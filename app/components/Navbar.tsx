"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Calendar, Users, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleSignOut = () => {
    try {
      localStorage.removeItem("bubble.profile");
      window.dispatchEvent(new CustomEvent("bubble:auth", { detail: null }));
    } catch (e) {
      // ignore
    }
    window.location.href = "/";
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/40 bg-background/95 backdrop-blur-lg shadow-sm"
          : "border-transparent bg-background/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo with animation */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-6 w-6 text-blue-600" />
          </motion.div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            bubble
          </span>
        </Link>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLink href="/#how" icon={<Sparkles className="h-4 w-4" />}>
            How it works
          </NavLink>
          <NavLink href="/events" icon={<Calendar className="h-4 w-4" />}>
            Events
          </NavLink>
          <NavLink href="/organisers" icon={<Users className="h-4 w-4" />}>
            Organiser
          </NavLink>

          {profileName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 text-black">
                  <User className="h-4 w-4" />
                  {profileName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 border-b bg-background/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col space-y-1 p-4">
                <MobileNavLink href="/#how" icon={<Sparkles className="h-4 w-4" />} onClick={() => setOpen(false)}>
                  How it works
                </MobileNavLink>
                <MobileNavLink href="/events" icon={<Calendar className="h-4 w-4" />} onClick={() => setOpen(false)}>
                  Events
                </MobileNavLink>
                <MobileNavLink href="/organisers" icon={<Users className="h-4 w-4" />} onClick={() => setOpen(false)}>
                  Organiser
                </MobileNavLink>

                {profileName ? (
                  <>
                    <MobileNavLink href="/profile" icon={<User className="h-4 w-4" />} onClick={() => setOpen(false)}>
                      Profile
                    </MobileNavLink>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="pt-2">
                    <Button asChild className="w-full" onClick={() => setOpen(false)}>
                      <Link href="/auth">Sign in</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {icon}
      {children}
    </Link>
  );
}
