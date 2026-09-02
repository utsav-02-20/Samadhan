/*
|--------------------------------------------------------------------------
| Global Constants
|--------------------------------------------------------------------------
| Purpose:
| - Application constants.
| - Complaint status values.
| - Priority values.
| - Categories.
| - User roles.
|--------------------------------------------------------------------------
*/

/* -------------------------------------------------------------------------- */
/* User Roles */
/* -------------------------------------------------------------------------- */

export const USER_ROLES = {
  CITIZEN: "citizen",
  GOVERNMENT: "government",
  DEPARTMENT: "department",
  UNIVERSITY: "university",
  PARTNER: "partner",
};

/* -------------------------------------------------------------------------- */
/* Complaint Status */
/* -------------------------------------------------------------------------- */

export const COMPLAINT_STATUS = [
  "Pending",
  "Assigned",
  "In Progress",
  "Resolved",
  "Rejected",
];

export const COMPLAINT_STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700",
  Assigned: "bg-blue-100 text-blue-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Resolved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

/* -------------------------------------------------------------------------- */
/* Complaint Priority */
/* -------------------------------------------------------------------------- */

export const COMPLAINT_PRIORITY = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

export const COMPLAINT_PRIORITY_COLORS = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
};

/* -------------------------------------------------------------------------- */
/* Complaint Categories */
/* -------------------------------------------------------------------------- */

export const COMPLAINT_CATEGORIES = [
  "Roads",
  "Water Supply",
  "Drainage",
  "Garbage & Sanitation",
  "Electricity",
  "Street Lights",
  "Public Transport",
  "Traffic",
  "Healthcare",
  "Education",
  "Environment",
  "Safety & Security",
  "Parks & Recreation",
  "Government Services",
  "Other",
];

/* -------------------------------------------------------------------------- */
/* Challenge Categories */
/* -------------------------------------------------------------------------- */

export const CHALLENGE_CATEGORIES = [
  "Infrastructure",
  "Environment",
  "Healthcare",
  "Education",
  "Disaster Management",
  "Transportation",
  "Water Management",
  "Smart City",
  "Agriculture",
  "Technology",
  "Energy",
  "Public Safety",
];

/* -------------------------------------------------------------------------- */
/* Difficulty Levels */
/* -------------------------------------------------------------------------- */

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

/* -------------------------------------------------------------------------- */
/* Project Status */
/* -------------------------------------------------------------------------- */

export const PROJECT_STATUS = [
  "Proposed",
  "Approved",
  "In Progress",
  "Completed",
  "Rejected",
];

/* -------------------------------------------------------------------------- */
/* Challenge Status */
/* -------------------------------------------------------------------------- */

export const CHALLENGE_STATUS = [
  "Open",
  "Assigned",
  "In Progress",
  "Completed",
  "Closed",
];

/* -------------------------------------------------------------------------- */
/* Pagination */
/* -------------------------------------------------------------------------- */

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/* -------------------------------------------------------------------------- */
/* Upload Constraints */
/* -------------------------------------------------------------------------- */

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* -------------------------------------------------------------------------- */
/* Analytics Date Filters */
/* -------------------------------------------------------------------------- */

export const ANALYTICS_FILTERS = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "Custom",
];