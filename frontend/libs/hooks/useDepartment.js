/*
|--------------------------------------------------------------------------
| Department Data Hook
|--------------------------------------------------------------------------
| Purpose:
| - Fetch department dashboard.
| - Fetch assigned complaints.
| - Refresh department projects.
|--------------------------------------------------------------------------
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDepartmentDashboard,
  getAssignedComplaints,
  getAssignedProjects,
} from "../api/department";

export function useDepartmentData(
  complaintParams = {},
  projectParams = {}
) {
  const [data, setData] = useState({
    dashboard: null,
    complaints: [],
    projects: [],
  });

  const [loading, setLoading] = useState({
    dashboard: true,
    complaints: true,
    projects: true,
  });

  const [error, setError] = useState({
    dashboard: null,
    complaints: null,
    projects: null,
  });

  /* ---------------------------------------------------------------------- */
  /* Dashboard */
  /* ---------------------------------------------------------------------- */

  const refreshDashboard = useCallback(async () => {
    setLoading((prev) => ({ ...prev, dashboard: true }));
    setError((prev) => ({ ...prev, dashboard: null }));

    try {
      const response = await getDepartmentDashboard();

      setData((prev) => ({
        ...prev,
        dashboard: response.data || response.dashboard || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        dashboard: err.message || "Failed to fetch dashboard.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, dashboard: false }));
    }
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Assigned Complaints */
  /* ---------------------------------------------------------------------- */

  const refreshComplaints = useCallback(async () => {
    setLoading((prev) => ({ ...prev, complaints: true }));
    setError((prev) => ({ ...prev, complaints: null }));

    try {
      const response = await getAssignedComplaints(complaintParams);

      setData((prev) => ({
        ...prev,
        complaints: response.data || response.complaints || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        complaints: err.message || "Failed to fetch assigned complaints.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, complaints: false }));
    }
  }, [complaintParams]);

  /* ---------------------------------------------------------------------- */
  /* Assigned Projects */
  /* ---------------------------------------------------------------------- */

  const refreshProjects = useCallback(async () => {
    setLoading((prev) => ({ ...prev, projects: true }));
    setError((prev) => ({ ...prev, projects: null }));

    try {
      const response = await getAssignedProjects(projectParams);

      setData((prev) => ({
        ...prev,
        projects: response.data || response.projects || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        projects: err.message || "Failed to fetch department projects.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  }, [projectParams]);

  /* ---------------------------------------------------------------------- */
  /* Initial Load */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    refreshDashboard();
    refreshComplaints();
    refreshProjects();
  }, [refreshDashboard, refreshComplaints, refreshProjects]);

  return {
    data,
    loading,
    error,
    refreshDashboard,
    refreshComplaints,
    refreshProjects,
  };
}

export default useDepartmentData;