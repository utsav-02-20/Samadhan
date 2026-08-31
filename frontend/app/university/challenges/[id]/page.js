"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";

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
  const [showApply, setShowApply] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [proposal, setProposal] = useState("");

  function submitApplication(e) {
    e.preventDefault();

    if (!teamName.trim() || !proposal.trim()) {
      return;
    }

    setSubmitted(true);
    setShowApply(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

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

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                S
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

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link
            href="/university/challenges"
            className="hover:text-blue-600"
          >
            Challenges
          </Link>

          <span>/</span>

          <span className="text-slate-600">
            {challenge.id}
          </span>
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

                <span className="text-xs font-bold text-slate-500">
                  {challenge.id}
                </span>

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

              {submitted ? (

                <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-5 py-4 text-emerald-300">

                  <CheckCircle2 className="h-5 w-5" />

                  <div>
                    <p className="text-sm font-black">
                      Application submitted
                    </p>

                    <p className="mt-0.5 text-xs text-emerald-400/80">
                      Your team is under review.
                    </p>
                  </div>

                </div>

              ) : (

                <button
                  onClick={() => setShowApply(true)}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-blue-500"
                >
                  Participate
                  <ArrowRight className="h-4 w-4" />
                </button>

              )}

            </div>

          </div>

        </section>

        {/* CONTENT GRID */}

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* MAIN */}

          <div className="space-y-6">

            <ContentCard
              icon={Lightbulb}
              title="Problem Statement"
            >
              <p className="text-sm leading-7 text-slate-600">
                {challenge.problem}
              </p>
            </ContentCard>

            <ContentCard
              icon={CheckCircle2}
              title="Objectives"
            >

              <div className="space-y-3">

                {challenge.objectives.map((item, index) => (

                  <div
                    key={index}
                    className="flex gap-3"
                  >

                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </ContentCard>

            <ContentCard
              icon={FileText}
              title="Expected Outcome"
            >

              <p className="text-sm leading-7 text-slate-600">
                {challenge.expectedOutcome}
              </p>

            </ContentCard>

            <ContentCard
              icon={Lightbulb}
              title="Requirements"
            >

              <div className="grid gap-3 sm:grid-cols-2">

                {challenge.requirements.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-600"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </ContentCard>

          </div>

          {/* SIDEBAR */}

          <aside className="h-fit space-y-5 lg:sticky lg:top-6">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-black">
                Challenge Details
              </h2>

              <div className="mt-5 space-y-5">

                <Detail
                  icon={CalendarDays}
                  label="Application deadline"
                  value={challenge.deadline}
                />

                <Detail
                  icon={Clock3}
                  label="Time remaining"
                  value={`${challenge.daysLeft} days`}
                />

                <Detail
                  icon={Users}
                  label="Current applications"
                  value={`${challenge.applications} teams`}
                />

                <Detail
                  icon={Building2}
                  label="Posted by"
                  value={challenge.department}
                />

              </div>

            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Why participate?
              </p>

              <p className="mt-3 text-sm leading-6 text-blue-950">
                Work on a real civic problem and create a solution
                that can potentially be piloted by a government
                department.
              </p>

            </div>

          </aside>

        </div>

      </div>

      {/* APPLICATION MODAL */}

      {showApply && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Participate
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Submit your proposal
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Tell the department about your university team
                  and proposed solution.
                </p>

              </div>

              <button
                onClick={() => setShowApply(false)}
                className="text-2xl text-slate-300 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={submitApplication}
              className="mt-7 space-y-5"
            >

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Team name
                </label>

                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Civic Innovators"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

              </div>

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Solution proposal
                </label>

                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Briefly explain how your team would solve this challenge..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none focus:border-blue-500 focus:bg-white"
                />

              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowApply(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 text-sm font-black text-white hover:bg-slate-800"
                >
                  <Send className="h-4 w-4" />
                  Submit Application
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

function ContentCard({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-slate-700" />
        </div>

        <h2 className="text-lg font-black">
          {title}
        </h2>

      </div>

      <div className="mt-5">
        {children}
      </div>

    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">

      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

      <div>

        <p className="text-xs font-semibold text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-black text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}