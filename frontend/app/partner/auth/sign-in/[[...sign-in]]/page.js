import { SignIn } from "@clerk/nextjs";

export default function PartnerSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignIn forceRedirectUrl="/partner" />
    </div>
  );
}
