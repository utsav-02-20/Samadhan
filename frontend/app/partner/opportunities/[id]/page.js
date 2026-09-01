"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  CalendarDays,
  IndianRupee,
  Users,
  CheckCircle2,
  FileText,
  Upload,
  Send,
  Clock3,
  Target,
  Lightbulb,
} from "lucide-react";

const opportunities = {
  1: {
    title: "Smart City Traffic Optimization",
    department: "Traffic Department",
    location: "Bhagalpur, Bihar",
    category: "Transportation",
    deadline: "15 September 2026",
    budget: "₹8–15 Lakh",
    applications: 18,
    description:
      "Develop an intelligent traffic management solution to reduce congestion and improve road safety across major city intersections.",
    objective:
      "The government is looking for technology partners capable of developing a scalable traffic optimization system using real-time data, intelligent analytics and modern monitoring infrastructure.",
    requirements: [
      "Real-time traffic monitoring",
      "Traffic congestion analytics",
      "Route optimization",
      "Dashboard for government officials",
      "Scalable cloud-based architecture",
    ],
    tags: ["IoT", "Analytics", "Smart City"],
  },

  2: {
    title: "Intelligent Waste Collection",
    department: "Municipal Corporation",
    location: "Bhagalpur, Bihar",
    category: "Waste Management",
    deadline: "20 September 2026",
    budget: "₹5–10 Lakh",
    applications: 12,
    description:
      "Build a technology-driven waste collection system using route optimization and real-time monitoring.",
    objective:
      "Develop a smart waste management platform that can help municipal authorities optimize collection routes and monitor operations.",
    requirements: [
      "Collection route optimization",
      "Vehicle tracking",
      "Real-time monitoring",
      "Administrative dashboard",
      "Performance analytics",
    ],
    tags: ["AI", "IoT", "Optimization"],
  },

  3: {
    title: "Community Water Monitoring",
    department: "Water Resources Department",
    location: "Bihar",
    category: "Water Management",
    deadline: "28 September 2026",
    budget: "₹6–12 Lakh",
    applications: 9,
    description:
      "Create a monitoring platform for detecting water quality issues and improving access to reliable community water data.",
    objective:
      "Create a technology platform that enables authorities to monitor water quality and identify potential problems early.",
    requirements: [
      "Water quality monitoring",
      "Sensor integration",
      "Data visualization",
      "Alert system",
      "Government monitoring dashboard",
    ],
    tags: ["Sensors", "Analytics", "Environment"],
  },

  4: {
    title: "Digital Public Grievance Platform",
    department: "District Administration",
    location: "Bihar",
    category: "Governance",
    deadline: "03 October 2026",
    budget: "₹10–20 Lakh",
    applications: 21,
    description:
      "Develop a scalable platform for collecting, routing and tracking citizen grievances across government departments.",
    objective:
      "Build a unified grievance management system that helps citizens submit complaints and enables government departments to track and resolve them efficiently.",
    requirements: [
      "Citizen grievance submission",
      "Department routing",
      "Status tracking",
      "Administrative dashboard",
      "Analytics and reporting",
    ],
    tags: ["Web", "Cloud", "Governance"],
  },
};

