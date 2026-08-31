"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Search,
  Users,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    name: "Sector 4 Street Light Restoration",
    challengeId: "SAM-1024",
    department: "Public Works",
    manager: "Rajiv Mehra",
    status: "IN_PROGRESS",
    progress: 68,
    budget: "₹4.8 Lakh",
    deadline: "20 Sep 2026",
    team: 8,
  },
  {
    id: "PRJ-002",
    name: "Community Park Clean-up",
    challengeId: "SAM-1021",
    department: "Sanitation",
    manager: "Anita Verma",
    status: "IN_PROGRESS",
    progress: 45,
    budget: "₹2.1 Lakh",
    deadline: "15 Sep 2026",
    team: 6,
  },
  {
    id: "PRJ-003",
    name: "Sector 4 Water Supply Restoration",
    challengeId: "SAM-1017",
    department: "Water Department",
    manager: "Suresh Kumar",
    status: "IN_PROGRESS",
    progress: 82,
    budget: "₹7.2 Lakh",
    deadline: "10 Sep 2026",
    team: 11,
  },
  {
    id: "PRJ-004",
    name: "University Road Repair",
    challengeId: "SAM-1011",
    department: "Public Works",
    manager: "Rajiv Mehra",
    status: "PLANNING",
    progress: 20,
    budget: "₹12.5 Lakh",
    deadline: "30 Sep 2026",
    team: 14,
  },
  {
    id: "PRJ-005",
    name: "Traffic Signal Modernization",
    challengeId: "SAM-1002",
    department: "Traffic Department",
    manager: "Vikram Singh",
    status: "COMPLETED",
    progress: 100,
    budget: "₹5.6 Lakh",
    deadline: "25 Aug 2026",
    team: 7,
  },
];

const statusConfig = {
  PLANNING: {
    label: "Planning",
    className: "bg-slate-100 text-slate-600",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700",
  },
};

export default function GovernmentProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchableText = [
        project.id,
        project.name,
        project.challengeId,
        project.department,
        project.manager,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "ALL" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeProjects = projects.filter(
    (project) => project.status === "IN_PROGRESS"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  const totalTeamMembers = projects.reduce(
    (total, project) => total + project.team,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/government/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                S
              </div>

              <div>
                <p className="text-sm font-black">
                  Samadhan
                </p>

                <p className="text-xs text-slate-400">
                  Government Portal
                </p>
              </div>

            </div>

          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            GO
          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Heading */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Government Administration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Projects
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor civic projects created from approved
              challenges and track their execution.
            </p>

          </div>

          <button
            onClick={() =>
              alert("Project creation will be connected to the backend later.")
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Create Project
          </button>

        </div>

        {/* Summary */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            icon={BriefcaseBusiness}
            label="Total Projects"
            value={projects.length}
          />

          <SummaryCard
            icon={Clock3}
            label="In Progress"
            value={activeProjects}
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Completed"
            value={completedProjects}
          />

          <SummaryCard
            icon={Users}
            label="Team Members"
            value={totalTeamMembers}
          />

        </div>

        {/* Filters */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, departments or managers..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="ALL">All Projects</option>
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

          </div>

        </div>

        {/* Projects */}

        <div className="mt-6 space-y-4">

          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <BriefcaseBusiness className="mx-auto h-8 w-8 text-slate-300" />

            <h2 className="mt-4 font-black">
              No projects found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or status filter.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-600" />
        </div>

      </div>

      <p className="mt-5 text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function ProjectCard({ project }) {

  const status = statusConfig[project.status];

  return (
    <Link
      href={`/government/projects/${project.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* Project info */}

        <div className="flex min-w-0 flex-1 gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <p className="text-xs font-bold text-slate-400">
                {project.id}
              </p>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}
              >
                {status.label}
              </span>

            </div>

            <h2 className="mt-2 text-lg font-black">
              {project.name}
            </h2>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">

              <span>
                Challenge: {project.challengeId}
              </span>

              <span>
                {project.department}
              </span>

              <span>
                Manager: {project.manager}
              </span>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="w-full lg:w-56">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold text-slate-400">
              Progress
            </p>

            <p className="text-xs font-black">
              {project.progress}%
            </p>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>

        </div>

        {/* Meta */}

        <div className="grid grid-cols-2 gap-6 lg:w-48">

          <div>

            <p className="text-[11px] font-semibold text-slate-400">
              Budget
            </p>

            <p className="mt-1 text-sm font-black">
              {project.budget}
            </p>

          </div>

          <div>

            <p className="text-[11px] font-semibold text-slate-400">
              Deadline
            </p>

            <p className="mt-1 text-sm font-black">
              {project.deadline}
            </p>

          </div>

        </div>

        <ArrowRight className="hidden h-5 w-5 text-slate-300 lg:block" />

      </div>

    </Link>
  );
}