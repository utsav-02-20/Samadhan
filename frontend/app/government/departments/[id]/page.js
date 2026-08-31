"use client";

import Link from "next/link";
import { ArrowLeft, Users, CheckCircle2, XCircle } from "lucide-react";

const applications = [
  { id: "APP-201", name: "TechNova Solutions", type: "Industry Partner", status: "Pending" },
  { id: "APP-202", name: "IIIT Innovation Lab", type: "University", status: "Approved" },
  { id: "APP-203", name: "CivicTech India", type: "Industry Partner", status: "Pending" },
];

export default function ChallengeDetails({ params }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link href="/department/dashboard" className="font-black">
            Samadhan
          </Link>

          <nav className="ml-auto">
            <Link
              href="/department/challenges"
              className="text-xs font-bold"
            >
              Challenges
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/department/challenges"
          className="flex items-center gap-2 text-xs font-bold text-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-600">
            OPEN
          </span>

          <h1 className="mt-4 text-3xl font-black">
            Smart Traffic Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Develop technology solutions to improve traffic monitoring,
            congestion management and public safety.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-500">
            <Users className="h-4 w-4" />
            {applications.length} Applications
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="font-black">Applications</h2>

          <div className="mt-5 space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-4 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="text-sm font-black">{app.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {app.type} · {app.id}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-50 px-3 py-2 text-[10px] font-black text-amber-600">
                    {app.status}
                  </span>

                  {app.status === "Pending" && (
                    <>
                      <button className="rounded-lg bg-emerald-600 p-2 text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <button className="rounded-lg bg-red-500 p-2 text-white">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}