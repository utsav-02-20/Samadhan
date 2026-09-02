/*
|--------------------------------------------------------------------------
| Department API Service
|--------------------------------------------------------------------------
| Purpose:
| - Department dashboard API calls.
|
| Functions:
| - Dashboard summary.
| - Assigned complaints.
| - Update complaint progress.
| - Assigned projects.
| - Department analytics.
|--------------------------------------------------------------------------
*/

import apiClient from "./client";
import API_ENDPOINTS from "./endpoint";

/* -------------------------------------------------------------------------- */
/* Dashboard */
/* -------------------------------------------------------------------------- */

/**
 * Fetch department dashboard summary.
 */
export async function getDepartmentDashboard() {
  try {
    const { data } = await apiClient.get(API_ENDPOINTS.DEPARTMENT.DASHBOARD);
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/* -------------------------------------------------------------------------- */
/* Complaints */
/* -------------------------------------------------------------------------- */

/**
 * Fetch complaints assigned to the department.
 * @param {Object} params - Filters, pagination, status, priority, etc.
 */
export async function getAssignedComplaints(params = {}) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.DEPARTMENT.ASSIGNED_COMPLAINTS,
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
 * Update complaint progress/status.
 * @param {String} complaintId
 * @param {Object} payload
 */
export async function updateComplaintProgress(complaintId, payload) {
  try {
    const { data } = await apiClient.patch(
      API_ENDPOINTS.DEPARTMENT.UPDATE_COMPLAINT_PROGRESS(complaintId),
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
 * Fetch projects assigned to the department.
 * @param {Object} params
 */
export async function getAssignedProjects(params = {}) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.DEPARTMENT.ASSIGNED_PROJECTS,
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
/* Analytics */
/* -------------------------------------------------------------------------- */

/**
 * Fetch department analytics.
 * @param {Object} params - Date range or analytics filters.
 */
export async function getDepartmentAnalytics(params = {}) {
  try {
    const { data } = await apiClient.get(
      API_ENDPOINTS.DEPARTMENT.ANALYTICS,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
}