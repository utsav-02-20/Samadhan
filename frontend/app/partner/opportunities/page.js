"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock3,
  Users,
  Wallet,
  CheckCircle2,
} from "lucide-react";

// Demo opportunity data (replace with API later)
const opportunities = [
  {
    id: 1,
    title: "Smart City Traffic Optimization",
    department: "Traffic Department",
    location: "Bhagalpur, Bihar",
    category: "Transportation",
    applications: 18,
    deadline: "15 Sep 2026",
    budget: "₹8–15 Lakh",
    description:
      "Develop an intelligent traffic management solution to reduce congestion and improve road safety across major city intersections.",
    tags: ["IoT", "Analytics", "Smart City"],
  },
  {
    id: 2,
    title: "Intelligent Waste Collection",
    department: "Municipal Corporation",
    location: "Bhagalpur, Bihar",
    category: "Waste Management",
    applications: 12,
    deadline: "20 Sep 2026",
    budget: "₹5–10 Lakh",
    description:
      "Build a technology-driven waste collection system using route optimization and real-time monitoring.",
    tags: ["AI", "IoT", "Optimization"],
  },
  {
    id: 3,
    title: "Community Water Monitoring",
    department: "Water Resources Department",
    location: "Bihar",
    category: "Water Management",
    applications: 9,
    deadline: "28 Sep 2026",
    budget: "₹6–12 Lakh",
    description:
      "Create a monitoring platform for detecting water quality issues and improving access to reliable community water data.",
    tags: ["Sensors", "Analytics", "Environment"],
  },
  {
    id: 4,
    title: "Digital Public Grievance Platform",
    department: "District Administration",
    location: "Bihar",
    category: "Governance",
    applications: 21,
    deadline: "03 Oct 2026",
    budget: "₹10–20 Lakh",
    description:
      "Develop a scalable platform for collecting, routing and tracking citizen grievances across government departments.",
    tags: ["Web", "Cloud", "Governance"],
  },
];

export default function OpportunityDetails() {
  const params = useParams();
  const [submitted, setSubmitted] = useState(false);

  // Next.js 15 fix
  const opportunity =
    opportunities.find((item) => item.id === Number(params?.id)) ||
    opportunities[0];

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/partner/opportunities" subtitle="Partner Portal" size="sm" />

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

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Back */}
        <Link
          href="/partner/opportunities"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Link>

        {/* Opportunity Card */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="flex-1">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                OPEN OPPORTUNITY
              </span>

              <h1 className="mt-4 text-3xl font-black">{opportunity.title}</h1>

              <p className="mt-2 text-sm font-bold text-violet-600">
                {opportunity.department}
              </p>

              <p className="mt-5 leading-7 text-slate-600">
                {opportunity.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {opportunity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:max-w-xs">
              <h3 className="text-sm font-black text-slate-500">
                Opportunity Details
              </h3>

              <div className="mt-5 space-y-4 text-sm">
                <Info icon={MapPin} label="Location" value={opportunity.location} />
                <Info icon={Clock3} label="Deadline" value={opportunity.deadline} />
                <Info
                  icon={Users}
                  label="Applications"
                  value={`${opportunity.applications} Received`}
                />
                <Info icon={Wallet} label="Budget" value={opportunity.budget} />
                <Info
                  icon={Building2}
                  label="Category"
                  value={opportunity.category}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Project Scope</h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Industry partners are expected to collaborate with government
            departments and academic institutions to design, develop, test and
            deploy innovative civic technology solutions.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              Prototype development and deployment support.
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              Collaboration with universities and government departments.
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              Technical mentorship and implementation planning.
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              Scalable, production-ready solution delivery.
            </li>
          </ul>
        </section>

        {/* Apply Form */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black">Apply for Collaboration</h2>

          <p className="mt-2 text-sm text-slate-500">
            Submit your interest in collaborating on this opportunity.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-700">
                Application submitted successfully.
              </p>

              <p className="mt-1 text-sm text-emerald-600">
                The department will review your submission shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Organization Name
                </label>

                <input
                  required
                  placeholder="Enter organization name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Proposal Summary
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Briefly explain how your organization can contribute."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-black text-white transition hover:bg-violet-700"
              >
                Submit Application
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-violet-100 p-2">
        <Icon className="h-4 w-4 text-violet-600" />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
