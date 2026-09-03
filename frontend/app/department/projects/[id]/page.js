"use client";

import { useState, use } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Building2,
  CalendarDays,
  ShieldCheck,
  Send,
  Flag,
} from "lucide-react";
import { DEPARTMENT_PROJECTS_DETAILED } from "@/data/departmentData";

export default function DepartmentProjectDetailPage({ params }) {
  const resolvedParams = use(params);
  const project =
    DEPARTMENT_PROJECTS_DETAILED.find((p) => p.id === resolvedParams?.id) ||
    DEPARTMENT_PROJECTS_DETAILED[0];

  const [milestones, setMilestones] = useState(project.milestones || []);
  const [newMilestone, setNewMilestone] = useState("");

  function toggleMilestone(index) {
    const updated = [...milestones];
    updated[index].completed = !updated[index].completed;
    setMilestones(updated);
  }

  function handleAddMilestone(e) {
    e.preventDefault();
    if (!newMilestone.trim()) return;

    setMilestones([...milestones, { title: newMilestone.trim(), completed: false }]);
    setNewMilestone("");
  }

  const completedCount = milestones.filter((m) => m.completed).length;
  const computedProgress = milestones.length ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <Link
            href="/department/projects"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Banner */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black text-slate-400">{project.id}</span>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">
                  {project.category}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                  {project.status}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black text-slate-900">{project.name}</h1>
              <p className="mt-1 text-sm text-slate-500">
                Partner: <strong>{project.partner}</strong> · Budget: <strong>{project.budget}</strong>
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-right">
              <p className="text-[10px] font-bold uppercase text-slate-400">Target Completion</p>
              <p className="text-sm font-black text-slate-900">{project.estimatedCompletion}</p>
            </div>
          </div>

          {/* Dynamic Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Milestone SLA Progress</span>
              <span className="text-violet-600">{computedProgress}%</span>
            </div>
            <div className="mt-2 h-2.5 rounded-full bg-slate-100">
              <div
                className="h-2.5 rounded-full bg-violet-600 transition-all duration-300"
                style={{ width: `${computedProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* Milestones Management */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Deliverables checklist */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-900">SLA Deliverables & Milestones</h2>
            <p className="mt-1 text-xs text-slate-400">Click to toggle milestone completion status</p>

            <div className="mt-5 space-y-3">
              {milestones.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleMilestone(idx)}
                  className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-3.5 text-left text-xs font-bold transition hover:bg-slate-100"
                >
                  <span className={m.completed ? "line-through text-slate-400" : "text-slate-900"}>
                    {m.title}
                  </span>
                  {m.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Clock3 className="h-4 w-4 text-slate-300" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Add Milestone Form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-black text-slate-900">Add Milestone Deliverable</h2>
            <p className="mt-1 text-xs text-slate-400">Append new SLA requirements for project execution</p>

            <form onSubmit={handleAddMilestone} className="mt-5 space-y-3">
              <input
                type="text"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                placeholder="Example: Final Inspection & Handover..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold outline-none focus:border-violet-500 focus:bg-white"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Send className="h-3.5 w-3.5" />
                Add Milestone
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
