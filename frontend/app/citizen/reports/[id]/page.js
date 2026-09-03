"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Camera,
  Building2,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { REPORT_DETAILS_MOCK as reports } from "@/data/demoData";

export default function ReportDetails({ params }) {
  const report = reports[params.id] || reports["SAM-1024"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <Logo href="/citizen/dashboard" subtitle="Citizen Portal" />

          <nav className="ml-auto flex items-center gap-2">

            <Link
              href="/citizen/dashboard"
              className="rounded-xl px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100"
            >
              Dashboard
            </Link>

            <Link
              href="/citizen/reports"
              className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white"
            >
              My Reports
            </Link>

            <Link
              href="/citizen/report"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white hover:bg-blue-700"
            >
              Report Issue
            </Link>

          </nav>

        </div>

      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* BACK */}

        <Link
          href="/citizen/reports"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my reports
        </Link>

        {/* HEADER */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex flex-col justify-between gap-6 md:flex-row">

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[9px] font-black text-blue-600">
                  {report.status.toUpperCase()}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-black text-slate-500">
                  {report.category}
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight">
                {report.title}
              </h1>

              <p className="mt-2 text-sm font-bold text-slate-400">
                Report ID: {params.id}
              </p>

            </div>

            <div className="flex h-fit items-center gap-2 rounded-xl bg-amber-50 px-4 py-3">

              <Clock3 className="h-4 w-4 text-amber-600" />

              <div>

                <p className="text-[9px] font-black uppercase text-amber-600">
                  Current status
                </p>

                <p className="text-xs font-black text-amber-800">
                  {report.status}
                </p>

              </div>

            </div>

          </div>

          <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-500">
            {report.description}
          </p>

        </section>

        {/* INFORMATION */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2">

          <Info
            icon={MapPin}
            label="Location"
            value={report.location}
          />

          <Info
            icon={CalendarDays}
            label="Reported On"
            value={report.reportedOn}
          />

          <Info
            icon={Building2}
            label="Assigned Department"
            value={report.department}
          />

          <Info
            icon={AlertCircle}
            label="Report ID"
            value={params.id}
          />

        </section>

        {/* TIMELINE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-black">
            Resolution Timeline
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Track the progress of your reported issue.
          </p>

          <div className="mt-7">

            {report.updates.map((update, index) => (

              <div
                key={update.title}
                className="relative flex gap-4 pb-8 last:pb-0"
              >

                {/* CONNECTING LINE */}

                {index !== report.updates.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-8 h-full w-px ${
                      update.completed
                        ? "bg-emerald-200"
                        : "bg-slate-200"
                    }`}
                  />
                )}

                {/* ICON */}

                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    update.completed
                      ? "bg-emerald-100"
                      : "bg-slate-100"
                  }`}
                >

                  {update.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Clock3 className="h-4 w-4 text-slate-400" />
                  )}

                </div>

                {/* CONTENT */}

                <div className="flex-1">

                  <div className="flex flex-col justify-between gap-1 sm:flex-row">

                    <h3 className="text-sm font-black">
                      {update.title}
                    </h3>

                    <span className="text-[10px] font-bold text-slate-400">
                      {update.date}
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {update.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* EVIDENCE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Camera className="h-5 w-5 text-slate-600" />
            </div>

            <div>

              <h2 className="font-black">
                Submitted Evidence
              </h2>

              <p className="text-xs text-slate-400">
                Photo submitted with this report.
              </p>

            </div>

          </div>

          <div className="mt-5 flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">

            <div className="text-center">

              <Camera className="mx-auto h-7 w-7 text-slate-300" />

              <p className="mt-2 text-xs font-bold text-slate-400">
                Evidence photo
              </p>

              <p className="mt-1 text-[10px] text-slate-300">
                Will be loaded from backend
              </p>

            </div>

          </div>

        </section>

        {/* ACTION */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Link
            href="/citizen/reports"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-xs font-black text-slate-700 hover:bg-slate-50"
          >
            Back to reports
          </Link>

          <Link
            href="/citizen/report"
            className="rounded-xl bg-slate-950 px-5 py-3 text-center text-xs font-black text-white hover:bg-slate-800"
          >
            Report another issue
          </Link>

        </div>

      </div>

    </main>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {value}
      </p>

    </div>
  );
}