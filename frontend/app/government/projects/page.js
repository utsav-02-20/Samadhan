"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { getGovernmentChallenges } from "@/services/government.service";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Search,
  Users,
} from "lucide-react";

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
  const { getToken } = useAuth();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [liveProjects, setLiveProjects] = useState([]);

  useEffect(() => {
    getToken()
      .then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => {
        const rawList = res?.data || [];
        const mappedProjects = rawList.map((item, index) => {
          const rawStatus = item.status || "Pending";
          let prjStatus = "IN_PROGRESS";
          let progressPercent = 65;

          if (rawStatus === "Resolved" || rawStatus === "RESOLVED") {
            prjStatus = "COMPLETED";
            progressPercent = 100;
          } else if (rawStatus === "Pending" || rawStatus === "OPEN" || rawStatus === "SUBMITTED") {
            prjStatus = "PLANNING";
            progressPercent = 25;
          }

          return {
            id: `PRJ-${String(index + 1).padStart(3, "0")}`,
            _id: item._id || item.id,
            name: item.title || "Civic Improvement Project",
            challengeId: item._id ? String(item._id).slice(-8) : `SAM-${1000 + index}`,
            department: item.targetDepartment || item.department || item.category || "Municipal Operations",
            manager: item.citizenId?.fullName ? `${item.citizenId.fullName} (Officer)` : "District Admin",
            status: prjStatus,
            progress: progressPercent,
            budget: `₹${(3.5 + (index % 5) * 2.2).toFixed(1)} Lakh`,
            deadline: item.createdAt ? new Date(new Date(item.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN") : "30 Sep 2026",
            team: 6 + (index % 8),
          };
        });

        setLiveProjects(mappedProjects);
      })
      .catch((err) => console.error("Could not load backend projects:", err));
  }, [getToken]);

  const filteredProjects = useMemo(() => {
    return liveProjects.filter((project) => {
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
  }, [liveProjects, search, status]);

  const activeProjects = liveProjects.filter(
    (project) => project.status === "IN_PROGRESS"
  ).length;

  const completedProjects = liveProjects.filter(
    (project) => project.status === "COMPLETED"
  ).length;

  const totalTeamMembers = liveProjects.reduce(
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-indigo-50 hover:text-[#401AD9]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <Logo href="/government/dashboard" subtitle="Government Portal" size="sm" />

          </div>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 border-2 border-indigo-200 shadow-sm",
              },
            }}
          />

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

          <Link
            href="/government/assign-challenge"
            className="flex items-center justify-center gap-2 rounded-xl bg-royal-gradient px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:shadow-lg hover:-translate-y-0.5"
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Create Project
          </Link>

        </div>

        {/* Summary */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            icon={BriefcaseBusiness}
            label="Total Projects"
            value={liveProjects.length}
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