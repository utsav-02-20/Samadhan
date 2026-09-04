"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
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
  Trash2,
  UserPlus,
  Plus,
  FileCode,
  ExternalLink,
  UploadCloud,
  RefreshCw,
} from "lucide-react";
import {
  uploadProjectFileCloudinary,
  deleteProjectFileCloudinary,
  getTeams,
  registerTeam,
  uploadUniversityMedia,
} from "@/services/university.service";
import { useAuth } from "@clerk/nextjs";

const initialProject = {
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
    { name: "Aarav Sharma", role: "Team Lead", initials: "AS" },
    { name: "Priya Singh", role: "Backend Developer", initials: "PS" },
    { name: "Rohan Mehta", role: "Frontend Developer", initials: "RM" },
    { name: "Ananya Jain", role: "Data Analyst", initials: "AJ" },
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
  const { getToken } = useAuth();
  const [project] = useState(initialProject);
  const [assignedTeam, setAssignedTeam] = useState(null);

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

  // Modals state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  // File Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Team Formation Form State
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("BIT Mesra");
  const [dept, setDept] = useState("Computer Science");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [solutionTitle, setSolutionTitle] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [docFile, setDocFile] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [submittingTeam, setSubmittingTeam] = useState(false);
  const [members, setMembers] = useState([
    { name: "", email: "", department: "Computer Science", role: "Developer" },
  ]);

  useEffect(() => {
    // Load assigned team from localStorage or DB
    const saved = localStorage.getItem(`team_sub_${project.challengeId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAssignedTeam(parsed);
      } catch (e) {}
    }

    getTeams(project.challengeId)
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setAssignedTeam(res.data[0]);
          localStorage.setItem(`team_sub_${project.challengeId}`, JSON.stringify(res.data[0]));
        }
      })
      .catch(() => {});
  }, [project.challengeId]);

  const addMember = () => {
    setMembers([
      ...members,
      { name: "", email: "", department: "Computer Science", role: "Researcher" },
    ]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result;
        const res = await uploadUniversityMedia(base64, file.name, "samadhan/teams");
        if (res?.data?.url) {
          setDocFile({ fileName: file.name, url: res.data.url });
        } else {
          setDocFile({ fileName: file.name, url: base64 });
        }
      } catch (err) {
        setDocFile({ fileName: file.name, url: "#" });
      } finally {
        setUploadingDoc(false);
      }
    };
    reader.readAsDataURL(file);
  };

  async function handleTeamSubmit(e) {
    e.preventDefault();
    if (!teamName.trim() || !collegeName.trim() || !leaderName.trim() || !leaderEmail.trim()) {
      alert("Please fill in Team Name, College Name, Leader Name, and Email.");
      return;
    }

    setSubmittingTeam(true);

    const payload = {
      teamName: teamName.trim(),
      problemId: project.challengeId,
      challengeTitle: project.title,
      collegeName: collegeName.trim(),
      department: dept.trim(),
      teamLeader: {
        name: leaderName.trim(),
        email: leaderEmail.trim(),
        phone: leaderPhone.trim(),
        college: collegeName.trim(),
        department: dept.trim(),
      },
      teamMembers: members.filter((m) => m.name.trim() && m.email.trim()),
      proposedSolution: {
        title: solutionTitle.trim() || project.title,
        description: proposalText.trim() || "Proposed solution for project.",
        pptUrl: docFile?.url || "",
        docUrl: docFile?.url || "",
        fileName: docFile?.fileName || "Solution_PPT.pdf",
      },
      status: "UNDER_REVIEW",
      submittedAt: new Date().toISOString(),
    };

    try {
      const token = await getToken();
      const res = await registerTeam(payload, token || undefined);
      const data = res?.data || payload;
      setAssignedTeam(data);
      localStorage.setItem(`team_sub_${project.challengeId}`, JSON.stringify(data));
    } catch (err) {
      setAssignedTeam(payload);
      localStorage.setItem(`team_sub_${project.challengeId}`, JSON.stringify(payload));
    } finally {
      setSubmittingTeam(false);
      setShowTeamModal(false);
    }
  }

  async function handleUploadSubmit(e) {
    e.preventDefault();
    const fileName = uploadFile ? uploadFile.name : "backend_infra.docx";
    setUploading(true);

    let base64Data = "";
    if (uploadFile) {
      base64Data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(uploadFile);
      });
    }

    try {
      const res = await uploadProjectFileCloudinary(project.id, base64Data, fileName);
      const data = res?.data || {};
      setUploadedFileName(fileName);
      setCloudinaryPublicId(data.publicId || "");
      setUploadSuccess(true);
      setShowUploadModal(false);
      setUpdates([
        {
          text: `Final Submission file "${fileName}" uploaded to Cloudinary successfully.`,
          date: new Date().toLocaleDateString("en-IN"),
        },
        ...updates,
      ]);
    } catch (err) {
      setUploadedFileName(fileName);
      setUploadSuccess(true);
      setShowUploadModal(false);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteSubmission() {
    if (confirm(`Are you sure you want to delete submission file "${uploadedFileName}"?`)) {
      try {
        if (cloudinaryPublicId) {
          await deleteProjectFileCloudinary(cloudinaryPublicId, project.id);
        }
      } catch (err) {}
      setUploadSuccess(false);
      setUploadedFileName("");
      setCloudinaryPublicId("");
      setUploadFile(null);
    }
  }

  function addUpdate(e) {
    e.preventDefault();
    if (!update.trim()) return;
    setUpdates([
      {
        text: update,
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...updates,
    ]);
    setUpdate("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 font-sans">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#401AD9] font-black text-white shadow-md shadow-[#401AD9]/20">
                S
              </div>
              <div>
                <p className="text-sm font-black">Samadhan</p>
                <p className="text-xs text-slate-400">University Portal</p>
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
          <Link href="/university/projects" className="hover:text-blue-600">
            Projects
          </Link>
          <span>/</span>
          <span className="text-slate-600">{project.id}</span>
        </div>

        {/* HERO */}
        <section className="mt-6 rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300">
                  {project.status}
                </span>
                <span className="text-xs font-bold text-slate-500">{project.id}</span>
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                {project.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-5 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  {project.department}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Team: {assignedTeam ? assignedTeam.teamName : project.team}
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
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            {/* MILESTONES */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-black">Project Milestones</h2>
                  <p className="text-xs text-slate-400">Track important project stages.</p>
                </div>
              </div>

              <div className="mt-7 space-y-6">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.title} className="relative flex gap-4">
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
                        <h3 className="text-sm font-black">{milestone.title}</h3>
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
                  <h2 className="font-black">Project Updates</h2>
                  <p className="text-xs text-slate-400">Share progress with the department.</p>
                </div>
              </div>

              <form onSubmit={addUpdate} className="mt-6">
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
                    <Send className="h-3.5 w-3.5" /> Post Update
                  </button>
                </div>
              </form>

              <div className="mt-6 space-y-4">
                {updates.map((item, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                    <p className="mt-2 text-[10px] font-bold text-slate-400">{item.date}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">
            {/* PROJECT TEAM CARD WITH ASSIGN OPTION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-black text-slate-900">Project Team</h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {assignedTeam ? `${assignedTeam.teamName}` : `${project.members.length} default members`}
                  </p>
                </div>
                <Users className="h-5 w-5 text-slate-400" />
              </div>

              {/* IF TEAM IS ASSIGNED */}
              {assignedTeam ? (
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#401AD9] px-2 py-0.5 text-[9px] font-black text-white">
                        ASSIGNED TEAM
                      </span>
                      <button
                        onClick={() => setShowTeamModal(true)}
                        className="text-[10px] font-bold text-[#401AD9] hover:underline"
                      >
                        Edit / Re-assign
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-black text-slate-900">{assignedTeam.teamName}</p>
                    <p className="text-[11px] text-slate-500">{assignedTeam.collegeName}</p>
                  </div>

                  {/* Leader */}
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Team Leader</p>
                    <p className="mt-1 text-xs font-black text-slate-900">{assignedTeam.teamLeader?.name}</p>
                    <p className="text-[11px] text-slate-500">{assignedTeam.teamLeader?.email}</p>
                  </div>

                  {/* Members */}
                  {assignedTeam.teamMembers && assignedTeam.teamMembers.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Roster ({assignedTeam.teamMembers.length})</p>
                      {assignedTeam.teamMembers.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{m.name}</p>
                            <p className="text-[10px] text-slate-400">{m.email}</p>
                          </div>
                          <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-700">
                            {m.role || "Member"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Solution PPT Link if present */}
                  {assignedTeam.proposedSolution?.pptUrl || assignedTeam.proposedSolution?.docUrl ? (
                    <a
                      href={assignedTeam.proposedSolution.pptUrl || assignedTeam.proposedSolution.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white py-2 text-xs font-bold text-[#401AD9] hover:bg-indigo-50"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Solution PPT / Document
                    </a>
                  ) : null}
                </div>
              ) : (
                /* IF NO TEAM IS ASSIGNED -> SHOW ASSIGN TEAM OPTION */
                <div className="mt-5 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-[#401AD9]">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-800">No Team Assigned Yet</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Form or assign a student/research team to lead this project.
                  </p>
                  <button
                    onClick={() => setShowTeamModal(true)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#401AD9] py-2.5 text-xs font-black text-white shadow-md transition hover:bg-[#3413B8]"
                  >
                    <Plus className="h-4 w-4" />
                    Assign Team / Form Team
                  </button>
                </div>
              )}
            </section>

            {/* PROJECT INFO */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-black">Project Information</h2>
              <div className="mt-5 space-y-5">
                <Info icon={Building2} label="Department" value={project.department} />
                <Info icon={CalendarDays} label="Started" value={project.started} />
                <Info icon={Clock3} label="Deadline" value={project.deadline} />
                <Info icon={FileText} label="Challenge" value={project.challengeId} />
              </div>
            </section>

            {/* FINAL SUBMISSION */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="mt-4 font-black text-blue-950">Final Submission</h2>
              <p className="mt-2 text-xs leading-5 text-blue-800">
                Upload your final project files when the solution is ready for department evaluation.
              </p>

              {uploadSuccess ? (
                <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold">
                        ✓
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-slate-900">{uploadedFileName}</p>
                        <p className="text-[10px] font-bold text-emerald-600">Uploaded & Submitted</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDeleteSubmission}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="Delete current submission to re-upload"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-black text-white hover:bg-blue-500 shadow-md transition"
                >
                  Upload Submission
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </section>
          </aside>
        </div>
      </div>

      {/* TEAM FORMATION MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 sm:p-6 backdrop-blur-sm">
          <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95">
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
              <div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-[#401AD9]">
                  TEAM ASSIGNMENT
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                  Assign / Form Project Team
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Form student roster, specify leader, and upload solution presentation for {project.title}.
                </p>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500 hover:bg-slate-200"
              >
                ×
              </button>
            </div>

            {/* SCROLLABLE FORM BODY */}
            <form onSubmit={handleTeamSubmit} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
                {/* SECTION 1 */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    1. Team & Institution Info
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Team Name *</label>
                      <input
                        required
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. SafeRoute AI Team"
                        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700">College / University *</label>
                      <input
                        required
                        type="text"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. BIT Mesra"
                        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="space-y-4 border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    2. Team Leader Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Leader Name *</label>
                      <input
                        required
                        type="text"
                        value={leaderName}
                        onChange={(e) => setLeaderName(e.target.value)}
                        placeholder="Leader Name"
                        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Leader Email *</label>
                      <input
                        required
                        type="email"
                        value={leaderEmail}
                        onChange={(e) => setLeaderEmail(e.target.value)}
                        placeholder="leader@university.edu"
                        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Phone</label>
                      <input
                        type="text"
                        value={leaderPhone}
                        onChange={(e) => setLeaderPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="space-y-4 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      3. Team Members ({members.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addMember}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#401AD9] hover:underline"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Member
                    </button>
                  </div>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {members.map((mem, idx) => (
                      <div key={idx} className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                        <input
                          type="text"
                          placeholder="Member Name"
                          value={mem.name}
                          onChange={(e) => updateMember(idx, "name", e.target.value)}
                          className="h-9 flex-1 min-w-[120px] rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Member Email"
                          value={mem.email}
                          onChange={(e) => updateMember(idx, "email", e.target.value)}
                          className="h-9 flex-1 min-w-[140px] rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={mem.role}
                          onChange={(e) => updateMember(idx, "role", e.target.value)}
                          className="h-9 w-28 rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none"
                        />
                        {members.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(idx)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 4 */}
                <div className="space-y-4 border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    4. Solution Presentation / PPT Upload
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Solution Title</label>
                    <input
                      type="text"
                      value={solutionTitle}
                      onChange={(e) => setSolutionTitle(e.target.value)}
                      placeholder="Solution Title"
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Upload PPT / Proposal PDF</label>
                    <div className="mt-2 flex items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 p-6 text-center hover:border-[#401AD9]">
                      <input
                        type="file"
                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                        onChange={handleDocUpload}
                        className="hidden"
                        id="team-ppt-upload"
                      />
                      <label htmlFor="team-ppt-upload" className="cursor-pointer">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#401AD9] text-white">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <p className="mt-2 text-xs font-bold text-slate-800">
                          {uploadingDoc ? "Uploading..." : docFile ? docFile.fileName : "Click to select PPT or PDF Document"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingTeam || uploadingDoc}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#401AD9] py-3 text-xs font-bold text-white shadow-md hover:bg-[#3413B8] disabled:opacity-50"
                >
                  {submittingTeam ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Assigning Team...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Assign Team & Solution
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD SUBMISSION MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">Upload Final Solution</h3>
                  <p className="text-xs text-slate-400">Attach prototype source, report or demo zip</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-700">Project / Challenge</label>
                <input
                  type="text"
                  readOnly
                  value={`${project.title} (${project.challengeId})`}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Select Solution File (.zip, .pdf, .docx, .mp4)</label>
                <label className="relative mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center hover:border-blue-500 cursor-pointer transition">
                  <Upload className="h-8 w-8 text-blue-500" />
                  <p className="mt-2 text-xs font-bold text-slate-700">
                    {uploadFile ? uploadFile.name : "Click to choose file or drag & drop"}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">ZIP, PDF, DOCX up to 50MB</p>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="relative z-10 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                  }}
                  className="rounded-xl px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black text-white hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer shadow-md"
                >
                  {uploading ? "Uploading..." : "Submit File"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div>
        <p className="text-[10px] font-semibold text-slate-400">{label}</p>
        <p className="mt-1 text-xs font-black text-slate-700">{value}</p>
      </div>
    </div>
  );
}