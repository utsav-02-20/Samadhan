"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import {
  Building2,
  CheckCircle2,
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Edit3,
  Save,
  X,
  Users,
  Award,
  Calendar,
  AlertTriangle,
  Briefcase,
  FileCheck2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import {
  getDepartmentProfile,
  updateDepartmentProfile,
} from "@/services/department.service";

export default function DepartmentProfilePage() {
  const { getToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Form State for Editable Fields
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [officialPhone, setOfficialPhone] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await getDepartmentProfile(token || undefined);
        setProfile(data);

        // Populate Form Fields
        setLogoUrl(data.logo);
        setDescription(data.description);
        setOfficialEmail(data.contact.officialEmail);
        setOfficialPhone(data.contact.officialPhone);
        setOfficeAddress(data.contact.officeAddress);
        setOfficialWebsite(data.contact.officialWebsite);
        setWorkingHours(data.contact.workingHours);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [getToken]);

  async function handleSaveProfile(e) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const token = await getToken();
      const updated = await updateDepartmentProfile(
        {
          logo: logoUrl,
          description: description,
          contact: {
            officialEmail,
            officialPhone,
            officeAddress,
            officialWebsite,
            workingHours,
          },
        },
        token || undefined
      );

      setProfile(updated);
      setIsEditing(false);
      setSaveMessage("✓ Department Profile successfully updated and saved to Database.");
      setTimeout(() => setSaveMessage(""), 4000);
    } catch (err) {
      alert("Failed to save department profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-bold text-slate-500">Loading Department Profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo href="/department/dashboard" subtitle="Department Portal" size="sm" />

          <nav className="flex items-center gap-3">
            <Link
              href="/department/dashboard"
              className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Dashboard
            </Link>

            <Link
              href="/department/accepted-projects"
              className="rounded-xl bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
            >
              Accepted Projects
            </Link>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {saveMessage && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-700">
            {saveMessage}
          </div>
        )}

        {/* 1. Department Identity Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-inner">
                <img src={logoUrl || profile.logo} alt="Department Logo" className="h-full w-full object-contain" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-extrabold text-violet-800 tracking-wider">
                    {profile.type}
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    VERIFIED OFFICIAL DEPARTMENT
                  </span>
                </div>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  {profile.name}
                </h1>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {profile.governmentBody} · Jurisdiction: <strong className="text-slate-800">{profile.jurisdiction}</strong>
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Department ID: <span className="font-mono font-bold text-slate-600">{profile.id}</span> · Established: {profile.establishedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-4 border border-slate-150 text-right">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resolution Rate</p>
                <p className="text-2xl font-black text-emerald-600">{profile.stats.resolutionRate}</p>
                <p className="text-[10px] font-semibold text-slate-400">Avg {profile.stats.avgResolutionTimeDays} Days / Case</p>
              </div>
            </div>
          </div>
        </section>

        {/* Edit Form OR Information View */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="mt-8 space-y-6">
            <div className="rounded-3xl border border-violet-200 bg-violet-50/40 p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-950">Edit Official Department Details</h2>
              <p className="text-xs text-slate-500">Update logo, description, and contact parameters.</p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Logo Image URL</label>
                  <input
                    type="text"
                    required
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Official Website</label>
                  <input
                    type="url"
                    required
                    value={officialWebsite}
                    onChange={(e) => setOfficialWebsite(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Official Email</label>
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Official Phone Number</label>
                  <input
                    type="text"
                    required
                    value={officialPhone}
                    onChange={(e) => setOfficialPhone(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Office Working Hours</label>
                  <input
                    type="text"
                    required
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Office Address</label>
                  <input
                    type="text"
                    required
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">Department Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-semibold outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-violet-700 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving Changes..." : "Save Profile to Database"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            {/* 4 & 5. Statistics & University Summary Grid */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-400">Total Grievances</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{profile.stats.totalComplaintsReceived}</p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">✓ {profile.stats.resolvedComplaints} Resolved</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-400">Active Complaints</p>
                <p className="mt-1 text-2xl font-black text-amber-600">{profile.stats.activeComplaints}</p>
                <p className="mt-1 text-[11px] font-semibold text-red-500">⚠️ {profile.stats.escalatedComplaints} Escalated</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-400">Accepted Projects</p>
                <p className="mt-1 text-2xl font-black text-violet-600">{profile.collaborationSummary.acceptedProjects}</p>
                <p className="mt-1 text-[11px] font-semibold text-slate-500">{profile.collaborationSummary.projectsInProgress} Currently In Progress</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-slate-400">University Collaboration</p>
                <p className="mt-1 text-2xl font-black text-emerald-600">{profile.collaborationSummary.completedProjects}</p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">Completed Projects</p>
              </div>
            </section>

            {/* 2 & 3. Department Description & Contact Information */}
            <div className="mt-8 grid gap-7 lg:grid-cols-3">
              <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
                <h2 className="text-lg font-black text-slate-950">Department Overview & Scope</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{profile.description}</p>

                <h3 className="mt-6 font-bold text-slate-900 text-sm">Primary Responsibilities:</h3>
                <ul className="mt-3 space-y-2.5">
                  {profile.primaryResponsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-bold text-slate-900 text-sm">Service Categories Handled:</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.serviceCategories.map((cat, i) => (
                    <span key={i} className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                      {cat}
                    </span>
                  ))}
                </div>
              </section>

              {/* Contact Card */}
              <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-black text-slate-950">Contact Information</h2>

                <div className="mt-5 space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-400">Official Email</p>
                      <p className="mt-0.5 font-bold text-slate-900">{profile.contact.officialEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-400">Official Phone</p>
                      <p className="mt-0.5 font-bold text-slate-900">{profile.contact.officialPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-400">Official Portal</p>
                      <a
                        href={profile.contact.officialWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 font-bold text-violet-600 hover:underline"
                      >
                        {profile.contact.officialWebsite}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-400">Office Address</p>
                      <p className="mt-0.5 leading-5 font-semibold text-slate-800">{profile.contact.officeAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-400">Working Hours</p>
                      <p className="mt-0.5 leading-5 font-semibold text-slate-800">{profile.contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 6. Officers & Team */}
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-950">Department Officers & Key Personnel</h2>
                  <p className="text-xs text-slate-400">Assigned engineers and grievance nodal officers</p>
                </div>

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                  {profile.officers.length} Active Officers
                </span>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {profile.officers.map((off) => (
                  <div key={off.id} className="rounded-2xl bg-slate-50 p-5 border border-slate-150">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{off.id}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          off.availability === "AVAILABLE"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {off.availability.replace("_", " ")}
                      </span>
                    </div>

                    <h3 className="mt-3 font-bold text-slate-900 text-base">{off.name}</h3>
                    <p className="text-xs font-semibold text-violet-700">{off.designation}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{off.role}</p>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-500">
                      <p>✉ {off.email}</p>
                      <p>📞 {off.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Activity Timeline & Accepted Projects Link */}
            <section className="mt-8 grid gap-7 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
                <h2 className="text-lg font-black text-slate-950">Activity Timeline</h2>
                <p className="text-xs text-slate-400">Recent assignments, updates, and project acceptances</p>

                <div className="mt-6 space-y-4">
                  {profile.activityTimeline.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <Calendar className="h-4 w-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                          <span className="text-[10px] font-bold text-slate-400">{item.timestamp}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accepted Projects Quick Access */}
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-bold text-violet-300">
                    UNIVERSITY COLLABORATIONS
                  </span>

                  <h3 className="mt-4 text-2xl font-black tracking-tight">
                    Accepted Projects Grid
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-400">
                    Access all {profile.collaborationSummary.acceptedProjects} accepted research proposals and pilot implementations submitted by partner universities.
                  </p>
                </div>

                <Link
                  href="/department/accepted-projects"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-violet-700"
                >
                  View Accepted Projects
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
