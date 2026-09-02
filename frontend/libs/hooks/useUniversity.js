/*
|--------------------------------------------------------------------------
| University Data Hook
|--------------------------------------------------------------------------
| Purpose:
| - Fetch university dashboard.
| - Fetch projects.
| - Fetch assigned challenges.
|--------------------------------------------------------------------------
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getUniversityDashboard,
  getUniversityProjects,
  getAssignedChallenges,
} from "../api/university";

export function useUniversityData(
  projectParams = {},
  challengeParams = {}
) {
  const [data, setData] = useState({
    dashboard: null,
    projects: [],
    challenges: [],
  });

  const [loading, setLoading] = useState({
    dashboard: true,
    projects: true,
    challenges: true,
  });

  const [error, setError] = useState({
    dashboard: null,
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
      const response = await getUniversityDashboard();

      setData((prev) => ({
        ...prev,
        dashboard: response.data || response.dashboard || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        dashboard: err.message || "Failed to fetch university dashboard.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, dashboard: false }));
    }
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Projects */
  /* ---------------------------------------------------------------------- */

  const refreshProjects = useCallback(async () => {
    setLoading((prev) => ({ ...prev, projects: true }));
    setError((prev) => ({ ...prev, projects: null }));

    try {
      const response = await getUniversityProjects(projectParams);

      setData((prev) => ({
        ...prev,
        projects: response.data || response.projects || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        projects: err.message || "Failed to fetch university projects.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  }, [projectParams]);

  /* ---------------------------------------------------------------------- */
  /* Assigned Challenges */
  /* ---------------------------------------------------------------------- */

  const refreshChallenges = useCallback(async () => {
    setLoading((prev) => ({ ...prev, challenges: true }));
    setError((prev) => ({ ...prev, challenges: null }));

    try {
      const response = await getAssignedChallenges(challengeParams);

      setData((prev) => ({
        ...prev,
        challenges: response.data || response.challenges || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        challenges: err.message || "Failed to fetch assigned challenges.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, challenges: false }));
    }
  }, [challengeParams]);

  /* ---------------------------------------------------------------------- */
  /* Refresh All */
  /* ---------------------------------------------------------------------- */

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshDashboard(),
      refreshProjects(),
      refreshChallenges(),
    ]);
  }, [refreshDashboard, refreshProjects, refreshChallenges]);

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
    refreshProjects,
    refreshChallenges,
    refreshAll,
  };
}

export default useUniversityData;