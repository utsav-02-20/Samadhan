/*
|--------------------------------------------------------------------------
| Base API Fetch Helper & Configuration
|--------------------------------------------------------------------------
| File: lib/api.ts
| Purpose:
| - Store process.env.NEXT_PUBLIC_API_URL ("http://localhost:5000/api/v1").
| - Reusable fetch wrapper for making API calls.
| - Handles JSON body serialization, FormData support, and response parsing.
|--------------------------------------------------------------------------
*/

const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";
export const API_BASE_URL = configuredApiUrl.replace(/\/$/, "").endsWith("/api/v1")
  ? configuredApiUrl.replace(/\/$/, "")
  : `${configuredApiUrl.replace(/\/$/, "")}/api/v1`;

export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  token?: string;
  body?: any;
  silent?: boolean;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, body, ...customOptions } = options;

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    ...(customHeaders as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const config: RequestInit = {
    ...customOptions,
    headers,
  };

  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      config.body = body;
    } else if (typeof body === "object") {
      config.body = JSON.stringify(body);
    } else {
      config.body = body;
    }
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `API call failed with status ${response.status}`);
    }

    return data as T;
  } catch (error: any) {
    if (!options.silent) {
      console.warn(`[API Info] ${endpoint} backend unavailable, using local data.`);
    }
    throw error;
  }
}

export default apiFetch;
