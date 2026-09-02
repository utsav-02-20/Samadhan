/*
|--------------------------------------------------------------------------
| Government Data Hook
|--------------------------------------------------------------------------
| Purpose:
| - Fetch dashboard analytics.
| - Fetch complaints.
| - Fetch projects.
| - Fetch challenges.
| - Refresh dashboard data.
|--------------------------------------------------------------------------
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getGovernmentDashboard,
  getGovernmentAnalytics,
  getGovernmentComplaints,
  getGovernmentProjects,
  getGovernmentChallenges,
} from "../api/government";

export function useGovernmentData(
  complaintParams = {},
  projectParams = {},
  challengeParams = {},
  analyticsParams = {}
) {
  const [data, setData] = useState({
    dashboard: null,
    analytics: null,
    complaints: [],
    projects: [],
    challenges: [],
  });

  const [loading, setLoading] = useState({
    dashboard: true,
    analytics: true,
    complaints: true,
    projects: true,
    challenges: true,
  });

  const [error, setError] = useState({
    dashboard: null,
    analytics: null,
    complaints: null,
    projects: null,
    challenges: null,
  });

  /* ---------------------------------------------------------------------- */
  /* Dashboard */
  /* ---------------------------------------------------------------------- */

  const refreshDashboard = useCallback(async () => {
    setLoading((prev) => ({ ...prev, dashboard: true }));
    setError((prev) => ({ ...prev, dashboard: null }));

    try {
      const response = await getGovernmentDashboard();

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
  /* Analytics */
  /* ---------------------------------------------------------------------- */

  const refreshAnalytics = useCallback(async () => {
    setLoading((prev) => ({ ...prev, analytics: true }));
    setError((prev) => ({ ...prev, analytics: null }));

    try {
      const response = await getGovernmentAnalytics(analyticsParams);

      setData((prev) => ({
        ...prev,
        analytics: response.data || response.analytics || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        analytics: err.message || "Failed to fetch analytics.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, analytics: false }));
    }
  }, [analyticsParams]);

  /* ---------------------------------------------------------------------- */
  /* Complaints */
  /* ---------------------------------------------------------------------- */

  const refreshComplaints = useCallback(async () => {
    setLoading((prev) => ({ ...prev, complaints: true }));
    setError((prev) => ({ ...prev, complaints: null }));

    try {
      const response = await getGovernmentComplaints(complaintParams);

      setData((prev) => ({
        ...prev,
        complaints: response.data || response.complaints || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        complaints: err.message || "Failed to fetch complaints.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, complaints: false }));
    }
  }, [complaintParams]);

  /* ---------------------------------------------------------------------- */
  /* Projects */
  /* ---------------------------------------------------------------------- */

  const refreshProjects = useCallback(async () => {
    setLoading((prev) => ({ ...prev, projects: true }));
    setError((prev) => ({ ...prev, projects: null }));

    try {
      const response = await getGovernmentProjects(projectParams);

      setData((prev) => ({
        ...prev,
        projects: response.data || response.projects || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        projects: err.message || "Failed to fetch projects.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  }, [projectParams]);

  /* ---------------------------------------------------------------------- */
  /* Challenges */
  /* ---------------------------------------------------------------------- */

  const refreshChallenges = useCallback(async () => {
    setLoading((prev) => ({ ...prev, challenges: true }));
    setError((prev) => ({ ...prev, challenges: null }));

    try {
      const response = await getGovernmentChallenges(challengeParams);

      setData((prev) => ({
        ...prev,
        challenges: response.data || response.challenges || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        challenges: err.message || "Failed to fetch challenges.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, challenges: false }));
    }
  }, [challengeParams]);

  /* ---------------------------------------------------------------------- */
  /* Refresh All Dashboard Data */
  /* ---------------------------------------------------------------------- */

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshDashboard(),
      refreshAnalytics(),
      refreshComplaints(),
      refreshProjects(),
      refreshChallenges(),
    ]);
  }, [
    refreshDashboard,
    refreshAnalytics,
    refreshComplaints,
    refreshProjects,
    refreshChallenges,
  ]);

  /* ---------------------------------------------------------------------- */
  /* Initial Load */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    data,
    loading,
    error,
    refreshDashboard,
    refreshAnalytics,
    refreshComplaints,
    refreshProjects,
    refreshChallenges,
    refreshAll,
  };
}

export default useGovernmentData;