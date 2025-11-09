"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sparkles, Mail, Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Full-width hero wrapper for visual consistency */}
      <section className="w-full bg-linear-to-br from-blue-50/50 via-purple-50/30 to-background py-14 relative overflow-hidden flex-1 flex items-center">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
        />

        <div className="mx-auto max-w-5xl px-4 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-muted-foreground"
          >
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="text-sm">
              Pop your bubble — earn Bubble Points when you show up.
            </span>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">
                  {title}.
                  <span className="block text-muted-foreground mt-2">
                    Meet people outside your course.
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Use one account across Events and Organiser tools. Switching
                  between <span className="font-semibold">Sign in</span> and{" "}
                  <span className="font-semibold">Sign up</span> keeps your inputs.
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
                aria-live="polite"
              >
                {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </motion.div>

            {/* Right: auth card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">{cta}</CardTitle>
                  <CardDescription>
                    {mode === "signin" 
                      ? "Sign in to your account to continue" 
                      : "Create a new account to get started"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-4">
                    {errors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border-2 border-red-200 bg-red-50 p-3"
                      >
                        <div className="flex gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                          <ul className="text-sm text-red-700 space-y-1">
                            {errors.map((er, i) => (
                              <li key={i}>{er}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {notice && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border-2 border-green-200 bg-green-50 p-3 text-sm text-green-700"
                      >
                        {notice}
                      </motion.div>
                    )}

                    {/* Sign up-only fields */}
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-10"
                              placeholder="e.g. Alex Johnson"
                              autoComplete="name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="major">Major</Label>
                          <Select value={major} onValueChange={setMajor}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a major" />
                            </SelectTrigger>
                            <SelectContent>
                              {MAJORS.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          placeholder="you@university.ac.uk"
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          placeholder="••••••••••"
                          autoComplete={mode === "signin" ? "current-password" : "new-password"}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Min 8 characters.</p>
                    </div>

                    {/* Confirm password (signup) */}
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="confirm">Confirm password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="pl-10"
                            placeholder="••••••••••"
                            autoComplete="new-password"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full" size="lg">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="h-4 w-4" />
                          </motion.div>
                          Please wait...
                        </span>
                      ) : (
                        cta
                      )}
                    </Button>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
                      >
                        {mode === "signin"
                          ? "No account? Sign up"
                          : "Have an account? Sign in"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
