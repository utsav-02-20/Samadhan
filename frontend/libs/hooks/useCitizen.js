/*
|--------------------------------------------------------------------------
| Citizen Data Hook
|--------------------------------------------------------------------------
| Purpose:
| - Fetch citizen data using citizen.api.js.
| - Manage loading state.
| - Manage error state.
| - Refresh complaint feed.
| - Refresh history.
| - Refresh profile.
|
| Returns:
| - data
| - loading
| - error
| - refresh functions
|--------------------------------------------------------------------------
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getComplaintFeed,
  getComplaintHistory,
  getCitizenProfile,
} from "../api/citizen";

export function useCitizenData(feedParams = {}, historyParams = {}) {
  const [data, setData] = useState({
    complaints: [],
    history: [],
    profile: null,
  });

  const [loading, setLoading] = useState({
    complaints: true,
    history: true,
    profile: true,
  });

  const [error, setError] = useState({
    complaints: null,
    history: null,
    profile: null,
  });

  /* ---------------------------------------------------------------------- */
  /* Complaint Feed */
  /* ---------------------------------------------------------------------- */

  const refreshComplaintFeed = useCallback(async () => {
    setLoading((prev) => ({ ...prev, complaints: true }));
    setError((prev) => ({ ...prev, complaints: null }));

    try {
      const response = await getComplaintFeed(feedParams);

      setData((prev) => ({
        ...prev,
        complaints: response.data || response.complaints || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        complaints: err.message || "Failed to fetch complaint feed.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, complaints: false }));
    }
  }, [feedParams]);

  /* ---------------------------------------------------------------------- */
  /* Complaint History */
  /* ---------------------------------------------------------------------- */

  const refreshHistory = useCallback(async () => {
    setLoading((prev) => ({ ...prev, history: true }));
    setError((prev) => ({ ...prev, history: null }));

    try {
      const response = await getComplaintHistory(historyParams);

      setData((prev) => ({
        ...prev,
        history: response.data || response.history || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        history: err.message || "Failed to fetch complaint history.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, history: false }));
    }
  }, [historyParams]);

  /* ---------------------------------------------------------------------- */
  /* Citizen Profile */
  /* ---------------------------------------------------------------------- */

  const refreshProfile = useCallback(async () => {
    setLoading((prev) => ({ ...prev, profile: true }));
    setError((prev) => ({ ...prev, profile: null }));

    try {
      const response = await getCitizenProfile();

      setData((prev) => ({
        ...prev,
        profile: response.data || response.profile || response,
      }));
    } catch (err) {
      setError((prev) => ({
        ...prev,
        profile: err.message || "Failed to fetch profile.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Initial Load */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    refreshComplaintFeed();
    refreshHistory();
    refreshProfile();
  }, [refreshComplaintFeed, refreshHistory, refreshProfile]);

  return {
    data,
    loading,
    error,
    refreshComplaintFeed,
    refreshHistory,
    refreshProfile,
  };
}

export default useCitizenData;