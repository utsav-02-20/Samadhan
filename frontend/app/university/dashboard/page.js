"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Trophy,
  FolderKanban,
  Users,
  FileCheck2,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getUniversityChallenges, getUniversityProjects, getUniversityProfile, triggerAITaskAllocation } from "@/services/university.service";

// Commented out demo data:
// const stats = [...];
// const projects = [...];
// const activities = [...];

export default function UniversityDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [projects, setProjects] = useState([]);
  const [institutionName, setInstitutionName] = useState("IIIT Bhagalpur");

  useEffect(() => {
    getUniversityProfile()
      .then((res) => {
        const name = res?.data?.name || res?.profile?.name || res?.data?.university;
        if (name) setInstitutionName(name);
      })
      .catch(() => {});

    Promise.all([getUniversityChallenges(), getUniversityProjects()])
      .then(([chalRes, projRes]) => {
        setChallenges((chalRes?.data || []).map((item) => ({
          name: item.title,
          department: item.category || item.district || "General",
          progress: item.status === "Resolved" ? 100 : (item.status === "In Progress" ? 50 : 25),
          status: item.status === "Resolved" ? "COMPLETED" : (item.status === "In Progress" ? "IN PROGRESS" : "OPEN"),
        })));
        setProjects(projRes?.data || []);
      })
      .catch((err) => console.error("Could not load university dashboard data:", err));
  }, []);

  const activeProjectsList = projects.length > 0 ? projects : challenges;

  const activities = challenges.slice(0, 4).map((c) => ({
    title: `New challenge: ${c.name}`,
    description: `Category: ${c.department}`,
    time: "Recently updated",
    icon: Trophy,
  }));

  const dynamicStats = [
    {
      label: "Active Projects",
      value: String(activeProjectsList.length),
      change: "Live DB count",
      icon: FolderKanban,
    },
    {
      label: "Challenges Applied",
      value: String(challenges.length),
      change: "Live DB count",
      icon: Trophy,
    },
    {
      label: "Team Members",
      value: "12",
      change: "Active research lead",
      icon: Users,
    },
    {
      label: "Submissions",
      value: String(challenges.filter(c => c.status === "COMPLETED").length),
      change: "Completed solutions",
      icon: FileCheck2,
    },
  ];
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-6">

          {/* LOGO */}

          <Link
            href="/university/dashboard"
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

            <div className="hidden sm:block">
              <p className="text-sm font-black">
                Samadhan
              </p>

              <p className="text-[10px] font-semibold text-slate-400">
                University Portal
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}

          <nav className="ml-8 hidden items-center gap-1 lg:flex">



            <NavItem
              href="/university/challenges"
              icon={Trophy}
              label="Challenges"
            />

            <NavItem
              href="/university/projects"
              icon={FolderKanban}
              label="Projects"
            />

            <NavItem
              href="/university/team"
              icon={Users}
              label="Team"
            />

            <NavItem
              href="/university/submissions"
              icon={FileCheck2}
              label="Submissions"
            />

            <NavItem
              href="/university/profile"
              icon={Building2}
              label="Profile"
            />

          </nav>

          {/* RIGHT SIDE */}

          <div className="ml-auto flex items-center gap-2">

            <Link
              href="/university/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <Bell className="h-4 w-4" />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
            </Link>

            <Link
              href="/university/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white hover:bg-blue-700 shadow-sm"
              title="University Account Profile"
            >
              UB
            </Link>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-[1400px] px-6 py-10">

        {/* WELCOME */}

        <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              University Overview
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Good morning, {institutionName}.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Here's what's happening with your civic projects,
              challenges and university teams.
            </p>

          </div>

          <button
            onClick={() => {
              triggerAITaskAllocation()
                .then((res) => alert(`AI Allocation Engine completed!\n${res?.message || "Task assigned successfully."}`))
                .catch((err) => alert(`AI Allocation Error: ${err.message}`));
            }}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-violet-700"
          >
            <Sparkles className="h-4 w-4" />
            Run AI Task Allocation
          </button>

        </section>

        {/* STATISTICS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {dynamicStats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>

                  <TrendingUp className="h-4 w-4 text-emerald-500" />

                </div>

                <p className="mt-5 text-xs font-semibold text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-1 text-3xl font-black">
                  {stat.value}
                </p>

                <p className="mt-2 text-[11px] font-bold text-emerald-600">
                  {stat.change}
                </p>

              </div>
            );
          })}

        </section>

        {/* MAIN AREA */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">

          {/* ACTIVE PROJECTS */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="font-black">
                  Active Projects
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Current projects being developed by your university.
                </p>

              </div>

              <Link
                href="/university/projects"
                className="flex items-center gap-1 text-xs font-black text-blue-600"
              >
                View all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

            </div>

            <div className="divide-y divide-slate-100">

              {activeProjectsList.map((project) => (

                <Link
                  key={project.name}
                  href="/university/projects"
                  className="block px-6 py-5 transition hover:bg-slate-50"
                >

                  <div className="flex items-start justify-between gap-5">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-black">
                          {project.name}
                        </h3>

                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-black text-blue-600">
                          {project.status}
                        </span>

                      </div>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                        <Building2 className="h-3 w-3" />
                        {project.department}
                      </p>

                    </div>

                    <span className="text-sm font-black">
                      {project.progress}%
                    </span>

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-slate-950"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                </Link>

              ))}

            </div>

          </div>

          {/* RECENT ACTIVITY */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="font-black">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Latest updates from your workspace.
                </p>

              </div>

              <Link
                href="/university/notifications"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <Bell className="h-4 w-4 text-slate-400" />
              </Link>

            </div>

            <div className="divide-y divide-slate-100">

              {activities.map((activity, index) => {

                const Icon = activity.icon;

                return (
                  <div
                    key={index}
                    className="flex gap-4 px-6 py-5"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-black">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {activity.description}
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-[10px] font-bold text-slate-300">
                        <Clock3 className="h-3 w-3" />
                        {activity.time}
                      </p>

                    </div>

                  </div>
                );

              })}

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-6 grid gap-4 md:grid-cols-3">

          <QuickAction
            href="/university/challenges"
            icon={Trophy}
            title="Find Challenges"
            description="Discover new civic problems to solve."
          />

          <QuickAction
            href="/university/submissions"
            icon={FileCheck2}
            title="Manage Submissions"
            description="Review and track your submitted solutions."
          />

          <QuickAction
            href="/university/team"
            icon={Users}
            title="Manage Team"
            description="Manage members participating in projects."
          />

        </section>

        {/* FOOTER INFO */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>

          <div>

            <p className="text-sm font-black text-slate-900">
              University account verified
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your university is eligible to participate in
              government civic challenges.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${active
          ? "bg-slate-950 text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-600" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-900" />

      </div>

      <h3 className="mt-5 text-sm font-black">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </Link>
  );
}
