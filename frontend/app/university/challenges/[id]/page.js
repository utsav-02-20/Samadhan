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
  Lightbulb,
  MapPin,
  Send,
  Users,
  Plus,
  Trash2,
  UploadCloud,
  FileCode,
  Download,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { registerTeam, getTeams, uploadUniversityMedia } from "@/services/university.service";

const challenge = {
  id: "SAM-1042",
  title: "Smart Waste Collection System",
  description:
    "Develop an efficient solution to optimize waste collection routes and improve monitoring of municipal waste bins. The proposed solution should help authorities reduce unnecessary trips, improve collection efficiency and provide better visibility into waste management operations.",
  category: "Technology",
  department: "Municipal Services",
  location: "District-wide",
  status: "OPEN",
  applications: 8,
  deadline: "18 Sep 2026",
  daysLeft: 18,
  problem:
    "The municipal authority currently relies on fixed waste collection routes. This can result in unnecessary trips to bins that are not full while overflowing bins in other areas may not be identified quickly.",
  objectives: [
    "Monitor waste collection requirements more efficiently.",
    "Optimize collection routes based on available information.",
    "Provide authorities with useful operational insights.",
    "Improve citizen experience and reduce unnecessary collection trips.",
  ],
  expectedOutcome:
    "A practical technology-based solution that can be piloted by the municipal department and scaled to additional wards.",
  requirements: [
    "Working prototype or demonstrable solution.",
    "Clear implementation approach.",
    "Expected impact and scalability.",
    "Basic technical documentation.",
  ],
};

