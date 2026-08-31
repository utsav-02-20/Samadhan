"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  Send,
  Target,
  Upload,
  Users,
} from "lucide-react";

const project = {
  id: "PRJ-021",
  challengeId: "SAM-1021",
  title: "Road Safety Analytics",
  department: "Traffic Department",
  team: "SafeRoute",
  status: "IN PROGRESS",
  progress: 74,
  deadline: "30 Sep 2026",
  started: "20 Aug 2026",
  description:
    "A data-driven system to identify accident-prone areas and recommend interventions for improving road safety.",

  members: [
    {
      name: "Aarav Sharma",
      role: "Team Lead",
      initials: "AS",
    },
    {
      name: "Priya Singh",
      role: "Backend Developer",
      initials: "PS",
    },
    {
      name: "Rohan Mehta",
      role: "Frontend Developer",
      initials: "RM",
    },
    {
      name: "Ananya Jain",
      role: "Data Analyst",
      initials: "AJ",
    },
  ],

  milestones: [
    {
      title: "Problem Analysis",
      description: "Study the problem and identify requirements.",
      status: "COMPLETED",
      date: "22 Aug 2026",
    },
    {
      title: "Prototype Development",
      description: "Build the initial working prototype.",
      status: "COMPLETED",
      date: "27 Aug 2026",
    },
    {
      title: "Department Review",
      description: "Present the prototype to the department.",
      status: "IN PROGRESS",
      date: "05 Sep 2026",
    },
    {
      title: "Final Submission",
      description: "Submit the final solution and documentation.",
      status: "UPCOMING",
      date: "30 Sep 2026",
    },
  ],
};

export default function ProjectDetailsPage() {
  const [update, setUpdate] = useState("");
  const [updates, setUpdates] = useState([
    {
      text: "Prototype successfully demonstrated to the department.",
      date: "29 Aug 2026",
    },
    {
      text: "Accident-location dataset preprocessing completed.",
      date: "27 Aug 2026",
    },
  ]);

  function addUpdate(e) {
    e.preventDefault();

    if (!update.trim()) return;

    setUpdates([
      {
        text: update,
        date: "31 Aug 2026",
      },
      ...updates,
    ]);

    setUpdate("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/projects"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
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

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
            UB
          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">

          <Link
            href="/university/projects"
            className="hover:text-blue-600"
          >
            Projects
          </Link>

          <span>/</span>

          <span className="text-slate-600">
            {project.id}
          </span>

        </div>

        {/* HERO */}

        <section className="mt-6 rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-9">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-3xl">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300">
                  {project.status}
                </span>

                <span className="text-xs font-bold text-slate-500">
                  {project.id}
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                {project.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-xs font-semibold text-slate-300">

                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  {project.department}
                </span>

                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  {project.team}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-400" />
                  Deadline {project.deadline}
                </span>

              </div>

            </div>

            <div className="min-w-56">

              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Overall Progress</span>
                <span>{project.progress}%</span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>

            </div>

          </div>

        </section>

        {/* MAIN GRID */}

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}

          <div className="space-y-6">

            {/* MILESTONES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h2 className="font-black">
                    Project Milestones
                  </h2>

                  <p className="text-xs text-slate-400">
                    Track important project stages.
                  </p>
                </div>

              </div>

              <div className="mt-7 space-y-6">

                {project.milestones.map((milestone, index) => (

                  <div
                    key={milestone.title}
                    className="relative flex gap-4"
                  >

                    {index !== project.milestones.length - 1 && (
                      <div className="absolute left-4 top-9 h-14 w-px bg-slate-200" />
                    )}

                    <div
                      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        milestone.status === "COMPLETED"
                          ? "bg-emerald-100"
                          : milestone.status === "IN PROGRESS"
                          ? "bg-blue-100"
                          : "bg-slate-100"
                      }`}
                    >

                      {milestone.status === "COMPLETED" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : milestone.status === "IN PROGRESS" ? (
                        <Clock3 className="h-4 w-4 text-blue-600" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                      )}

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <h3 className="text-sm font-black">
                          {milestone.title}
                        </h3>

                        <span
                          className={`rounded-full px-2 py-1 text-[9px] font-black ${
                            milestone.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700"
                              : milestone.status === "IN PROGRESS"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {milestone.status}
                        </span>

                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {milestone.description}
                      </p>

                      <p className="mt-2 text-[10px] font-semibold text-slate-400">
                        Target: {milestone.date}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* UPDATES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <MessageSquare className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="font-black">
                    Project Updates
                  </h2>

                  <p className="text-xs text-slate-400">
                    Share progress with the department.
                  </p>
                </div>

              </div>

              <form
                onSubmit={addUpdate}
                className="mt-6"
              >

                <textarea
                  value={update}
                  onChange={(e) => setUpdate(e.target.value)}
                  placeholder="Write a project progress update..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

                <div className="mt-3 flex justify-end">

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white hover:bg-slate-800"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Post Update
                  </button>

                </div>

              </form>

              <div className="mt-6 space-y-4">

                {updates.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-slate-50 p-4"
                  >

                    <p className="text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>

                    <p className="mt-2 text-[10px] font-bold text-slate-400">
                      {item.date}
                    </p>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* RIGHT */}

          <aside className="space-y-5">

            {/* TEAM */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-black">
                    Project Team
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {project.members.length} members
                  </p>
                </div>

                <Users className="h-5 w-5 text-slate-300" />

              </div>

              <div className="mt-5 space-y-4">

                {project.members.map((member) => (

                  <div
                    key={member.name}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-600">
                      {member.initials}
                    </div>

                    <div>
                      <p className="text-xs font-black">
                        {member.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {member.role}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* PROJECT INFO */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Project Information
              </h2>

              <div className="mt-5 space-y-5">

                <Info
                  icon={Building2}
                  label="Department"
                  value={project.department}
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

                <Info
                  icon={FileText}
                  label="Challenge"
                  value={project.challengeId}
                />

              </div>

            </section>

            {/* SUBMISSION */}

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>

              <h2 className="mt-4 font-black text-blue-950">
                Final Submission
              </h2>

              <p className="mt-2 text-xs leading-5 text-blue-800">
                Upload your final project files when the solution
                is ready for department evaluation.
              </p>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-black text-white hover:bg-blue-500">
                Upload Submission
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </section>

          </aside>

        </div>

      </div>

    </main>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

      <div>
        <p className="text-[10px] font-semibold text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xs font-black text-slate-700">
          {value}
        </p>
      </div>

    </div>
  );
}