import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

const links = [
  { href: "/government/dashboard", label: "Government" },
  { href: "/department/dashboard", label: "Department" },
  { href: "/citizen/dashboard", label: "Citizen" },
  { href: "/university/dashboard", label: "University" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16 lg:px-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#401AD9]">404</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                The page you tried to open does not exist or has moved.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold !text-white">
                  <Home className="h-4 w-4" /> Home
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Link>
              </div>
              <div className="mt-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Quick links</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 p-8 sm:p-12">
              <div className="text-center text-white">
                <Search className="mx-auto h-14 w-14 text-[#7c6cff]" />
                <p className="mt-5 text-2xl font-bold">Lost route</p>
                <p className="mt-2 text-sm text-slate-300">Let’s guide you back into the platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
