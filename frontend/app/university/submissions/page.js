"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  Download,
  CalendarDays,
  Building2,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { getUniversityProposals, submitUniversityProposal } from "@/services/university.service";

const initialSubmissions = [
  {
    id: "SUB-021",
    project: "Road Safety Analytics",
    projectId: "PRJ-021",
    department: "Traffic Department",
    file: "SafeRoute_Final_Report.pdf",
    size: "2.8 MB",
    submitted: "29 Aug 2026",
    status: "UNDER REVIEW",
  },
  {
    id: "SUB-018",
    project: "Community Water Monitoring",
    projectId: "PRJ-018",
    department: "Water Department",
    file: "AquaTech_Prototype.zip",
    size: "8.4 MB",
    submitted: "28 Aug 2026",
    status: "APPROVED",
  },
];

export default function UniversitySubmissionsPage() {
  const { getToken } = useAuth();
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState("Road Safety Analytics");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    getToken()
      .then((token) => getUniversityProposals(token || undefined))
      .then((res) => {
        const list = res?.data || [];
        if (list.length > 0) {
          setSubmissions(
            list.map((item, idx) => ({
              id: `SUB-${String(idx + 22).padStart(3, "0")}`,
              project: item.projectTitle || "Civic Research Proposal",
              projectId: item.challengeId || `PRJ-0${idx + 15}`,
              department: "Municipal Operations",
              file: `${(item.projectTitle || "Solution").replace(/\s+/g, "_")}_Proposal.pdf`,
              size: "3.4 MB",
              submitted: item.submittedAt ? new Date(item.submittedAt).toLocaleDateString("en-IN") : "Recently",
              status: item.status || "UNDER REVIEW",
            }))
          );
        }
      })
      .catch((err) => console.warn("Could not load submissions from backend:", err.message));
  }, [getToken]);

  function handleFile(e) {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  }

  async function submitProject(e) {
    e.preventDefault();

    if (!fileName) return;

    const newSubmission = {
      id: `SUB-${String(submissions.length + 22).padStart(3, "0")}`,
      project,
      projectId:
        project === "Road Safety Analytics"
          ? "PRJ-021"
          : "PRJ-018",
      department:
        project === "Road Safety Analytics"
          ? "Traffic Department"
          : "Water Department",
      file: fileName,
      size: "Pending",
      submitted: new Date().toLocaleDateString("en-IN"),
      status: "UNDER REVIEW",
    };

    try {
      const token = await getToken();
      await submitUniversityProposal(
        {
          universityName: "BIT Mesra (Birla Institute of Technology)",
          challengeId: newSubmission.projectId,
          projectTitle: project,
          proposalText: `Uploaded proposal document: ${fileName}`,
          teamLead: "BIT Mesra Research Team",
        },
        token || undefined
      );
      setSubmissions([newSubmission, ...submissions]);
    } catch (err) {
      console.warn("Submission stored locally:", err.message);
      setSubmissions([newSubmission, ...submissions]);
    }

    setFileName("");
    setShowModal(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
  <Image
    src="/logo.png"
    alt="Samadhan Logo"
    width={60}
    height={60}
    className="h-full w-full object-cover"
  />
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

        {/* TITLE */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              University Workspace
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Submissions
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Submit project documents and track the evaluation
              status of your university's solutions.
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800"
          >
            <Upload className="h-4 w-4" />
            New Submission
          </button>

        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <Stat
            icon={FileText}
            label="Total Submissions"
            value={submissions.length}
          />

          <Stat
            icon={Clock3}
            label="Under Review"
            value={
              submissions.filter(
                (s) => s.status === "UNDER REVIEW"
              ).length
            }
          />

          <Stat
            icon={CheckCircle2}
            label="Approved"
            value={
              submissions.filter(
                (s) => s.status === "APPROVED"
              ).length
            }
          />

        </div>

        {/* SUBMISSIONS */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <h2 className="font-black">
              Your Submissions
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Documents submitted for department evaluation.
            </p>

          </div>

          <div className="divide-y divide-slate-100">

            {submissions.map((submission) => (

              <div
                key={submission.id}
                className="p-6 transition hover:bg-slate-50"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                  {/* FILE */}

                  <div className="flex flex-1 items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-black">
                        {submission.file}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {submission.id} · {submission.size}
                      </p>

                    </div>

                  </div>

                  {/* PROJECT */}

                  <div className="lg:w-56">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Project
                    </p>

                    <p className="mt-1 text-xs font-black">
                      {submission.project}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {submission.projectId}
                    </p>

                  </div>

                  {/* DEPARTMENT */}

                  <div className="lg:w-48">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Department
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Building2 className="h-3 w-3 text-slate-400" />
                      {submission.department}
                    </p>

                  </div>

                  {/* DATE */}

                  <div className="lg:w-36">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Submitted
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <CalendarDays className="h-3 w-3 text-slate-400" />
                      {submission.submitted}
                    </p>

                  </div>

                  {/* STATUS */}

                  <Status status={submission.status} />

                  {/* ACTIONS */}

                  <div className="flex gap-2">

                    <button
                      className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 hover:bg-white"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>

                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-slate-700"
                    >
                      <Download className="h-4 w-4" />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Project Submission
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Submit Files
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Upload the latest project documents for evaluation.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-slate-300 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={submitProject}
              className="mt-7 space-y-5"
            >

              {/* PROJECT */}

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Project
                </label>

                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                >
                  <option>
                    Road Safety Analytics
                  </option>

                  <option>
                    Community Water Monitoring
                  </option>
                </select>

              </div>

              {/* FILE */}

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Project File
                </label>

                <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50">

                  <Upload className="h-8 w-8 text-slate-300" />

                  <p className="mt-3 text-sm font-bold text-slate-600">
                    {fileName || "Choose a project file"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF, ZIP, DOCX or PPTX
                  </p>

                  <input
                    type="file"
                    onChange={handleFile}
                    className="hidden"
                    accept=".pdf,.zip,.doc,.docx,.ppt,.pptx"
                  />

                </label>

              </div>

              {/* NOTICE */}

              <div className="rounded-xl bg-blue-50 p-4">

                <p className="text-xs leading-5 text-blue-800">
                  Once submitted, the department will review
                  your files and update the submission status.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-slate-950 py-3 text-sm font-black text-white hover:bg-slate-800"
                >
                  Submit
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

function Status({ status }) {
  if (status === "APPROVED") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        APPROVED
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black text-red-700">
        <XCircle className="h-3 w-3" />
        REJECTED
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black text-amber-700">
      <Clock3 className="h-3 w-3" />
      UNDER REVIEW
    </span>
  );
}

function Stat({
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