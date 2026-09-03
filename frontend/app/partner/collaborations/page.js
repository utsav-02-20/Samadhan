"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { FolderKanban, Users, Calendar, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { getGovernmentChallenges } from "@/services/government.service";

export default function Collaborations() {
  const { getToken } = useAuth();
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    getToken()
      .then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => {
        const rawList = res?.data || [];
        const mappedList = rawList.map((item, index) => {
          const rawStatus = item.status || "Pending";
          let colabStatus = "Active";
          let progressVal = 55;

          if (rawStatus === "Resolved" || rawStatus === "RESOLVED") {
            colabStatus = "Completed";
            progressVal = 100;
          } else if (rawStatus === "Pending" || rawStatus === "OPEN" || rawStatus === "SUBMITTED") {
            colabStatus = "In Review";
            progressVal = 30;
          } else if (item.colab_status) {
            colabStatus = item.colab_status;
          }

          return {
            id: item._id ? `COL-${String(item._id).slice(-4).toUpperCase()}` : `COL-${100 + index}`,
            _id: item._id || item.id,
            name: item.title || "Civic Project Collaboration",
            department: item.targetDepartment || item.department || item.category || "Municipal Operations",
            progress: progressVal,
            team: 4 + (index % 6),
            deadline: item.createdAt ? new Date(new Date(item.createdAt).getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN") : "30 Oct 2026",
            status: colabStatus,
            colab_status: colabStatus,
          };
        });

        setCollaborations(mappedList);
      })
      .catch((err) => console.error("Could not load partner collaborations:", err));
  }, [getToken]);
  return (
    <main className="min-h-screen bg-slate-50">
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

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-black">Collaborations</h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your active government partnerships and projects.
        </p>

        <div className="mt-6 space-y-4">
          {collaborations.map((project) => {
            const statusLabel = project.colab_status || project.status || "Active";
            const statusClass =
              statusLabel === "Completed"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : statusLabel === "In Review"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-indigo-50 text-[#401AD9] border border-indigo-200";

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#401AD9]">
                      <FolderKanban className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-black">{project.name}</h2>
                      <p className="mt-1 text-xs font-semibold text-[#401AD9]">
                        {project.department}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {project.id}
                      </p>
                    </div>
                  </div>

                  <span className={`h-fit rounded-full px-3 py-1.5 text-[10px] font-black ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Project progress</span>
                    <span>{project.progress}%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-royal-gradient"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-slate-500">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {project.team} members
                  </span>

                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due {project.deadline}
                  </span>

                  <Link
                    href={`/partner/collaborations/${project.id}`}
                    className="ml-auto flex items-center gap-1 font-black text-[#401AD9] hover:underline"
                  >
                    View project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}