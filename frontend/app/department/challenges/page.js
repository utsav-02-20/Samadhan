"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Search,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { getDepartmentChallenges } from "@/services/department.service";

export default function DepartmentChallengesPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    getDepartmentChallenges()
      .then((res) => setChallenges((res?.data || []).map((item) => ({
        ...item,
        id: item._id || item.id,
        location: item.locality || item.district || "General Locality",
        slaStatus: "ON_TRACK",
        routedBy: "Government Portal",
        slaDeadline: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "-",
        applicationsCount: item.upvotes || 0,
        status: item.status === "Pending" ? "ROUTED" : item.status === "In Progress" ? "IN_PROGRESS" : item.status.toUpperCase(),
      }))))
      .catch((error) => console.error("Could not load department challenges:", error));
  }, []);

  const filtered = challenges.filter((item) => {
    const text = (item.title + " " + item.id + " " + item.category + " " + item.location).toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <div className="flex items-center gap-3">
            <Link
              href="/department/dashboard"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Title */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Routed Issues & Grievance Grid
            </p>
            <h1 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">
              Routed Civic Challenges
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Verify incoming civic grievances routed from government channels, review applications, and update resolution progress.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by challenge ID, title, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold outline-none focus:border-violet-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="ROUTED">Routed (Pending Verification)</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* List of Challenges */}
        <div className="mt-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-sm font-bold text-slate-500">No routed challenges match your filter.</p>
            </div>
          ) : (
            filtered.map((challenge) => (
              <div
                key={challenge.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-black text-slate-400">{challenge.id}</span>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">
                        {challenge.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                          challenge.slaStatus === "AT_RISK"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : challenge.slaStatus === "ON_TRACK"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        SLA: {challenge.slaStatus.replace("_", " ")}
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">{challenge.title}</h2>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                      {challenge.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {challenge.location}
                      </span>
                      <span>Routed by: <strong>{challenge.routedBy}</strong></span>
                      <span>SLA Deadline: <strong>{challenge.slaDeadline}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 lg:w-44 lg:items-end lg:border-t-0 lg:pt-0">
                    <Link
                      href={`/department/challenges/${challenge.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Process Issue
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <span className="text-[11px] font-semibold text-slate-400">
                      {challenge.applicationsCount} Applications
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
