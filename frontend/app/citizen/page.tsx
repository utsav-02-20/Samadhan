import Link from "next/link";
import Navbar from "../../components-citizen/layout/Navbar";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  MapPin,
  Camera,
  FileText,
  Clock,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#5cbdb9]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#1a4a6e]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#5cbdb9]/30 bg-[#5cbdb9]/10 px-4 py-2 text-sm font-semibold text-[#0c2340] shadow-sm">
              <Sparkles className="h-4 w-4 text-[#2d8a9e]" />
              Direct Citizen Action & Accountability
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#0c2340] sm:text-6xl lg:text-7xl">
              Turn your local{" "}
              <span className="block text-[#2d8a9e]">challenges</span>
              into real solutions.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Samadhan connects citizens directly to authorized government departments,
              universities, and innovators to solve civic problems with verified photo evidence,
              live geolocation, and transparent progress tracking.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0c2340] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#1a4a6e]"
              >
                Submit a challenge
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0c2340] shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                Explore open problems
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Live GPS & camera verification
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Official downloadable PDF receipts
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#5cbdb9]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-6 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Live State Network
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#0c2340]">
                    Jharkhand Innovation Grid
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Filed by Citizens</p>
                  <p className="mt-2 text-3xl font-bold text-[#0c2340]">248</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    Across 24 districts
                  </p>
                </div>

                <div className="rounded-2xl bg-[#5cbdb9]/10 p-5 border border-[#5cbdb9]/20">
                  <p className="text-sm text-[#0c2340] font-semibold">Under Resolution</p>
                  <p className="mt-2 text-3xl font-bold text-[#0c2340]">86</p>
                  <p className="mt-1 text-xs font-semibold text-[#2d8a9e]">
                    32 assigned to universities
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0c2340]">
                    Latest Citizen Reports
                  </h3>
                  <span className="text-xs font-medium text-slate-400">
                    Active Feed
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#0c2340]">
                        Bore well dry in Barha village
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        Ranchi district · In progress
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a4a6e]/10 text-[#1a4a6e]">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#0c2340]">
                        Block health centre weekend staffing
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        Dumka district · University Assigned
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">AI Triage</p>
                    <p className="text-xs font-bold text-[#0c2340]">Water Resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d8a9e]">
              Three Step Process
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0c2340] sm:text-4xl">
              From Local Problem to Real Impact
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500 text-sm sm:text-base">
              A transparent, accountable workflow that connects your submission with departments and universities.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c2340] text-white shadow-md">
                <Camera className="h-5 w-5" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                Step 01
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0c2340]">
                Report & Capture Evidence
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Take a live photo of the problem, write a description, and let your device pin the exact GPS coordinates.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c2340] text-white shadow-md">
                <Clock className="h-5 w-5" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                Step 02
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0c2340]">
                AI Triage & University Routing
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                The platform triages the issue to the relevant department or assigns research universities for technical solutions.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c2340] text-white shadow-md">
                <FileText className="h-5 w-5" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                Step 03
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0c2340]">
                Track Milestones & Download PDF
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Receive an official PDF submission receipt and monitor transparent status updates until the problem is solved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0c2340] px-8 py-12 text-white shadow-xl">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5cbdb9]/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#1a4a6e]/40 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to improve your neighborhood?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                File a challenge today and be part of the Samadhan civic network.
              </p>
            </div>

            <Link
              href="/submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-bold text-[#0c2340] shadow-lg transition hover:bg-slate-100"
            >
              Submit a Problem
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Samadhan Platform · Citizen Action Portal</p>
          <p>Dept. of Higher & Technical Education · Govt. of Jharkhand</p>
        </div>
      </footer>
    </main>
  );
}
