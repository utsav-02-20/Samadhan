"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { useUser, useAuth } from "@clerk/nextjs";
import { getCitizenHistory, toReportView } from "@/services/citizen.service";
import { REPORT_STATUS_CONFIG as statusConfig } from "@/data/demoData";

export default function MyReportsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [reports, setReports] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
    if (!user) return;
    getToken().then((token) => getCitizenHistory(user.id, token || undefined))
      .then((res) => setReports((res?.data || []).map(toReportView)))
      .catch((err) => console.error("Could not load reports:", err));
  }, [user, getToken]);

  const filteredReports = reports.filter((report) => {
    const searchableText =
      report.title + " " + (report.id || report._id) +
      " " +
      report.category;

    const matchesSearch = searchableText
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" || report.status === filter || (filter === "SUBMITTED" && report.status === "Pending");

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          <Link
            href="/citizen/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <Logo href="/" size="sm" />

        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Citizen Portal
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              My Reports
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track the civic issues you have reported.
            </p>
          </div>

          <Link
            href="/citizen/report"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold !text-white shadow-md transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            Report New Issue
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
              />

            </div>

            <div className="flex items-center gap-2">

              <SlidersHorizontal className="h-4 w-4 text-slate-400" />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
              >
                <option value="ALL">All Reports</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="RESOLVED">Resolved</option>
              </select>

            </div>

          </div>

        </div>

        <div className="mt-7">
          <p className="text-sm font-semibold text-slate-500">
            {filteredReports.length} reports
          </p>
        </div>

        <div className="mt-4 space-y-4">

          {filteredReports.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <FileText className="h-6 w-6 text-slate-400" />
              </div>

              <h2 className="mt-5 font-bold">
                No Reports Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            filteredReports.map((report) => (
              <ReportCard
                key={report.id || report._id}
                report={report}
              />
            ))

          )}

        </div>

      </div>

    </main>
  );
}

function ReportCard({ report }) {

  const config =
    statusConfig[report.status] ||
    statusConfig.SUBMITTED;

  const StatusIcon = config.icon;

  return (
    <Link
      href={"/citizen/reports/" + report.id}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-lg font-bold">
              {report.title}
            </h2>

            <span
              className={
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold " +
                config.className
              }
            >
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </span>

          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {report.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">

            <span className="font-bold text-slate-500">
              {report.id}
            </span>

            <span>
              {report.category}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {report.location}
            </span>

          </div>

        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 lg:w-36 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">

          <span className="text-xs text-slate-400">
            {report.date}
          </span>

          <div className="mt-0 flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-slate-950 lg:mt-4">
            View Details
            <ArrowRight className="h-4 w-4" />
          </div>

        </div>

      </div>

    </Link>
  );
}
