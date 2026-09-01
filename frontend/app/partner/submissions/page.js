"use client";

import Link from "next/link";
import { Upload, CheckCircle2, Clock3, FileText } from "lucide-react";

const submissions = [
  {
    id: "SUB-201",
    project: "Smart City Traffic Optimization",
    date: "30 Aug 2026",
    version: "v2.1",
    status: "Under Review",
  },
  {
    id: "SUB-202",
    project: "Digital Public Grievance Platform",
    date: "27 Aug 2026",
    version: "v1.0",
    status: "Approved",
  },
];

export default function Submissions() {
  return (
    <main className="min-h-screen bg-slate-50">

      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/partner/dashboard" className="font-black">
            Samadhan
          </Link>

          <nav className="ml-auto flex gap-2">
            <Link
              href="/partner/dashboard"
              className="px-3 py-2 text-xs font-bold"
            >
              Dashboard
            </Link>

            <Link
              href="/partner/collaborations"
              className="px-3 py-2 text-xs font-bold"
            >
              Collaborations
            </Link>

            <Link
              href="/partner/submissions"
              className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white"
            >
              Submissions
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">Submissions</h1>
            <p className="mt-2 text-sm text-slate-500">
              Track project submissions and reviews.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white">
            <Upload className="h-4 w-4" />
            New Submission
          </button>
        </div>

        <div className="mt-6 space-y-3">

          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center"
            >

              <div className="flex gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                  <FileText className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                  <h2 className="font-black">
                    {submission.project}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {submission.id} · {submission.version}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Submitted {submission.date}
                  </p>
                </div>

              </div>

              <Status status={submission.status} />

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}

function Status({ status }) {
  const approved = status === "Approved";

  return (
    <span
      className={`flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
        approved
          ? "bg-emerald-50 text-emerald-600"
          : "bg-blue-50 text-blue-600"
      }`}
    >
      {approved ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Clock3 className="h-4 w-4" />
      )}

      {status}
    </span>
  );
}