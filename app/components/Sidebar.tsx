"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Calendar,
  Users,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: Users, label: "Organisers", href: "/organisers" },
    { icon: Sparkles, label: "How it works", href: "#how" },
  ];

  const handleSignOut = () => {
    try {
      localStorage.removeItem("bubble.profile");
      window.dispatchEvent(new CustomEvent("bubble:auth", { detail: null }));
    } catch (e) {}
    window.location.href = "/";
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 md:hidden"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            bubble
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-50 flex flex-col",
              isMobile ? "w-72" : "w-20 hover:w-64 transition-all duration-300 ease-in-out",
              !isMobile && "group"
            )}
          >
            {/* Logo */}
            <div className="p-6 border-b border-slate-200">
              <Link
                href="/"
                onClick={closeSidebar}
                className="flex items-center gap-3 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.span
                  className={cn(
                    "text-2xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap",
                    !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                  )}
                >
                  bubble
                </motion.span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto">
              <ul className="space-y-2 px-3">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeSidebar}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all group/item",
                        !isMobile && "justify-center group-hover:justify-start"
                      )}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span
                        className={cn(
                          "font-medium whitespace-nowrap",
                          !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                        )}
                      >
                        {item.label}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity",
                          !isMobile && "hidden group-hover:block"
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-200">
              {profileName ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all",
                      !isMobile && "justify-center group-hover:justify-start"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div
                      className={cn(
                        "flex-1 overflow-hidden",
                        !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                      )}
                    >
                      <p className="text-sm font-semibold truncate">{profileName}</p>
                      <p className="text-xs text-slate-500">View profile</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/settings"
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all",
                      !isMobile && "justify-center group-hover:justify-start"
                    )}
                  >
                    <Settings className="w-5 h-5 shrink-0" />
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                      )}
                    >
                      Settings
                    </span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all",
                      !isMobile && "justify-center group-hover:justify-start"
                    )}
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                      )}
                    >
                      Sign out
                    </span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all",
                    !isMobile && "justify-center group-hover:justify-start"
                  )}
                >
                  <User className="w-5 h-5 shrink-0" />
                  <span
                    className={cn(
                      "whitespace-nowrap",
                      !isMobile && "opacity-0 group-hover:opacity-100 transition-opacity"
                    )}
                  >
                    Sign in
                  </span>
                </Link>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