export default function OpportunityDetails({ params }) {
  const [showApply, setShowApply] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const opportunity = opportunities[params.id] || opportunities[1];

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-6">

          <Link
            href="/partner/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
              S
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-black">
                Samadhan
              </p>

              <p className="text-[10px] font-semibold text-slate-400">
                Industry Partner
              </p>

            </div>

          </Link>

          <nav className="ml-auto flex items-center gap-2">

            <Link
              href="/partner/opportunities"
              className="rounded-xl px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-100"
            >
              Opportunities
            </Link>

            <Link
              href="/partner/applications"
              className="rounded-xl px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-100"
            >
              Applications
            </Link>

            <Link
              href="/partner/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700"
            >
              AP
            </Link>

          </nav>

        </div>

      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-10">

        {/* BACK */}

        <Link
          href="/partner/opportunities"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to opportunities
        </Link>

        {/* HERO */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">

          <div className="flex flex-col justify-between gap-8 lg:flex-row">

            <div className="max-w-3xl">

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black text-emerald-600">
                  OPEN FOR APPLICATIONS
                </span>

                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[9px] font-black text-violet-600">
                  {opportunity.category}
                </span>

              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                {opportunity.title}
              </h1>

              <p className="mt-3 text-sm font-bold text-violet-600">
                {opportunity.department}
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                {opportunity.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                {opportunity.tags.map((tag) => (

                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            </div>

            {/* APPLY */}

            <div className="w-full shrink-0 lg:w-64">

              <div className="rounded-2xl bg-slate-950 p-5 text-white">

                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Partnership opportunity
                </p>

                <p className="mt-2 text-2xl font-black">
                  {opportunity.budget}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Estimated project budget
                </p>

                <button
                  onClick={() => setShowApply(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-black text-slate-950 hover:bg-slate-100"
                >
                  Apply now
                  <Send className="h-4 w-4" />
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* META */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            icon={MapPin}
            label="Location"
            value={opportunity.location}
          />

          <InfoCard
            icon={CalendarDays}
            label="Application deadline"
            value={opportunity.deadline}
          />

          <InfoCard
            icon={Users}
            label="Applications"
            value={`${opportunity.applications} received`}
          />

          <InfoCard
            icon={IndianRupee}
            label="Budget"
            value={opportunity.budget}
          />

        </section>

        {/* DETAILS */}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <Target className="h-5 w-5 text-violet-600" />
              </div>

              <h2 className="font-black">
                Project Objective
              </h2>

            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              {opportunity.objective}
            </p>

            <div className="mt-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Lightbulb className="h-5 w-5 text-slate-600" />
                </div>

                <h2 className="font-black">
                  Expected Capabilities
                </h2>

              </div>

              <div className="mt-5 space-y-3">

                {opportunity.requirements.map((requirement) => (

                  <div
                    key={requirement}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >

                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                    <span className="text-xs font-semibold text-slate-600">
                      {requirement}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ORGANIZATION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Building2 className="h-5 w-5 text-slate-600" />
            </div>

            <h2 className="mt-5 font-black">
              Issuing Organization
            </h2>

            <p className="mt-2 text-sm font-bold text-slate-700">
              {opportunity.department}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Government partner
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5">

              <div className="flex items-center gap-2 text-xs text-slate-500">

                <MapPin className="h-4 w-4" />

                {opportunity.location}

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">

                <Clock3 className="h-4 w-4" />

                Applications close {opportunity.deadline}

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* APPLICATION MODAL */}

      {showApply && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {!submitted ? (

              <form
                onSubmit={handleSubmit}
                className="p-7"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs font-black uppercase tracking-widest text-violet-600">
                      Partnership Application
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Apply for this opportunity
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Submit your organization's proposal for consideration.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => setShowApply(false)}
                    className="rounded-lg px-3 py-2 text-xs font-black text-slate-400 hover:bg-slate-100"
                  >
                    Close
                  </button>

                </div>

                <div className="mt-7 space-y-5">

                  <Field
                    label="Company / Organization"
                    placeholder="Enter company name"
                  />

                  <Field
                    label="Contact person"
                    placeholder="Enter contact person"
                  />

                  <Field
                    label="Email"
                    type="email"
                    placeholder="company@example.com"
                  />

                  <div>

                    <label className="text-xs font-black text-slate-700">
                      Proposal
                    </label>

                    <textarea
                      required
                      rows={5}
                      placeholder="Briefly explain how your organization can solve this challenge..."
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:bg-white"
                    />

                  </div>

                  <div>

                    <label className="text-xs font-black text-slate-700">
                      Supporting document
                    </label>

                    <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 hover:bg-slate-100">

                      <Upload className="h-5 w-5 text-slate-400" />

                      <div>

                        <p className="text-xs font-black">
                          Upload proposal
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          PDF, DOC or DOCX
                        </p>

                      </div>

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />

                    </label>

                  </div>

                </div>

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-xs font-black text-white hover:bg-slate-800"
                >
                  Submit application
                  <Send className="h-4 w-4" />
                </button>

              </form>

            ) : (

              <div className="p-10 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">

                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />

                </div>

                <h2 className="mt-6 text-2xl font-black">
                  Application submitted
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  Your application has been recorded successfully.
                  You can track its status from the Applications section.
                </p>

                <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">

                  <Link
                    href="/partner/applications"
                    className="rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white"
                  >
                    View applications
                  </Link>

                  <button
                    onClick={() => setShowApply(false)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-black text-slate-600"
                  >
                    Close
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {value}
      </p>

    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="text-xs font-black text-slate-700">
        {label}
      </label>

      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-violet-500 focus:bg-white"
      />

    </div>
  );
}