"use client";

import Link from "next/link";
import { Search, FileText, Clock3, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const applications = [
  {
    id: "APP-1001",
    title: "Smart City Traffic Optimization",
    department: "Traffic Department",
    date: "30 Aug 2026",
    status: "Under Review",
  },
  {
    id: "APP-1002",
    title: "Digital Public Grievance Platform",
    department: "District Administration",
    date: "28 Aug 2026",
    status: "Accepted",
  },
  {
    id: "APP-1003",
    title: "Intelligent Waste Collection",
    department: "Municipal Corporation",
    date: "25 Aug 2026",
    status: "Pending",
  },
];

export default function Applications() {
  const [search, setSearch] = useState("");

  const filtered = applications.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

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
              href="/partner/applications"
              className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white"
            >
              Applications
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-black">My Applications</h1>
        <p className="mt-2 text-sm text-slate-500">
          Track applications submitted by your organization.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            className="w-full text-sm outline-none"
          />
        </div>

        <div className="mt-6 space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                  <FileText className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                  <h2 className="font-black">{app.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {app.department}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {app.id} • Submitted {app.date}
                  </p>
                </div>
              </div>

              <Status status={app.status} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Status({ status }) {
  const config = {
    Accepted: [CheckCircle2, "bg-emerald-50 text-emerald-600"],
    "Under Review": [Clock3, "bg-blue-50 text-blue-600"],
    Pending: [Clock3, "bg-amber-50 text-amber-600"],
    Rejected: [XCircle, "bg-red-50 text-red-600"],
  };

  const [Icon, style] = config[status];

  return (
    <span className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${style}`}>
      <Icon className="h-4 w-4" />
      {status}
    </span>
  );
}