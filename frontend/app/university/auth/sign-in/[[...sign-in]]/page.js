"use client";

import { useEffect } from "react";

export default function UniversitySignInPage() {
  useEffect(() => {
    window.location.href = "/login/university";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <p className="text-sm font-bold text-slate-500">Redirecting to University Login...</p>
    </div>
  );
}
