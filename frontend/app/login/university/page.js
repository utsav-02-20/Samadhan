"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Lightbulb,
  Users,
  FolderKanban,
} from "lucide-react";

import Logo from "@/components/ui/Logo";

export default function UniversityLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "/university/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-600/25 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-600/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Logo href="/" subtitle="Civic Innovation" />

            {/* Hero */}
            <div className="max-w-lg">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-white/10">
                <GraduationCap className="h-7 w-7" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                University Portal
              </p>

              <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.04em] text-white xl:text-6xl">
                Ideas that solve real civic problems.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
                Discover challenges, collaborate with communities and turn
                innovative ideas into meaningful civic projects.
              </p>

              <div className="mt-10 space-y-4">

                <Feature
                  icon={Lightbulb}
                  text="Discover civic challenges"
                />

                <Feature
                  icon={Users}
                  text="Collaborate on solutions"
                />

                <Feature
                  icon={FolderKanban}
                  text="Participate in projects"
                />

              </div>

            </div>

            <p className="text-xs text-slate-500">
              Samadhan Civic Innovation Platform
            </p>

          </div>
        </section>

        {/* Right panel */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10">

          <div className="w-full max-w-md">

            {/* Back */}
            <Link
              href="/login"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
              Change portal
            </Link>

            {/* Mobile logo */}
            <div className="lg:hidden">
              <Logo href="/" size="sm" />
            </div>

            {/* Heading */}
            <div className="mt-10 lg:mt-0">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <GraduationCap className="h-6 w-6" />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                University
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Sign in to your portal
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Access civic challenges, collaborations and university
                project opportunities.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Email */}
              <div>

                <label
                  htmlFor="university-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  University email
                </label>

                <input
                  id="university-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@university.edu"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="university-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    id="university-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Sign in
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

            </form>

            {/* Security */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">

              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-slate-500">
                University accounts are intended for authorized students,
                faculty and institutional representatives.
              </p>

            </div>

            {/* Other portals & Sign Up */}
            <div className="mt-8 flex flex-col items-center gap-3 text-center">

              <Link
                href="/university/register"
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Don't have an account? Register your University / College →
              </Link>

              <Link
                href="/login"
                className="text-xs font-semibold text-slate-500 hover:text-slate-950"
              >
                Sign in using another portal
              </Link>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">

      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-3.5 w-3.5 text-emerald-300" />
      </div>

      {text}

    </div>
  );
}
