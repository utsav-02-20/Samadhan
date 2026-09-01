"use client";

import { use, useState } from "react";
import Link from "next/link";
import StatCard from "../../../../../components-citizen/ui/StatCard";
import StatusBadge from "../../../../../components-citizen/ui/StatusBadge";
import {
  MapPin,
  Calendar,
  Heart,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default function UserProfilePage({ params }: Props) {
  // ✅ Next.js 16
  const { username } = use(params);

  const [activeTab, setActiveTab] = useState("filed");

  const myChallenges = [
    {
      id: "SMD-882194",
      title: "Bore well dry in Barha village for over a month",
      category: "WATER RESOURCES",
      status: "IN PROGRESS",
      date: "02 Jul 2026",
      supporters: 142,
    },
    {
      id: "SMD-491028",
      title: "Village school has no reliable power after 6 pm",
      category: "ENERGY",
      status: "ROUTED",
      date: "19 Jul 2026",
      supporters: 74,
    },
    {
      id: "SMD-102938",
      title: "Street drainage blockage at main chowk",
      category: "URBAN DEVELOPMENT",
      status: "SOLVED",
      date: "11 May 2026",
      supporters: 231,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0c2340] text-2xl font-bold text-white shadow-lg">
              {username ? username.charAt(0).toUpperCase() : "C"}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#0c2340]">
                  @{username}
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Ranchi District, Jharkhand
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined July 2026
                </span>
              </div>
            </div>
          </div>

          {/* Original Samadhan Button */}
          <Link
            href="/citizen/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-[#1a4a6e]"
          >
            <PlusCircle className="h-4 w-4" />
            File New Challenge
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
          <StatCard
            title="Challenges Filed"
            value="3"
            description="Submitted across 2 categories"
            iconType="challenges"
            trend="+1 this month"
          />

          <StatCard
            title="Community Backing"
            value="447"
            description="Total upvotes and supporters"
            iconType="supporters"
            trend="+18.4%"
          />

          <StatCard
            title="Resolved Impact"
            value="1"
            description="33% resolution rate"
            iconType="projects"
            trend="100% verified"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("filed")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "filed"
                ? "bg-[#0c2340] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            Filed Challenges
          </button>

          <button
            onClick={() => setActiveTab("supported")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "supported"
                ? "bg-[#0c2340] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            Supported Challenges
          </button>
        </div>
      </div>

      {/* Challenge List */}
      {activeTab === "filed" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-[#0c2340]">
              My Submitted Challenges
            </h2>

            <span className="text-xs text-slate-400">
              {myChallenges.length} total records
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {myChallenges.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {item.id}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span className="text-xs font-semibold text-[#0c2340]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="mt-1 text-sm font-bold text-[#0c2340]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">{item.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <StatusBadge status={item.status} />

                  <div className="flex items-center gap-1 text-xs font-semibold text-rose-600">
                    <Heart className="h-3.5 w-3.5 fill-current" />
                    {item.supporters}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "supported" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-sm">
          <Heart className="mx-auto h-10 w-10 text-rose-500" />
          <h3 className="mt-4 text-lg font-bold text-[#0c2340]">
            No Supported Challenges Yet
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Challenges you support with upvotes will appear here.
          </p>
        </div>
      )}
    </div>
  );
}