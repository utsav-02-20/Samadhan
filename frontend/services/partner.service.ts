/*
|--------------------------------------------------------------------------
| Partner API Service
|--------------------------------------------------------------------------
| File: services/partner.service.ts
| Purpose:
| - Encapsulates all backend HTTP interactions for Partner Portal.
|--------------------------------------------------------------------------
*/

import { apiFetch } from "@/lib/api";

export async function getPartnerOpportunities(token?: string) {
  return apiFetch("/partner/opportunities", {
    method: "GET",
    token,
  });
}

export async function submitPartnerApplication(payload: any, token?: string) {
  return apiFetch("/partner/applications", {
    method: "POST",
    body: payload,
    token,
  });
}

export async function getPartnerCollaborations(token?: string) {
  return apiFetch("/partner/collaborations", {
    method: "GET",
    token,
  });
}
