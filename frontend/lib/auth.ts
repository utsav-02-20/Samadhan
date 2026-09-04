/*
|--------------------------------------------------------------------------
| Clerk JWT Authentication Helper
|--------------------------------------------------------------------------
| File: lib/auth.ts
| Purpose:
| - Client/server token acquisition utility for Clerk JWT.
| - Generates Authorization headers for protected backend requests.
|--------------------------------------------------------------------------
*/

export async function getAuthHeaders(getToken: (options?: any) => Promise<string | null>) {
  try {
    const token = await getToken();
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    console.error("[Auth Helper Error] Failed to retrieve Clerk JWT token:", error);
    return {};
  }
}
