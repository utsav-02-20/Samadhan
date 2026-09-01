"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Users,
} from "lucide-react";

const departments = [
  {
    id: "DEPT-001",
    name: "Public Works",
    shortName: "PWD",
    head: "Rajiv Mehra",
    email: "pwd@samadhan.gov",
    challenges: 28,
    activeProjects: 9,
    resolved: 41,
    status: "ACTIVE",
  },
  {
    id: "DEPT-002",
    name: "Sanitation",
    shortName: "SAN",
    head: "Anita Verma",
    email: "sanitation@samadhan.gov",
    challenges: 21,
    activeProjects: 6,
    resolved: 36,
    status: "ACTIVE",
  },
  {
    id: "DEPT-003",
    name: "Water Department",
    shortName: "WTR",
    head: "Suresh Kumar",
    email: "water@samadhan.gov",
    challenges: 17,
    activeProjects: 5,
    resolved: 29,
    status: "ACTIVE",
  },
  {
    id: "DEPT-004",
    name: "Electrical Department",
    shortName: "ELEC",
    head: "Pooja Sharma",
    email: "electrical@samadhan.gov",
    challenges: 14,
    activeProjects: 4,
    resolved: 24,
    status: "ACTIVE",
  },
  {
    id: "DEPT-005",
    name: "Traffic Department",
    shortName: "TRF",
    head: "Vikram Singh",
    email: "traffic@samadhan.gov",
    challenges: 11,
    activeProjects: 3,
    resolved: 19,
    status: "ACTIVE",
  },
  {
    id: "DEPT-006",
    name: "Municipal Services",
    shortName: "MUN",
    head: "Neeraj Gupta",
    email: "municipal@samadhan.gov",
    challenges: 19,
    activeProjects: 4,
    resolved: 32,
    status: "ACTIVE",
  },
];

export default function GovernmentDepartmentsPage() {
  const [search, setSearch] = useState("");

  const filteredDepartments = departments.filter((department) => {
    const text = [
      department.name,
      department.shortName,
      department.head,
      department.email,
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/government/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
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

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            GO
          </div>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Heading */}

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Government Administration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Departments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View departments responsible for handling civic
              challenges and executing government projects.
            </p>

          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

            <p className="text-xs font-semibold text-slate-400">
              Active Departments
            </p>

            <p className="mt-1 text-2xl font-black">
              {departments.length}
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments, officers or email..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

        </div>

        {/* Department cards */}

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredDepartments.map((department) => (

            <DepartmentCard
              key={department.id}
              department={department}
            />

          ))}

        </div>

        {filteredDepartments.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <Building2 className="mx-auto h-8 w-8 text-slate-300" />

            <h2 className="mt-4 font-black">
              No departments found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try a different search term.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}

function DepartmentCard({ department }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">

      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-700">
            {department.shortName}
          </div>

          <div>

            <h2 className="font-black">
              {department.name}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {department.id}
            </p>

          </div>

        </div>

        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">

          <CheckCircle2 className="h-3 w-3" />

          Active

        </span>

      </div>

      {/* Officer */}

      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <p className="text-xs font-semibold text-slate-400">
          Department Head
        </p>

        <p className="mt-1 text-sm font-bold">
          {department.head}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {department.email}
        </p>

      </div>

      {/* Stats */}

      <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200">

        <Stat
          icon={FileText}
          value={department.challenges}
          label="Challenges"
        />

        <Stat
          icon={Clock3}
          value={department.activeProjects}
          label="Projects"
        />

        <Stat
          icon={CheckCircle2}
          value={department.resolved}
          label="Resolved"
        />

      </div>

      {/* Action */}

      <Link
        href={`/government/departments/${department.id}`}
        className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
      >

        View Department

        <ArrowRight className="h-4 w-4" />

      </Link>

    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="px-2 text-center">

      <Icon className="mx-auto h-4 w-4 text-slate-400" />

      <p className="mt-1 text-lg font-black">
        {value}
      </p>

      <p className="text-[10px] font-semibold text-slate-400">
        {label}
      </p>

    </div>
  );
}