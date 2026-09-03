import { SignIn } from "@clerk/nextjs";

export default function UniversitySignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignIn forceRedirectUrl="/university/dashboard" />
    </div>
  );
}
