"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBadge from "../../../../components-citizen/ui/StatusBadge";
import {
  Heart,
  MapPin,
  Calendar,
  Filter,
  PlusCircle,
  Sparkles,
} from "lucide-react";

type CardItem = {
  id: number;
  category: string;
  status: string;
  title: string;
  district: string;
  districtShort: string;
  desc: string;
  supporters: number;
  imageSrc: string;
};

const initialCards: CardItem[] = [
  {
    id: 1,
    category: "WATER RESOURCES",
    status: "IN PROGRESS",
    title: "Bore well dry in Barha village for over a month",
    district: "Ranchi district · 02 Jul 2026",
    districtShort: "Ranchi district",
    desc: "The only working bore well has run dry, forcing families to walk 4 km each morning for drinking water.",
    supporters: 142,
    imageSrc: "/assets/citizen/challenge-water.jpg",
  },
  {
    id: 2,
    category: "HEALTHCARE",
    status: "UNIVERSITY ASSIGNED",
    title: "No doctor on weekends at the block health centre",
    district: "Dumka district · 28 Jun 2026",
    districtShort: "Dumka district",
    desc: "The rural health post stays shut Saturday and Sunday, leaving around 2,000 residents without any care.",
    supporters: 96,
    imageSrc: "/assets/citizen/challenge-health.jpg",
  },
  {
    id: 3,
    category: "URBAN DEVELOPMENT",
    status: "SOLVED",
    title: "Drainage floods the Market Road lane every monsoon",
    district: "Ramgarh district · 11 May 2026",
    districtShort: "Ramgarh district",
    desc: "Standing water blocks the main market lane for weeks, damaging stock and cutting off two wards.",
    supporters: 231,
    imageSrc: "/assets/citizen/challenge-urban.jpg",
  },
  {
    id: 4,
    category: "ENERGY",
    status: "ROUTED",
    title: "Village school has no reliable power after 6 pm",
    district: "Giridih district · 19 Jul 2026",
    districtShort: "Giridih district",
    desc: "Evening study batches run under one dim bulb; the grid supply fails for six to eight hours daily.",
    supporters: 74,
    imageSrc: "/assets/citizen/challenge-energy.jpg",
  },
  {
    id: 5,
    category: "AGRICULTURE",
    status: "VALIDATED",
    title: "No dependable water for cattle in the dry stretch",
    district: "Chatra district · 24 Jul 2026",
    districtShort: "Chatra district",
    desc: "Farmers across the block report no livestock water source between April and June.",
    supporters: 58,
    imageSrc: "/assets/citizen/challenge-agri.jpg",
  },
  {
    id: 6,
    category: "EDUCATION",
    status: "SUBMITTED",
    title: "Girls drop out after class 8 for want of a nearby school",
    district: "Palamu district · 26 Aug 2026",
    districtShort: "Palamu district",
    desc: "The nearest secondary school is 9 km away with no bus, and enrolment falls sharply after class 8.",
    supporters: 33,
    imageSrc: "/assets/citizen/challenge-education.jpg",
  },
];

const CATEGORIES = [
  "ALL",
  "WATER RESOURCES",
  "AGRICULTURE",
  "HEALTHCARE",
  "EDUCATION",
  "ENERGY",
  "URBAN DEVELOPMENT",
  "ENVIRONMENT",
  "ACCESSIBILITY",
];

const DISTRICTS = [
  "All Districts",
  "Ranchi district",
  "Dumka district",
  "Ramgarh district",
  "Giridih district",
  "Chatra district",
  "Palamu district",
];

const STATUSES = [
  "All Statuses",
  "IN PROGRESS",
  "UNIVERSITY ASSIGNED",
  "SOLVED",
  "ROUTED",
  "VALIDATED",
  "SUBMITTED",
];

export default function DashboardPage() {
  const [activeCat, setActiveCat] = useState("ALL");
  const [districtF, setDistrictF] = useState("All Districts");
  const [statusF, setStatusF] = useState("All Statuses");
  const [cards, setCards] = useState(initialCards);

  const filtered = cards.filter((c) => {
    if (activeCat !== "ALL" && c.category !== activeCat) return false;
    if (districtF !== "All Districts" && c.districtShort !== districtF) return false;
    if (statusF !== "All Statuses" && c.status !== statusF) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#5cbdb9]/15 border border-[#5cbdb9]/30 px-2.5 py-0.5 text-xs font-bold text-[#0c2340]">
              Community Feed
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {filtered.length + " challenges active"}
            </span>
          </div>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0c2340] sm:text-3xl">
            Statewide Citizen Challenges
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Explore verified problems submitted by citizens and monitor progress across departments.
          </p>
        </div>

        {/* Submit Challenge CTA: Deep navy #0c2340 background with white text; hover to mid blue #1a4a6e */}
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a4a6e]"
        >
          <PlusCircle className="h-4 w-4" />
          Submit Challenge
        </Link>
      </div>

      {/* Filter Section: White background with light gray border */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Filter by Domain
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = activeCat === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCat(category)}
                  className={
                    "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition " +
                    (active
                      ? "bg-[#0c2340] text-white shadow-sm"
                      : "bg-white text-[#0c2340] border border-slate-200 hover:bg-[#5cbdb9]/10")
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns: White background, light gray border, navy text */}
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={districtF}
              onChange={(e) => setDistrictF(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#0c2340] outline-none"
            >
              {DISTRICTS.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={statusF}
              onChange={(e) => setStatusF(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#0c2340] outline-none"
            >
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          {(activeCat !== "ALL" || districtF !== "All Districts" || statusF !== "All Statuses") && (
            <button
              onClick={() => {
                setActiveCat("ALL");
                setDistrictF("All Districts");
                setStatusF("All Statuses");
              }}
              className="text-xs font-semibold text-[#2d8a9e] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Challenge cards: White background with light gray border and soft shadow */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card) => (
          <div
            key={card.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3">
                <StatusBadge status={card.status} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              {/* Category tag: Light teal tint (#5cbdb9 at ~12% opacity) with navy #0c2340 text */}
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#5cbdb9]/15 text-[#0c2340] border border-[#5cbdb9]/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  {card.category}
                </span>
              </div>

              {/* Card title: Navy #0c2340 */}
              <h3 className="mt-3 text-base font-bold text-[#0c2340] leading-snug">
                {card.title}
              </h3>

              {/* Location/date text: Muted slate gray */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{card.district}</span>
              </div>

              {/* Subtitle / secondary text: Muted slate gray */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                {card.desc}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setCards((prev) =>
                      prev.map((item) =>
                        item.id === card.id
                          ? { ...item, supporters: item.supporters + 1 }
                          : item
                      )
                    )
                  }
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
                  <span>{card.supporters + " Supporters"}</span>
                </button>

                <span className="text-[11px] font-bold text-[#2d8a9e] hover:text-[#1a4a6e]">
                  Track progress →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
