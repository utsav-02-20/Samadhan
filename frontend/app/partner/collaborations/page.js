"use client";

import Link from "next/link";
import { FolderKanban, Users, Calendar, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "COL-101",
    name: "Smart City Traffic Optimization",
    department: "Traffic Department",
    progress: 65,
    team: 8,
    deadline: "30 Oct 2026",
    status: "Active",
  },
  {
    id: "COL-102",
    name: "Digital Grievance Platform",
    department: "District Administration",
    progress: 40,
    team: 6,
    deadline: "15 Nov 2026",
    status: "Active",
  },
];

export default function Collaborations() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/partner/dashboard" className="font-black">
            Samadhan
          </Link>

          <nav className="ml-auto flex gap-2">
            <Link href="/partner/dashboard" className="px-3 py-2 text-xs font-bold">
              Dashboard
            </Link>
            <Link href="/partner/opportunities" className="px-3 py-2 text-xs font-bold">
              Opportunities
            </Link>
            <Link
              href="/partner/collaborations"
              className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white"
            >
              Collaborations
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-black">Collaborations</h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your active government partnerships and projects.
        </p>

        <div className="mt-6 space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                    <FolderKanban className="h-5 w-5 text-violet-600" />
                  </div>

                  <div>
                    <h2 className="font-black">{project.name}</h2>
                    <p className="mt-1 text-xs font-semibold text-violet-600">
                      {project.department}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {project.id}
                    </p>
                  </div>
                </div>

                <span className="h-fit rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-600">
                  {project.status}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold">
                  <span>Project progress</span>
                  <span>{project.progress}%</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-violet-600"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {project.team} members
                </span>

                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due {project.deadline}
                </span>

                <Link
                  href={`/partner/collaborations/${project.id}`}
                  className="ml-auto flex items-center gap-1 font-black text-slate-900"
                >
                  View project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}