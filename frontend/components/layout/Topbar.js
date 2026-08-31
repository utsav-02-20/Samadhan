"use client";

import { useState } from "react";

export default function Topbar({ role = "government" }) {
  const [open, setOpen] = useState(false);

  const roleName =
    role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur">

      {/* LEFT */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {roleName} Portal
        </p>

        <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
          Welcome back
        </h1>
      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">

          <span className="mr-2 text-slate-400">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

          <span className="ml-3 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            /
          </span>

        </div>


        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-50"
        >
          ♢

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600" />
        </button>


        {/* Profile */}
        <div className="relative">

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
              {roleName.charAt(0)}
            </div>

            <div className="hidden text-left sm:block">

              <p className="text-sm font-semibold text-slate-900">
                Demo User
              </p>

              <p className="text-[11px] text-slate-400">
                {roleName}
              </p>

            </div>

            <span className="text-xs text-slate-400">
              ▼
            </span>

          </button>


          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Profile
              </button>

              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Settings
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Sign out
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}