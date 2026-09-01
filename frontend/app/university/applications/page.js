"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Lightbulb,
  Search,
  Users,
  XCircle,
} from "lucide-react";

const applications = [
  {
    id: "APP-2081",
    challengeId: "SAM-1042",
    title: "Smart Waste Collection System",
    department: "Municipal Services",
    team: "Civic Innovators",
    submitted: "31 Aug 2026",
    status: "UNDER REVIEW",
    category: "Technology",
    members: 4,
  },
  {
    id: "APP-2074",
    challengeId: "SAM-1031",
    title: "Water Conservation Monitoring",
    department: "Water Department",
    team: "AquaTech",
    submitted: "29 Aug 2026",
    status: "SHORTLISTED",
    category: "Environment",
    members: 5,
  },
  {
    id: "APP-2059",
    challengeId: "SAM-1021",
    title: "Road Safety Analytics",
    department: "Traffic Department",
    team: "SafeRoute",
    submitted: "24 Aug 2026",
    status: "ACCEPTED",
    category: "Safety",
    members: 4,
  },
  {
    id: "APP-2041",
    challengeId: "SAM-1018",
    title: "Digital Literacy for Citizens",
    department: "Education Department",
    team: "Digital Bridge",
    submitted: "18 Aug 2026",
    status: "REJECTED",
    category: "Education",
    members: 3,
  },
];

const statuses = [
  "ALL",
  "UNDER REVIEW",
  "SHORTLISTED",
  "ACCEPTED",
  "REJECTED",
];

export default function UniversityApplicationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchableText = [
        application.id,
        application.challengeId,
        application.title,
        application.department,
        application.team,
        application.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "ALL" || application.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const total = applications.length;

  const underReview = applications.filter(
    (item) => item.status === "UNDER REVIEW"
  ).length;

  const shortlisted = applications.filter(
    (item) => item.status === "SHORTLISTED"
  ).length;

  const accepted = applications.filter(
    (item) => item.status === "ACCEPTED"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/dashboard"
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
                  University Portal
                </p>
              </div>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              href="/university/challenges"
              className="hidden text-sm font-bold text-slate-600 hover:text-blue-600 sm:block"
            >
              Explore Challenges
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
              UB
            </div>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              University Workspace
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Track the challenges your university has applied to,
              monitor proposal reviews and follow application outcomes.
            </p>

          </div>

          <Link
            href="/university/challenges"
            className="flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            Find new challenges
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={FileText}
            label="Total Applications"
            value={total}
          />

          <StatCard
            icon={Clock3}
            label="Under Review"
            value={underReview}
          />

          <StatCard
            icon={Lightbulb}
            label="Shortlisted"
            value={shortlisted}
          />

          <StatCard
            icon={CheckCircle2}
            label="Accepted"
            value={accepted}
          />

        </div>

        {/* FILTER BAR */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications, challenges or teams..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

            <div className="flex items-center gap-2">

              <Filter className="h-4 w-4 text-slate-400" />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item === "ALL" ? "All Statuses" : item}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">

            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredApplications.length}
            </span>{" "}
            applications

          </p>

        </section>

        {/* APPLICATION LIST */}

        <section className="mt-6 space-y-4">

          {filteredApplications.map((application) => (

            <ApplicationCard
              key={application.id}
              application={application}
            />

          ))}

        </section>

        {/* EMPTY STATE */}

        {filteredApplications.length === 0 && (

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <Search className="mx-auto h-9 w-9 text-slate-300" />

            <h2 className="mt-4 font-black">
              No applications found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or status filter.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>

      <p className="mt-5 text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function ApplicationCard({
  application,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* ICON */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>

        {/* MAIN */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <span className="text-[11px] font-bold text-slate-400">
              {application.id}
            </span>

            <span className="text-[11px] font-bold text-slate-300">
              •
            </span>

            <span className="text-[11px] font-bold text-slate-400">
              {application.challengeId}
            </span>

            <StatusBadge status={application.status} />

          </div>

          <h2 className="mt-2 text-lg font-black">
            {application.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">

            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {application.department}
            </span>

            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {application.team} · {application.members} members
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              Submitted {application.submitted}
            </span>

          </div>

        </div>

        {/* CATEGORY */}

        <div className="hidden rounded-xl bg-slate-50 px-4 py-3 md:block">

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Category
          </p>

          <p className="mt-1 text-xs font-black text-slate-700">
            {application.category}
          </p>

        </div>

        {/* ACTION */}

        <Link
          href={`/university/challenges/${application.challengeId}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          View challenge
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

      </div>

      {/* STATUS MESSAGE */}

      <StatusMessage status={application.status} />

    </div>
  );
}

function StatusBadge({
  status,
}) {
  const styles = {
    "UNDER REVIEW": "bg-amber-50 text-amber-700",
    SHORTLISTED: "bg-blue-50 text-blue-700",
    ACCEPTED: "bg-emerald-50 text-emerald-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
        styles[status] || "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

function StatusMessage({
  status,
}) {
  if (status === "UNDER REVIEW") {
    return (
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-amber-600">
        <Clock3 className="h-3.5 w-3.5" />
        Your proposal is currently being reviewed by the department.
      </div>
    );
  }

  if (status === "SHORTLISTED") {
    return (
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-blue-600">
        <Lightbulb className="h-3.5 w-3.5" />
        Your team has been shortlisted. Awaiting the final decision.
      </div>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Congratulations! Your university has been selected for this challenge.
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-red-500">
      <XCircle className="h-3.5 w-3.5" />
      This application was not selected for the challenge.
    </div>
  );
}