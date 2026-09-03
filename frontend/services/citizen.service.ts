/*
|--------------------------------------------------------------------------
| Citizen API Service
|--------------------------------------------------------------------------
| File: services/citizen.service.ts
| Purpose:
| - Encapsulates all backend HTTP interactions for the Citizen Module.
| - Connects directly to Node Express MongoDB backend APIs via lib/api.ts.
|--------------------------------------------------------------------------
*/

import { apiFetch } from "@/lib/api";

export interface CitizenRegisterPayload {
  clerkId: string;
  name: string;
  email: string;
  phone?: string;
  district?: string;
}

/**
 * Auto-registers authenticated citizen in backend DB.
 * POST /citizens/register
 */
export async function registerCitizen(
  payload: CitizenRegisterPayload,
  token?: string
) {
  return apiFetch("/citizens/register", {
    method: "POST",
    body: payload,
    token,
  });
}

/**
 * Submits a new civic complaint with multipart images and GPS data.
 * POST /citizens/:citizenId/complaints
 */
export async function submitComplaint(
  citizenId: string,
  formData: FormData,
  token?: string
) {
  return apiFetch(`/citizens/${citizenId}/complaints`, {
    method: "POST",
    body: formData,
    token,
    silent: true,
  });
}

/**
 * Retrieves public complaint feed with optional filtering by district & category.
 * GET /citizens/feed?district=...&category=...
 */
export async function getPublicFeed(params?: { district?: string; category?: string }) {
  const query = new URLSearchParams();
  if (params?.district) query.append("district", params.district);
  if (params?.category) query.append("category", params.category);

  const queryString = query.toString() ? `?${query.toString()}` : "";
  return apiFetch(`/citizens/feed${queryString}`, {
    method: "GET",
  });
}

/**
 * Retrieves authenticated citizen's historical complaint records.
 * GET /citizens/:citizenId/history
 */
export async function getCitizenHistory(citizenId: string, token?: string) {
  return apiFetch(`/citizens/${citizenId}/history`, {
    method: "GET",
    token,
  });
}

/**
 * Upvotes/supports a reported civic complaint problem.
 * PATCH /citizens/upvote
 */
export async function toggleUpvote(problemId: string, token?: string) {
  return apiFetch("/citizens/upvote", {
    method: "PATCH",
    body: { problemId },
    token,
  });
}
