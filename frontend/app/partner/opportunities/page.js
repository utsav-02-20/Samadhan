"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Lightbulb,
  FolderKanban,
  FileText,
  Upload,
  Bell,
  Settings,
  Search,
  MapPin,
  Clock3,
  Users,
  ArrowUpRight,
  Filter,
  ChevronDown,
  Building2,
} from "lucide-react";

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

export default function PartnerOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Transportation",
    "Waste Management",
    "Water Management",
    "Governance",
  ];

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-6">

          <Link
            href="/partner/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black !text-white">
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

          {/* NAVIGATION */}

          <nav className="ml-8 hidden items-center gap-1 xl:flex">

            <NavItem
              href="/partner/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
            />

            <NavItem
              href="/partner/opportunities"
              icon={Lightbulb}
              label="Opportunities"
              active
            />

            <NavItem
              href="/partner/collaborations"
              icon={FolderKanban}
              label="Collaborations"
            />

            <NavItem
              href="/partner/applications"
              icon={FileText}
              label="Applications"
            />

            <NavItem
              href="/partner/submissions"
              icon={Upload}
              label="Submissions"
            />

          </nav>

          {/* RIGHT */}

          <div className="ml-auto flex items-center gap-2">

            <Link
              href="/partner/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <Bell className="h-4 w-4" />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
            </Link>

            <Link
              href="/partner/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-black text-violet-700"
            >
              AP
            </Link>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-10">

        {/* HEADER */}

        <section>

          <p className="text-xs font-black uppercase tracking-widest text-violet-600">
            Industry Partner
          </p>

          <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Opportunities
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Discover civic challenges where your company
                can contribute technology, expertise and resources.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

              <Lightbulb className="h-4 w-4 text-violet-600" />

              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Open opportunities
                </p>

                <p className="text-sm font-black">
                  {opportunities.length}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* SEARCH + FILTER */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search opportunities, departments or technologies..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:bg-white"
              />

            </div>

            {/* CATEGORY */}

            <div className="relative">

              <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm font-semibold outline-none focus:border-violet-500"
              >

                {categories.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}

              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            </div>

          </div>

        </section>

        {/* RESULTS */}

        <div className="mt-5 flex items-center justify-between">

          <p className="text-xs font-semibold text-slate-400">
            Showing{" "}
            <span className="font-black text-slate-700">
              {filteredOpportunities.length}
            </span>{" "}
            opportunities
          </p>

          <button className="text-xs font-black text-slate-500 hover:text-slate-900">
            Recently added
            <ChevronDown className="ml-1 inline h-3 w-3" />
          </button>

        </div>

        {/* OPPORTUNITY CARDS */}

        <section className="mt-4 grid gap-5 lg:grid-cols-2">

          {filteredOpportunities.map((opportunity) => (

            <article
              key={opportunity.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                  <Building2 className="h-5 w-5 text-violet-600" />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black text-emerald-600">
                  OPEN
                </span>

              </div>

              {/* TITLE */}

              <h2 className="mt-5 text-lg font-black">
                {opportunity.title}
              </h2>

              <p className="mt-1 text-xs font-bold text-violet-600">
                {opportunity.department}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {opportunity.description}
              </p>

              {/* TAGS */}

              <div className="mt-4 flex flex-wrap gap-2">

                {opportunity.tags.map((tag) => (

                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600"
                  >
                    {tag}
                  </span>

                ))}

              </div>

              {/* META */}

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">

                <Meta
                  icon={MapPin}
                  label="Location"
                  value={opportunity.location}
                />

                <Meta
                  icon={Clock3}
                  label="Deadline"
                  value={opportunity.deadline}
                />

                <Meta
                  icon={Users}
                  label="Applications"
                  value={`${opportunity.applications} received`}
                />

                <Meta
                  icon={Building2}
                  label="Estimated Budget"
                  value={opportunity.budget}
                />

              </div>

              {/* ACTION */}

              <div className="mt-6 flex items-center justify-between">

                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {opportunity.category}
                </span>

                <Link
                  href={`/partner/opportunities/${opportunity.id}`}
                  className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black !text-white transition hover:bg-slate-800"
                >
                  View opportunity
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

              </div>

            </article>

          ))}

        </section>

        {/* EMPTY STATE */}

        {filteredOpportunities.length === 0 && (

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Search className="h-5 w-5 text-slate-400" />
            </div>

            <h2 className="mt-4 text-sm font-black">
              No opportunities found
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or category filter.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
        active
          ? "bg-slate-950 !text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div>

      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">

        <Icon className="h-3 w-3" />

        {label}

      </div>

      <p className="mt-1 text-xs font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}