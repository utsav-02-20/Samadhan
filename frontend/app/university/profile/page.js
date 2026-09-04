"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Save,
  Lock,
  Bell,
} from "lucide-react";

export default function UniversityProfilePage() {
  const [profile, setProfile] = useState({
    university: "IIIT Bhagalpur",
    email: "admin@iiitbh.ac.in",
    phone: "+91 98765 43210",
    location: "Bhagalpur, Bihar",
    coordinator: "University Coordinator",
    website: "https://iiitbh.ac.in",
  });

  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  }

  function saveProfile(e) {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <Link
              href="/university/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-3">

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
                <p className="text-sm font-black">
                  Samadhan
                </p>

                <p className="text-xs text-slate-400">
                  University Portal
                </p>
              </div>

            </div>

          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
            UB
          </div>

        </div>

      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* TITLE */}

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            University Portal
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Profile & Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your university information and Samadhan
            portal preferences.
          </p>

        </div>

        {/* PROFILE CARD */}

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="bg-slate-950 px-7 py-8 text-white">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-3xl font-black text-slate-950">
                II
              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Registered Institution
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  {profile.university}
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  Verified University Account
                </p>

              </div>

              <div className="sm:ml-auto">

                <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  VERIFIED
                </span>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={saveProfile}
            className="p-7"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <h2 className="font-black">
                  Institution Information
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Keep your university details up to date.
                </p>

              </div>

            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              <Field
                label="University Name"
                name="university"
                value={profile.university}
                onChange={handleChange}
                icon={Building2}
              />

              <Field
                label="Official Email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                icon={Mail}
              />

              <Field
                label="Contact Number"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                icon={Phone}
              />

              <Field
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                icon={MapPin}
              />

              <Field
                label="Coordinator"
                name="coordinator"
                value={profile.coordinator}
                onChange={handleChange}
                icon={GraduationCap}
              />

              <Field
                label="University Website"
                name="website"
                value={profile.website}
                onChange={handleChange}
                icon={Building2}
              />

            </div>

            <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">

              <div>

                {saved && (
                  <p className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                    Changes saved successfully
                  </p>
                )}

              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white hover:bg-slate-800"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>

            </div>

          </form>

        </section>

        {/* SETTINGS */}

        <section className="mt-6 grid gap-5 md:grid-cols-2">

          <SettingCard
            icon={Lock}
            title="Security"
            description="Manage password and account security."
            action="Manage Security"
          />

          <SettingCard
            icon={Bell}
            title="Notifications"
            description="Choose how you receive portal notifications."
            action="Notification Settings"
            href="/university/notifications"
          />

        </section>

        {/* ACCOUNT STATUS */}

        <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>

            <div>

              <h2 className="text-sm font-black text-emerald-950">
                University account verified
              </h2>

              <p className="mt-1 text-xs leading-5 text-emerald-800">
                Your institution is verified and can participate
                in government civic challenges through Samadhan.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  type = "text",
}) {
  return (
    <div>

      <label className="text-xs font-bold text-slate-700">
        {label}
      </label>

      <div className="relative mt-2">

        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
        />

      </div>

    </div>
  );
}

function SettingCard({
  icon: Icon,
  title,
  description,
  action,
  href,
}) {
  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>

      <h3 className="mt-4 text-sm font-black">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <p className="mt-4 text-xs font-black text-blue-600">
        {action} →
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      {content}
    </button>
  );
}