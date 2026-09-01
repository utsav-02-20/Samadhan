"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FolderKanban,
  Users,
  Calendar,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function CollaborationDetails({ params }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/partner/dashboard" className="font-black">
            Samadhan
          </Link>

          <nav className="ml-auto flex gap-2">
            <Link
              href="/partner/collaborations"
              className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white"
            >
              Collaborations
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          href="/partner/collaborations"
          className="flex items-center gap-2 text-xs font-bold text-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collaborations
        </Link>

        <div className="mt-6 rounded-2xl border bg-white p-7 shadow-sm">

          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-600">
                ACTIVE
              </span>

              <h1 className="mt-4 text-3xl font-black">
                Smart City Traffic Optimization
              </h1>

              <p className="mt-2 text-sm font-bold text-violet-600">
                Traffic Department
              </p>
            </div>

            <div className="flex h-fit items-center gap-2 rounded-xl bg-violet-50 px-4 py-3">
              <FolderKanban className="h-4 w-4 text-violet-600" />
              <span className="text-xs font-black">COL-101</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Joint project between the industry partner and government
            department to improve traffic management using technology.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Info icon={CheckCircle2} label="Progress" value="65%" />
          <Info icon={Users} label="Team Members" value="8" />
          <Info icon={Calendar} label="Deadline" value="30 Oct 2026" />
        </div>

        <div className="mt-5 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="font-black">Project Progress</h2>

          <div className="mt-5 h-3 rounded-full bg-slate-100">
            <div className="h-3 w-[65%] rounded-full bg-violet-600" />
          </div>

          <div className="mt-6 space-y-4">
            <Step title="Project approved" done />
            <Step title="Requirements finalized" done />
            <Step title="Development in progress" done />
            <Step title="Testing and deployment" />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="font-black">Project Team</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Member name="Government Project Lead" role="Traffic Department" />
            <Member name="Industry Lead" role="Technology Partner" />
            <Member name="Backend Team" role="Development" />
            <Member name="Data Team" role="Analytics" />
          </div>
        </div>

      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-violet-600" />
      <p className="mt-3 text-[10px] font-bold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function Step({ title, done }) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      ) : (
        <Clock3 className="h-5 w-5 text-slate-300" />
      )}
      <span className={`text-sm font-bold ${done ? "" : "text-slate-400"}`}>
        {title}
      </span>
    </div>
  );
}

function Member({ name, role }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm font-black">{name}</p>
      <p className="mt-1 text-xs text-slate-400">{role}</p>
    </div>
  );
}