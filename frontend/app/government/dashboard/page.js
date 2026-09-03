"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getGovernmentChallenges } from "@/services/government.service";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  FolderKanban,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { GOVERNMENT_STATS } from "@/data/demoData";

const govIconMap = { FileText, Clock3, CheckCircle2, FolderKanban };
const stats = GOVERNMENT_STATS.map((s) => ({ ...s, icon: govIconMap[s.icon] || FileText }));

const statusStyles = {
  SUBMITTED: "bg-slate-100 text-slate-600",
  UNDER_REVIEW: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-blue-50 text-blue-700",
  ASSIGNED: "bg-purple-50 text-purple-700",
};

const statusLabels = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ACCEPTED: "Accepted",
  ASSIGNED: "Assigned",
};

export default function GovernmentDashboard() {
  const { getToken } = useAuth();
  const [recentChallenges, setRecentChallenges] = useState([]);
  useEffect(() => {
    getToken().then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => setRecentChallenges((res?.data || []).slice(0, 5).map((item) => ({
        ...item,
        id: item.id || item._id,
        department: item.department || item.targetDepartment || "Unassigned",
        submittedBy: item.submittedBy || "Government",
        date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : ""),
        status: item.status === "OPEN" ? "SUBMITTED" : item.status,
      }))))
      .catch((err) => console.error("Could not load government data:", err));
  }, [getToken]);
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* Top navigation */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <Logo href="/" subtitle="Government Portal" />

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">
                Government Officer
              </p>

              <p className="text-xs text-slate-400">
                District Administration
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              GO
            </div>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome section */}

        <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <p className="text-sm font-semibold text-blue-300">
                Government Administration
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Good morning, Officer.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Review civic challenges, coordinate departments and
                monitor ongoing projects from one place.
              </p>

            </div>

            <Link
              href="/government/challenges"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold !text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
            >
              Review Challenges
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

          </div>

        </section>

        {/* Stats */}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>

                  <TrendingUp className="h-4 w-4 text-emerald-500" />

                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-black">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-400">
                  {stat.change}
                </p>

              </div>
            );
          })}

        </section>

        {/* Main grid */}

        <section className="mt-7 grid gap-7 lg:grid-cols-3">

          {/* Recent challenges */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>

                <h2 className="font-black">
                  Recent Challenges
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Latest civic issues requiring government action.
                </p>

              </div>

              <Link
                href="/government/challenges"
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>

            </div>

            <div className="divide-y divide-slate-100">

              {recentChallenges.map((challenge) => (

                <Link
                  key={challenge.id}
                  href={`/government/challenges/${challenge.id}`}
                  className="block p-5 transition hover:bg-slate-50"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-xs font-black text-slate-400">
                          {challenge.id}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[challenge.status]}`}
                        >
                          {statusLabels[challenge.status]}
                        </span>

                      </div>

                      <h3 className="mt-2 truncate font-bold">
                        {challenge.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">

                        <span>
                          {challenge.department}
                        </span>

                        <span>
                          {challenge.submitted}
                        </span>

                      </div>

                    </div>

                    <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-300 sm:block" />

                  </div>

                </Link>

              ))}

            </div>

          </div>

          {/* Quick actions */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="font-black">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Frequently used government operations.
            </p>

            <div className="mt-6 space-y-3">

              <QuickAction
                href="/government/challenges"
                icon={FileText}
                title="Review Challenges"
                description="View and process submissions"
              />

              <QuickAction
                href="/government/departments"
                icon={Building2}
                title="Departments"
                description="Manage department assignments"
              />

              <QuickAction
                href="/government/projects"
                icon={FolderKanban}
                title="Projects"
                description="Monitor active projects"
              />

              <QuickAction
                href="/government/assign-challenge"
                icon={Plus}
                title="Assign Challenge"
                description="Send a challenge to a department"
              />

            </div>

          </div>

        </section>

        {/* Bottom information */}

        <section className="mt-7 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h3 className="font-black">
                  Departments
                </h3>

                <p className="text-xs text-slate-400">
                  Department coordination
                </p>
              </div>

            </div>

            <div className="mt-6 flex items-end justify-between">

              <div>
                <p className="text-3xl font-black">
                  14
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Active departments
                </p>
              </div>

              <Link
                href="/government/departments"
                className="flex items-center gap-1 text-sm font-bold text-blue-600"
              >
                Manage
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h3 className="font-black">
                  Project Progress
                </h3>

                <p className="text-xs text-slate-400">
                  Current implementation status
                </p>
              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between text-sm">

                <span className="font-semibold text-slate-500">
                  Overall progress
                </span>

                <span className="font-black">
                  72%
                </span>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: "72%" }}
                />

              </div>

              <p className="mt-3 text-xs text-slate-400">
                31 active projects across government departments
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
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
      className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-4 w-4 text-slate-700" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowRight className="h-4 w-4 text-slate-300" />

    </Link>
  );
}
