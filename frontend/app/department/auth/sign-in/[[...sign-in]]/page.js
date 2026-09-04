import { SignIn } from "@clerk/nextjs";

export default function DepartmentSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignIn forceRedirectUrl="/department" />
    </div>
  );
}
