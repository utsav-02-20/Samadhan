"use client";

import { useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Search, Bell, Sparkles } from "lucide-react";

export default function Topbar({ role = "citizen" }: { role?: string }) {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white px-6 lg:px-8">
      {/* LEFT: Breadcrumb & Title */}
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Citizen Grievance & Solution Hub
          </p>
        </div>

        <h1 className="mt-0.5 text-xl font-bold tracking-tight text-[#0c2340]">
          Welcome{user?.firstName ? (", " + user.firstName) : " back"}
        </h1>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-white px-3 py-2 md:flex">
          <Search className="mr-2 h-4 w-4 text-[#0c2340]/60" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-44 bg-transparent text-sm text-[#0c2340] outline-none placeholder:text-[#0c2340]/50"
          />
          <span className="ml-3 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            /
          </span>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-[#5cbdb9]/10 hover:text-[#0c2340]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#2d8a9e] ring-2 ring-white" />
        </button>

        {/* Auth profile widget */}
        <div className="flex items-center">
          {isSignedIn ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 shadow-sm">
              <UserButton />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-[#0c2340]">
                  {user?.fullName || "Citizen User"}
                </p>
                <p className="text-[10px] text-slate-400">Verified Citizen</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <button className="rounded-xl bg-[#0c2340] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1a4a6e]">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
