"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  UserPlus,
  Users,
  Mail,
  ShieldCheck,
  Trash2,
  Search,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";

const initialMembers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@university.edu",
    role: "Team Lead",
    project: "Road Safety Analytics",
    status: "ACTIVE",
    initials: "AS",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@university.edu",
    role: "Backend Developer",
    project: "Road Safety Analytics",
    status: "ACTIVE",
    initials: "PS",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@university.edu",
    role: "Frontend Developer",
    project: "Road Safety Analytics",
    status: "ACTIVE",
    initials: "RM",
  },
  {
    id: 4,
    name: "Ananya Jain",
    email: "ananya@university.edu",
    role: "Data Analyst",
    project: "Road Safety Analytics",
    status: "ACTIVE",
    initials: "AJ",
  },
];

export default function UniversityTeamPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Team Member");

  const filteredMembers = members.filter((member) => {
    const text = `${member.name} ${member.email} ${member.role} ${member.project}`;

    return text.toLowerCase().includes(search.toLowerCase());
  });

  function addMember(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newMember = {
      id: Date.now(),
      name,
      email,
      role,
      project: "Not assigned",
      status: "ACTIVE",
      initials,
    };

    setMembers([...members, newMember]);

    setName("");
    setEmail("");
    setRole("Team Member");
    setShowModal(false);
  }

  function removeMember(id) {
    setMembers(
      members.filter((member) => member.id !== id)
    );
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

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
                S
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

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              University Workspace
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              Team Management
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Manage students and team members participating in
              Samadhan civic projects.
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>

        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <Stat
            icon={Users}
            label="Total Members"
            value={members.length}
          />

          <Stat
            icon={CheckCircle2}
            label="Active Members"
            value={
              members.filter(
                (member) => member.status === "ACTIVE"
              ).length
            }
          />

          <Stat
            icon={ShieldCheck}
            label="Team Leads"
            value={
              members.filter(
                (member) => member.role === "Team Lead"
              ).length
            }
          />

        </div>

        {/* SEARCH */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members, roles or projects..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />

          </div>

        </section>

        {/* TEAM */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Users className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <h2 className="font-black">
                  University Members
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Students and coordinators associated with your projects.
                </p>

              </div>

            </div>

          </div>

          <div className="divide-y divide-slate-100">

            {filteredMembers.map((member) => (

              <div
                key={member.id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 md:flex-row md:items-center"
              >

                {/* USER */}

                <div className="flex flex-1 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-600">
                    {member.initials}
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-black">
                      {member.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">

                      <Mail className="h-3 w-3" />

                      {member.email}

                    </div>

                  </div>

                </div>

                {/* ROLE */}

                <div className="w-44">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {member.role}
                  </p>

                </div>

                {/* PROJECT */}

                <div className="w-52">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Project
                  </p>

                  <p className="mt-1 truncate text-xs font-bold text-slate-700">
                    {member.project}
                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    {member.status}

                  </span>

                </div>

                {/* ACTION */}

                <button
                  onClick={() => removeMember(member.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600"
                  title="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>

            ))}

          </div>

          {filteredMembers.length === 0 && (

            <div className="px-6 py-14 text-center">

              <Users className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-bold text-slate-500">
                No members found.
              </p>

            </div>

          )}

        </section>

      </div>

      {/* ADD MEMBER MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Team
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Add Member
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Add a student or coordinator to your university.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-slate-300 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={addMember}
              className="mt-7 space-y-5"
            >

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Full name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student name"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

              </div>

              <div>

                <label className="text-xs font-bold text-slate-700">
                  University email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />

              </div>

              <div>

                <label className="text-xs font-bold text-slate-700">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                >
                  <option>Team Member</option>
                  <option>Team Lead</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Data Analyst</option>
                  <option>Designer</option>
                </select>

              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-slate-950 py-3 text-sm font-black text-white hover:bg-slate-800"
                >
                  Add Member
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-5 w-5 text-slate-600" />
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}