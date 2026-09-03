"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Users,
  ShieldCheck,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

import Logo from "@/components/ui/Logo";

export default function CitizenLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "/citizen/auth/sign-in";
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-royal-gradient lg:flex">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16 text-white">

            {/* Logo */}
            <Logo href="/" subtitle="Civic Innovation" />

            {/* Hero */}
            <div className="max-w-lg">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-md shadow-lg">
                <Users className="h-7 w-7" />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
                Citizen Portal
              </p>

              <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.04em] text-white xl:text-6xl">
                Your voice can improve your community.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">
                Report civic challenges, follow their progress and help build
                better communities through Samadhan.
              </p>

              <div className="mt-10 space-y-4">

                <Feature
                  icon={MapPin}
                  text="Report problems in your community"
                />

                <Feature
                  icon={MessageSquare}
                  text="Stay updated on your submissions"
                />

                <Feature
                  icon={CheckCircle2}
                  text="Track resolution progress"
                />

              </div>

            </div>

            <p className="text-xs text-indigo-200 font-semibold">
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

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Users className="h-6 w-6" />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Citizen
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to report challenges and track your civic
                contributions.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Email */}
              <div>

                <label
                  htmlFor="citizen-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="citizen-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="citizen-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    id="citizen-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-royal-gradient text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-indigo-600/40"
              >
                Sign in
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

            </form>

            {/* Signup */}
            <div className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?

              <Link
                href="/citizen/auth/sign-up"
                className="ml-2 font-bold text-blue-600 hover:text-blue-700"
              >
                Create one
              </Link>
            </div>

            {/* Security */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">

              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-slate-500">
                Your account helps us securely associate challenges and
                updates with your submissions.
              </p>

            </div>

            {/* Other portals */}
            <div className="mt-8 text-center">

              <Link
                href="/login"
                className="text-sm font-semibold text-slate-500 hover:text-slate-950"
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
        <Icon className="h-3.5 w-3.5 text-blue-300" />
      </div>

      {text}

    </div>
  );
}
