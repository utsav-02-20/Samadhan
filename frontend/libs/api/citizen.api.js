/*
|--------------------------------------------------------------------------
| Citizen API Service
|--------------------------------------------------------------------------
| Purpose:
| - Contains all API requests related to citizens.
|
| Functions:
| - Get complaint feed.
| - Submit new complaint with image upload.
| - Get complaint history.
| - Get citizen profile.
| - Update citizen profile.
| - Upvote complaint.
| - Get single complaint details.
|
| Notes:
| - Use Axios client.
| - Return API response only.
| - Do not manage React state here.
|--------------------------------------------------------------------------
*/

import apiClient from "./client";
import API_ENDPOINTS from "./endpoint";

/* -------------------------------------------------------------------------- */
/* Complaint Feed */
/* -------------------------------------------------------------------------- */

/**
 * Fetch public complaint feed.
 * @param {Object} params - Filter & pagination options.
 */
export async function getComplaintFeed(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.CITIZEN.COMPLAINT_FEED, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch single complaint details.
 * @param {String} complaintId
 */
export async function getComplaintDetails(complaintId) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.CITIZEN.COMPLAINT_DETAILS(complaintId)
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Upvote a complaint.
 * @param {String} complaintId
 */
export async function upvoteComplaint(complaintId) {
  try {
    const { data } = await apiClient.post(
      API_ENDPOINTS.CITIZEN.UPVOTE_COMPLAINT(complaintId)
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Complaint Submission */
/* -------------------------------------------------------------------------- */

/**
 * Submit a new complaint.
 * @param {Object} complaintData
 */
export async function submitComplaint(complaintData) {
  try {
    const isFormData = complaintData instanceof FormData;

    const { data } = await apiClient.post(
      API_ENDPOINTS.CITIZEN.SUBMIT_COMPLAINT,
      complaintData,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {}
    );

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch logged-in citizen complaint history.
 * @param {Object} params
 */
export async function getComplaintHistory(params = {}) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.CITIZEN.COMPLAINT_HISTORY,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Citizen Profile */
/* -------------------------------------------------------------------------- */

/**
 * Fetch logged-in citizen profile.
 */
export async function getCitizenProfile() {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.CITIZEN.PROFILE);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Update citizen profile.
 * @param {Object} profileData
 */
export async function updateCitizenProfile(profileData) {
  try {
    const { data } = await apiClient.put(
      API_ENDPOINTS.CITIZEN.UPDATE_PROFILE,
      profileData
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}