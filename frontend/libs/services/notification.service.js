/*
|--------------------------------------------------------------------------
| Notification Service
|--------------------------------------------------------------------------
| Purpose:
| - Wrapper for success/error/info toasts.
| - Common notification messages across app.
|--------------------------------------------------------------------------
*/

"use client";

import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/* Toast Wrapper */
/* -------------------------------------------------------------------------- */

const notify = {
  success(message, options = {}) {
    toast.success(message, options);
  },

  error(message, options = {}) {
    toast.error(message, options);
  },

  info(message, options = {}) {
    toast.info(message, options);
  },

  warning(message, options = {}) {
    toast.warning(message, options);
  },

  loading(message = "Please wait...") {
    return toast.loading(message);
  },

  dismiss(toastId) {
    toast.dismiss(toastId);
  },

  promise(promise, messages) {
    return toast.promise(promise, messages);
  },
};

/* -------------------------------------------------------------------------- */
/* Common Notification Messages */
/* -------------------------------------------------------------------------- */

export const notificationMessages = {
  AUTH: {
    LOGIN_SUCCESS: "Logged in successfully.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    SESSION_EXPIRED: "Session expired. Please sign in again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
  },

  COMPLAINT: {
    CREATED: "Complaint submitted successfully.",
    UPDATED: "Complaint updated successfully.",
    UPVOTED: "Complaint upvoted successfully.",
    DELETED: "Complaint removed successfully.",
    FAILED: "Unable to process complaint.",
  },

  PROJECT: {
    CREATED: "Project created successfully.",
    UPDATED: "Project updated successfully.",
    SUBMITTED: "Project proposal submitted successfully.",
  },

  CHALLENGE: {
    CREATED: "Challenge created successfully.",
    ASSIGNED: "Challenge assigned successfully.",
    ACCEPTED: "Challenge accepted successfully.",
  },

  PROFILE: {
    UPDATED: "Profile updated successfully.",
  },

  GENERAL: {
    SAVED: "Changes saved successfully.",
    LOADING: "Loading...",
    NETWORK_ERROR: "Unable to connect to the server.",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  },
};

export default notify;