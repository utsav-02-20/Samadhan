"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Camera,
  Building2,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { useUser, useAuth, UserButton } from "@clerk/nextjs";
import { getCitizenHistory, getPublicFeed, toReportView } from "@/services/citizen.service";
import { REPORT_DETAILS_MOCK as reports } from "@/data/demoData";

export default function ReportDetails({ params }) {
  const { id } = use(params);
  const { user } = useUser();
  const { getToken } = useAuth();
  
  const initialFallback = reports[id] || reports["SAM-1024"] || {
    id: id || "SAM-1024",
    title: "Civic Issue Report",
    category: "Infrastructure",
    status: "Pending",
    reportedOn: "Recently",
    location: "Sector 4, Main Market",
    department: "Municipal Operations",
    description: "Civic issue submitted via Samadhan Portal.",
  };

  const [report, setReport] = useState(initialFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const token = await getToken();
        let foundItem = null;

        if (user) {
          const userHistoryRes = await getCitizenHistory(user.id, token || undefined).catch(() => null);
          const historyList = userHistoryRes?.data || [];
          foundItem = historyList.find(
            (item) => String(item._id || item.id) === String(id) || String(item._id).slice(-8) === String(id)
          );
        }

        if (!foundItem) {
          const publicFeedRes = await getPublicFeed().catch(() => null);
          const publicList = publicFeedRes?.data || [];
          foundItem = publicList.find(
            (item) => String(item._id || item.id) === String(id) || String(item._id).slice(-8) === String(id)
          );
        }

        if (foundItem) {
          const formatted = toReportView(foundItem);
          setReport({
            ...initialFallback,
            ...formatted,
            title: foundItem.title || initialFallback.title,
            category: foundItem.category || initialFallback.category,
            description: foundItem.description || initialFallback.description,
            location: typeof foundItem.location === "object" ? (foundItem.locality || foundItem.district || "General Locality") : (foundItem.location || initialFallback.location),
            department: foundItem.assignedDepartmentId || foundItem.targetDepartment || foundItem.department || initialFallback.department,
            images: foundItem.images && foundItem.images.length > 0 ? foundItem.images : initialFallback.images,
          });
        }
      } catch (err) {
        console.error("Could not load report details from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, user, getToken]);

  // Dynamic DB status calculation for resolution timeline
  const dbStatus = String(report.status || "Pending").toUpperCase();
  const dateStr = report.reportedOn || (report.createdAt ? new Date(report.createdAt).toLocaleDateString("en-IN") : "Recently");

  const isVerified = dbStatus !== "PENDING" && dbStatus !== "SUBMITTED" && dbStatus !== "OPEN";
  const isAssigned = isVerified && (dbStatus === "ASSIGNED" || dbStatus === "IN_PROGRESS" || dbStatus === "IN PROGRESS" || dbStatus === "ACCEPTED" || dbStatus === "RESOLVED");
  const isInProgress = isVerified && (dbStatus === "IN_PROGRESS" || dbStatus === "IN PROGRESS" || dbStatus === "RESOLVED");
  const isResolved = dbStatus === "RESOLVED" || dbStatus === "RESOLVED";

  const dynamicUpdates = [
    {
      title: "Issue reported",
      description: "Your complaint was successfully submitted to the Samadhan platform.",
      date: dateStr,
      completed: true,
    },
    {
      title: "Issue verified",
      description: isVerified ? "The complaint was reviewed and verified by district administration." : "Awaiting verification by district administration.",
      date: isVerified ? dateStr : "Pending",
      completed: isVerified,
    },
    {
      title: "Assigned to department",
      description: isAssigned ? `The issue was assigned to ${report.department || "Municipal Operations"}.` : "Pending department allocation.",
      date: isAssigned ? dateStr : "Pending",
      completed: isAssigned,
    },
    {
      title: "Work in progress",
      description: isInProgress ? "The assigned department is currently executing ground resolution." : "Ground execution pending.",
      date: isInProgress ? dateStr : "Pending",
      completed: isInProgress,
    },
    {
      title: "Resolved",
      description: isResolved ? "Complaint successfully resolved on ground." : "Waiting for department resolution.",
      date: isResolved ? dateStr : "Pending",
      completed: isResolved,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* NAVBAR */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <Logo href="/citizen/dashboard" subtitle="Citizen Portal" />

          <nav className="ml-auto flex items-center gap-2">

            <Link
              href="/citizen/dashboard"
              className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-[#401AD9]"
            >
              Dashboard
            </Link>

            <Link
              href="/citizen/reports"
              className="rounded-xl border border-indigo-200 bg-indigo-50/80 px-4 py-2 text-xs font-black text-[#401AD9] transition hover:bg-indigo-100"
            >
              My Reports
            </Link>

            <Link
              href="/citizen/report"
              className="rounded-xl bg-royal-gradient px-4 py-2 text-xs font-black !text-white shadow-md shadow-indigo-600/20 transition hover:shadow-lg hover:-translate-y-0.5"
            >
              Report Issue
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border-2 border-indigo-200 shadow-sm ml-2",
                },
              }}
            />

          </nav>

        </div>

      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* BACK */}

        <Link
          href="/citizen/reports"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my reports
        </Link>

        {/* HEADER */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex flex-col justify-between gap-6 md:flex-row">

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[9px] font-black text-blue-600">
                  {dbStatus.toUpperCase()}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-black text-slate-500">
                  {report.category}
                </span>

              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight">
                {report.title}
              </h1>

              <p className="mt-2 text-sm font-bold text-slate-400">
                Report ID: {id}
              </p>

            </div>

            <div className="flex h-fit items-center gap-2 rounded-xl bg-amber-50 px-4 py-3">

              <Clock3 className="h-4 w-4 text-amber-600" />

              <div>

                <p className="text-[9px] font-black uppercase text-amber-600">
                  Live DB status
                </p>

                <p className="text-xs font-black text-amber-800">
                  {dbStatus}
                </p>

              </div>

            </div>

          </div>

          <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-500">
            {report.description}
          </p>

        </section>

        {/* INFORMATION */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2">

          <Info
            icon={MapPin}
            label="Location"
            value={report.location}
          />

          <Info
            icon={CalendarDays}
            label="Reported On"
            value={report.reportedOn}
          />

          <Info
            icon={Building2}
            label="Assigned Department"
            value={report.department}
          />

          <Info
            icon={AlertCircle}
            label="Report ID"
            value={id}
          />

        </section>

        {/* TIMELINE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-black">
            Resolution Timeline
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Track the progress of your reported issue directly from database updates.
          </p>

          <div className="mt-7">

            {dynamicUpdates.map((update, index) => (

              <div
                key={update.title}
                className="relative flex gap-4 pb-8 last:pb-0"
              >

                {/* CONNECTING LINE */}

                {index !== dynamicUpdates.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-8 h-full w-px ${
                      update.completed
                        ? "bg-emerald-300"
                        : "bg-slate-200"
                    }`}
                  />
                )}

                {/* ICON */}

                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    update.completed
                      ? "bg-emerald-100 ring-2 ring-emerald-400/20"
                      : "bg-slate-100"
                  }`}
                >

                  {update.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Clock3 className="h-4 w-4 text-slate-400" />
                  )}

                </div>

                {/* CONTENT */}

                <div className="flex-1">

                  <div className="flex flex-col justify-between gap-1 sm:flex-row">

                    <h3 className="text-sm font-black">
                      {update.title}
                    </h3>

                    <span className="text-[10px] font-bold text-slate-400">
                      {update.date}
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {update.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* EVIDENCE */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Camera className="h-5 w-5 text-slate-600" />
            </div>

            <div>

              <h2 className="font-black">
                Submitted Evidence
              </h2>

              <p className="text-xs text-slate-400">
                Photo submitted with this report.
              </p>

            </div>

          </div>

          {report.images && report.images.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {report.images.map((imgUrl, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      imgUrl && typeof imgUrl === "string"
                        ? (imgUrl.startsWith("/uploads/") ? `http://localhost:5000${imgUrl}` : imgUrl)
                        : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={`Evidence ${idx + 1}`}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <div className="text-center">
                <Camera className="mx-auto h-7 w-7 text-slate-300" />
                <p className="mt-2 text-xs font-bold text-slate-400">
                  No image attached
                </p>
                <p className="mt-1 text-[10px] text-slate-300">
                  Citizen submitted report without photo attachment
                </p>
              </div>
            </div>
          )}

        </section>

        {/* ACTION */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <Link
            href="/citizen/reports"
            className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-center text-xs font-bold text-[#401AD9] shadow-sm transition hover:bg-indigo-50 hover:shadow-md"
          >
            Back to reports
          </Link>

          <Link
            href="/citizen/report"
            className="rounded-xl bg-royal-gradient px-5 py-3 text-center text-xs font-bold !text-white shadow-md shadow-indigo-600/20 transition hover:shadow-lg hover:-translate-y-0.5"
          >
            Report another issue
          </Link>

        </div>

      </div>

    </main>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}) {
  const isLocation = label === "Location" || Boolean(href);
  const mapsUrl = href || (isLocation ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(value || ""))}` : null);

  const cardContent = (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition ${mapsUrl ? "hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer group" : ""}`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${mapsUrl ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          <Icon className="h-4 w-4" />
        </div>
        {mapsUrl && (
          <span className="text-[10px] font-bold text-emerald-600 group-hover:underline">
            Google Maps ↗
          </span>
        )}
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-sm font-black ${mapsUrl ? "text-slate-900 group-hover:text-emerald-700" : ""}`}>
        {value}
      </p>
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
