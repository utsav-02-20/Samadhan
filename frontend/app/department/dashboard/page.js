"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDepartmentChallenges } from "@/services/department.service";
import Logo from "@/components/ui/Logo";
import {
  Flag,
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Building2,
  UserCheck,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  DEPARTMENT_PROJECTS_DETAILED as projects,
} from "@/data/departmentData";

export default function DepartmentDashboard() {
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    getDepartmentChallenges().then((res) => setChallenges((res?.data || []).map((item) => ({
      ...item, id: item._id || item.id, status: item.status === "Pending" ? "ROUTED" : item.status === "In Progress" ? "IN_PROGRESS" : item.status, slaStatus: "ON_TRACK", location: item.locality || item.district || "General Locality"
    })))).catch((error) => console.error("Could not load department dashboard:", error));
  }, []);
  const pendingCount = challenges.filter((c) => c.status === "ROUTED" || c.status === "IN_PROGRESS").length;
  const atRiskCount = challenges.filter((c) => c.slaStatus === "AT_RISK").length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 pb-16">
      {/* Header Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <nav className="flex items-center gap-2">
            <Link
              href="/department/dashboard"
              className="rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-bold text-white shadow-sm"
            >
              Dashboard
            </Link>

            <Link
              href="/department/challenges"
              className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Routed Challenges
            </Link>

            <Link
              href="/department/projects"
              className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Projects & SLA
            </Link>

            <Link
              href="/department/accepted-projects"
              className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              University Collaborations
            </Link>

            <Link
              href="/department/profile"
              className="ml-2 flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>PWD Profile</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Banner Section */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-1 text-xs font-bold text-violet-300">
              <Building2 className="h-3.5 w-3.5" />
              Department Operations & University Collaboration Grid
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Process Routed Issues, Manage SLA & University Pilots
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Verify incoming civic grievances from government channels, track officer availability, manage university research projects, and update resolution progress in real-time.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/department/challenges"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-violet-700"
              >
                Review Routed Challenges ({pendingCount})
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/department/accepted-projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <GraduationCap className="h-4 w-4" />
                University Projects (8)
              </Link>

              <Link
                href="/department/profile"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/20 px-5 py-2.5 text-xs font-bold text-violet-200 transition hover:bg-violet-500/30"
              >
                <UserCheck className="h-4 w-4" />
                Department Profile & Officers
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Routed Challenges" value="18" icon={Flag} accent="text-violet-600" />
          <StatCard title="Active Assigned Issues" value="24" icon={Clock3} accent="text-amber-600" />
          <StatCard title="At-Risk SLA Items" value={atRiskCount} icon={AlertTriangle} accent="text-red-500" />
          <StatCard title="Resolved Issues" value="142" icon={CheckCircle2} accent="text-emerald-600" />
        </section>

        {/* Action Grid */}
        <section className="mt-8 grid gap-7 lg:grid-cols-3">
          {/* Recent Routed Challenges */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="font-black text-slate-900">Recently Routed Challenges</h2>
                <p className="mt-1 text-xs text-slate-400">
                  Civic issues requiring department verification and assignment.
                </p>
              </div>

              <Link
                href="/department/challenges"
                className="text-xs font-bold text-violet-600 hover:text-violet-700"
              >
                View all routed →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {challenges.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/department/challenges/${item.id}`}
                  className="block p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400">{item.id}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            item.slaStatus === "AT_RISK"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          SLA: {item.slaStatus.replace("_", " ")}
                        </span>
                      </div>

                      <h3 className="mt-1.5 font-bold text-slate-900">{item.title}</h3>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {item.location}
                        </span>
                        <span>Deadline: {item.slaDeadline}</span>
                      </div>
                    </div>

                    <ArrowRight className="hidden h-5 w-5 text-slate-300 sm:block" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SLA & University Quick Access */}
          <div className="space-y-6">
            {/* Department Quick Profile Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Department Profile</h3>
                    <p className="text-[10px] font-semibold text-emerald-600">● 94.8% Resolution Rate</p>
                  </div>
                </div>

                <Link
                  href="/department/profile"
                  className="text-xs font-bold text-violet-600 hover:underline"
                >
                  Manage →
                </Link>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <p className="text-[10px] text-slate-400 font-bold">Total Handled</p>
                  <p className="font-black text-slate-900 mt-0.5">1,248</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-2.5">
                  <p className="text-[10px] text-slate-400 font-bold">Officers</p>
                  <p className="font-black text-violet-700 mt-0.5">3 Active</p>
                </div>
              </div>
            </div>

            {/* Active Projects Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-slate-900 text-sm">Active Execution Projects</h2>
                <Link href="/department/accepted-projects" className="text-[11px] font-bold text-violet-600">
                  Accepted (8) →
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-900">{proj.name}</span>
                      <span className="text-violet-600">{proj.progress}%</span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-violet-600"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/department/projects"
                className="mt-5 block rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Manage Projects & SLA →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon: Icon, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon className={`h-5 w-5 ${accent}`} />
        </div>
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
