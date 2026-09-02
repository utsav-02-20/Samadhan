/*
|--------------------------------------------------------------------------
| Partner Data Hook
|--------------------------------------------------------------------------
| Purpose:
| - Fetch partner dashboard.
| - Fetch collaborations.
| - Fetch active challenges.
|--------------------------------------------------------------------------
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getPartnerDashboard,
  getAcceptedChallenges,
  getCollaborationRequests,
} from "../api/partner";

export function usePartnerData(
  challengeParams = {},
  collaborationParams = {}
) {
  const [data, setData] = useState({
    dashboard: null,
    activeChallenges: [],
    collaborations: [],
  });

  const [loading, setLoading] = useState({
    dashboard: true,
    activeChallenges: true,
    collaborations: true,
  });

  const [error, setError] = useState({
    dashboard: null,
    activeChallenges: null,
    collaborations: null,
  });

  /* ---------------------------------------------------------------------- */
  /* Dashboard */
  /* ---------------------------------------------------------------------- */

  const refreshDashboard = useCallback(async () => {
    setLoading((prev) => ({ ...prev, dashboard: true }));
    setError((prev) => ({ ...prev, dashboard: null }));

    try {
      const response = await getPartnerDashboard();

      setData((prev) => ({
        ...prev,
        dashboard: response.data || response.dashboard || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        dashboard: err.message || "Failed to fetch partner dashboard.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, dashboard: false }));
    }
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Active Challenges */
  /* ---------------------------------------------------------------------- */

  const refreshActiveChallenges = useCallback(async () => {
    setLoading((prev) => ({ ...prev, activeChallenges: true }));
    setError((prev) => ({ ...prev, activeChallenges: null }));

    try {
      const response = await getAcceptedChallenges(challengeParams);

      setData((prev) => ({
        ...prev,
        activeChallenges:
          response.data || response.challenges || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        activeChallenges:
          err.message || "Failed to fetch active challenges.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, activeChallenges: false }));
    }
  }, [challengeParams]);

  /* ---------------------------------------------------------------------- */
  /* Collaborations */
  /* ---------------------------------------------------------------------- */

  const refreshCollaborations = useCallback(async () => {
    setLoading((prev) => ({ ...prev, collaborations: true }));
    setError((prev) => ({ ...prev, collaborations: null }));

    try {
      const response = await getCollaborationRequests(
        collaborationParams
      );

      setData((prev) => ({
        ...prev,
        collaborations:
          response.data || response.collaborations || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        collaborations:
          err.message || "Failed to fetch collaboration requests.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, collaborations: false }));
    }
  }, [collaborationParams]);

  /* ---------------------------------------------------------------------- */
  /* Refresh All */
  /* ---------------------------------------------------------------------- */

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshDashboard(),
      refreshActiveChallenges(),
      refreshCollaborations(),
    ]);
  }, [
    refreshDashboard,
    refreshActiveChallenges,
    refreshCollaborations,
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
    refreshActiveChallenges,
    refreshCollaborations,
    refreshAll,
  };
}

export default usePartnerData;