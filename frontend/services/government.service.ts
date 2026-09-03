/*
|--------------------------------------------------------------------------
| Government API Service
|--------------------------------------------------------------------------
| File: services/government.service.ts
| Purpose:
| - Encapsulates all backend HTTP interactions for Government Portal.
|--------------------------------------------------------------------------
*/

import { apiFetch } from "@/lib/api";

export async function createGovernmentChallenge(challengeData: any, token?: string) {
  return apiFetch("/government/challenges", {
    method: "POST",
    body: challengeData,
    token,
  });
}

export async function getGovernmentChallenges(token?: string) {
  return apiFetch("/government/challenges", {
    method: "GET",
    token,
  });
}

export async function assignChallengeToDepartment(payload: { challengeId: string; departmentId: string; departmentName?: string }, token?: string) {
  return apiFetch("/government/assign-challenge", {
    method: "POST",
    body: payload,
    token,
  });
}

export async function updateGovernmentChallengeStatus(id: string, status: string, reason = "", token?: string) {
  return apiFetch(`/government/challenges/${id}/status`, { method: "PATCH", body: { status, reason }, token });
}

export async function getGovernmentProfile(id: string, token?: string) {
  return apiFetch(`/government/${id}`, {
    method: "GET",
    token,
  });
}
