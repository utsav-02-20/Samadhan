"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import useCitizenAutoRegister from "@/hooks/useCitizen";

export default function AppShell({
  children,
  role = "citizen",
}: {
  children: React.ReactNode;
  role?: string;
}) {
  useCitizenAutoRegister();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Fixed Sidebar */}
      <Sidebar role={role} />

      {/* Main Area with Sidebar Margin */}
      <div className="ml-64 flex min-h-screen flex-col">
        {/* Sticky Topbar */}
        <Topbar role={role} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>

        {/* App Footer */}
        <footer className="border-t border-slate-200/80 bg-white px-8 py-4 text-xs text-slate-400">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p>Samadhan Platform · Citizen Action & Grievance Grid</p>
            <p>Government of Jharkhand & Partner Universities</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
