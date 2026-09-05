"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Inbox,
  Send,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Building2,
  RefreshCw,
  Search,
} from "lucide-react";

const INITIAL_REQUESTS = [
  {
    id: "req-101",
    problemId: "SAM-1024",
    problemTitle: "Broken street lights in residential area",
    category: "Electricity",
    district: "Bhopal",
    locality: "Main Market Road, Sector 4",
    question:
      "Please specify exact pole numbers near the market curve and if electricity supply is cut off for the whole lane.",
    requestedBy: "Public Works Department - Officer Sharma",
    requestedAt: "28 Aug 2026 · 11:30 AM",
    reply: "",
    repliedAt: null,
    status: "PENDING",
  },
  {
    id: "req-102",
    problemId: "SAM-1019",
    problemTitle: "Water leakage from main pipeline",
    category: "Water Supply",
    district: "Indore",
    locality: "Vijay Nagar, Block C",
    question:
      "Could you upload a clearer image of the water leak meter point or provide the nearest house landmark?",
    requestedBy: "Municipal Water Board - Inspector Varma",
    requestedAt: "26 Aug 2026 · 04:15 PM",
    reply:
      "The leakage is right in front of House #42 near the Community Park entrance gate.",
    repliedAt: "26 Aug 2026 · 06:00 PM",
    status: "REPLIED",
  },
];

export default function CitizenInboxPage() {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [replyText, setReplyText] = useState({});
  const [submittingId, setSubmittingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("samadhan_citizen_inbox_requests");
    let list = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const combined = [...parsed, ...INITIAL_REQUESTS];
        const unique = [];
        const seen = new Set();
        for (const item of combined) {
          const key = String(item.id || item.question).trim();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
          }
        }
        list = unique;
      } catch (e) {
        list = INITIAL_REQUESTS;
      }
    } else {
      list = INITIAL_REQUESTS;
      try {
        localStorage.setItem("samadhan_citizen_inbox_requests", JSON.stringify(INITIAL_REQUESTS));
      } catch (e) {}
    }
    setRequests(list);
  }, []);

  const saveRequests = (updated) => {
    setRequests(updated);
    localStorage.setItem("samadhan_citizen_inbox_requests", JSON.stringify(updated));
  };

  const handleReplyChange = (id, text) => {
    setReplyText((prev) => ({ ...prev, [id]: text }));
  };

  const submitReply = async (reqId) => {
    const text = replyText[reqId];
    if (!text || !text.trim()) return;

    setSubmittingId(reqId);

    await new Promise((res) => setTimeout(res, 600));

    const updated = requests.map((item) => {
      if (item.id === reqId) {
        return {
          ...item,
          reply: text.trim(),
          repliedAt: new Date().toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "REPLIED",
        };
      }
      return item;
    });

    saveRequests(updated);
    setSubmittingId(null);
    setToastMessage("Your answer has been sent to the government officer!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesTab = activeTab === "ALL" || req.status === activeTab;
    const matchesQuery =
      req.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.problemId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const repliedCount = requests.filter((r) => r.status === "REPLIED").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/citizen/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#401AD9] font-black text-white shadow-md shadow-[#401AD9]/20">
                S
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-slate-900">
                  Citizen Portal
                </h1>
                <p className="text-xs font-medium text-slate-500">
                  Samadhan Public Services
                </p>
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/citizen/dashboard"
              className="text-sm font-semibold text-slate-600 hover:text-[#401AD9]"
            >
              Dashboard
            </Link>
            <Link
              href="/citizen/reports"
              className="text-sm font-semibold text-slate-600 hover:text-[#401AD9]"
            >
              My Complaints
            </Link>
            <Link
              href="/citizen/inbox"
              className="relative text-sm font-bold text-[#401AD9]"
            >
              Inbox
              {pendingCount > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-black text-white">
                  {pendingCount}
                </span>
              )}
            </Link>
          </nav>

          <Link
            href="/citizen/report"
            className="rounded-xl bg-[#401AD9] px-4 py-2 text-sm font-bold text-white shadow-md shadow-[#401AD9]/20 transition hover:bg-[#3413B8]"
          >
            + File Complaint
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Notification Toast */}
        {toastMessage && (
          <div className="fixed right-6 top-20 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-2xl">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            {toastMessage}
          </div>
        )}

        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#401AD9] via-[#4F25E2] to-[#6335ED] p-8 text-white shadow-xl shadow-[#401AD9]/15">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
              <Inbox className="h-3.5 w-3.5" /> Official Government Queries
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Citizen Clarification Inbox
            </h2>
            <p className="mt-2 text-sm leading-6 text-indigo-100">
              Government officers review your filed complaints and may request additional details or photos to speed up resolution. Reply directly to help officers solve your civic issue faster.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("PENDING")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "PENDING"
                  ? "bg-[#401AD9] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Action Required
              {pendingCount > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    activeTab === "PENDING"
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("REPLIED")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "REPLIED"
                  ? "bg-[#401AD9] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Answered ({repliedCount})
            </button>

            <button
              onClick={() => setActiveTab("ALL")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "ALL"
                  ? "bg-[#401AD9] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Messages
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or complaints..."
              className="h-10 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs font-medium outline-none focus:border-[#401AD9] sm:w-64"
            />
          </div>
        </div>

        {/* Request List */}
        <div className="mt-6 space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#401AD9]">
                <Inbox className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                No requests found
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {activeTab === "PENDING"
                  ? "You have no pending government clarification requests."
                  : "No items match your selected filter."}
              </p>
            </div>
          ) : (
            filteredRequests.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-md ${
                  item.status === "PENDING"
                    ? "border-amber-200 ring-1 ring-amber-400/20"
                    : "border-slate-200"
                }`}
              >
                <div className="border-b border-slate-100 bg-slate-50/60 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-slate-200/80 px-2.5 py-1 text-xs font-black text-slate-700">
                        {item.problemId}
                      </span>
                      <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-[#401AD9]">
                        {item.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {item.locality}, {item.district}
                      </span>
                    </div>

                    <div>
                      {item.status === "PENDING" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                          Response Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Answer Submitted
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-black text-slate-900">
                    {item.problemTitle}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#401AD9] text-white">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          {item.requestedBy}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {item.requestedAt}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
                      "{item.question}"
                    </p>
                  </div>

                  <div className="mt-6">
                    {item.status === "REPLIED" ? (
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-emerald-900">
                            Your Reply to Government:
                          </span>
                          <span className="text-[11px] font-medium text-emerald-700">
                            {item.repliedAt}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-slate-800">
                          {item.reply}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700">
                          Write your answer for the Government Officer:
                        </label>
                        <textarea
                          rows={3}
                          value={replyText[item.id] || ""}
                          onChange={(e) =>
                            handleReplyChange(item.id, e.target.value)
                          }
                          placeholder="Provide details, landmarks, meter numbers, or answers to officer's question..."
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-[#401AD9] focus:bg-white focus:ring-2 focus:ring-[#401AD9]/10"
                        />
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => submitReply(item.id)}
                            disabled={
                              submittingId === item.id ||
                              !replyText[item.id] ||
                              !replyText[item.id].trim()
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-[#401AD9] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#401AD9]/20 transition hover:bg-[#3413B8] disabled:opacity-50"
                          >
                            {submittingId === item.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Sending to Govt...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Send Answer to Government
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
