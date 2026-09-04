"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { assignChallengeToDepartment, getGovernmentChallenges } from "@/services/government.service";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  MapPin,
  Search,
  User,
  Users,
} from "lucide-react";

const challenges = [
  {
    id: "SAM-1024",
    title: "Broken street lights in residential area",
    category: "Infrastructure",
    location: "Sector 4, Main Market Road",
    submittedBy: "Anonymous Citizen",
    priority: "HIGH",
    status: "ACCEPTED",
  },
  {
    id: "SAM-1021",
    title: "Garbage accumulation near community park",
    category: "Sanitation",
    location: "Sector 7 Community Park",
    submittedBy: "Anonymous Citizen",
    priority: "MEDIUM",
    status: "ACCEPTED",
  },
  {
    id: "SAM-1017",
    title: "Water supply disruption in Sector 4",
    category: "Water Supply",
    location: "Sector 4 Residential Area",
    submittedBy: "Anonymous Citizen",
    priority: "HIGH",
    status: "ACCEPTED",
  },
  {
    id: "SAM-1011",
    title: "Damaged road near university",
    category: "Roads",
    location: "University Main Gate",
    submittedBy: "Anonymous Citizen",
    priority: "HIGH",
    status: "ACCEPTED",
  },
];

const departments = [
  {
    id: "DEPT-001",
    name: "Public Works",
    head: "Rajiv Mehra",
    members: 28,
  },
  {
    id: "DEPT-002",
    name: "Sanitation",
    head: "Anita Verma",
    members: 21,
  },
  {
    id: "DEPT-003",
    name: "Water Department",
    head: "Suresh Kumar",
    members: 17,
  },
  {
    id: "DEPT-004",
    name: "Electrical Department",
    head: "Pooja Sharma",
    members: 14,
  },
  {
    id: "DEPT-005",
    name: "Traffic Department",
    head: "Vikram Singh",
    members: 11,
  },
  {
    id: "DEPT-006",
    name: "Municipal Services",
    head: "Neeraj Gupta",
    members: 19,
  },
];

