"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, CheckSquare } from "lucide-react";
import { getPendingDepartmentProjects, acceptDepartmentProject } from "@/services/department.service";

export default function DepartmentDetailPage({ params }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState(null);

  useEffect(() => {
    getPendingDepartmentProjects().then((items) => {
      setProject(items.find((p) => p.id === resolvedParams?.id) || items[0]);
    });
  }, [resolvedParams?.id]);

  async function onAccept() {
    if (!project) return;
    await acceptDepartmentProject(project);
    alert("Project accepted.");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />
          <Link href="/department/departments" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <span className="text-xs font-black text-slate-400">ID: {resolvedParams?.id}</span>
          <h1 className="mt-1 text-2xl font-black text-slate-900">Department Submission</h1>
          <p className="mt-1 text-xs text-slate-500">Review and accept the university project.</p>

          {project && (
            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
              <h2 className="text-sm font-black text-slate-900">{project.title}</h2>
              <p className="mt-1 text-xs text-slate-600">{project.university}</p>
              <p className="mt-3 text-xs text-slate-600">{project.abstract}</p>
              <button onClick={onAccept} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white">
                <CheckSquare className="h-4 w-4" />
                Accept Project
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
