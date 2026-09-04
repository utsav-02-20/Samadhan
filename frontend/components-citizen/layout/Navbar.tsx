"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <Link href="/citizen" className="flex items-center gap-3">
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
            <div className="text-lg font-bold tracking-tight text-[#0c2340]">
              Samadhan
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              CITIZEN PORTAL
            </div>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/citizen/dashboard"
            className="text-sm font-medium text-slate-600 transition hover:text-[#0c2340]"
          >
            Explore Challenges
          </Link>

          <Link
            href="/citizen/report"
            className="text-sm font-medium text-slate-600 transition hover:text-[#0c2340]"
          >
            Submit Problem
          </Link>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-[#0c2340]"
          >
            How it works
          </a>
        </nav>

        {/* Auth CTA */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/citizen/dashboard"
                className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0c2340] shadow-sm transition hover:bg-slate-50 sm:inline-flex"
              >
                Go to Dashboard
              </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal" fallbackRedirectUrl="/citizen/dashboard">
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1a4a6e]">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
