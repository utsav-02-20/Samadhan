"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/citizen/dashboard"
        signUpFallbackRedirectUrl="/citizen/dashboard"
      />
    </div>
  );
}
