"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Users,
} from "lucide-react";

const projects = [
  {
    id: "PRJ-021",
    challengeId: "SAM-1021",
    title: "Road Safety Analytics",
    department: "Traffic Department",
    team: "SafeRoute",
    status: "IN PROGRESS",
    progress: 74,
    members: 4,
    started: "20 Aug 2026",
    deadline: "30 Sep 2026",
    description:
      "A data-driven system to identify accident-prone areas and recommend interventions for improving road safety.",
  },
  {
    id: "PRJ-018",
    challengeId: "SAM-1031",
    title: "Community Water Monitoring",
    department: "Water Department",
    team: "AquaTech",
    status: "IN PROGRESS",
    progress: 48,
    members: 5,
    started: "24 Aug 2026",
    deadline: "12 Oct 2026",
    description:
      "A monitoring solution designed to identify water wastage and improve water conservation across public facilities.",
  },
  {
    id: "PRJ-015",
    challengeId: "SAM-1018",
    title: "Digital Literacy Initiative",
    department: "Education Department",
    team: "Digital Bridge",
    status: "NEAR COMPLETION",
    progress: 91,
    members: 3,
    started: "05 Aug 2026",
    deadline: "08 Sep 2026",
    description:
      "A community-focused initiative helping citizens access digital government services more effectively.",
  },
];

export default function UniversityProjectsPage() {
  const activeProjects = projects.filter(
    (project) => project.status !== "COMPLETED"
  );

  const completedProjects = projects.filter(
    (project) => project.status === "COMPLETED"
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/dashboard"
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
                  University Portal
                </p>
              </div>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              href="/university/challenges"
              className="hidden text-sm font-bold text-slate-600 hover:text-blue-600 sm:block"
            >
              Challenges
            </Link>

            <Link
              href="/university/applications"
              className="hidden text-sm font-bold text-slate-600 hover:text-blue-600 sm:block"
            >
              Applications
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
              UB
            </div>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* INTRO */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              University Workspace
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              My Projects
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the civic projects your university is participating
              in and track progress from proposal to completion.
            </p>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

            <BookOpen className="h-5 w-5 text-blue-600" />

            <div>

              <p className="text-xs font-semibold text-slate-400">
                Active Projects
              </p>

              <p className="text-xl font-black">
                {activeProjects.length}
              </p>

            </div>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={BookOpen}
            label="Total Projects"
            value={projects.length}
          />

          <SummaryCard
            icon={Clock3}
            label="In Progress"
            value={activeProjects.length}
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Completed"
            value={completedProjects.length}
          />

        </div>

        {/* ACTIVE PROJECTS */}

        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-lg font-black">
              Active Projects
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Projects currently being worked on by your university.
            </p>

          </div>

          <div className="grid gap-5 lg:grid-cols-2">

            {activeProjects.map((project) => (

              <ProjectCard
                key={project.id}
                project={project}
              />

            ))}

          </div>

        </section>

        {/* COMPLETED */}

        <section className="mt-10">

          <div className="mb-4">

            <h2 className="text-lg font-black">
              Completed Projects
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Previously completed university initiatives.
            </p>

          </div>

          {completedProjects.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">

              <CheckCircle2 className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-bold text-slate-500">
                No completed projects yet.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 lg:grid-cols-2">

              {completedProjects.map((project) => (

                <ProjectCard
                  key={project.id}
                  project={project}
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

function ProjectCard({ project }) {
  const isNearCompletion =
    project.status === "NEAR COMPLETION";

  return (
    <Link
      href={`/university/projects/${project.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >

      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>

          <div>

            <p className="text-[11px] font-bold text-slate-400">
              {project.id}
            </p>

            <p className="mt-0.5 text-[11px] font-bold text-slate-400">
              {project.challengeId}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
            isNearCompletion
              ? "bg-emerald-50 text-emerald-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {project.status}
        </span>

      </div>

      {/* TITLE */}

      <h3 className="mt-5 text-lg font-black group-hover:text-blue-700">
        {project.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      {/* INFO */}

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">

        <Info
          icon={Building2}
          label="Department"
          value={project.department}
        />

        <Info
          icon={Users}
          label="Team"
          value={`${project.team} · ${project.members}`}
        />

        <Info
          icon={CalendarDays}
          label="Started"
          value={project.started}
        />

        <Info
          icon={Clock3}
          label="Deadline"
          value={project.deadline}
        />

      </div>

      {/* PROGRESS */}

      <div className="mt-6">

        <div className="flex items-center justify-between">

          <span className="text-xs font-bold text-slate-400">
            Project Progress
          </span>

          <span className="text-xs font-black">
            {project.progress}%
          </span>

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

      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

        <span className="text-xs font-bold text-slate-400">
          Open project
        </span>

        <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />

      </div>

    </Link>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-2">

      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />

      <div className="min-w-0">

        <p className="text-[10px] font-semibold text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}