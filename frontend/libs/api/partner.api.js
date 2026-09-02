/*
|--------------------------------------------------------------------------
| Industry Partner API Service
|--------------------------------------------------------------------------
| Purpose:
| - Industry partner related API calls.
|
| Functions:
| - Dashboard summary.
| - Available challenges.
| - Accepted challenges.
| - Collaboration requests.
|--------------------------------------------------------------------------
*/

import apiClient from "./client";
import API_ENDPOINTS from "./endpoint";

/* -------------------------------------------------------------------------- */
/* Dashboard */
/* -------------------------------------------------------------------------- */

/**
 * Fetch industry partner dashboard summary.
 */
export async function getPartnerDashboard() {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.PARTNER.DASHBOARD);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Challenges */
/* -------------------------------------------------------------------------- */

/**
 * Fetch available challenges for industry partners.
 * @param {Object} params
 */
export async function getAvailableChallenges(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.PARTNER.CHALLENGES, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch accepted challenges.
 * @param {Object} params
 */
export async function getAcceptedChallenges(params = {}) {
  try {
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.PARTNER.CHALLENGES}/accepted`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Accept a challenge.
 * @param {String} challengeId
 * @param {Object} payload
 */
export async function acceptChallenge(challengeId, payload = {}) {
  try {
    const { data } = await apiClient.post(
      `${API_ENDPOINTS.PARTNER.CHALLENGE_DETAILS(challengeId)}/accept`,
      payload
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Collaboration Requests */
/* -------------------------------------------------------------------------- */

/**
 * Fetch collaboration requests for the partner.
 * @param {Object} params
 */
export async function getCollaborationRequests(params = {}) {
  try {
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.PARTNER.DASHBOARD}/collaborations`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Update collaboration request status.
 * @param {String} requestId
 * @param {Object} payload
 */
export async function updateCollaborationRequest(requestId, payload) {
  try {
    const { data } = await apiClient.patch(
      `/api/partner/collaborations/${requestId}`,
      payload
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}