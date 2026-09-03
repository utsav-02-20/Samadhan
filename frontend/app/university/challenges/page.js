"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { getUniversityChallenges } from "@/services/university.service";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  Lightbulb,
  MapPin,
  Search,
  Users,
} from "lucide-react";

// Commented out static demo data:
// const challenges = [...];

const categories = [
  "All Categories",
  "Technology",
  "Infrastructure",
  "Environment",
  "Safety",
  "Education",
];

const departments = [
  "All Departments",
  "Municipal Services",
  "Transport Department",
  "Water Department",
  "Electrical Department",
  "Traffic Department",
  "Education Department",
  "Public Works",
];

export default function UniversityChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    getUniversityChallenges()
      .then((res) => setChallenges((res?.data || []).map((item) => ({
        id: item.id || item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        department: item.department || item.district || "General",
        location: item.locality || item.district || "General Locality",
        status: item.status === "Pending" ? "OPEN" : item.status === "In Progress" ? "IN_PROGRESS" : item.status,
        applications: item.upvotes || 0,
        deadline: "30 Sep 2026",
        daysLeft: 14,
      }))))
      .catch((err) => console.error("Could not load university challenges:", err));
  }, []);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const text = [
        challenge.id,
        challenge.title,
        challenge.description,
        challenge.category,
        challenge.department,
        challenge.location,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        challenge.category === category;

      const matchesDepartment =
        department === "All Departments" ||
        challenge.department === department;

      const matchesStatus =
        status === "ALL" || challenge.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [search, category, department, status]);

  const openCount = challenges.filter(
    (item) => item.status === "OPEN"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
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

          <div className="flex items-center gap-4">

            <Link
              href="/university/applications"
              className="hidden text-sm font-bold text-slate-600 transition hover:text-blue-600 sm:block"
            >
              My Applications
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
              UB
            </div>

          </div>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE INTRO */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Civic Innovation
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Explore Challenges
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Discover real-world civic problems posted by government
              departments and find opportunities for your university
              and student teams to contribute solutions.
            </p>

          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">

            <p className="text-xs font-semibold text-blue-600">
              Open opportunities
            </p>

            <p className="mt-1 text-2xl font-black text-blue-950">
              {openCount}
            </p>

          </div>

        </div>

        {/* SEARCH + FILTERS */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search challenges, locations or departments..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              {departments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>

          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

            <Filter className="h-3.5 w-3.5" />

            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredChallenges.length}
            </span>{" "}
            challenges

          </div>

        </section>

        {/* CHALLENGES */}

        <div className="mt-7 grid gap-5 lg:grid-cols-2">

          {filteredChallenges.map((challenge) => (

            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />

          ))}

        </div>

        {/* EMPTY STATE */}

        {filteredChallenges.length === 0 && (

          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <Lightbulb className="mx-auto h-9 w-9 text-slate-300" />

            <h2 className="mt-4 font-black">
              No challenges found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setDepartment("All Departments");
                setStatus("ALL");
              }}
              className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              Clear filters
            </button>

          </div>

        )}

      </div>

    </main>
  );
}

function ChallengeCard({ challenge }) {
  const isOpen = challenge.status === "OPEN";

  return (
    <Link
      href={`/university/challenges/${challenge.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >

      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Lightbulb className="h-5 w-5 text-blue-600" />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <span className="text-[11px] font-bold text-slate-400">
                {challenge.id}
              </span>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black ${isOpen
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                  }`}
              >
                {challenge.status}
              </span>

            </div>

          </div>

        </div>

        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />

      </div>

      {/* CONTENT */}

      <h2 className="mt-5 text-lg font-black leading-6 group-hover:text-blue-700">
        {challenge.title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {challenge.description}
      </p>

      {/* TAG */}

      <div className="mt-4">

        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
          {challenge.category}
        </span>

      </div>

      {/* DETAILS */}

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">

        <InfoItem
          icon={Building2}
          label="Department"
          value={challenge.department}
        />

        <InfoItem
          icon={MapPin}
          label="Location"
          value={challenge.location}
        />

        <InfoItem
          icon={Users}
          label="Applications"
          value={`${challenge.applications} teams`}
        />

        <InfoItem
          icon={CalendarDays}
          label="Deadline"
          value={challenge.deadline}
        />

      </div>

      {/* FOOTER */}

      <div className="mt-5 flex items-center justify-between">

        {isOpen ? (

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
            <Clock3 className="h-3.5 w-3.5" />
            {challenge.daysLeft} days remaining
          </div>

        ) : (

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Applications closed
          </div>

        )}

        <span className="text-xs font-black text-slate-900 group-hover:text-blue-600">
          View challenge →
        </span>

      </div>

    </Link>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex min-w-0 gap-2">

      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />

      <div className="min-w-0">

        <p className="text-[10px] font-semibold text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}
