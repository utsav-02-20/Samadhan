/*
|--------------------------------------------------------------------------
| University API Service
|--------------------------------------------------------------------------
| Purpose:
| - University portal API calls.
|
| Functions:
| - Dashboard summary.
| - Fetch university projects.
| - Submit project proposal.
| - Fetch assigned challenges.
| - Update project status.
|--------------------------------------------------------------------------
*/

import apiClient from "./client";
import API_ENDPOINTS from "./endpoint";

/* -------------------------------------------------------------------------- */
/* Dashboard */
/* -------------------------------------------------------------------------- */

/**
 * Fetch university dashboard summary.
 */
export async function getUniversityDashboard() {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.UNIVERSITY.DASHBOARD);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Projects */
/* -------------------------------------------------------------------------- */

/**
 * Fetch university projects.
 * @param {Object} params
 */
export async function getUniversityProjects(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.UNIVERSITY.PROJECTS, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Submit a new project proposal.
 * @param {Object|FormData} projectData
 */
export async function submitProjectProposal(projectData) {
  try {
    const isFormData = projectData instanceof FormData;

    const { data } = await apiClient.post(
      API_ENDPOINTS.UNIVERSITY.PROJECTS,
      projectData,
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
 * Update project status/progress.
 * @param {String} projectId
 * @param {Object} payload
 */
export async function updateUniversityProjectStatus(projectId, payload) {
  try {
    const { data } = await apiClient.patch(
      `${API_ENDPOINTS.UNIVERSITY.PROJECTS}/${projectId}`,
      payload
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Challenges */
/* -------------------------------------------------------------------------- */

/**
 * Fetch challenges assigned to the university.
 * @param {Object} params
 */
export async function getAssignedChallenges(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.UNIVERSITY.CHALLENGES, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch a single assigned challenge.
 * @param {String} challengeId
 */
export async function getAssignedChallengeDetails(challengeId) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.UNIVERSITY.CHALLENGE_DETAILS(challengeId)
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}