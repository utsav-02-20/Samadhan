"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Building2,
  Plus,
} from "lucide-react";
import { DEPARTMENT_PROJECTS_DETAILED as projects } from "@/data/departmentData";

export default function DepartmentProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <Link
            href="/department/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Department Execution & SLA Grid
            </p>
            <h1 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">
              Active Projects & SLA Milestones
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Track progress, milestone completion, and SLA timelines for ongoing department projects.
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="mt-8 space-y-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-400">{proj.id}</span>
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">
                      {proj.category}
                    </span>
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{proj.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Industry / Partner: <strong>{proj.partner}</strong> · Budget: <strong>{proj.budget}</strong>
                  </p>
                </div>

                <Link
                  href={`/department/projects/${proj.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
                >
                  View Milestones & SLA
                </Link>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Overall Implementation Progress</span>
                  <span className="text-violet-600">{proj.progress}%</span>
                </div>
                <div className="mt-2 h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-violet-600 transition-all duration-300"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones Preview */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-700">Key Milestones & SLA Deliverables</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                  {proj.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      {m.completed ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <Clock3 className="h-4 w-4 shrink-0 text-slate-300" />
                      )}
                      <span className={m.completed ? "line-through text-slate-400" : ""}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
