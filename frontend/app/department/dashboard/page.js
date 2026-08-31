"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Flag,
  FolderKanban,
  Users,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  ["Active Challenges", "12", Flag],
  ["Ongoing Projects", "8", FolderKanban],
  ["Pending Applications", "24", Clock3],
  ["Resolved Issues", "186", CheckCircle2],
];

const projects = [
  {
    name: "Smart Traffic Optimization",
    partner: "Tech Solutions Pvt. Ltd.",
    progress: 72,
  },
  {
    name: "Digital Grievance Platform",
    partner: "CivicTech India",
    progress: 48,
  },
  {
    name: "Waste Collection System",
    partner: "GreenTech Solutions",
    progress: 31,
  },
];

export default function DepartmentDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <Link href="/department/dashboard" className="font-black">
            Samadhan
          </Link>

          <nav className="ml-auto flex gap-2">
            <Link
              href="/department/dashboard"
              className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/department/challenges"
              className="px-3 py-2 text-xs font-bold"
            >
              Challenges
            </Link>

            <Link
              href="/department/projects"
              className="px-3 py-2 text-xs font-bold"
            >
              Projects
            </Link>

            <Link
              href="/department/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700"
            >
              DE
            </Link>
          </nav>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-xs font-black uppercase tracking-widest text-violet-600">
          Department Portal
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Department Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor challenges, projects and citizen service activities.
        </p>

        {/* STATS */}

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([title, value, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <Icon className="h-5 w-5 text-violet-600" />

              <p className="mt-4 text-xs font-bold text-slate-400">
                {title}
              </p>

              <p className="mt-1 text-2xl font-black">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* PROJECTS */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-black">Active Projects</h2>
                <p className="mt-1 text-xs text-slate-400">
                  Current department projects
                </p>
              </div>

              <Link
                href="/department/projects"
                className="text-xs font-black text-violet-600"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 space-y-4">

              {projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black">
                        {project.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Partner: {project.partner}
                      </p>
                    </div>

                    <span className="text-xs font-black">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-violet-600"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="font-black">Quick Actions</h2>

            <div className="mt-5 space-y-3">

              <Action
                href="/department/departments/new"
                icon={Flag}
                text="Create Challenge"
              />

              <Action
                href="/department/challenges"
                icon={Users}
                text="Review Applications"
              />

              <Action
                href="/department/projects"
                icon={FolderKanban}
                text="Manage Projects"
              />

            </div>

            <div className="mt-6 rounded-xl bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />

                <div>
                  <p className="text-xs font-black text-amber-800">
                    Attention needed
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-amber-700">
                    5 applications are waiting for review.
                  </p>
                </div>
              </div>
            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

function Action({ href, icon: Icon, text }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
    >
      <span className="flex items-center gap-3 text-xs font-black">
        <Icon className="h-4 w-4 text-violet-600" />
        {text}
      </span>

      <ArrowUpRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}