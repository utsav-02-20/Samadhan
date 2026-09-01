import React from "react";
import {
  TrendingUp,
  ClipboardList,
  Clock3,
  CheckCircle2,
  Heart,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  iconType?: "challenges" | "review" | "assigned" | "projects" | "supporters";
  trend?: string;
}

const icons = {
  challenges: ClipboardList,
  review: Clock3,
  assigned: TrendingUp,
  projects: CheckCircle2,
  supporters: Heart,
};

export default function StatCard({
  title,
  value,
  description,
  iconType = "challenges",
  trend = "+8.2%",
}: StatCardProps) {
  const Icon = icons[iconType] || ClipboardList;

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5cbdb9]/10 text-[#0c2340] transition group-hover:bg-[#5cbdb9]/20">
          <Icon className="h-5 w-5" />
        </div>

        {trend && (
          <span className="text-xs font-semibold text-[#2d8a9e]">
            {trend}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-[#0c2340]">
        {value}
      </p>
      {description && (
        <p className="mt-2 text-xs text-slate-400">{description}</p>
      )}
    </div>
  );
}
