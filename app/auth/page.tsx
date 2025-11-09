"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sparkles, Mail, Lock, User } from "lucide-react";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = mode === "signin" ? "Welcome back" : "Create your account";
  const cta   = mode === "signin" ? "Sign in" : "Sign up";

  const MAJORS = useMemo(
    () => [
      "Computer Science","Engineering","Art & Design","Theatre","Business",
      "Humanities","Health Sciences","Mathematics","Physics","Psychology",
    ],
    []
  );

  function validate(): string[] {
    const e: string[] = [];
    if (!email.match(/^\S+@\S+\.\S+$/)) e.push("Enter a valid email");
    if (password.length < 8) e.push("Password must be at least 8 characters");
    if (mode === "signup") {
      if (!name.trim()) e.push("Name is required");
      if (!major) e.push("Select a major");
      if (password !== confirm) e.push("Passwords do not match");
    }
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice(null);
    const errs = validate();
    if (errs.length) return setErrors(errs);

    setLoading(true);
    try {
      const endpoint = mode === "signin" ? "/api/auth/signin" : "/api/auth/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email,
          password,
          major,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors([data.error]);
        return;
      }

      // Store user data in localStorage
      localStorage.setItem("bubble.profile", JSON.stringify(data.user));
      // Notify other components (Navbar) that auth state changed
      try {
        window.dispatchEvent(new CustomEvent("bubble:auth", { detail: data.user }));
      } catch (e) {
        /* ignore */
      }
      setNotice(mode === "signin" ? "Signed in successfully!" : "Account created successfully!");

      // Redirect user to their profile page
      try {
        router.push("/profile");
      } catch (e) {
        // ignore navigation errors in tests/environments
      }

      // Optional: Redirect to home page after successful auth
      // window.location.href = "/";
    } catch (error) {
      setErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

  {/* Full-width hero wrapper for visual consistency */}
  <section className="w-full bg-gradient-to-br from-brand-50 to-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 flex items-center gap-2 text-slate-600">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm">
              Pop your bubble — earn Bubble Points when you show up.
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: copy */}
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {title}.
                <span className="block text-slate-600">
                  Meet people outside your course.
                </span>
              </h1>
              <p className="text-slate-700">
                Use one account across Events and Organiser tools. Switching
                between <span className="font-semibold">Sign in</span> and{" "}
                <span className="font-semibold">Sign up</span> keeps your inputs.
              </p>

              <button
                type="button"
                onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
                className="btn btn-ghost"
                aria-live="polite"
              >
                {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            {/* Right: auth card */}
            <form onSubmit={onSubmit} className="card card-accent">
              <h2 className="mb-4 text-lg font-semibold">{cta}</h2>

              {errors.length > 0 && (
                <div className="mb-4 rounded-xl border border-blue-200 bg-white p-3 text-sm text-red-700">
                  <ul className="list-disc pl-5">
                    {errors.map((er, i) => (
                      <li key={i}>{er}</li>
                    ))}
                  </ul>
                </div>
              )}

              {notice && (
                <div className="mb-4 rounded-xl border border-blue-200 bg-white p-3 text-sm">
                  {notice}
                </div>
              )}

              {/* Sign up-only fields */}
              {mode === "signup" && (
                <>
                  <label className="mb-3 block text-sm">
                    <span className="mb-1 block">Name</span>
                    <div className="flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-3">
                      <User className="h-4 w-4 text-blue-600" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full py-2 outline-none"
                        placeholder="e.g. Alex Johnson"
                        autoComplete="name"
                      />
                    </div>
                  </label>

                  <label className="mb-3 block text-sm">
                    <span className="mb-1 block">Major</span>
                    <select
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full rounded-xl border border-blue-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Select a major</option>
                      {MAJORS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {/* Email */}
              <label className="mb-3 block text-sm">
                <span className="mb-1 block">Email</span>
                <div className="flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 outline-none"
                    placeholder="you@university.ac.uk"
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              {/* Password */}
              <label className="mb-3 block text-sm">
                <span className="mb-1 block">Password</span>
                <div className="flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-3">
                  <Lock className="h-4 w-4 text-blue-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 outline-none"
                    placeholder="••••••••••"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-slate-600">Min 8 characters.</p>
              </label>

              {/* Confirm password (signup) */}
              {mode === "signup" && (
                <label className="mb-3 block text-sm">
                  <span className="mb-1 block">Confirm password</span>
                  <div className="flex items-center gap-2 rounded-xl border border-blue-300 bg-white px-3">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full py-2 outline-none"
                      placeholder="••••••••••"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </label>
              )}

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? "Please wait..." : cta}
              </button>

              <div className="mt-3 text-center text-sm">
                <button type="button" onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))} className="btn btn-ghost">
                  {mode === "signin"
                    ? "No account? Sign up"
                    : "Have an account? Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
