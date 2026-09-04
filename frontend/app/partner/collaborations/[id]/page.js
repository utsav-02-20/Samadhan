"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { getGovernmentChallenges } from "@/services/government.service";
import {
  ArrowLeft,
  FolderKanban,
  Users,
  Calendar,
  CheckCircle2,
  Clock3,
  MapPin,
  Building2,
} from "lucide-react";

export default function CollaborationDetails() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken()
      .then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => {
        const rawList = res?.data || [];
        const found = rawList.find(
          (item, idx) =>
            String(item._id || item.id) === String(id) ||
            `COL-${String(item._id || "").slice(-4).toUpperCase()}` === String(id) ||
            `COL-${100 + idx}` === String(id)
        ) || rawList[0];

        if (found) {
          const rawStatus = found.status || "Pending";
          let colabStatus = "Active";
          let progressVal = 65;

          if (rawStatus === "Resolved" || rawStatus === "RESOLVED") {
            colabStatus = "Completed";
            progressVal = 100;
          } else if (rawStatus === "Pending" || rawStatus === "OPEN" || rawStatus === "SUBMITTED") {
            colabStatus = "In Review";
            progressVal = 35;
          } else if (found.colab_status) {
            colabStatus = found.colab_status;
          }

          setProject({
            id: found._id ? `COL-${String(found._id).slice(-4).toUpperCase()}` : "COL-101",
            _id: found._id || found.id,
            name: found.title || "Smart City Traffic Optimization",
            department: found.targetDepartment || found.department || found.category || "Traffic Department",
            description: found.description || "Joint project between the industry partner and government department to improve civic infrastructure using technology.",
            location: typeof found.location === "object" ? (found.locality || found.district || "General Locality") : (found.location || "General Locality"),
            colab_status: colabStatus,
            progress: progressVal,
            team: 8,
            deadline: found.createdAt ? new Date(new Date(found.createdAt).getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN") : "30 Oct 2026",
          });
        }
      })
      .catch((err) => console.error("Could not load collaboration details:", err))
      .finally(() => setLoading(false));
  }, [id, getToken]);

  const activeProject = project || {
    id: "COL-101",
    name: "Smart City Traffic Optimization",
    department: "Traffic Department",
    description: "Joint project between the industry partner and government department to improve traffic management using technology.",
    location: "Sector 4, Main Road",
    colab_status: "Active",
    progress: 65,
    team: 8,
    deadline: "30 Oct 2026",
  };

  const statusLabel = activeProject.colab_status || "Active";
  const statusClass =
    statusLabel === "Completed"
      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
      : statusLabel === "In Review"
      ? "bg-amber-50 text-amber-700 border border-amber-200"
      : "bg-indigo-50 text-[#401AD9] border border-indigo-200";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-indigo-100 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Logo href="/partner/opportunities" subtitle="Partner Portal" size="sm" />

          <nav className="ml-auto flex items-center gap-2">
            <Link
              href="/partner/opportunities"
              className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-[#401AD9]"
            >
              Opportunities
            </Link>

            <Link
              href="/partner/collaborations"
              className="rounded-xl bg-royal-gradient px-3.5 py-2 text-xs font-bold !text-white shadow-sm shadow-indigo-600/20"
            >
              Collaborations
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border-2 border-indigo-200 shadow-sm ml-2",
                },
              }}
            />
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/partner/collaborations"
          className="flex items-center gap-2 text-xs font-bold text-[#401AD9] transition hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collaborations
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div>
              <span className={`h-fit rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusClass}`}>
                {statusLabel}
              </span>

              <h1 className="mt-4 text-3xl font-black text-slate-900">
                {activeProject.name}
              </h1>

              <p className="mt-2 text-sm font-bold text-[#401AD9]">
                {activeProject.department}
              </p>
            </div>

            <div className="flex h-fit items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-[#401AD9]">
              <FolderKanban className="h-4 w-4" />
              <span className="text-xs font-black">{activeProject.id}</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-600">
            {activeProject.description}
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Info icon={CheckCircle2} label="Progress" value={`${activeProject.progress}%`} />
          <Info icon={Users} label="Team Members" value={String(activeProject.team)} />
          <Info icon={Calendar} label="Deadline" value={activeProject.deadline} />
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-black text-slate-900">Project Progress</h2>

          <div className="mt-5 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-royal-gradient"
              style={{ width: `${activeProject.progress}%` }}
            />
          </div>

          <div className="mt-6 space-y-4">
            <Step title="Project approved & registered in database" done={activeProject.progress >= 25} />
            <Step title="Department requirements finalized" done={activeProject.progress >= 50} />
            <Step title="Development and implementation in progress" done={activeProject.progress >= 65} />
            <Step title="Final testing and deployment" done={activeProject.progress >= 100} />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-black text-slate-900">Project Team</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Member name="Government Project Lead" role={activeProject.department} />
            <Member name="Industry Lead" role="Technology Partner" />
            <Member name="Backend Team" role="Development" />
            <Member name="Data Team" role="Analytics" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-[#401AD9]" />
      <p className="mt-3 text-[10px] font-bold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-black text-slate-900">{value}</p>
    </div>
  );
}

function Step({ title, done }) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      ) : (
        <Clock3 className="h-5 w-5 text-slate-300" />
      )}
      <span className={`text-sm font-bold ${done ? "text-slate-800" : "text-slate-400"}`}>
        {title}
      </span>
    </div>
  );
}

function Member({ name, role }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
      <p className="text-sm font-black text-slate-900">{name}</p>
      <p className="mt-1 text-xs text-slate-400">{role}</p>
    </div>
  );
}