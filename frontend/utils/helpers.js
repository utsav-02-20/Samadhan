/*
|--------------------------------------------------------------------------
| Frontend Helper Utilities
|--------------------------------------------------------------------------
| Purpose:
| - Common reusable helper functions used across the frontend.
| - Date & time formatting.
| - Text formatting.
| - Status & priority styling.
| - Number and currency formatting.
| - File and image helpers.
|--------------------------------------------------------------------------
*/

import {
  COMPLAINT_STATUS_COLORS,
  COMPLAINT_PRIORITY_COLORS,
} from "./constants";

/* -------------------------------------------------------------------------- */
/* Date Helpers */
/* -------------------------------------------------------------------------- */

export function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeTime(date) {
  if (!date) return "";

  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  const intervals = [
    { label: "year", value: 31536000 },
    { label: "month", value: 2592000 },
    { label: "day", value: 86400 },
    { label: "hour", value: 3600 },
    { label: "minute", value: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

/* -------------------------------------------------------------------------- */
/* Text Helpers */
/* -------------------------------------------------------------------------- */

export function capitalize(text = "") {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateText(text = "", length = 120) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}

export function generateInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/* -------------------------------------------------------------------------- */
/* Status & Priority Helpers */
/* -------------------------------------------------------------------------- */

export function getStatusColor(status) {
  return COMPLAINT_STATUS_COLORS[status] || "bg-gray-100 text-gray-700";
}

export function getPriorityColor(priority) {
  return COMPLAINT_PRIORITY_COLORS[priority] || "bg-gray-100 text-gray-700";
}

/* -------------------------------------------------------------------------- */
/* Number Helpers */
/* -------------------------------------------------------------------------- */

export function formatNumber(value = 0) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}

export function formatCurrency(amount = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

/* -------------------------------------------------------------------------- */
/* File Helpers */
/* -------------------------------------------------------------------------- */

export function getFileExtension(filename = "") {
  return filename.split(".").pop()?.toLowerCase() || "";
}

export function isImageFile(file) {
  if (!file) return false;

  return (
    file.type?.startsWith("image/") ||
    ["jpg", "jpeg", "png", "webp"].includes(
      getFileExtension(file.name || "")
    )
  );
}

/* -------------------------------------------------------------------------- */
/* Misc Helpers */
/* -------------------------------------------------------------------------- */

export function buildQueryString(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, value);
    }
  });

  return query.toString();
}

export function sortByLatest(items = [], key = "createdAt") {
  return [...items].sort(
    (a, b) => new Date(b[key]) - new Date(a[key])
  );
}