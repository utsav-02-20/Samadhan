/*
|--------------------------------------------------------------------------
| Authentication Service
|--------------------------------------------------------------------------
| Purpose:
| - Clerk helper methods.
| - Get JWT token.
| - Check authentication.
| - Logout helper.
|--------------------------------------------------------------------------
*/

"use client";

import { useAuth, useClerk } from "@clerk/nextjs";

/* -------------------------------------------------------------------------- */
/* Hook: Authentication Helpers */
/* -------------------------------------------------------------------------- */

export function useAuthService() {
  const { isLoaded, isSignedIn, getToken, userId, sessionId } = useAuth();
  const { signOut } = useClerk();

  /**
   * Get Clerk JWT token.
   */
  const getJwtToken = async () => {
    if (!isLoaded || !isSignedIn) return null;
    return await getToken();
  };

  /**
   * Check if user is authenticated.
   */
  const isAuthenticated = () => isLoaded && isSignedIn;

  /**
   * Logout current user.
   */
  const logout = async () => {
    await signOut();
  };

  return {
    isLoaded,
    isSignedIn,
    userId,
    sessionId,
    getJwtToken,
    isAuthenticated,
    logout,
  };
}

/* -------------------------------------------------------------------------- */
/* Non-hook Helper (optional utility) */
/* -------------------------------------------------------------------------- */

/**
 * Returns true if Clerk client has an active session.
 */
export function hasActiveSession() {
  return Boolean(window?.Clerk?.session);
}

/**
 * Returns JWT token using Clerk client.
 */
export async function getJwtToken() {
  if (!window?.Clerk?.session) return null;
  return await window.Clerk.session.getToken();
}

/**
 * Sign out using Clerk client.
 */
export async function logout() {
  if (!window?.Clerk) return;
  await window.Clerk.signOut();
}