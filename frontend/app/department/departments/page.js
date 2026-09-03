"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Users,
  FileText,
  Clock3,
  Search,
} from "lucide-react";

const departmentsList = [
  { id: "DEPT-001", name: "Public Works Department", code: "PWD", head: "Rajiv Mehra", challenges: 28, activeProjects: 9 },
  { id: "DEPT-002", name: "Sanitation Department", code: "SAN", head: "Anita Verma", challenges: 21, activeProjects: 6 },
  { id: "DEPT-003", name: "Water Supply Board", code: "WTR", head: "Suresh Kumar", challenges: 17, activeProjects: 5 },
  { id: "DEPT-004", name: "Electrical & Energy", code: "ELEC", head: "Pooja Sharma", challenges: 14, activeProjects: 4 },
];

export default function DepartmentDirectoryPage() {
  const [search, setSearch] = useState("");

  const filtered = departmentsList.filter((d) =>
    (d.name + " " + d.code + " " + d.head).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <Link
            href="/department/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Department Operations Grid
            </p>
            <h1 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">
              Departments Directory
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Overview of registered municipal departments and operational metrics.
            </p>
          </div>

          <Link
            href="/department/departments/new"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
          >
            + Register Department
          </Link>
        </div>

        {/* Search */}
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by department name, code or head..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-violet-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dept) => (
            <div
              key={dept.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-700">
                  {dept.code}
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">{dept.name}</h2>
                  <p className="text-xs text-slate-400">Head: {dept.head}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                <div>
                  <span>Routed Challenges</span>
                  <p className="mt-1 text-lg font-black text-slate-900">{dept.challenges}</p>
                </div>
                <div>
                  <span>Active Projects</span>
                  <p className="mt-1 text-lg font-black text-slate-900">{dept.activeProjects}</p>
                </div>
              </div>

              <Link
                href={`/department/departments/${dept.id}`}
                className="mt-5 block rounded-xl border border-slate-200 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                View Department →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
