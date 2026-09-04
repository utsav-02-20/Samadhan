"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { getUniversityTeam, addUniversityTeamMember, getTeams } from "@/services/university.service";
import {
  ArrowLeft,
  UserPlus,
  Users,
  Mail,
  ShieldCheck,
  Trash2,
  Search,
  Building2,
  FileCode,
  ExternalLink,
  CheckCircle2,
  Layers,
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
];

export default function UniversityTeamPage() {
  const { getToken } = useAuth();
  const [members, setMembers] = useState(initialMembers);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Team Member");

  useEffect(() => {
    getToken()
      .then((token) => getUniversityTeam(token || undefined))
      .then((res) => {
        const list = res?.data || [];
        if (list.length > 0) {
          setMembers(
            list.map((m, idx) => ({
              id: m._id || idx + 1,
              name: m.name,
              email: m.email,
              role: m.role || "Researcher",
              project: m.project || "Road Safety Analytics",
              status: m.status || "ACTIVE",
              initials: m.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
            }))
          );
        }
      })
      .catch((err) => console.warn("Could not load university team from backend:", err.message));

    // Fetch registered teams & solutions from DB
    getTeams()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setRegisteredTeams(res.data);
        } else {
          // Check local storage
          const keys = Object.keys(localStorage).filter((k) => k.startsWith("team_sub_"));
          const localList = keys.map((k) => JSON.parse(localStorage.getItem(k)));
          setRegisteredTeams(localList);
        }
      })
      .catch(() => {});
  }, [getToken]);

  const filteredMembers = members.filter((member) => {
    const text = `${member.name} ${member.email} ${member.role} ${member.project}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  async function addMember(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

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
      project: "Smart Waste Collection System",
      status: "ACTIVE",
      initials,
    };

    try {
      const token = await getToken();
      await addUniversityTeamMember(
        { name, email, role, project: "Smart Waste Collection System" },
        token || undefined
      );
      setMembers([...members, newMember]);
    } catch (err) {
      setMembers([...members, newMember]);
    }

    setName("");
    setEmail("");
    setRole("Team Member");
    setShowModal(false);
  }

  function removeMember(id) {
    setMembers(members.filter((member) => member.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#401AD9] font-black text-white shadow-md shadow-[#401AD9]/20">
                S
              </div>
              <div>
                <p className="text-sm font-black">Samadhan</p>
                <p className="text-xs text-slate-400">University Portal</p>
              </div>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
            UB
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#401AD9]">
              University Workspace & DB Records
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl text-slate-900">
              Registered Teams & Members
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Database record of participating university teams, team leads, student rosters, and uploaded PPT solution documents.
            </p>
          </div>

          <button
            onClick={() => setShowModal(false)}
            className="flex w-fit items-center gap-2 rounded-2xl bg-[#401AD9] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#401AD9]/20 transition hover:bg-[#3413B8]"
          >
            <UserPlus className="h-4 w-4" />
            Add Individual Member
          </button>
        </div>

        {/* REGISTERED TEAMS & SOLUTIONS DATABASE SECTION */}
        {registeredTeams.length > 0 && (
          <section className="mt-8 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#401AD9]" />
              Database Registered Teams ({registeredTeams.length})
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {registeredTeams.map((team, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-[#401AD9]">
                        PROBLEM ID: {team.problemId || "SAM-1042"}
                      </span>
                      <h3 className="mt-2 text-xl font-black text-slate-900">
                        {team.teamName}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {team.collegeName} ({team.department})
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                      {team.status || "UNDER_REVIEW"}
                    </span>
                  </div>

                  {/* Leader details */}
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Team Leader</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{team.teamLeader?.name}</p>
                    <p className="text-xs text-slate-500">{team.teamLeader?.email} {team.teamLeader?.phone ? `• ${team.teamLeader.phone}` : ""}</p>
                  </div>

                  {/* Members */}
                  {team.teamMembers && team.teamMembers.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Team Roster ({team.teamMembers.length})</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {team.teamMembers.map((m, i) => (
                          <span key={i} className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                            {m.name} ({m.role || "Member"})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solution PPT Document Link */}
                  {team.proposedSolution && (
                    <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-[#401AD9]" />
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {team.proposedSolution.title || "Proposed Innovation Solution"}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                        {team.proposedSolution.description}
                      </p>
                      {team.proposedSolution.pptUrl || team.proposedSolution.docUrl ? (
                        <a
                          href={team.proposedSolution.pptUrl || team.proposedSolution.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#401AD9] hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Solution PPT Document ({team.proposedSolution.fileName || "Doc"})
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INDIVIDUAL MEMBERS ROSTER SECTION */}
        <section className="mt-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-600" />
              University Members Roster
            </h2>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none"
              />
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 px-6 py-4 transition hover:bg-slate-50/80 md:flex-row md:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-black text-[#401AD9] text-xs">
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900">{member.name}</p>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="w-40">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Role</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-700">{member.role}</p>
                </div>

                <div className="w-48">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project / Challenge</p>
                  <p className="mt-0.5 truncate text-xs font-bold text-slate-700">{member.project}</p>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {member.status}
                  </span>
                </div>

                <button
                  onClick={() => removeMember(member.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600"
                  title="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}