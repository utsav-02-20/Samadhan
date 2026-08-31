import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Landmark,
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  CircleDot,
  Sparkles,
} from "lucide-react";

const roles = [
  {
    title: "Government",
    description:
      "Review civic challenges, assign departments, approve solutions and monitor projects.",
    href: "/government/dashboard",
    icon: Landmark,
    label: "Administration",
  },
  {
    title: "Department",
    description:
      "Manage assigned challenges, work on projects and track implementation progress.",
    href: "/department/dashboard",
    icon: Building2,
    label: "Operations",
  },
  {
    title: "Citizen",
    description:
      "Raise civic challenges, follow their status and stay connected with solutions.",
    href: "/citizen/dashboard",
    icon: Users,
    label: "Community",
  },
  {
    title: "University",
    description:
      "Discover civic challenges and collaborate on meaningful projects and solutions.",
    href: "/university/dashboard",
    icon: GraduationCap,
    label: "Innovation",
  },
];

const activities = [
  {
    title: "New challenge submitted",
    text: "Water conservation initiative",
    icon: CircleDot,
  },
  {
    title: "Challenge assigned",
    text: "Department of Urban Development",
    icon: Building2,
  },
  {
    title: "Project milestone completed",
    text: "Smart city accessibility project",
    icon: CheckCircle2,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white shadow-lg shadow-slate-900/10">
              S
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">Samadhan</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Civic Innovation
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              About
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              How it works
            </a>

            <a
              href="#ecosystem"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Ecosystem
            </a>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold !text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        id="about"
        className="relative overflow-hidden border-b border-slate-200"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
          {/* Left */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Building better solutions together
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Turning civic
              <span className="block text-indigo-600">challenges</span>
              into solutions.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Samadhan connects citizens, universities, government departments
              and innovators to transform real-world challenges into meaningful
              projects and measurable impact.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold !text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-1 hover:bg-slate-800"
              >
                Explore platform
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <a
                href="#ecosystem"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                View ecosystem
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Structured workflows
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                End-to-end tracking
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-indigo-100/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
              {/* Preview header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Platform overview
                  </p>

                  <h2 className="mt-1 text-xl font-bold">Civic Impact Hub</h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Challenges</p>
                  <p className="mt-2 text-3xl font-bold">248</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    +18% this month
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-5">
                  <p className="text-sm text-indigo-500">Projects</p>
                  <p className="mt-2 text-3xl font-bold text-indigo-950">
                    86
                  </p>
                  <p className="mt-1 text-xs font-semibold text-indigo-600">
                    32 in progress
                  </p>
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Recent activity</h3>
                  <span className="text-xs font-medium text-slate-400">
                    Today
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={activity.title}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">
                            {activity.title}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            {activity.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating status */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Project status</p>
                    <p className="text-sm font-bold">On track</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            The ecosystem
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            One platform.
            <br />
            Four connected roles.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Every role has a dedicated workspace while remaining connected to
            the same civic challenge and project lifecycle.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Link
                key={role.title}
                href={role.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-900" />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-widest text-slate-400">
                  {role.label}
                </p>

                <h3 className="mt-2 text-xl font-bold">{role.title}</h3>

                <p className="mt-3 min-h-[84px] text-sm leading-6 text-slate-500">
                  {role.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5 text-sm font-bold text-slate-900">
                  Open dashboard
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              How it works
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              From challenge to impact
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              A structured workflow that keeps every stakeholder connected.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              [
                "01",
                "Identify",
                "Citizens and stakeholders submit real-world civic challenges.",
              ],
              [
                "02",
                "Review",
                "Government reviews challenges and determines the right department.",
              ],
              [
                "03",
                "Collaborate",
                "Departments and universities work together on solutions.",
              ],
              [
                "04",
                "Track",
                "Projects are monitored through milestones and progress updates.",
              ],
            ].map(([number, title, text]) => (
              <div key={number} className="relative">
                <div className="text-5xl font-black text-slate-100">
                  {number}
                </div>

                <h3 className="mt-2 text-lg font-bold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 px-6 py-10 text-white shadow-lg sm:px-8">
          {/* Decorative elements */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to drive civic change?
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                Join the Samadhan platform and turn challenges into solutions.
              </p>
            </div>

            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold !text-black shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Samadhan Civic Innovation Platform</p>
          <p>Connecting challenges, people and solutions.</p>
        </div>
      </footer>
    </main>
  );
}