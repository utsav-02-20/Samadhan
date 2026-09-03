"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = {
  government: [
    { name: "Dashboard", href: "/government/dashboard", icon: "⌂" },
    { name: "Challenges", href: "/government/challenges", icon: "◇" },
    { name: "Projects", href: "/government/projects", icon: "▣" },
  ],

  department: [
    { name: "Dashboard", href: "/department/dashboard", icon: "⌂" },
    { name: "Challenges", href: "/department/challenges", icon: "◇" },
    { name: "Projects", href: "/department/projects", icon: "▣" },
  ],

  citizen: [
    { name: "Dashboard", href: "/citizen/dashboard", icon: "⌂" },
    { name: "My Challenges", href: "/citizen/challenges", icon: "◇" },
    { name: "Submit Challenge", href: "/citizen/challenges/new", icon: "+" },
    { name: "Profile", href: "/citizen/profile", icon: "○" },
  ],

  university: [
    { name: "Dashboard", href: "/university/dashboard", icon: "⌂" },
    { name: "Challenges", href: "/university/challenges", icon: "◇" },
    { name: "Submissions", href: "/university/submissions", icon: "▣" },
    { name: "Profile", href: "/university/profile", icon: "○" },
  ],
};

export default function Sidebar({ role = "government" }) {
  const pathname = usePathname();

  const items = navigation[role] || navigation.government;

  const roleName =
    role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
            <Image
              src="/logo.png"
              alt="Samadhan Logo"
              width={60}
              height={60}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-950">
              Samadhan
            </p>

            <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-400">
              CIVIC INNOVATION
            </p>
          </div>

        </Link>
      </div>


      {/* Role */}
      <div className="px-5 pt-6">

        <div className="rounded-xl bg-slate-50 px-4 py-3">

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Portal
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            {roleName}
          </p>

        </div>

      </div>


      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Navigation
        </p>

        <div className="space-y-1">

          {items.map((item) => {

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${active
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white"
                    }`}
                >
                  {item.icon}
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


      {/* Bottom */}
      <div className="border-t border-slate-100 p-4">

        <div className="flex items-center gap-3 rounded-xl p-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {roleName.charAt(0)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Demo User
            </p>

            <p className="truncate text-xs text-slate-400">
              {roleName} Portal
            </p>
          </div>

        </div>

        <Link
          href="/"
          className="mt-2 block rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          ← Back to home
        </Link>

      </div>

    </aside>
  );
}