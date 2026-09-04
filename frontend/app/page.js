import Link from "next/link";
import Image from "next/image";
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
  Mic,
  PhoneCall,
  Languages,
  Cpu,
  Globe,
  Bot,
  Radio,
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
      <header className="sticky top-0 z-50 border-b border-indigo-100 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-royal-gradient p-0.5 shadow-md shadow-indigo-500/20">
              <Image
                src="/logo.png"
                alt="Samadhan Logo"
                width={60}
                height={60}
                className="h-full w-full object-cover rounded-[10px]"
              />
            </div>

            <div>
              <div className="text-lg font-black tracking-tight text-slate-900">Samadhan</div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#401AD9]">
                Civic Innovation
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#401AD9]"
            >
              About
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#401AD9]"
            >
              How it works
            </a>

            <a
              href="#ecosystem"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#401AD9]"
            >
              Ecosystem
            </a>

            <a
              href="#roadmap"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#401AD9] flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              AI Roadmap
            </a>

            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#401AD9]"
            >
              Signup
            </Link>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-royal-gradient px-5 py-2.5 text-sm font-bold !text-white shadow-lg shadow-indigo-600/25 transition duration-300 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
          >
            Get started
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
              <span className="block text-[#401AD9]">challenges</span>
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-royal-gradient px-6 py-3.5 text-sm font-bold !text-white shadow-xl shadow-indigo-600/25 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-600/40"
              >
                Explore platform
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <a
                href="#ecosystem"
                className="inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white px-6 py-3.5 text-sm font-bold text-[#401AD9] shadow-sm transition hover:-translate-y-1 hover:border-indigo-400 hover:shadow-md"
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
                  <p className="mt-1 text-xs font-semibold text-[#401AD9]">
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
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#401AD9]">
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
                href="/login"
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
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#401AD9]">
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

      {/* Future AI & Voice Goals Section */}
      <section id="roadmap" className="relative overflow-hidden bg-slate-950 py-24 text-white">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                Future Targets & AI Vision
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-white">
                Next-Gen AI & Inclusive <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Grievance Registration
                </span>
              </h2>

              <p className="mt-4 text-lg text-slate-400">
                Breaking digital and literacy barriers through state-of-the-art Voice AI, Speech NLP, and Automated Phone Calling.
              </p>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm text-xs font-medium text-slate-300">
                <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                Live R&D Phase — Coming Soon
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Card 1: Multi-lingual Voice & Speech */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />
              
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 transition duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                <Mic className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/20">
                  Speech AI & NLP
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-white">
                Voice & Multi-Lingual Speech Registration
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Citizens can record voice notes or speak naturally in 12+ Indian regional languages. Advanced NLP transcribes, analyzes emotion, and extracts civic issues automatically.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 flex items-center gap-1"><Languages className="h-3.5 w-3.5 text-indigo-400" /> Regional Dialects</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Bot className="h-3.5 w-3.5 text-indigo-400" /> Speech-to-Text</span>
              </div>
            </div>

            {/* Card 2: Phone Call Grievance System */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 blur-2xl transition group-hover:bg-purple-500/20" />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 transition duration-300 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white">
                <PhoneCall className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-300 border border-purple-500/20">
                  IVR & Offline Access
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-white">
                Phone Call Grievance Hotline
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Enabling feature-phone users to lodge complaints via a simple phone call. AI voice agents handle toll-free calls, gather issue location, and log formal tickets into the Samadhan DB.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 flex items-center gap-1"><PhoneCall className="h-3.5 w-3.5 text-purple-400" /> Toll-free Hotline</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-purple-400" /> Zero Internet Needed</span>
              </div>
            </div>

            {/* Card 3: AI Smart Routing & Predictive Dispatch */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-pink-500/10 blur-2xl transition group-hover:bg-pink-500/20" />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-600/20 border border-pink-500/30 text-pink-400 transition duration-300 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white">
                <Cpu className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="rounded-md bg-pink-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-pink-300 border border-pink-500/20">
                  Smart AI Routing
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold text-white">
                Automated Categorization & Translation
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                LLM intelligence translates local dialect complaints into standardized department action items, tags urgency, and auto-dispatches challenges to the exact municipal authority.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-pink-400" /> Automated Dispatch</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-pink-400" /> Dialect Translation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-royal-gradient px-6 py-12 text-white shadow-2xl shadow-indigo-600/30 sm:px-10">
          {/* Decorative elements */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#401AD9]/20 blur-3xl" />
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