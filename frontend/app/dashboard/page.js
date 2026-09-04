"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Trophy,
  FileCheck2,
  CheckCircle2,
  Clock3,
  MapPin,
  TrendingUp,
} from "lucide-react";

import { PORTAL_ROLES, DASHBOARD_STATS as stats, PLATFORM_ACTIVITIES as activity } from "@/data/demoData";
import { Users, ShieldCheck, Building2, GraduationCap } from "lucide-react";

const roleIconMap = {
  Users,
  ShieldCheck,
  Building2,
  GraduationCap,
};

const roles = PORTAL_ROLES.map((role) => ({
  ...role,
  icon: roleIconMap[role.icon] || Users,
}));

export default function AppDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt="Samadhan Logo"
                width={60}
                height={60}
                className="h-full w-full object-cover"
              />
            </div>

            <div>

              <p className="text-sm font-black tracking-tight">
                Samadhan
              </p>

              <p className="text-[10px] font-semibold text-slate-400">
                Civic Challenge Platform
              </p>

            </div>

          </Link>

          <nav className="ml-auto flex items-center gap-2">

            <Link
              href="/"
              className="hidden rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:block"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white hover:bg-slate-800"
            >
              Get Started
            </Link>

          </nav>

        </div>

      </header>

      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-700">

              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              Civic Innovation Platform

            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">

              Turning civic problems into
              <span className="text-blue-600">
                {" "}real solutions.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500">
              Samadhan connects citizens, government departments
              and universities to discover problems, build solutions
              and track impact from report to resolution.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800"
              >
                Access your portal
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/signup"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
              >
                Create account
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>

                </div>

                <p className="mt-5 text-xs font-bold text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-black">
                  {stat.value}
                </p>

              </div>
            );

          })}

        </div>

      </section>

      {/* PORTALS */}

      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="mb-6">

          <p className="text-xs font-black uppercase tracking-widest text-blue-600">
            Choose your portal
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight">
            What are you here to do?
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Access the tools available for your role.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {roles.map((role) => {

            const Icon = role.icon;

            return (
              <Link
                key={role.title}
                href={role.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-6 w-6 text-slate-700" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-900" />

                </div>

                <h3 className="mt-6 text-xl font-black">
                  {role.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {role.description}
                </p>

                <div className="mt-6 text-xs font-black text-slate-900">
                  Open {role.title} Portal →
                </div>

              </Link>
            );

          })}

        </div>

      </section>

      {/* ACTIVITY */}

      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div>

              <h2 className="font-black">
                Platform Activity
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest activity across the Samadhan ecosystem.
              </p>

            </div>

            <Activity className="h-5 w-5 text-slate-300" />

          </div>

          <div className="divide-y divide-slate-100">

            {activity.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-4 px-6 py-5"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-4 w-4 text-slate-600" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-black">
                      {item.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {item.description}
                    </p>

                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">

                    <Clock3 className="h-3 w-3" />

                    {item.time}

                  </div>

                </div>
              );

            })}

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Samadhan. Civic innovation through collaboration.
          </p>

          <div className="flex gap-5">

            <Link
              href="/login"
              className="hover:text-slate-900"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="hover:text-slate-900"
            >
              Register
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}