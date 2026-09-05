"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Inbox,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { useCitizenAutoRegister } from "@/hooks/useCitizen";
import { useUser, useAuth, UserButton } from "@clerk/nextjs";
import { getCitizenHistory, getPublicFeed, toReportView } from "@/services/citizen.service";

import { REPORT_STATUS_CONFIG as statusConfig } from "@/data/demoData";

export default function CitizenDashboard() {
  useCitizenAutoRegister();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    async function loadReports() {
      try {
        const token = user ? await getToken() : undefined;
        const historyRes = user ? await getCitizenHistory(user.id, token || undefined).catch(() => null) : null;
        const feedRes = await getPublicFeed().catch(() => null);
        
        const localProblems = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
          : [];

        const historyData = historyRes?.data || [];
        const feedData = feedRes?.data || [];
        const combined = [...localProblems, ...historyData, ...feedData];

        if (combined.length > 0) {
          const uniqueMap = new Map();
          combined.forEach((item) => {
            const id = String(item._id || item.id);
            if (!uniqueMap.has(id)) {
              uniqueMap.set(id, toReportView(item));
            }
          });
          setReports(Array.from(uniqueMap.values()));
        } else if (localProblems.length > 0) {
          setReports(localProblems.map(toReportView));
        }
      } catch (err) {
        console.warn("Dashboard load fallback:", err.message);
      }
    }
    loadReports();
  }, [user, getToken]);
  const pendingCount = reports.filter(
    (report) =>
      report.status === "SUBMITTED" ||
      report.status === "UNDER_REVIEW"
  ).length;

  const acceptedCount = reports.filter(
    (report) => report.status === "ACCEPTED"
  ).length;

  const resolvedCount = reports.filter(
    (report) => report.status === "RESOLVED"
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">

      {/* Top navigation */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">

          <Logo href="/" subtitle="Citizen Portal" />

          <div className="flex items-center gap-4">

            <Link
              href="/citizen/inbox"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-[#401AD9] hover:text-[#401AD9] shadow-sm"
            >
              <Inbox className="h-4 w-4 text-[#401AD9]" />
              Inbox
            </Link>

            <Link
              href="/citizen/report"
              className="hidden items-center gap-2 rounded-xl bg-royal-gradient px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:shadow-lg sm:flex"
            >
              <Plus className="h-4 w-4" />
              Report issue
            </Link>

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

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-royal-gradient px-7 py-8 text-white shadow-2xl shadow-indigo-600/25 sm:px-10 sm:py-10">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Your civic activity
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Make your community better.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Report problems around you and follow every step from
              submission to resolution.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/citizen/report"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold !text-[#401AD9] shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                <Plus className="h-4 w-4" />
                Report a civic issue
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/citizen/reports"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/25 hover:-translate-y-0.5"
              >
                Browse All Community Problems
              </Link>
            </div>

          </div>

        </section>

        {/* Stats */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Total reports"
            value={reports.length}
            icon={FileText}
          />

          <StatCard
            label="Pending"
            value={pendingCount}
            icon={Clock3}
          />

          <StatCard
            label="Accepted"
            value={acceptedCount}
            icon={CheckCircle2}
          />

          <StatCard
            label="Resolved"
            value={resolvedCount}
            icon={ShieldCheck}
          />

        </section>

        {/* Reports */}
        <section className="mt-8">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Activity
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight">
                Your recent reports
              </h2>
            </div>

            <Link
              href="/citizen/reports"
              className="hidden items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-950 sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          <div className="space-y-3">

            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
              />
            ))}

          </div>

          <Link
            href="/citizen/reports"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 sm:hidden"
          >
            View all reports
            <ArrowRight className="h-4 w-4" />
          </Link>

        </section>

      </div>

      {/* Mobile report button */}
      <Link
        href="/citizen/report"
        className="fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl sm:hidden"
        aria-label="Report issue"
      >
        <Plus className="h-6 w-6" />
      </Link>

    </main>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon className="h-5 w-5" />
        </div>

        <span className="text-2xl font-black tracking-tight">
          {value}
        </span>

      </div>

      <p className="mt-4 text-sm font-semibold text-slate-500">
        {label}
      </p>

    </div>
  );
}

function ReportCard({ report }) {
  const config =
    statusConfig[report.status] || statusConfig.SUBMITTED;

  const Icon = config.icon;

  return (
    <Link
      href={`/citizen/reports/${report.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <div className="flex items-center gap-3">

            <h3 className="truncate font-bold text-slate-950">
              {report.title}
            </h3>

            <span
              className={`hidden rounded-full px-2.5 py-1 text-[11px] font-bold sm:inline-flex ${config.className}`}
            >
              {config.label}
            </span>

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">

            <span>{report.id}</span>

            <span>•</span>

            <span>{report.category}</span>

            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {report.location}
            </span>

          </div>

        </div>

        <div className="flex items-center justify-between sm:justify-end sm:gap-5">

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold sm:hidden ${config.className}`}
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </span>

          <span className="text-xs text-slate-400">
            {report.date}
          </span>

          <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700" />

        </div>

      </div>

    </Link>
  );
}
