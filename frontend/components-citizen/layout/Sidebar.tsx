"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  User,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const navigationItems = [
  { name: "Explore Challenges", href: "/citizen/dashboard", icon: LayoutDashboard },
  { name: "Submit Challenge", href: "/citizen/submit", icon: PlusCircle },
  { name: "My Profile", href: "/citizen/user/citizen", icon: User },
];

export default function Sidebar({ role = "citizen" }: { role?: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Brand Header */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c2340] text-base font-bold text-white shadow-md">
            S
          </div>

          <div>
            <p className="text-base font-bold tracking-tight text-[#0c2340]">
              Samadhan
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              CITIZEN PORTAL
            </p>
          </div>
        </Link>
      </div>

      {/* Role Badge / Active portal card */}
      <div className="px-5 pt-6">
        <div className="rounded-xl border border-[#5cbdb9]/20 bg-[#5cbdb9]/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d8a9e]">
              Active Portal
            </p>
            <ShieldCheck className="h-3.5 w-3.5 text-[#2d8a9e]" />
          </div>
          <p className="mt-0.5 text-sm font-bold capitalize text-[#0c2340]">
            Citizen Workspace
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Navigation
        </p>

        <div className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " +
                  (active
                    ? "bg-[#0c2340] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#5cbdb9]/10 hover:text-[#0c2340]")
                }
              >
                <span
                  className={
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition " +
                    (active
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#0c2340]")
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Profile & Shortcut */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5cbdb9]/15 text-sm font-bold text-[#0c2340]">
            C
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0c2340]">
              Verified Citizen
            </p>
            <p className="truncate text-xs text-slate-400">
              Jharkhand Grid
            </p>
          </div>
        </div>

        <Link
          href="/citizen"
          className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0c2340]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to landing
        </Link>
      </div>
    </aside>
  );
}
