import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samadhan · Citizen Action Portal",
  description:
    "Empowering citizens to report local challenges and connect directly with government departments and institutions for measurable impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body className="min-h-screen bg-[#f8fafc] text-slate-950 antialiased selection:bg-indigo-100 selection:text-indigo-900">
    //     <ClerkProvider afterSignOutUrl="/">
    //       {children}
    //     </ClerkProvider>
    //   </body>
    // </html>
    children
  );
}