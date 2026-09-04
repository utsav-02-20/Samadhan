/*
|--------------------------------------------------------------------------
| University API Service
|--------------------------------------------------------------------------
| File: services/university.service.ts
| Purpose:
| - Encapsulates all backend HTTP interactions for University Portal.
|--------------------------------------------------------------------------
*/

import { apiFetch } from "@/lib/api";

export async function getUniversityProfile(token?: string) {
  return apiFetch("/university/profile", {
    method: "GET",
    token,
  });
}

export async function updateUniversityProfile(payload: any, token?: string) {
  return apiFetch("/university/profile", {
    method: "PUT",
    body: payload,
    token,
  });
}

export async function getUniversityProjects(token?: string) {
  return apiFetch("/university/projects", {
    method: "GET",
    token,
  });
}

export async function getUniversityChallenges(token?: string) {
  return apiFetch("/university/challenges", {
    method: "GET",
    token,
  });
}

export async function submitUniversityProposal(payload: any, token?: string) {
  return apiFetch("/university/submissions", {
    method: "POST",
    body: payload,
    token,
  });
}

export async function getUniversityProposals(token?: string) {
  return apiFetch("/university/proposals", {
    method: "GET",
    token,
  });
}

export async function getUniversityTeam(token?: string) {
  return apiFetch("/university/team", {
    method: "GET",
    token,
  });
}

export async function addUniversityTeamMember(payload: any, token?: string) {
  return apiFetch("/university/team", {
    method: "POST",
    body: payload,
    token,
  });
}

export async function triggerAITaskAllocation(problemId?: string, token?: string) {
  return apiFetch("/university/ai-assign", {
    method: "POST",
    body: problemId ? { problemId } : {},
    token,
  });
}

export async function uploadUniversityMedia(fileData: string, fileName: string, folder?: string, token?: string) {
  return apiFetch("/university/upload", {
    method: "POST",
    body: { fileData, fileName, folder },
    token,
  });
}

export async function uploadProjectFileCloudinary(projectId: string, fileData: string, fileName: string, token?: string) {
  return apiFetch("/university/upload-project-file", {
    method: "POST",
    body: { projectId, fileData, fileName },
    token,
  });
}

export async function deleteProjectFileCloudinary(publicId: string, projectId?: string, token?: string) {
  return apiFetch("/university/delete-project-file", {
    method: "POST",
    body: { publicId, projectId },
    token,
  });
}

export async function registerTeam(payload: any, token?: string) {
  return apiFetch("/university/teams", {
    method: "POST",
    body: payload,
    token,
    silent: true,
  });
}

export async function getTeams(problemId?: string, token?: string) {
  const query = problemId ? `?problemId=${problemId}` : "";
  return apiFetch(`/university/teams${query}`, {
    method: "GET",
    token,
    silent: true,
  });
}

