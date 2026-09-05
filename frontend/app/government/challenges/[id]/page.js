"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { getGovernmentChallenges, updateGovernmentChallengeStatus, assignChallengeToDepartment } from "@/services/government.service";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  MessageSquare,
  User,
  X,
  XCircle,
  HelpCircle,
  UserCheck,
} from "lucide-react";

const defaultChallenge = {
  id: "SAM-1024",
  title: "Broken street lights in residential area",
  description:
    "Several street lights have stopped working in the residential area near the main market. The issue is creating safety concerns for citizens during the evening and night.",
  category: "Infrastructure",
  submittedBy: "Rahul Sharma",
  submittedDate: "28 August 2026",
  location: "Main Market Road, Sector 4",
  status: "UNDER_REVIEW",
  priority: "HIGH",
  department: "Public Works",
  images: [
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  ],
};

const timeline = [
  {
    title: "Challenge submitted",
    description: "Citizen submitted the civic issue.",
    date: "28 Aug 2026 · 10:42 AM",
    completed: true,
  },
  {
    title: "Under government review",
    description: "The challenge is currently being evaluated.",
    date: "28 Aug 2026 · 11:15 AM",
    completed: true,
  },
  {
    title: "Department assignment",
    description: "Assign the challenge to the responsible department.",
    date: "Pending",
    completed: false,
  },
  {
    title: "Project execution",
    description: "Department works on the approved civic project.",
    date: "Pending",
    completed: false,
  },
  {
    title: "Resolution",
    description: "Issue is resolved and verified.",
    date: "Pending",
    completed: false,
  },
];

const departments = [
  "Public Works",
  "Municipal Services",
  "Electrical Department",
  "Sanitation",
  "Water Department",
];

