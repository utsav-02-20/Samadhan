"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ThumbsUp, MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import { toggleUpvote } from "@/services/citizen.service";

export default function ComplaintCard({ complaint, onUpvoteSuccess }) {
  const { getToken } = useAuth();
  const [upvotes, setUpvotes] = useState(complaint.upvotes || complaint.upvoteCount || 0);
  const [upvoted, setUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpvote(e) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    try {
      const token = await getToken();
      await toggleUpvote(complaint.id || complaint._id, token || undefined);
      setUpvotes((prev) => (upvoted ? prev - 1 : prev + 1));
      setUpvoted(!upvoted);
      if (onUpvoteSuccess) onUpvoteSuccess();
    } catch (err) {
      console.warn("Upvote failed offline:", err);
      // Local optimistic fallback
      setUpvotes((prev) => (upvoted ? prev - 1 : prev + 1));
      setUpvoted(!upvoted);
    } fontout: {
      setLoading(false);
    }
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="truncate font-bold text-slate-950 text-base">
              {complaint.title}
            </h3>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
              {complaint.status || "Submitted"}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-500 line-clamp-2">
            {complaint.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span>{complaint.id || complaint._id || "SAM-1000"}</span>
            <span>•</span>
            <span>{complaint.category}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {complaint.location || complaint.district || "General"}
            </span>
          </div>
        </div>

        {/* Upvote & Link Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={handleUpvote}
            disabled={loading}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
              upvoted
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{upvotes}</span>
          </button>

          <Link
            href={`/citizen/reports/${complaint.id || complaint._id}`}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 group-hover:text-slate-950"
          >
            Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
