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

export async function triggerAITaskAllocation(problemId?: string, token?: string) {
  return apiFetch("/university/ai-assign", {
    method: "POST",
    body: problemId ? { problemId } : {},
    token,
  });
}
