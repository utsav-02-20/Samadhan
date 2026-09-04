import { SignUp } from "@clerk/nextjs";

export default function DepartmentSignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
      <SignUp forceRedirectUrl="/department" />
    </div>
  );
}
