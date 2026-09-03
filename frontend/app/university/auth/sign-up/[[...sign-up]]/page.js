import { SignUp } from "@clerk/nextjs";

export default function UniversitySignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignUp forceRedirectUrl="/university/dashboard" />
    </div>
  );
}
