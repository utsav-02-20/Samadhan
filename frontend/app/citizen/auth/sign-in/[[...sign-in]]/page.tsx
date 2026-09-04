import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      forceRedirectUrl="/citizen/dashboard"
      fallbackRedirectUrl="/citizen/dashboard"
      signUpUrl="/citizen/auth/sign-up"
    />
  );
}