"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Landmark,
  ShieldCheck,
} from "lucide-react";

export default function GovernmentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Dummy login for now.
    // This will later call the backend authentication API.
    console.log({
      email,
      password,
      role: "government",
    });

    window.location.href = "/government/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left panel */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            <Link href="/" className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-slate-950">
                S
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  Samadhan
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Civic Innovation
                </p>
              </div>

            </Link>

            <div className="max-w-lg">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-indigo-300 ring-1 ring-white/10">
                <Landmark className="h-7 w-7" />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
                Government Portal
              </p>

              <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.04em] text-white xl:text-6xl">
                Turning civic challenges into action.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
                Review challenges, coordinate departments, assign projects
                and monitor progress through one connected platform.
              </p>

              <div className="mt-10 flex items-center gap-3 text-sm font-medium text-slate-300">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Secure government workspace
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

            <Link
              href="/login"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
              Change portal
            </Link>

            <div className="lg:hidden">

              <Link href="/" className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 font-black text-white">
                  S
                </div>

                <p className="font-bold">Samadhan</p>

              </Link>

            </div>

            <div className="mt-10 lg:mt-0">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Landmark className="h-6 w-6" />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Government
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Sign in to your portal
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Access government challenges, departments and project
                management tools.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Official email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@government.gov"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
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

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Sign in
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

            </form>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">

              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-slate-500">
                Government accounts are intended for authorized personnel.
                Access permissions will be verified by the backend.
              </p>

            </div>

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
