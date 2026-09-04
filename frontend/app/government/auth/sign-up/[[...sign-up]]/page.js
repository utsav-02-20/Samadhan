import { SignUp } from "@clerk/nextjs";

export default function GovernmentSignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignUp forceRedirectUrl="/government" />
    </div>
  );
}
