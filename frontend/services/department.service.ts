/*
|--------------------------------------------------------------------------
| Department API Service & Persistence
|--------------------------------------------------------------------------
| File: services/department.service.ts
| Purpose:
| - Provides functions to get/update department profile.
| - Manages accepted university projects and officers.
| - Connects to backend API `/departments/profile` with local fallback.
|--------------------------------------------------------------------------
*/

import {
  INITIAL_DEPARTMENT_PROFILE,
  ACCEPTED_UNIVERSITY_PROJECTS,
  PENDING_DEPARTMENT_PROJECTS,
} from "@/data/departmentFullData";
import { apiFetch } from "@/lib/api";

export async function getDepartmentChallenges(token?: string) {
  return apiFetch("/department/challenges", { method: "GET", token });
}

export interface DepartmentProfileData {
  id: string;
  name: string;
  logo: string;
  governmentBody: string;
  type: string;
  jurisdiction: string;
  verificationBadge: string;
  isVerified: boolean;
  createdDate: string;
  lastUpdatedDate: string;
  description: string;
  primaryResponsibilities: string[];
  serviceCategories: string[];
  establishedDate: string;
  contact: {
    officialEmail: string;
    officialPhone: string;
    officeAddress: string;
    officialWebsite: string;
    workingHours: string;
  };
  stats: {
    totalComplaintsReceived: number;
    activeComplaints: number;
    resolvedComplaints: number;
    escalatedComplaints: number;
    resolutionRate: string;
    avgResolutionTimeDays: number;
  };
  collaborationSummary: {
    acceptedProjects: number;
    projectsInProgress: number;
    completedProjects: number;
    pendingProjectReviews: number;
    rejectedProjects: number;
  };
  officers: Array<{
    id: string;
    name: string;
    designation: string;
    role: string;
    email: string;
    phone: string;
    availability: string;
  }>;
  activityTimeline: Array<{
    id: string;
    title: string;
    detail: string;
    type: string;
    timestamp: string;
  }>;
}

const LOCAL_STORAGE_KEY = "samadhan_department_profile_v1";

/**
 * Fetch Department Profile.
 * Uses LocalStorage/Mock.
 */
export async function getDepartmentProfile(token?: string): Promise<DepartmentProfileData> {
  try {
    const data = await apiFetch("/department/profile", { method: "GET", token, silent: true });
    if (data && data.data) {
      return {
        ...INITIAL_DEPARTMENT_PROFILE,
        ...data.data,
      };
    }
  } catch (err) {}

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }

  return INITIAL_DEPARTMENT_PROFILE;
}

/**
 * Save/Update Department Profile and syncs to local storage.
 */
export async function updateDepartmentProfile(
  updatedFields: Partial<DepartmentProfileData>,
  token?: string
): Promise<DepartmentProfileData> {
  const current = await getDepartmentProfile(token);

  const merged: DepartmentProfileData = {
    ...current,
    ...updatedFields,
    contact: {
      ...current.contact,
      ...(updatedFields.contact || {}),
    },
    lastUpdatedDate: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  try {
    await apiFetch("/department/profile", {
      method: "PUT",
      body: merged,
      token,
    });
  } catch (err) {}

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
  }

  return merged;
}

/**
 * Fetch Accepted University Projects.
 */
export async function getAcceptedUniversityProjects(token?: string) {
  try {
    const data = await apiFetch("/department/accepted-projects", { method: "GET", token, silent: true });
    if (data && data.data) return data.data;
  } catch (err) {}
  if (typeof window === "undefined") return ACCEPTED_UNIVERSITY_PROJECTS;
  const saved = localStorage.getItem("samadhan_accepted_projects_v1");
  return saved ? JSON.parse(saved) : ACCEPTED_UNIVERSITY_PROJECTS;
}

export async function getPendingDepartmentProjects() {
  return PENDING_DEPARTMENT_PROJECTS;
}

export async function acceptDepartmentProject(project: any) {
  try {
    await apiFetch("/department/accepted-projects", { method: "POST", body: project });
  } catch (err) {}
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem("samadhan_accepted_projects_v1");
  const current = saved ? JSON.parse(saved) : ACCEPTED_UNIVERSITY_PROJECTS;
  const next = [
    ...current,
    {
      ...project,
      status: "IN_PROGRESS",
      acceptedDate: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      progressPercentage: 0,
    },
  ];
  localStorage.setItem("samadhan_accepted_projects_v1", JSON.stringify(next));
}
