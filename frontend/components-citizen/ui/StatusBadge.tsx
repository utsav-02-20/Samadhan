import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStyle = (s: string) => {
    switch (s?.toUpperCase()) {
      case "SOLVED":
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "IN PROGRESS":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "UNIVERSITY ASSIGNED":
      case "ASSIGNED":
        return "bg-[#1a4a6e] text-white border-[#1a4a6e]";
      case "VALIDATED":
        return "bg-[#5cbdb9]/20 text-[#0c2340] border-[#5cbdb9]/40";
      case "ROUTED":
      case "UNDER REVIEW":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <span
      className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold " + getStyle(status)}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