export default function GovernmentChallengeDetails() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [challenge, setChallenge] = useState(defaultChallenge);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getToken().then((token) => getGovernmentChallenges(token || undefined)).then((res) => {
      const localProblems = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]")
        : [];

      const allItems = [...localProblems, ...(res?.data || [])];
      const item = allItems.find((value) => String(value._id || value.id) === String(id));
      const localSavedDept = typeof window !== "undefined" ? localStorage.getItem(`assigned_dept_${id}`) : null;

      if (item) {
        const fetchedDepartment = localSavedDept || item.targetDepartment || item.assignedDepartmentId || item.department || "Unassigned";
        const fetchedStatus = (item.status === "OPEN" || item.status === "Pending" ? "SUBMITTED" : item.status) || (fetchedDepartment !== "Unassigned" ? "ASSIGNED" : "SUBMITTED");
        setChallenge((prev) => ({
          ...prev,
          ...item,
          id: item._id || item.id,
          department: fetchedDepartment,
          targetDepartment: fetchedDepartment,
          status: fetchedStatus,
          submittedDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : (item.date || prev.submittedDate),
          decisionReason: item.decisionReason || "",
          images: item.images && item.images.length > 0 ? item.images : prev.images,
        }));
        setCurrentStatus(fetchedStatus);
        if (fetchedDepartment && fetchedDepartment !== "Unassigned") {
          setSelectedDepartment(fetchedDepartment);
        }
      } else if (localSavedDept) {
        setSelectedDepartment(localSavedDept);
        setChallenge((prev) => ({ ...prev, department: localSavedDept, targetDepartment: localSavedDept, status: "ASSIGNED" }));
        setCurrentStatus("ASSIGNED");
      }
    }).catch((error) => setMessage(error.message)).finally(() => setLoading(false));
  }, [id, getToken]);

  const [message, setMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState(
    challenge.status
  );

  const [selectedDepartment, setSelectedDepartment] =
    useState(challenge.department);

  const [note, setNote] = useState("");
  const [decisionReason, setDecisionReason] = useState("");

  const [clarificationRequests, setClarificationRequests] = useState([]);

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("samadhan_citizen_inbox_requests") || "[]")
        : [];

      const filtered = saved.filter(
        (req) => String(req.problemId).toLowerCase() === String(id || challenge.id).toLowerCase() ||
                 String(req.problemTitle).toLowerCase() === String(challenge.title).toLowerCase()
      );
      setClarificationRequests(filtered.length > 0 ? filtered : saved);
    } catch (e) {
      console.warn("Could not load clarification requests:", e);
    }
  }, [id, challenge.id, challenge.title]);

  const [notes, setNotes] = useState([
    {
      author: "Government Officer",
      text: "Challenge received and currently under review.",
      date: "28 Aug 2026 · 11:15 AM",
    },
  ]);

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  const [showInfoModal, setShowInfoModal] =
    useState(false);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  async function handleStatusChange(status, reason = "") {
    try {
      const token = await getToken();
      const res = await updateGovernmentChallengeStatus(id || challenge.id, status, reason, token || undefined);
      setChallenge((value) => ({ ...value, ...res.data, targetDepartment: res.data.targetDepartment || value.targetDepartment }));
      setCurrentStatus(status);
      setMessage(status === "ACCEPTED" ? "Challenge accepted successfully." : "Challenge updated successfully.");
    } catch (error) { setMessage(error.message || "Could not update challenge."); return; }
    setTimeout(() => setMessage(""), 3000);
  }

  function addNote() {
    if (!note.trim()) return;

    setNotes([
      ...notes,
      {
        author: "Government Officer",
        text: note,
        date: "Just now",
      },
    ]);

    setNote("");
  }

  async function assignDepartment() {
    try {
      const token = await getToken();
      await assignChallengeToDepartment({ challengeId: id || challenge.id, departmentId: selectedDepartment, departmentName: selectedDepartment }, token || undefined);
    } catch (error) { setMessage(error.message || "Could not assign department."); return; }
    setShowAssignModal(false);

    if (typeof window !== "undefined") {
      localStorage.setItem(`assigned_dept_${id || challenge.id}`, selectedDepartment);
    }

    setCurrentStatus("ASSIGNED");
    setChallenge((prev) => ({
      ...prev,
      department: selectedDepartment,
      targetDepartment: selectedDepartment,
      status: "ASSIGNED",
    }));
    setSelectedDepartment(selectedDepartment);
    setChallenge((prev) => ({ ...prev, department: selectedDepartment, targetDepartment: selectedDepartment }));

    setMessage(
      `Challenge assigned to ${selectedDepartment}.`
    );

    setTimeout(() => setMessage(""), 3000);
  }

  // Dynamic timeline progression calculation based on strict sequential lifecycle
  const normalizedStatus = String(currentStatus || challenge.status || "").trim().toUpperCase();
  const assignedDept = challenge.department || challenge.targetDepartment || selectedDepartment;
  const hasDepartment = assignedDept && assignedDept !== "Unassigned" && assignedDept !== "Unassigned.";

  const isAssigned = hasDepartment && (normalizedStatus === "ASSIGNED" || normalizedStatus === "IN_PROGRESS" || normalizedStatus === "IN PROGRESS" || normalizedStatus === "IN PROGRESS" || normalizedStatus === "RESOLVED");
  const isExecuting = isAssigned && (normalizedStatus === "IN_PROGRESS" || normalizedStatus === "IN PROGRESS" || normalizedStatus === "RESOLVED");
  const isResolved = normalizedStatus === "RESOLVED";

  const dynamicTimeline = [
    {
      title: "Challenge submitted",
      description: "Citizen submitted the civic issue.",
      date: challenge.submittedDate || "28 Aug 2026",
      completed: true,
    },
    {
      title: "Under government review",
      description: "The challenge is currently being evaluated.",
      date: challenge.submittedDate || "28 Aug 2026",
      completed: true,
    },
    {
      title: "Department assignment",
      description: isAssigned ? `Assigned to ${assignedDept}.` : "Assign the challenge to the responsible department.",
      date: isAssigned ? (challenge.submittedDate || new Date().toLocaleDateString("en-IN")) : "Pending",
      completed: isAssigned,
    },
    {
      title: "Project execution",
      description: isExecuting ? "Department works on the approved civic project." : "Ground project execution pending.",
      date: isExecuting ? new Date().toLocaleDateString("en-IN") : "Pending",
      completed: isExecuting,
    },
    {
      title: "Resolution",
      description: isResolved ? "Issue is resolved and verified." : "Awaiting final resolution.",
      date: isResolved ? new Date().toLocaleDateString("en-IN") : "Pending",
      completed: isResolved,
    },
  ];

  function sendInfoRequestToCitizen() {
    if (!decisionReason.trim()) {
      alert("Please enter the question or information you need from the citizen.");
      return;
    }

    const newReq = {
      id: `req-${Date.now()}`,
      problemId: challenge.id || id,
      problemTitle: challenge.title || "Civic Challenge",
      category: challenge.category || "General",
      district: challenge.district || "General",
      locality: challenge.locality || (typeof challenge.location === "string" ? challenge.location : "General Locality"),
      question: decisionReason.trim(),
      requestedBy: `${challenge.department && challenge.department !== "Unassigned" ? challenge.department : "Government Administration"} - Officer`,
      requestedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + " · " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      reply: "",
      repliedAt: null,
      status: "PENDING",
    };

    try {
      const existing = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("samadhan_citizen_inbox_requests") || "[]")
        : [];
      const filtered = existing.filter((item) => String(item.id) !== String(newReq.id));
      localStorage.setItem("samadhan_citizen_inbox_requests", JSON.stringify([newReq, ...filtered]));
    } catch (e) {
      console.warn("Could not save to citizen inbox localStorage:", e);
    }

    setShowInfoModal(false);
    handleStatusChange("NEEDS_INFO", decisionReason.trim());
    setMessage("Clarification request sent to Citizen Inbox.");
    setDecisionReason("");
  }

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

        {/* Success message */}

        {message && (
          <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">

            <CheckCircle2 className="h-5 w-5" />

            {message}

          </div>
        )}

        {/* Heading */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {challenge.id}
              </span>

              <StatusBadge status={currentStatus} />

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">
                HIGH PRIORITY
              </span>

            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight">
              {challenge.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              Review this civic challenge and decide the appropriate
              government action.
            </p>

          </div>

          {currentStatus !== "ACCEPTED" && currentStatus !== "In Progress" && currentStatus !== "REJECTED" && currentStatus !== "Rejected" && (
            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => handleStatusChange("ACCEPTED")}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-md"
              >
                <CheckCircle2 className="h-4 w-4" />
                Accept
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 shadow-sm"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>

            </div>
          )}

        </div>

        {/* Main layout */}

        <div className="mt-8 grid gap-7 lg:grid-cols-3">

          {/* Left */}

          <div className="space-y-7 lg:col-span-2">

            {/* Description */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>

                <div>
                  <h2 className="font-black">
                    Challenge Details
                  </h2>

                  <p className="text-xs text-slate-400">
                    Information submitted by the citizen
                  </p>
                </div>

              </div>

              <p className="mt-6 text-sm leading-7 text-slate-600">
                {challenge.description}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <InfoItem
                  label="Category"
                  value={challenge.category}
                />

                <InfoItem
                  label="Submitted"
                  value={challenge.submittedDate}
                />

                <InfoItem
                  label="Location"
                  value={
                    typeof challenge.location === "object" && challenge.location !== null
                      ? (challenge.locality || challenge.district || `${challenge.location.latitude || 0}, ${challenge.location.longitude || 0}`)
                      : String(challenge.location || challenge.locality || challenge.district || "General Locality")
                  }
                  icon={MapPin}
                />

                <InfoItem
                  label="Submitted by"
                  value="Anonymous Citizen"
                  icon={User}
                />

              </div>

            </section>

            {/* Image */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Evidence
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Images attached to this challenge
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl bg-slate-100">

                <img
                  src={
                    challenge.images && challenge.images[0] && typeof challenge.images[0] === "string"
                      ? (challenge.images[0].startsWith("/uploads/") ? `http://localhost:5000${challenge.images[0]}` : challenge.images[0])
                      : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt="Challenge evidence"
                  className="h-72 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80";
                  }}
                />

              </div>

            </section>

            {/* Timeline */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Challenge Timeline
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Track how this challenge moves through Samadhan.
              </p>

              <div className="mt-7">

                {dynamicTimeline.map((item, index) => (

                  <div
                    key={item.title}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >

                    {index !== dynamicTimeline.length - 1 && (
                      <div
                        className={`absolute left-4 top-9 h-full w-px ${
                          item.completed
                            ? "bg-blue-200"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        item.completed
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Clock3 className="h-4 w-4" />
                      )}
                    </div>

                    <div>

                      <p
                        className={`text-sm font-bold ${
                          item.completed
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.description}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        {item.date}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* Notes */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <MessageSquare className="h-5 w-5 text-slate-500" />

                <div>
                  <h2 className="font-black">
                    Internal Notes
                  </h2>

                  <p className="text-xs text-slate-400">
                    Notes for government and department coordination.
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4">

                {notes.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-slate-50 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <p className="text-xs font-black">
                        {item.author}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.date}
                      </p>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-5 flex gap-3">

                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addNote();
                  }}
                  placeholder="Add an internal note..."
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

                <button
                  onClick={addNote}
                  className="rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Add Note
                </button>

              </div>

            </section>

            {/* Citizen Clarifications & Replies Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900">
                      Citizen Clarifications & Replies
                    </h2>
                    <p className="text-xs text-slate-400">
                      Questions sent to citizen and their submitted answers
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInfoModal(true)}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition"
                >
                  + Request Info
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {clarificationRequests.length > 0 ? (
                  clarificationRequests.map((req) => (
                    <div key={req.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
                          {req.requestedBy || "Government Officer"}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${req.status === "REPLIED" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                          {req.status === "REPLIED" ? "✓ Citizen Replied" : "⌛ Awaiting Citizen Reply"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        ❓ Question: "{req.question}"
                      </p>

                      {req.reply ? (
                        <div className="mt-3.5 rounded-xl bg-emerald-50/90 p-4 border border-emerald-200/80 shadow-2xs">
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="h-4 w-4 text-emerald-600" /> Citizen Response:
                            </span>
                            <span className="text-[10px] font-normal text-emerald-700">{req.repliedAt}</span>
                          </div>
                          <p className="mt-2 text-sm text-emerald-950 font-bold leading-relaxed">
                            "{req.reply}"
                          </p>
                        </div>
                      ) : (
                        <p className="mt-2 text-xs font-medium text-amber-700 italic">
                          No reply submitted by citizen yet.
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                    No clarification requests sent for this challenge yet. Click "+ Request Info" above to ask the citizen a question.
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* Right sidebar */}

          <aside className="space-y-5">

            {/* Action card */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Government Actions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Process this challenge
              </p>

              <div className="mt-6 space-y-3">

                <button
                  onClick={() => setShowAssignModal(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Building2 className="h-4 w-4 text-purple-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Assign Department
                      </p>

                      <p className="text-xs text-slate-400">
                        Send to responsible department
                      </p>
                    </div>

                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-300" />

                </button>

                <button
                  onClick={() => setShowInfoModal(true)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                      <MessageSquare className="h-4 w-4 text-amber-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Request Information
                      </p>

                      <p className="text-xs text-slate-400">
                        Ask citizen for more details
                      </p>
                    </div>

                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-300" />

                </button>

              </div>

            </section>

            {/* Current assignment */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Assignment
              </h2>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">

                <p className="text-xs text-slate-400">
                  Assigned department
                </p>

                <p className="mt-1 font-bold">
                  {selectedDepartment}
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  Current status
                </p>

                <div className="mt-2">
                  <StatusBadge status={currentStatus} />
                </div>

              </div>

            </section>

            {/* Citizen */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Citizen Submitter
              </h2>

              <div className="mt-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-700 border border-indigo-100">
                  {challenge.isAnonymous || challenge.submittedBy === "Anonymous Citizen" ? "AC" : "CU"}
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {challenge.isAnonymous || challenge.submittedBy === "Anonymous Citizen" ? "Anonymous Citizen" : (challenge.submittedBy || "Citizen User")}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {challenge.isAnonymous || challenge.submittedBy === "Anonymous Citizen" ? "Identity Protected (Anonymous)" : "Verified Citizen"}
                  </p>
                </div>

              </div>

            </section>

          </aside>

        </div>

      </div>

      {/* Reject modal */}

      {showRejectModal && (
        <Modal
          title="Reject Challenge"
          onClose={() => setShowRejectModal(false)}
        >

          <p className="text-sm leading-6 text-slate-500">
            Are you sure you want to reject this challenge?
            You can add a reason before confirming.
          </p>

          <textarea
            placeholder="Reason for rejection..."
            value={decisionReason}
            onChange={(event) => setDecisionReason(event.target.value)}
            className="mt-5 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-red-400 focus:bg-white"
          />

          <div className="mt-5 flex justify-end gap-3">

            <button
              onClick={() => setShowRejectModal(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setShowRejectModal(false);
                handleStatusChange("REJECTED");
              }}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white"
            >
              Reject Challenge
            </button>

          </div>

        </Modal>
      )}

      {/* Information modal */}

      {showInfoModal && (
        <Modal
          title="Request More Information"
          onClose={() => setShowInfoModal(false)}
        >

          <p className="text-sm leading-6 text-slate-500">
            Ask the citizen to provide additional information
            before the government can process this challenge.
          </p>

          <textarea
            placeholder="What information do you need?"
            value={decisionReason}
            onChange={(event) => setDecisionReason(event.target.value)}
            className="mt-5 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />

          <div className="mt-5 flex justify-end gap-3">

            <button
              onClick={() => setShowInfoModal(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold"
            >
              Cancel
            </button>

            <button
              onClick={sendInfoRequestToCitizen}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"
            >
              Send Request
            </button>

          </div>

        </Modal>
      )}

      {/* Department assignment modal */}

      {showAssignModal && (
        <Modal
          title="Assign Department"
          onClose={() => setShowAssignModal(false)}
        >

          <p className="text-sm leading-6 text-slate-500">
            Select the government department responsible for
            handling this challenge.
          </p>

          <div className="mt-5 space-y-2">

            {departments.map((department) => (

              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition ${
                  selectedDepartment === department
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >

                {department}

                {selectedDepartment === department && (
                  <CheckCircle2 className="h-4 w-4" />
                )}

              </button>

            ))}

          </div>

          <div className="mt-5 flex justify-end gap-3">

            <button
              onClick={() => setShowAssignModal(false)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold"
            >
              Cancel
            </button>

            <button
              onClick={assignDepartment}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white"
            >
              Assign Department
            </button>

          </div>

        </Modal>
      )}

    </main>
  );
}

function StatusBadge({ status }) {

  const config = {
    SUBMITTED: {
      label: "Submitted",
      className: "bg-slate-100 text-slate-600",
    },
    UNDER_REVIEW: {
      label: "Under Review",
      className: "bg-amber-50 text-amber-700",
    },
    ACCEPTED: {
      label: "Accepted",
      className: "bg-blue-50 text-blue-700",
    },
    ASSIGNED: {
      label: "Assigned",
      className: "bg-purple-50 text-purple-700",
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-50 text-red-700",
    },
    NEEDS_INFO: {
      label: "Needs Information",
      className: "bg-orange-50 text-orange-700",
    },
  };

  const item = config[status] || config.SUBMITTED;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function InfoItem({
  label,
  value,
  icon: Icon,
  href,
}) {
  const isLocation = label === "Location" || Boolean(href);
  const mapsUrl = href || (isLocation ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(value || ""))}` : null);

  const cardContent = (
    <div className={`rounded-xl bg-slate-50 p-4 transition ${mapsUrl ? "hover:bg-emerald-50 hover:border-emerald-200 border border-transparent cursor-pointer group shadow-xs" : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400">
          {label}
        </p>
        {mapsUrl && (
          <span className="text-[10px] font-bold text-emerald-600 group-hover:underline">
            Google Maps ↗
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2">
        {Icon && (
          <Icon className={`h-3.5 w-3.5 ${mapsUrl ? "text-emerald-600" : "text-slate-400"}`} />
        )}

        <p className={`text-sm font-bold ${mapsUrl ? "text-slate-900 group-hover:text-emerald-700" : "text-slate-700"}`}>
          {value}
        </p>
      </div>
    </div>
  );

  if (mapsUrl) {
    return (
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

function Modal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-black">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-950"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}