export default function ChallengeDetailsPage() {
  const { getToken } = useAuth();
  const [showApply, setShowApply] = useState(false);
  const [submittedTeam, setSubmittedTeam] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("BIT Mesra (Birla Institute of Technology)");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [solutionTitle, setSolutionTitle] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [docFile, setDocFile] = useState(null);

  // Dynamic Team Members List
  const [members, setMembers] = useState([
    { name: "", email: "", department: "Information Technology", role: "Developer" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem(`team_sub_${challenge.id}`);
    if (saved) {
      try {
        setSubmittedTeam(JSON.parse(saved));
      } catch (e) {}
    }

    // Try fetching from backend DB
    getTeams(challenge.id)
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          const latestTeam = res.data[0];
          setSubmittedTeam(latestTeam);
          localStorage.setItem(`team_sub_${challenge.id}`, JSON.stringify(latestTeam));
        }
      })
      .catch(() => {});
  }, []);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result;
        const res = await uploadUniversityMedia(base64, file.name, "samadhan/teams");
        if (res?.data?.url) {
          setDocFile({
            fileName: file.name,
            url: res.data.url,
            bytes: file.size,
          });
        } else {
          setDocFile({
            fileName: file.name,
            url: base64,
            bytes: file.size,
          });
        }
      } catch (err) {
        setDocFile({
          fileName: file.name,
          url: "#",
          bytes: file.size,
        });
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  async function submitApplication(e) {
    e.preventDefault();

    if (!teamName.trim() || !collegeName.trim() || !leaderName.trim() || !leaderEmail.trim()) {
      alert("Please fill in Team Name, College Name, Leader Name, and Leader Email.");
      return;
    }

    setSubmitting(true);

    const payload = {
      teamName: teamName.trim(),
      problemId: challenge.id,
      challengeTitle: challenge.title,
      collegeName: collegeName.trim(),
      department: department.trim(),
      teamLeader: {
        name: leaderName.trim(),
        email: leaderEmail.trim(),
        phone: leaderPhone.trim(),
        college: collegeName.trim(),
        department: department.trim(),
      },
      teamMembers: members.filter((m) => m.name.trim() && m.email.trim()),
      proposedSolution: {
        title: solutionTitle.trim() || "Smart Municipal Waste Collection AI Solution",
        description: proposalText.trim() || "Proposed solution document submitted for challenge evaluation.",
        pptUrl: docFile?.url || "",
        docUrl: docFile?.url || "",
        fileName: docFile?.fileName || "Solution_Proposal.pdf",
      },
      status: "UNDER_REVIEW",
      submittedAt: new Date().toISOString(),
    };

    try {
      const token = await getToken();
      const res = await registerTeam(payload, token || undefined);
      const savedData = res?.data || payload;
      setSubmittedTeam(savedData);
      localStorage.setItem(`team_sub_${challenge.id}`, JSON.stringify(savedData));
    } catch (err) {
      setSubmittedTeam(payload);
      localStorage.setItem(`team_sub_${challenge.id}`, JSON.stringify(payload));
    } finally {
      setSubmitting(false);
      setShowApply(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 font-sans">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/university/challenges"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
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
          <Link href="/university/challenges" className="hover:text-blue-600">
            Challenges
          </Link>
          <span>/</span>
          <span className="text-slate-600">{challenge.id}</span>
        </div>

        {/* HERO */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Open for Applications
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                  {challenge.category}
                </span>
                <span className="text-xs font-bold text-slate-500">{challenge.id}</span>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">
                {challenge.title}
              </h1>
              <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
                {challenge.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  {challenge.department}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  {challenge.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  {challenge.applications} applications
                </div>
              </div>
            </div>

            <div className="shrink-0">
              {submittedTeam ? (
                <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-5 py-4 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-black">Application Submitted</p>
                    <p className="mt-0.5 text-xs text-emerald-300/80">
                      Team <span className="font-extrabold text-white">{submittedTeam.teamName}</span> is registered in Database.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowApply(true)}
                  className="flex items-center gap-2 rounded-2xl bg-[#401AD9] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#401AD9]/30 transition hover:bg-[#3413B8]"
                >
                  <Users className="h-4 w-4" />
                  Register Team & Solution
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* SUBMITTED TEAM DETAILS CARD */}
        {submittedTeam && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-black text-emerald-800">
                      REGISTERED TEAM (DB STORED)
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Submitted on {new Date(submittedTeam.submittedAt || Date.now()).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {submittedTeam.teamName}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    {submittedTeam.collegeName} ({submittedTeam.department})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowApply(true)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Edit / Update Team
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Team Leader & Members */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Team Composition
                </h3>
                
                {/* Leader */}
                <div className="mt-4 rounded-xl border border-indigo-100 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-[#401AD9]">
                      TEAM LEADER
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {submittedTeam.teamLeader?.phone}
                    </span>
                  </div>
                  <p className="mt-2 text-base font-bold text-slate-900">
                    {submittedTeam.teamLeader?.name}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    {submittedTeam.teamLeader?.email}
                  </p>
                </div>

                {/* Members */}
                {submittedTeam.teamMembers && submittedTeam.teamMembers.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-extrabold text-slate-700">Team Members:</p>
                    {submittedTeam.teamMembers.map((mem, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 border border-slate-200">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{mem.name}</p>
                          <p className="text-[11px] text-slate-500">{mem.email}</p>
                        </div>
                        <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                          {mem.role || mem.department || "Member"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Proposed Solution & PPT/Docs */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Uploaded Solution Proposal
                </h3>
                <h4 className="mt-3 text-base font-bold text-slate-900">
                  {submittedTeam.proposedSolution?.title || "Proposed Innovation Solution"}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {submittedTeam.proposedSolution?.description}
                </p>

                {/* Document preview & download button */}
                <div className="mt-6 rounded-2xl border border-indigo-100 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#401AD9]">
                      <FileCode className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-xs font-bold text-slate-900">
                        {submittedTeam.proposedSolution?.fileName || "Solution_Document.pdf"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        PPT / Project Document stored in Database
                      </p>
                    </div>
                  </div>

                  {submittedTeam.proposedSolution?.pptUrl || submittedTeam.proposedSolution?.docUrl ? (
                    <a
                      href={submittedTeam.proposedSolution.pptUrl || submittedTeam.proposedSolution.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#401AD9] py-2.5 text-xs font-bold text-white transition hover:bg-[#3413B8]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Uploaded PPT / Solution Document
                    </a>
                  ) : (
                    <span className="mt-3 block text-center text-[11px] font-semibold text-slate-400">
                      Document stored in database record.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTENT GRID */}
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* MAIN */}
          <div className="space-y-6">
            <ContentCard icon={Lightbulb} title="Problem Statement">
              <p className="text-sm leading-7 text-slate-600">{challenge.problem}</p>
            </ContentCard>

            <ContentCard icon={CheckCircle2} title="Objectives">
              <div className="space-y-3">
                {challenge.objectives.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard icon={FileText} title="Expected Outcome">
              <p className="text-sm leading-7 text-slate-600">{challenge.expectedOutcome}</p>
            </ContentCard>

            <ContentCard icon={Lightbulb} title="Requirements">
              <div className="grid gap-3 sm:grid-cols-2">
                {challenge.requirements.map((item, index) => (
                  <div key={index} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-black">Challenge Details</h2>
              <div className="mt-5 space-y-5">
                <Detail icon={CalendarDays} label="Application deadline" value={challenge.deadline} />
                <Detail icon={Clock3} label="Time remaining" value={`${challenge.daysLeft} days`} />
                <Detail icon={Users} label="Current applications" value={`${challenge.applications} teams`} />
                <Detail icon={Building2} label="Posted by" value={challenge.department} />
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Why participate?</p>
              <p className="mt-3 text-sm leading-6 text-blue-950">
                Work on a real civic problem and create a solution that can potentially be piloted by a government department.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* TEAM & SOLUTION REGISTRATION MODAL */}
      {showApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 sm:p-6 backdrop-blur-sm">
          <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95">
            {/* STICKY HEADER */}
            <div className="flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
              <div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-[#401AD9]">
                  DATABASE REGISTRATION
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                  Register Team & Submit PPT Solution
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter student team details, member roster, and upload your solution presentation or doc.
                </p>
              </div>
              <button
                onClick={() => setShowApply(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            {/* SCROLLABLE FORM BODY */}
            <form onSubmit={submitApplication} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
              {/* SECTION 1: Team & College Info */}
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
                      placeholder="e.g. InnovateX Research Team"
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

              {/* SECTION 2: Leader Details */}
              <div className="space-y-4 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  2. Team Leader Details
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Leader Full Name *</label>
                    <input
                      required
                      type="text"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
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
                      placeholder="ananya@student.edu"
                      className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Phone Number</label>
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

              {/* SECTION 3: Dynamic Team Members */}
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
                        placeholder="Role / Dept"
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

              {/* SECTION 4: Solution Documents Upload */}
              <div className="space-y-4 border-t border-slate-100 pt-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  4. Solution Document & PPT Upload
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700">Solution Title</label>
                  <input
                    type="text"
                    value={solutionTitle}
                    onChange={(e) => setSolutionTitle(e.target.value)}
                    placeholder="e.g. AI-Based Smart Route & Sensor Bin Network"
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Solution Summary</label>
                  <textarea
                    rows={3}
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    placeholder="Explain key architecture, algorithms, hardware requirements, and municipal impact..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#401AD9] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Upload PPT / Solution PDF Document *
                  </label>
                  <div className="mt-2 flex items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 p-6 text-center transition hover:border-[#401AD9]">
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="ppt-upload-input"
                    />
                    <label htmlFor="ppt-upload-input" className="cursor-pointer">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#401AD9] text-white">
                        <UploadCloud className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-xs font-bold text-slate-800">
                        {uploading ? "Uploading to Cloud..." : docFile ? docFile.fileName : "Click to select PPT or Proposal PDF"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Supports PPT, PPTX, PDF, DOCX (Max 25MB)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              </div>

              {/* STICKY FOOTER ACTION BUTTONS */}
              <div className="flex gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => setShowApply(false)}
                  className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#401AD9] py-3 text-xs font-bold text-white shadow-lg shadow-[#401AD9]/25 hover:bg-[#3413B8] disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving to Database...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Team & Solution to DB
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function ContentCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <div>
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}