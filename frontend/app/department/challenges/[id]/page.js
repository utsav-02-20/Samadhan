"use client";

import { useState, use } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  AlertCircle,
  MapPin,
  Building2,
  CalendarDays,
  ShieldCheck,
  Send,
  XCircle,
} from "lucide-react";
import { DEPARTMENT_CHALLENGES_MOCK } from "@/data/departmentData";

export default function ChallengeDetails({ params }) {
  const resolvedParams = use(params);
  const challenge =
    DEPARTMENT_CHALLENGES_MOCK.find((c) => c.id === resolvedParams?.id) ||
    DEPARTMENT_CHALLENGES_MOCK[0];

  const [status, setStatus] = useState(challenge.status);
  const [slaStatus, setSlaStatus] = useState(challenge.slaStatus);
  const [progress, setProgress] = useState(challenge.progress);
  const [newUpdate, setNewUpdate] = useState("");
  const [updates, setUpdates] = useState(challenge.updates || []);
  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleAddUpdate(e) {
    e.preventDefault();
    if (!newUpdate.trim()) return;

    const entry = {
      date: "Today",
      note: newUpdate.trim(),
    };

    setUpdates([entry, ...updates]);
    setNewUpdate("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <Link
            href="/department/challenges"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to routed challenges
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Banner Card */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">
                  {challenge.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                    slaStatus === "AT_RISK"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  SLA: {slaStatus.replace("_", " ")}
                </span>

                <span className="text-xs font-black text-slate-400">{challenge.id}</span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {challenge.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Routed from <strong>{challenge.routedBy}</strong> on {challenge.assignedDate}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <Clock3 className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">SLA Deadline</p>
                <p className="text-sm font-black text-slate-900">{challenge.slaDeadline}</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            {challenge.description}
          </p>
        </section>

        {/* Info Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Process & Update Resolution Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-900">Process & Update Resolution Status</h2>
            <p className="mt-1 text-xs text-slate-400">Verify, update progress percentage and SLA state</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Issue Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold outline-none focus:border-violet-500"
                >
                  <option value="ROUTED">ROUTED (Pending Verification)</option>
                  <option value="IN_PROGRESS">IN PROGRESS (Work Executing)</option>
                  <option value="RESOLVED">RESOLVED (Target Met)</option>
                  <option value="CLOSED">CLOSED (Verified Complete)</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">SLA Track</label>
                <select
                  value={slaStatus}
                  onChange={(e) => setSlaStatus(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold outline-none focus:border-violet-500"
                >
                  <option value="ON_TRACK">ON TRACK</option>
                  <option value="AT_RISK">AT RISK (Delayed Progress)</option>
                  <option value="BREACHED">BREACHED (Deadline Passed)</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <label className="text-slate-700">Completion Percentage</label>
                  <span className="text-violet-600">{progress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-600"
                />
              </div>

              {savedSuccess && (
                <p className="text-xs font-bold text-emerald-600">✓ Resolution progress updated successfully.</p>
              )}
            </div>
          </section>

          {/* Add Resolution Update / Note */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-900">Add Progress Note</h2>
            <p className="mt-1 text-xs text-slate-400">Log actions taken by department personnel</p>

            <form onSubmit={handleAddUpdate} className="mt-5 space-y-3">
              <textarea
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                placeholder="Enter field update or verification notes..."
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs outline-none focus:border-violet-500 focus:bg-white"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Send className="h-3.5 w-3.5" />
                Post Progress Update
              </button>
            </form>
          </section>
        </div>

        {/* Timeline Updates */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-black text-slate-900">Department Resolution Audit Log</h2>
          <p className="mt-1 text-xs text-slate-400">History of verification and progress updates</p>

          <div className="mt-5 space-y-3">
            {updates.map((update, idx) => (
              <div key={idx} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{update.note}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}