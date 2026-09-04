/*
|--------------------------------------------------------------------------
| Citizen Auto-Registration Hook
|--------------------------------------------------------------------------
| File: hooks/useCitizen.ts
| Purpose:
| - Triggers auto-registration when Clerk user logs into the citizen portal.
| - Calls POST /citizens/register with user metadata and JWT token.
|--------------------------------------------------------------------------
*/

"use client";

import { useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { registerCitizen } from "@/services/citizen.service";

export function useCitizenAutoRegister() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const registeredRef = useRef(false);

  useEffect(() => {
    async function syncCitizen() {
      if (!isLoaded || !isSignedIn || !user || registeredRef.current) return;

      try {
        registeredRef.current = true;
        const token = await getToken();

        const payload = {
          clerkId: user.id,
          name: user.fullName || user.firstName || "Citizen User",
          email: user.primaryEmailAddress?.emailAddress || "",
          phone: user.primaryPhoneNumber?.phoneNumber || "",
          district: (user.publicMetadata?.district as string) || "General",
        };

        await registerCitizen(payload, token || undefined);
        console.log("[Citizen Hook] Auto-registration synchronized successfully.");
      } catch (err) {
        console.error("[Citizen Hook] Failed to auto-register citizen:", err);
      }
    }

    syncCitizen();
  }, [isLoaded, isSignedIn, user, getToken]);
}

export default useCitizenAutoRegister;
