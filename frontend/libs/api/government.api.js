/*
|--------------------------------------------------------------------------
| Government API Service
|--------------------------------------------------------------------------
| Purpose:
| - Contains all Government portal API calls.
|
| Functions:
| - Dashboard analytics.
| - Fetch complaints.
| - Update complaint status.
| - Fetch projects.
| - Create project.
| - Fetch challenges.
| - Create challenge.
| - Assign challenge to department/university.
|--------------------------------------------------------------------------
*/

import apiClient from "./client";
import API_ENDPOINTS from "./endpoint";

/* -------------------------------------------------------------------------- */
/* Dashboard */
/* -------------------------------------------------------------------------- */

/**
 * Fetch government dashboard summary.
 */
export async function getGovernmentDashboard() {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.GOVERNMENT.DASHBOARD);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch government analytics.
 * @param {Object} params
 */
export async function getGovernmentAnalytics(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.GOVERNMENT.ANALYTICS, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Complaints */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all complaints.
 * @param {Object} params
 */
export async function getGovernmentComplaints(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.GOVERNMENT.COMPLAINTS, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Fetch complaint details.
 * @param {String} complaintId
 */
export async function getGovernmentComplaintDetails(complaintId) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.GOVERNMENT.COMPLAINT_DETAILS(complaintId)
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Update complaint status / assignment.
 * @param {String} complaintId
 * @param {Object} payload
 */
export async function updateGovernmentComplaintStatus(complaintId, payload) {
  try {
    const { data } = await apiClient.patch(
      API_ENDPOINTS.GOVERNMENT.COMPLAINT_DETAILS(complaintId),
      payload
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Projects */
/* -------------------------------------------------------------------------- */

/**
 * Fetch government projects.
 * @param {Object} params
 */
export async function getGovernmentProjects(params = {}) {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.GOVERNMENT.PROJECTS, {
      params,
    });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Create a new government project.
 * @param {Object} projectData
 */
export async function createGovernmentProject(projectData) {
  try {
    const { data } = await apiClient.post(
      API_ENDPOINTS.GOVERNMENT.PROJECTS,
      projectData
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
 * Fetch government challenges.
 * @param {Object} params
 */
export async function getGovernmentChallenges(params = {}) {
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
 * Create a new challenge.
 * @param {Object} challengeData
 */
export async function createGovernmentChallenge(challengeData) {
  try {
    const { data } = await apiClient.post(
      API_ENDPOINTS.UNIVERSITY.CHALLENGES,
      challengeData
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Assign challenge to a department or university.
 * @param {String} challengeId
 * @param {Object} assignmentData
 */
export async function assignGovernmentChallenge(challengeId, assignmentData) {
  try {
    const { data } = await apiClient.post(
      `${API_ENDPOINTS.UNIVERSITY.CHALLENGE_DETAILS(challengeId)}/assign`,
      assignmentData
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}