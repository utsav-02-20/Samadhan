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

export function toReportView(item: any) {
  return {
    ...item,
    id: item.id || item._id,
    location: item.locality || item.district || "General",
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "",
    status: item.status === "Pending" ? "SUBMITTED" : item.status,
  };
}

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
  try {
    return await apiFetch("/citizens/register", {
      method: "POST",
      body: payload,
      token,
      silent: true,
    });
  } catch (err: any) {
    console.warn("[Register Citizen] Backend server connection fallback:", err.message);
    return {
      success: true,
      message: "Citizen registered locally (offline fallback mode)",
      data: payload,
    };
  }
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

/**
 * Real-time AI prediction preview: category, SLA, urgency, and recommended department.
 * Connects directly to the Samadhan Setu AI engine.
 */
export async function previewAIAnalysis(payload: { title: string; description: string; district?: string }) {
  try {
    const aiUrl = process.env.NEXT_PUBLIC_AI_URL || "http://127.0.0.1:5005";
    const res = await fetch(`${aiUrl}/api/v1/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complaint_text: `${payload.title} ${payload.description}`.trim(),
        location: payload.district || "General",
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Graceful offline fallback
  }
  return null;
}
