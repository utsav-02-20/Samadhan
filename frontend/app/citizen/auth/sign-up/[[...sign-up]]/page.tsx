import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      forceRedirectUrl="/citizen/dashboard"
      fallbackRedirectUrl="/citizen/dashboard"
      signInUrl="/citizen/auth/sign-in"
    />
  );
}