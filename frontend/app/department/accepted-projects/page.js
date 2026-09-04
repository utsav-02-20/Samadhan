"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, GraduationCap, Search } from "lucide-react";
import { getAcceptedUniversityProjects } from "@/services/department.service";

export default function AcceptedProjectsPage() {
  const { getToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const token = await getToken();
        setProjects(await getAcceptedUniversityProjects(token || undefined));
      } catch (err) {
        console.error("Failed to load accepted projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [getToken]);

  const filtered = projects.filter((p) =>
    (p.title + " " + p.university + " " + p.leadResearcher)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 pb-16">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />
          <Link href="/department/profile" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Department Profile
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold text-violet-800">
              <GraduationCap className="h-4 w-4" />
              University Collaboration Grid
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Accepted University Projects</h1>
            <p className="mt-1.5 text-sm text-slate-500 max-w-3xl">Accepted projects are saved to the backend when available.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">Total Accepted</p>
            <p className="mt-1 text-2xl font-black text-violet-700">{projects.length} Projects</p>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project title, university, or lead researcher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-xs font-semibold outline-none focus:border-violet-500 focus:bg-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="mt-10 py-16 text-center text-xs font-bold text-slate-400">Loading accepted university projects...</div>
        ) : (
          <div className="mt-7 space-y-6">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <p className="text-xs font-bold text-slate-500">No accepted projects match your search query.</p>
              </div>
            ) : (
              filtered.map((proj) => (
                <div key={proj.id} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-slate-400">{proj.id}</span>
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">{proj.university}</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-bold text-slate-950">{proj.title}</h2>
                      <p className="mt-1.5 text-xs text-slate-500">
                        Lead Researcher: <strong className="text-slate-800">{proj.leadResearcher}</strong> | Budget Granted: <strong className="text-emerald-600">{proj.budgetGranted}</strong>
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-150 text-right">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Accepted Date</p>
                      <p className="text-xs font-bold text-slate-900">{proj.acceptedDate}</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-400">Target: {proj.targetCompletion}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
