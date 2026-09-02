/*
|--------------------------------------------------------------------------
| API Endpoints Registry
|--------------------------------------------------------------------------
| Purpose:
| - Store all backend endpoint paths in one place.
| - Group endpoints by module:
|     Citizen
|     Government
|     Department
|     University
|     Partner
| - Export endpoint objects for use inside service files.
|--------------------------------------------------------------------------
*/

const API_ENDPOINTS = {
  /* ---------------------------------------------------------------------- */
  /* Authentication */
  /* ---------------------------------------------------------------------- */
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    ME: "/api/auth/me",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
  },

  /* ---------------------------------------------------------------------- */
  /* Citizen */
  /* ---------------------------------------------------------------------- */
  CITIZEN: {
    PROFILE: "/api/citizen/profile",
    UPDATE_PROFILE: "/api/citizen/profile",

    COMPLAINT_FEED: "/api/citizen/complaints/feed",
    SUBMIT_COMPLAINT: "/api/citizen/complaints",
    COMPLAINT_HISTORY: "/api/citizen/complaints/history",

    COMPLAINT_DETAILS: (complaintId) =>
      `/api/citizen/complaints/${complaintId}`,

    UPVOTE_COMPLAINT: (complaintId) =>
      `/api/citizen/complaints/${complaintId}/upvote`,
  },

  /* ---------------------------------------------------------------------- */
  /* Department */
  /* ---------------------------------------------------------------------- */
  DEPARTMENT: {
    DASHBOARD: "/api/department/dashboard",

    ASSIGNED_COMPLAINTS: "/api/department/complaints",
    UPDATE_COMPLAINT_PROGRESS: (complaintId) =>
      `/api/department/complaints/${complaintId}`,

    ASSIGNED_PROJECTS: "/api/department/projects",
    ANALYTICS: "/api/department/analytics",
  },

  /* ---------------------------------------------------------------------- */
  /* Government */
  /* ---------------------------------------------------------------------- */
  GOVERNMENT: {
    DASHBOARD: "/api/government/dashboard",
    ANALYTICS: "/api/government/analytics",

    COMPLAINTS: "/api/government/complaints",
    COMPLAINT_DETAILS: (complaintId) =>
      `/api/government/complaints/${complaintId}`,

    DEPARTMENTS: "/api/government/departments",
    PROJECTS: "/api/government/projects",
    UNIVERSITIES: "/api/government/universities",
    PARTNERS: "/api/government/partners",
  },

  /* ---------------------------------------------------------------------- */
  /* University */
  /* ---------------------------------------------------------------------- */
  UNIVERSITY: {
    DASHBOARD: "/api/university/dashboard",
    PROFILE: "/api/university/profile",
    UPDATE_PROFILE: "/api/university/profile",

    CHALLENGES: "/api/university/challenges",
    CHALLENGE_DETAILS: (challengeId) =>
      `/api/university/challenges/${challengeId}`,

    PROJECTS: "/api/university/projects",
    ANALYTICS: "/api/university/analytics",
  },

  /* ---------------------------------------------------------------------- */
  /* Partner */
  /* ---------------------------------------------------------------------- */
  PARTNER: {
    DASHBOARD: "/api/partner/dashboard",
    PROFILE: "/api/partner/profile",
    UPDATE_PROFILE: "/api/partner/profile",

    CHALLENGES: "/api/partner/challenges",
    CHALLENGE_DETAILS: (challengeId) =>
      `/api/partner/challenges/${challengeId}`,

    PROJECTS: "/api/partner/projects",
    ANALYTICS: "/api/partner/analytics",
  },

  /* ---------------------------------------------------------------------- */
  /* Common / Uploads / Notifications */
  /* ---------------------------------------------------------------------- */
  COMMON: {
    NOTIFICATIONS: "/api/notifications",
    MARK_NOTIFICATION_READ: (notificationId) =>
      `/api/notifications/${notificationId}/read`,

    UPLOAD_IMAGE: "/api/upload/image",
    UPLOAD_DOCUMENT: "/api/upload/document",
  },
};

export default API_ENDPOINTS;