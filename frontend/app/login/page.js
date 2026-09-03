import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Landmark,
  Users,
  Handshake,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

import Logo from "@/components/ui/Logo";

const roles = [
  {
    title: "Citizen",
    short: "C",
    description:
      "Raise civic challenges, follow submissions and stay connected with their progress.",
    // href: "/login/citizen",
    href: `/citizen/auth/sign-in`,
    icon: Users,
    accent: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600",
    badge: "Public access",
  },
  {
    title: "Government",
    short: "G",
    description:
      "Review challenges, assign departments, approve solutions and oversee projects.",
    href: "/login/government",
    //href: "/government/auth/sign-in",
    icon: Landmark,
    accent: "bg-indigo-50 text-[#401AD9]",
    hover: "group-hover:bg-[#401AD9]",
    badge: "Administration",
  },
  {
    title: "Department",
    short: "D",
    description:
      "Manage assigned challenges, execute projects and report implementation progress.",
    // href: "/login/department",
    href: "/department/auth/sign-in",
    icon: Building2,
    accent: "bg-violet-50 text-violet-600",
    hover: "group-hover:bg-violet-600",
    badge: "Operations",
  },
  {
    title: "University",
    short: "U",
    description:
      "Discover civic challenges and collaborate on innovative solutions and projects.",
    href: "/login/university",
    // href: "/university/auth/sign-in",
    icon: GraduationCap,
    accent: "bg-emerald-50 text-emerald-600",
    hover: "group-hover:bg-emerald-600",
    badge: "Innovation",
  },
  {
    title: "Partner",
    short: "P",
    description:
      "Collaborate with Samadhan on projects, initiatives and meaningful civic impact.",
    href: "/login/partner",
    //href: "/partner/auth/sign-in",
    icon: Handshake,
    accent: "bg-amber-50 text-amber-600",
    hover: "group-hover:bg-amber-600",
    badge: "Collaboration",
  },
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-200/25 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">

        {/* Navbar */}
        <header className="flex items-center justify-between">
          <Logo href="/" subtitle="Civic Innovation" />

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
          >
            <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
            Home
          </Link>
        </header>

        {/* Content */}
        <section className="flex flex-1 items-center justify-center py-14 lg:py-20">
          <div className="w-full max-w-6xl">

            {/* Heading */}
            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-bold text-[#401AD9] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Secure platform access
              </div>

              <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className="text-[#401AD9]">Samadhan</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Choose the portal that matches your role. Each workspace is
                designed around the responsibilities of its community.
              </p>
            </div>

            {/* Role selection */}
            <div className="mx-auto mt-12 max-w-5xl">

              {/* First row */}
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {roles.slice(0, 3).map((role) => (
                  <RoleCard key={role.title} role={role} />
                ))}
              </div>

              {/* Second row */}
              <div className="mx-auto mt-5 grid max-w-[670px] gap-5 md:grid-cols-2">
                {roles.slice(3).map((role) => (
                  <RoleCard key={role.title} role={role} />
                ))}
              </div>
            </div>

            {/* Security note */}
            <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 text-center shadow-sm backdrop-blur">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>

              <p className="text-xs leading-5 text-slate-500">
                Your portal determines what information and actions are
                available to your account.
              </p>
            </div>

            {/* Signup */}
            <div className="mt-8 text-center">
              <span className="text-sm text-slate-500">
                New to Samadhan?
              </span>

              <Link
                href="/create-account"
                className="ml-2 text-sm font-bold text-[#401AD9] transition hover:text-indigo-700"
              >
                Create an account
                <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>Samadhan Civic Innovation Platform</p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            Role-based access
          </div>
        </footer>
      </div>
    </main>
  );
}

function RoleCard({ role }) {
  const Icon = role.icon;

  return (
    <Link
      href={role.href}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/10"
    >
      {/* Top accent */}
      <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-[#401AD9] transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${role.accent} ${role.hover} group-hover:text-white`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <span className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {role.badge}
        </span>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          {role.title}
        </h2>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 group-hover:bg-slate-950 group-hover:text-white">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
        {role.description}
      </p>

      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-bold text-slate-700 transition group-hover:text-[#401AD9]">
        Continue as {role.title}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}