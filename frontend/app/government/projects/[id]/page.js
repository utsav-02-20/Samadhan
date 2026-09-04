"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { getGovernmentChallenges, addProjectMilestone, updateGovernmentChallengeStatus, addProjectUpdate } from "@/services/government.service";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Users,
  IndianRupee,
  CalendarDays,
  Building2,
  MessageSquare,
  Plus,
  Circle,
  X,
} from "lucide-react";

const initialMilestones = [
  {
    id: 1,
    title: "Site inspection",
    description: "Inspect damaged street lights and identify required repairs.",
    status: "COMPLETED",
    date: "30 Aug 2026",
  },
  {
    id: 2,
    title: "Material procurement",
    description: "Procure replacement lights, wiring and required equipment.",
    status: "COMPLETED",
    date: "02 Sep 2026",
  },
  {
    id: 3,
    title: "Street light installation",
    description: "Replace damaged units across the affected area.",
    status: "IN_PROGRESS",
    date: "15 Sep 2026",
  },
  {
    id: 4,
    title: "Government verification",
    description: "Verify completed work and citizen satisfaction.",
    status: "PENDING",
    date: "20 Sep 2026",
  },
];

const initialUpdates = [
  {
    id: 1,
    author: "Rajiv Mehra",
    role: "Public Works",
    text: "Installation work has started in the northern section of Sector 4.",
    date: "Today · 10:30 AM",
  },
  {
    id: 2,
    author: "Government Officer",
    role: "Government",
    text: "Material procurement has been completed. Department can proceed with installation.",
    date: "05 Sep 2026 · 02:15 PM",
  },
];