export default function AssignChallengePage() {
  const { getToken } = useAuth();
  const [liveChallenges, setLiveChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] =
    useState(null);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [search, setSearch] = useState("");

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    getToken().then((token) => getGovernmentChallenges(token || undefined))
      .then((res) => setLiveChallenges((res?.data || []).map((item) => ({
        ...item,
        id: item.id || item._id,
        location: item.district || "",
        submittedBy: "Government",
        status: item.status === "OPEN" ? "SUBMITTED" : item.status,
      }))))
      .catch((err) => console.error("Could not load government challenges:", err));
  }, [getToken]);

  const filteredChallenges = liveChallenges.filter((challenge) => {
    const text = [
      challenge.id,
      challenge.title,
      challenge.category,
      challenge.location,
      challenge.submittedBy,
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search.toLowerCase());
  });

  async function assignChallenge() {
    if (!selectedChallenge || !selectedDepartment) {
      return;
    }

    try {
      const token = await getToken();
      await assignChallengeToDepartment({
        challengeId: selectedChallenge.id || selectedChallenge._id,
        departmentId: selectedDepartment.id,
        departmentName: selectedDepartment.name,
      }, token || undefined);
      setSuccess(true);
    } catch (err) {
      alert(err?.message || "Challenge assignment failed.");
      return;
    }

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

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

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">

            <CheckCircle2 className="h-5 w-5" />

            Challenge successfully assigned to the department.

          </div>
        )}

        {/* HEADING */}

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Government Administration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Assign Challenge
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Select an accepted civic challenge and assign it to
            the department responsible for resolving it.
          </p>

        </div>

        {/* STEP INDICATOR */}

        <div className="mt-8 flex items-center gap-3">

          <Step
            number="1"
            title="Select Challenge"
            active={!selectedChallenge}
            complete={!!selectedChallenge}
          />

          <div className="h-px w-10 bg-slate-200" />

          <Step
            number="2"
            title="Select Department"
            active={
              !!selectedChallenge && !selectedDepartment
            }
            complete={!!selectedDepartment}
          />

          <div className="h-px w-10 bg-slate-200" />

          <Step
            number="3"
            title="Confirm Assignment"
            active={
              !!selectedChallenge && !!selectedDepartment
            }
            complete={false}
          />

        </div>

        {/* MAIN */}

        <div className="mt-8 grid gap-7 lg:grid-cols-3">

          {/* CHALLENGES */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

            <div className="border-b border-slate-100 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-black">
                    Accepted Challenges
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Choose a challenge to assign.
                  </p>

                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {filteredChallenges.length} available
                </span>

              </div>

              <div className="relative mt-5">

                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search challenge..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {filteredChallenges.map((challenge) => {

                const selected =
                  selectedChallenge?.id === challenge.id;

                return (
                  <button
                    key={challenge.id}
                    onClick={() =>
                      setSelectedChallenge(challenge)
                    }
                    className={`w-full p-5 text-left transition ${
                      selected
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {selected ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="text-xs font-bold text-slate-400">
                            {challenge.id}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                              challenge.priority === "HIGH"
                                ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {challenge.priority}
                          </span>

                        </div>

                        <h3 className="mt-2 font-black">
                          {challenge.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">

                          <span>
                            {challenge.category}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {challenge.location}
                          </span>

                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {challenge.submittedBy}
                          </span>

                          {challenge.aiRecommendedDepartment && (
                            <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                              ⚡ AI Suggested: {challenge.aiRecommendedDepartment}
                            </span>
                          )}

                        </div>

                      </div>

                      <ArrowRight
                        className={`mt-2 h-4 w-4 ${
                          selected
                            ? "text-blue-600"
                            : "text-slate-300"
                        }`}
                      />

                    </div>

                  </button>
                );
              })}

            </div>

          </section>

          {/* ASSIGNMENT PANEL */}

          <aside className="space-y-5">

            {/* SELECTED CHALLENGE */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Selected Challenge
              </h2>

              {!selectedChallenge ? (

                <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-6 text-center">

                  <FileText className="mx-auto h-7 w-7 text-slate-300" />

                  <p className="mt-3 text-sm font-bold text-slate-500">
                    No challenge selected
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Select a challenge from the list.
                  </p>

                </div>

              ) : (

                <div className="mt-5 rounded-xl bg-blue-50 p-4">

                  <p className="text-xs font-bold text-blue-600">
                    {selectedChallenge.id}
                  </p>

                  <p className="mt-2 text-sm font-black text-blue-950">
                    {selectedChallenge.title}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-blue-700">

                    <MapPin className="h-3.5 w-3.5" />

                    {selectedChallenge.location}

                  </div>

                  {selectedChallenge.aiRecommendedDepartment && (
                    <div className="mt-3 rounded-lg border border-blue-200 bg-white/90 p-2.5 text-xs text-blue-950">
                      <div className="font-bold text-blue-800">⚡ AI Recommended Department:</div>
                      <div className="font-semibold text-slate-800 mt-0.5">{selectedChallenge.aiRecommendedDepartment}</div>
                      {selectedChallenge.predictedResolutionDays && (
                        <div className="text-[11px] text-slate-500 mt-1">
                          Estimated SLA: <span className="font-bold text-indigo-700">{selectedChallenge.predictedResolutionDays} Days</span> ({selectedChallenge.priority || 'NORMAL'} Priority)
                        </div>
                      )}
                    </div>
                  )}

                </div>

              )}

            </section>

            {/* DEPARTMENT */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-black">
                    Assign Department
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Choose responsible department.
                  </p>

                </div>

                <Building2 className="h-5 w-5 text-slate-400" />

              </div>

              <div className="mt-5 space-y-2">

                {departments.map((department) => {

                  const selected =
                    selectedDepartment?.id === department.id;

                  return (
                    <button
                      key={department.id}
                      disabled={!selectedChallenge}
                      onClick={() =>
                        setSelectedDepartment(department)
                      }
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        !selectedChallenge
                          ? "cursor-not-allowed opacity-40"
                          : selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-sm font-bold">
                            {department.name}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Head: {department.head}
                          </p>

                        </div>

                        {selected && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        )}

                      </div>

                      <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">

                        <Users className="h-3 w-3" />

                        {department.members} members

                      </div>

                    </button>
                  );
                })}

              </div>

            </section>

            {/* CONFIRM */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Assignment Summary
              </h2>

              <div className="mt-5 space-y-3">

                <SummaryRow
                  label="Challenge"
                  value={
                    selectedChallenge
                      ? selectedChallenge.id
                      : "Not selected"
                  }
                />

                <SummaryRow
                  label="Department"
                  value={
                    selectedDepartment
                      ? selectedDepartment.name
                      : "Not selected"
                  }
                />

                <SummaryRow
                  label="Department Head"
                  value={
                    selectedDepartment
                      ? selectedDepartment.head
                      : "—"
                  }
                />

              </div>

              <button
                onClick={assignChallenge}
                disabled={
                  !selectedChallenge ||
                  !selectedDepartment
                }
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  selectedChallenge && selectedDepartment
                    ? "bg-royal-gradient text-white shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirm Assignment
              </button>

            </section>

          </aside>

        </div>

      </div>

    </main>
  );
}

function Step({
  number,
  title,
  active,
  complete,
}) {
  return (
    <div className="flex items-center gap-2">

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
          complete
            ? "bg-emerald-600 text-white"
            : active
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {complete ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          number
        )}
      </div>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active || complete
            ? "text-slate-900"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="max-w-[180px] truncate text-right text-xs font-bold text-slate-700">
        {value}
      </span>

    </div>
  );
}
