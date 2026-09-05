"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { getGovernmentChallenges } from "@/services/government.service";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Search,
  XCircle,
} from "lucide-react";

const challenges = [
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
  {
    id: "SAM-1002",
    title: "Traffic signal malfunction",
    category: "Traffic",
    submittedBy: "Anonymous Citizen",
    department: "Traffic Department",
    status: "SUBMITTED",
    date: "22 Aug 2026",
    priority: "HIGH",
  },
  {
    id: "SAM-0996",
    title: "Public park maintenance issue",
    category: "Public Spaces",
    submittedBy: "Anonymous Citizen",
    department: "Municipal Services",
    status: "ACCEPTED",
    date: "20 Aug 2026",
    priority: "LOW",
  },
];

const statusConfig = {
  SUBMITTED: {
    label: "Submitted",
    className: "bg-slate-100 text-slate-600",
    icon: Clock3,
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  ACCEPTED: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700",
    icon: CheckCircle2,
  },
  ASSIGNED: {
    label: "Assigned",
    className: "bg-purple-50 text-purple-700",
    icon: CheckCircle2,
  },
};

const priorityConfig = {
  HIGH: "text-red-600 bg-red-50",
  MEDIUM: "text-amber-700 bg-amber-50",
  LOW: "text-emerald-700 bg-emerald-50",
};

export default function GovernmentChallengesPage() {
  const [liveChallenges, setLiveChallenges] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  useEffect(() => {
    getGovernmentChallenges()
      .then((res) => {
        const dbItems = res?.data || [];
        const localSaved = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
          : [];

        const combined = [...localSaved, ...dbItems, ...challenges];
        const unique = [];
        const seen = new Set();

        for (const item of combined) {
          const key = String(item.id || item._id || item.title).trim();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push({
              ...item,
              id: item.id || item._id || key,
              department: item.targetDepartment || item.department || "Unassigned",
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : (item.date || "Just now"),
              status: item.status === "Pending" ? "SUBMITTED" : item.status === "In Progress" ? "ASSIGNED" : item.status || "SUBMITTED",
              submittedBy: item.isAnonymous ? "Anonymous Citizen" : (item.submittedBy || "Citizen User"),
            });
          }
        }

        setLiveChallenges(unique);
      })
      .catch(() => {
        const localSaved = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
          : [];
        const combined = [...localSaved, ...challenges];
        const unique = [];
        const seen = new Set();

        for (const item of combined) {
          const key = String(item.id || item._id || item.title).trim();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push({
              ...item,
              id: item.id || item._id || key,
              department: item.targetDepartment || item.department || "Unassigned",
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : (item.date || "Just now"),
              status: item.status === "Pending" ? "SUBMITTED" : item.status === "In Progress" ? "ASSIGNED" : item.status || "SUBMITTED",
              submittedBy: item.isAnonymous ? "Anonymous Citizen" : (item.submittedBy || "Citizen User"),
            });
          }
        }
        setLiveChallenges(unique);
      });
  }, []);
  const [priority, setPriority] = useState("ALL");

  const filteredChallenges = useMemo(() => {
    return liveChallenges.filter((challenge) => {
      const searchableText = [
        challenge.id,
        challenge.title,
        challenge.category,
        challenge.submittedBy,
        challenge.department,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "ALL" || challenge.status === status;

      const matchesPriority =
        priority === "ALL" ||
        (challenge.priority || "HIGH") === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [liveChallenges, search, status, priority]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/government/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                S
              </div>

              <div>
                <p className="text-sm font-black">
                  Samadhan
                </p>

                <p className="text-xs text-slate-400">
                  Government Portal
                </p>
              </div>

            </div>

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

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Page heading */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Government Administration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Civic Challenges
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review, evaluate and assign challenges submitted
              by citizens and partner organizations.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <FileText className="h-4 w-4 text-slate-400" />

            <span className="text-sm font-bold">
              {filteredChallenges.length}
            </span>

            <span className="text-sm text-slate-400">
              challenges
            </span>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 xl:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, ID, department or submitter..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}

            </div>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">
                Under Review
              </option>
              <option value="ACCEPTED">Accepted</option>
              <option value="ASSIGNED">Assigned</option>
            </select>

            {/* Priority */}

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setStatus("ALL");
                setPriority("ALL");
              }}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <Filter className="h-4 w-4" />
              Reset
            </button>

          </div>

        </div>

        {/* Challenge list */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Desktop table */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Challenge
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Department
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Priority
                  </th>

                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Submitted
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredChallenges.map((challenge) => (
                  <ChallengeRow
                    key={challenge.id}
                    challenge={challenge}
                  />
                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile/tablet cards */}

          <div className="divide-y divide-slate-100 lg:hidden">

            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
              />
            ))}

          </div>

          {filteredChallenges.length === 0 && (
            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h2 className="mt-5 font-black">
                No challenges found
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

function ChallengeRow({ challenge }) {

  const status = statusConfig[challenge.status];
  const StatusIcon = status.icon;

  return (
    <tr className="group transition hover:bg-slate-50">

      <td className="px-6 py-5">

        <Link
          href={`/government/challenges/${challenge.id}`}
          className="block"
        >

          <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <FileText className="h-4 w-4 text-slate-500" />
            </div>

            <div className="min-w-0">

              <p className="text-xs font-bold text-slate-400">
                {challenge.id}
              </p>

              <p className="mt-1 max-w-md font-bold text-slate-900">
                {challenge.title}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {challenge.category} · {challenge.submittedBy}
              </p>

            </div>

          </div>

        </Link>

      </td>

      <td className="px-4 py-5">

        <p className="text-sm font-semibold text-slate-600">
          {challenge.department}
        </p>

      </td>

      <td className="px-4 py-5">

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>

      </td>

      <td className="px-4 py-5">

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityConfig[challenge.priority]}`}
        >
          {challenge.priority}
        </span>

      </td>

      <td className="px-4 py-5 text-sm text-slate-400">
        {challenge.date}
      </td>

      <td className="px-6 py-5 text-right">

        <Link
          href={`/government/challenges/${challenge.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          Review
          <ArrowRight className="h-4 w-4" />
        </Link>

      </td>

    </tr>
  );
}

function ChallengeCard({ challenge }) {

  const status = statusConfig[challenge.status];
  const StatusIcon = status.icon;

  return (
    <Link
      href={`/government/challenges/${challenge.id}`}
      className="block p-5 transition hover:bg-slate-50"
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <FileText className="h-4 w-4 text-slate-500" />
          </div>

          <div className="min-w-0">

            <p className="text-xs font-bold text-slate-400">
              {challenge.id}
            </p>

            <h3 className="mt-1 font-bold">
              {challenge.title}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {challenge.category} · {challenge.submittedBy}
            </p>

          </div>

        </div>

        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300" />

      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityConfig[challenge.priority]}`}
        >
          {challenge.priority}
        </span>

        <span className="text-xs text-slate-400">
          {challenge.department}
        </span>

      </div>

    </Link>
  );
}
