"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, Building2, Send, CheckCircle2 } from "lucide-react";

export default function NewDepartmentPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [head, setHead] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: POST /api/departments
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <Link
            href="/department/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Register Department Unit
              </h1>
              <p className="text-xs text-slate-500">
                Configure new department node for routed grievance tracking.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="mt-8 rounded-2xl bg-emerald-50 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <h2 className="mt-3 font-bold text-slate-900">
                Department Registered
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                The department node has been successfully provisioned.
              </p>

              <Link
                href="/department/dashboard"
                className="mt-5 inline-block rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
              >
                Return to Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Department Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Public Works Department"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Short Code
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. PWD"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Department Head Name
                </label>
                <input
                  type="text"
                  required
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                  placeholder="e.g. Officer Name"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="department@samadhan.gov"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
                Register Department Node
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}