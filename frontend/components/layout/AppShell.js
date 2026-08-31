"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
  children,
  role = "government",
}) {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main area */}
      <div className="ml-64 min-h-screen">

        {/* Topbar */}
        <Topbar role={role} />

        {/* Page content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}