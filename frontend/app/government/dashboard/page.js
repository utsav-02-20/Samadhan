"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
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

const demoChallenges = [
  {
    id: "SAM-1024",
    title: "Broken street lights in residential area",
    category: "Infrastructure",
    submittedBy: "Anonymous Citizen",
    department: "Public Works",
    status: "UNDER_REVIEW",
    date: "28 Aug 2026",
    priority: "HIGH",
  },
  {
    id: "SAM-1021",
    title: "Garbage accumulation near community park",
    category: "Sanitation",
    submittedBy: "Anonymous Citizen",
    department: "Sanitation",
    status: "SUBMITTED",
    date: "27 Aug 2026",
    priority: "MEDIUM",
  },
  {
    id: "SAM-1017",
    title: "Water supply disruption in Sector 4",
    category: "Water Supply",
    submittedBy: "Anonymous Citizen",
    department: "Water Department",
    status: "ACCEPTED",
    date: "26 Aug 2026",
    priority: "HIGH",
  },
  {
    id: "SAM-1011",
    title: "Damaged road near university",
    category: "Roads",
    submittedBy: "Anonymous Citizen",
    department: "Public Works",
    status: "ASSIGNED",
    date: "25 Aug 2026",
    priority: "HIGH",
  },
  {
    id: "SAM-1008",
    title: "Open drainage near residential block",
    category: "Drainage",
    submittedBy: "Anonymous Citizen",
    department: "Municipal Services",
    status: "UNDER_REVIEW",
    date: "24 Aug 2026",
    priority: "MEDIUM",
  },
];

export default function GovernmentDashboard() {
  const { getToken } = useAuth();
  const [allChallenges, setAllChallenges] = useState([]);
  const [recentChallenges, setRecentChallenges] = useState([]);

  useEffect(() => {
    getToken().then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => {
        const dbList = res?.data || [];
        const localSaved = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
          : [];

        const combined = [...localSaved, ...dbList, ...demoChallenges];
        const unique = [];
        const seen = new Set();

        for (const item of combined) {
          const key = String(item.id || item._id || item.title).trim();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push({
              ...item,
              id: item.id || item._id || key,
              title: item.title || "Civic Complaint",
              department: item.targetDepartment || item.department || "Unassigned",
              submittedBy: item.isAnonymous ? "Anonymous Citizen" : (item.submittedBy || item.citizenId?.fullName || "Citizen User"),
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : (item.date || "Recently"),
              status: item.status === "OPEN" || item.status === "Pending" ? "SUBMITTED" : (item.status === "In Progress" ? "ASSIGNED" : item.status || "SUBMITTED"),
            });
          }
        }

        setAllChallenges(unique);
        setRecentChallenges(unique.slice(0, 5));
      })
      .catch(() => {
        const localSaved = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
          : [];
        const combined = [...localSaved, ...demoChallenges];
        const unique = [];
        const seen = new Set();

        for (const item of combined) {
          const key = String(item.id || item._id || item.title).trim();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push({
              ...item,
              id: item.id || item._id || key,
              title: item.title || "Civic Complaint",
              department: item.targetDepartment || item.department || "Unassigned",
              submittedBy: item.isAnonymous ? "Anonymous Citizen" : (item.submittedBy || item.citizenId?.fullName || "Citizen User"),
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : (item.date || "Recently"),
              status: item.status === "OPEN" || item.status === "Pending" ? "SUBMITTED" : (item.status === "In Progress" ? "ASSIGNED" : item.status || "SUBMITTED"),
            });
          }
        }

        setAllChallenges(unique);
        setRecentChallenges(unique.slice(0, 5));
      });
  }, [getToken]);

  const totalCount = allChallenges.length;
  const pendingCount = allChallenges.filter((c) => c.status === "Pending" || c.status === "OPEN" || c.status === "SUBMITTED" || c.status === "UNDER_REVIEW").length;
  const acceptedCount = allChallenges.filter((c) => c.status === "ACCEPTED" || c.status === "In Progress" || c.status === "ASSIGNED").length;
  const resolvedCount = allChallenges.filter((c) => c.status === "Resolved" || c.status === "RESOLVED").length;

  const dynamicStats = [
    {
      title: "Total Challenges",
      value: String(totalCount),
      change: "Live DB count",
      icon: FileText,
    },
    {
      title: "Pending Review",
      value: String(pendingCount),
      change: "Requires attention",
      icon: Clock3,
    },
    {
      title: "Accepted",
      value: String(acceptedCount),
      change: "Active in system",
      icon: CheckCircle2,
    },
    {
      title: "Resolved",
      value: String(resolvedCount),
      change: "Completed issues",
      icon: FolderKanban,
    },
  ];
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

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border-2 border-indigo-200 shadow-sm",
                },
              }}
            />

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome section */}

        <section className="rounded-3xl bg-royal-gradient p-8 text-white shadow-2xl shadow-indigo-600/25">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
                Government Administration
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Good morning, Officer.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">
                Review civic challenges, coordinate departments and
                monitor ongoing projects from one place.
              </p>

            </div>

            <Link
              href="/government/challenges"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold !text-[#401AD9] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-indigo-50"
            >
              Review Challenges
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

          </div>

        </section>

        {/* Stats */}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {dynamicStats.map((stat) => {

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
      className="group flex items-center gap-4 rounded-xl border border-indigo-100/80 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-md"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#401AD9] transition-colors duration-300 group-hover:bg-[#401AD9] group-hover:text-white">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-bold text-slate-900 transition-colors group-hover:text-[#401AD9]">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

      <ArrowRight className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#401AD9]" />

    </Link>
  );
}
