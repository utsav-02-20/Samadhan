import {
  TrendingUp,
  ClipboardList,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const icons = {
  challenges: ClipboardList,
  review: Clock3,
  assigned: TrendingUp,
  projects: CheckCircle2,
};

export default function StatCard({
  title,
  value,
  description,
  type = "challenges",
}) {
  const Icon = icons[type] || ClipboardList;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-indigo-50 group-hover:text-indigo-900">
          <Icon size={20} />
        </div>

        <span className="text-xs font-medium text-emerald-600">
          +8.2%
        </span>

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}