/*
|--------------------------------------------------------------------------
| Axios API Client
|--------------------------------------------------------------------------
| Purpose:
| - Create a single reusable Axios instance for the frontend.
| - Set backend base URL from NEXT_PUBLIC_API_BASE_URL.
| - Automatically attach Clerk JWT token in Authorization header.
| - Handle request timeout.
| - Handle common API errors using interceptors.
| - Export configured axios client for all services.
|--------------------------------------------------------------------------
*/

import axios from "axios";
import { auth } from "@clerk/nextjs/server";

/* -------------------------------------------------------------------------- */
/* Axios Instance */
/* -------------------------------------------------------------------------- */

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/* Request Interceptor */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const { getToken } = await auth();
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Continue request without token if unavailable.
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/* Response Interceptor */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timed out. Please try again.",
      });
    }

    if (!error.response) {
      return Promise.reject({
        message: "Unable to connect to the server.",
      });
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        return Promise.reject(data || { message: "Invalid request." });

      case 401:
        return Promise.reject(data || { message: "Unauthorized access." });

      case 403:
        return Promise.reject(data || { message: "Access forbidden." });

      case 404:
        return Promise.reject(data || { message: "Resource not found." });

      case 409:
        return Promise.reject(data || { message: "Conflict detected." });

      case 422:
        return Promise.reject(data || { message: "Validation failed." });

      case 500:
        return Promise.reject(data || { message: "Internal server error." });

      default:
        return Promise.reject(
          data || { message: "Something went wrong. Please try again." }
        );
    }
  }
);

export default apiClient;