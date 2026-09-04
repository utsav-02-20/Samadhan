import { SignUp } from "@clerk/nextjs";

export default function PartnerSignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignUp forceRedirectUrl="/partner" />
    </div>
  );
}