export default function GovernmentProjectDetails() {
  const { id } = useParams();
  const { getToken } = useAuth();

  const [projectData, setProjectData] = useState(null);
  const [milestones, setMilestones] = useState(initialMilestones);
  const [updates, setUpdates] = useState(initialUpdates);
  const [updateText, setUpdateText] = useState("");
  
  // Modal state for milestone creation
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("PENDING");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getToken()
      .then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => {
        const rawList = res?.data || [];
        const found = rawList.find(
          (item, idx) =>
            String(item._id || item.id) === String(id) ||
            `PRJ-${String(idx + 1).padStart(3, "0")}` === String(id) ||
            String(item._id).slice(-8) === String(id)
        ) || rawList[0];

        if (found) {
          setProjectData(found);
          if (found.milestones && found.milestones.length > 0) {
            setMilestones(found.milestones.map((m, idx) => ({
              id: m._id || idx + 1,
              title: m.title,
              description: m.description || "",
              status: m.status || "PENDING",
              date: m.date || "Scheduled",
            })));
          }
          if (found.updates && found.updates.length > 0) {
            setUpdates(found.updates.map((u, idx) => ({
              id: u._id || idx + 1,
              author: u.author || "Government Officer",
              role: u.role || "Government",
              text: u.text,
              date: u.date || "Just now",
            })));
          }
        }
      })
      .catch((err) => console.error("Could not load project details:", err));
  }, [id, getToken]);

  const activeProject = {
    id: id || "PRJ-001",
    _id: projectData?._id || projectData?.id,
    name: projectData?.title || "Sector 4 Street Light Restoration",
    challengeId: projectData?._id ? String(projectData._id).slice(-8) : "SAM-1024",
    description: projectData?.description || "Restoration and replacement of damaged street lights across Sector 4 following a citizen-reported civic challenge.",
    department: projectData?.targetDepartment || projectData?.department || "Public Works",
    manager: projectData?.citizenId?.fullName ? `${projectData.citizenId.fullName} (Officer)` : "Rajiv Mehra",
    location: typeof projectData?.location === "object" ? (projectData.locality || projectData.district || "General Locality") : (projectData?.location || "Sector 4, Main Market Road"),
    budget: "₹4.8 Lakh",
    deadline: projectData?.createdAt ? new Date(new Date(projectData.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN") : "20 September 2026",
    progress: projectData?.status === "Resolved" ? 100 : (projectData?.status === "Pending" ? 25 : 68),
    status: projectData?.status === "Resolved" ? "COMPLETED" : "IN_PROGRESS",
    team: 8,
  };

  async function handleAddMilestone(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const milestoneObj = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      date: newDate || new Date().toLocaleDateString("en-IN"),
      status: newStatus,
    };

    setIsSubmitting(true);
    try {
      const token = await getToken();
      if (activeProject._id) {
        await addProjectMilestone(
          activeProject._id,
          {
            title: newTitle,
            description: newDescription,
            date: newDate || new Date().toLocaleDateString("en-IN"),
            status: newStatus,
          },
          token || undefined
        );
      }
      setMilestones((prev) => [...prev, milestoneObj]);
      setShowMilestoneModal(false);
      setNewTitle("");
      setNewDescription("");
      setNewDate("");
      setNewStatus("PENDING");
    } catch (err) {
      alert(err?.message || "Could not add milestone to backend.");
      // Local fallback
      setMilestones((prev) => [...prev, milestoneObj]);
      setShowMilestoneModal(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function addUpdate() {
    if (!updateText.trim()) return;
    const textToSave = updateText;
    setUpdateText("");

    const updateObj = {
      id: Date.now(),
      author: "Government Officer",
      role: "Government",
      text: textToSave,
      date: "Just now",
    };

    try {
      const token = await getToken();
      if (activeProject._id) {
        await addProjectUpdate(
          activeProject._id,
          { text: textToSave, author: "Government Officer", role: "Government" },
          token || undefined
        );
      }
      setUpdates((prev) => [...prev, updateObj]);
    } catch (err) {
      console.warn("Could not save update to backend:", err.message);
      setUpdates((prev) => [...prev, updateObj]);
    }
  }

  function markComplete(mid) {
    setMilestones((current) =>
      current.map((milestone) =>
        milestone.id === mid
          ? {
              ...milestone,
              status: "COMPLETED",
            }
          : milestone
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/government/projects"
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

        {/* TITLE */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {project.id}
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                In Progress
              </span>

            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight">
              {project.name}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              {project.description}
            </p>

          </div>

          <Link
            href={`/government/challenges/${project.challengeId}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-sm transition hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" />
            View Source Challenge
          </Link>

        </div>

        {/* PROGRESS */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overall Project Progress
              </p>

              <div className="mt-2 flex items-end gap-2">

                <p className="text-4xl font-black">
                  {project.progress}%
                </p>

                <p className="pb-1 text-sm text-slate-400">
                  completed
                </p>

              </div>

            </div>

            <div className="w-full md:max-w-md">

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />

              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-400">

                <span>
                  Started
                </span>

                <span>
                  Deadline: {project.deadline}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* MAIN */}

        <div className="mt-7 grid gap-7 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-7 lg:col-span-2">

            {/* PROJECT INFORMATION */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Project Information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <Info
                  icon={Building2}
                  label="Department"
                  value={project.department}
                />

                <Info
                  icon={Users}
                  label="Project Manager"
                  value={project.manager}
                />

                <Info
                  icon={MapPin}
                  label="Location"
                  value={project.location}
                />

                <Info
                  icon={IndianRupee}
                  label="Approved Budget"
                  value={project.budget}
                />

                <Info
                  icon={CalendarDays}
                  label="Deadline"
                  value={project.deadline}
                />

                <Info
                  icon={FileText}
                  label="Source Challenge"
                  value={project.challengeId}
                />

              </div>

            </section>

            {/* MILESTONES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-black">
                    Project Milestones
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Track major stages of project execution.
                  </p>

                </div>

                <button
                  onClick={() => setShowMilestoneModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-royal-gradient px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Milestone
                </button>

              </div>

              <div className="mt-7 space-y-4">

                {milestones.map((milestone) => (

                  <div
                    key={milestone.id}
                    className="flex gap-4 rounded-xl border border-slate-100 p-4"
                  >

                    <div className="mt-1">

                      {milestone.status === "COMPLETED" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : milestone.status === "IN_PROGRESS" ? (
                        <Clock3 className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300" />
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <h3 className="text-sm font-black">
                          {milestone.title}
                        </h3>

                        <Status
                          status={milestone.status}
                        />

                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {milestone.description}
                      </p>

                      <div className="mt-3 flex items-center justify-between">

                        <p className="text-xs font-semibold text-slate-500">
                          {milestone.date}
                        </p>

                        {milestone.status === "IN_PROGRESS" && (
                          <button
                            onClick={() =>
                              markComplete(milestone.id)
                            }
                            className="text-xs font-bold text-blue-600 hover:text-blue-700"
                          >
                            Mark complete
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* UPDATES */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <MessageSquare className="h-5 w-5 text-slate-600" />
                </div>

                <div>

                  <h2 className="font-black">
                    Project Updates
                  </h2>

                  <p className="text-xs text-slate-400">
                    Communication between government and department.
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                {updates.map((update) => (

                  <div
                    key={update.id}
                    className="rounded-xl bg-slate-50 p-4"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-2">

                      <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                          {update.author
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>

                          <p className="text-xs font-black">
                            {update.author}
                          </p>

                          <p className="text-[11px] text-slate-400">
                            {update.role}
                          </p>

                        </div>

                      </div>

                      <p className="text-xs text-slate-400">
                        {update.date}
                      </p>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {update.text}
                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-5 flex gap-3">

                <input
                  value={updateText}
                  onChange={(e) =>
                    setUpdateText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addUpdate();
                    }
                  }}
                  placeholder="Add a project update..."
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

                <button
                  onClick={addUpdate}
                  className="rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Post
                </button>

              </div>

            </section>

          </div>

          {/* RIGHT */}

          <aside className="space-y-5">

            {/* STATUS */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Project Status
              </h2>

              <div className="mt-5 rounded-xl bg-blue-50 p-5">

                <p className="text-xs font-semibold text-blue-500">
                  Current status
                </p>

                <p className="mt-1 text-xl font-black text-blue-800">
                  In Progress
                </p>

                <p className="mt-2 text-xs leading-5 text-blue-600">
                  Department is currently executing the approved
                  project.
                </p>

              </div>

            </section>

            {/* TEAM */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <h2 className="font-black">
                  Project Team
                </h2>

                <span className="text-xs font-bold text-slate-400">
                  {project.team} members
                </span>

              </div>

              <div className="mt-5 space-y-3">

                {[
                  "Rajiv Mehra",
                  "Amit Kumar",
                  "Pooja Sharma",
                  "Vikas Singh",
                ].map((person, index) => (

                  <div
                    key={person}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {person
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div>

                      <p className="text-sm font-bold">
                        {person}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {index === 0
                          ? "Project Manager"
                          : "Project Member"}
                      </p>

                    </div>

                  </div>

                ))}

                <button
                  onClick={() =>
                    alert(
                      "Team management will be connected to the backend later."
                    )
                  }
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold hover:bg-slate-50"
                >
                  <Users className="h-3.5 w-3.5" />
                  Manage Team
                </button>

              </div>

            </section>

            {/* GOVERNMENT ACTIONS */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Government Actions
              </h2>

              <div className="mt-5 space-y-2">

                <button
                  onClick={async () => {
                    try {
                      const token = await getToken();
                      if (activeProject._id) {
                        await updateGovernmentChallengeStatus(activeProject._id, "IN_PROGRESS", "Government verified inspection and project progress.", token || undefined);
                      }
                      setProjectData((prev) => ({ ...prev, status: "In Progress" }));
                      alert("Progress verified and updated in database!");
                    } catch (err) {
                      alert(err?.message || "Could not update status.");
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Verify Progress
                </button>

                <Link
                  href="/government/departments"
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-[#401AD9]"
                >
                  <MessageSquare className="h-4 w-4 text-[#401AD9]" />
                  Contact Department
                </Link>

                <button
                  onClick={async () => {
                    try {
                      const token = await getToken();
                      if (activeProject._id) {
                        await updateGovernmentChallengeStatus(activeProject._id, "RESOLVED", "Project completed and verified by government officer.", token || undefined);
                      }
                      setProjectData((prev) => ({ ...prev, status: "Resolved" }));
                      alert("Project marked as COMPLETED and saved in live database!");
                    } catch (err) {
                      alert(err?.message || "Could not complete project.");
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left text-sm font-bold shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Mark Project Completed
                </button>

              </div>

            </section>

          </aside>

        </div>

      </div>

      <MilestoneModal
        isOpen={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        onSubmit={handleAddMilestone}
        title={newTitle}
        setTitle={setNewTitle}
        description={newDescription}
        setDescription={setNewDescription}
        date={newDate}
        setDate={setNewDate}
        status={newStatus}
        setStatus={setNewStatus}
        isSubmitting={isSubmitting}
      />

    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="flex items-center gap-2">

        <Icon className="h-4 w-4 text-slate-400" />

        <p className="text-xs font-semibold text-slate-400">
          {label}
        </p>

      </div>

      <p className="mt-2 text-sm font-black text-slate-700">
        {value}
      </p>

    </div>
  );
}

function Status({ status }) {
  if (status === "COMPLETED") {
    return (
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
        COMPLETED
      </span>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-700">
        IN PROGRESS
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
      PENDING
    </span>
  );
}

function MilestoneModal({ isOpen, onClose, onSubmit, title, setTitle, description, setDescription, date, setDate, status, setStatus, isSubmitting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl transition-all">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-slate-900">Add Project Milestone</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Milestone Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Electrical wiring setup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none focus:border-[#401AD9] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief details about this milestone step..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-900 outline-none focus:border-[#401AD9] focus:bg-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Target Date
              </label>
              <input
                type="text"
                placeholder="e.g. 18 Sep 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none focus:border-[#401AD9] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#401AD9]"
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-royal-gradient px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              {isSubmitting ? "Saving..." : "Save Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}