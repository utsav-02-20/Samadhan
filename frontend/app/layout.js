import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: "Samadhan",
  description: "Civic innovation platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-[#f8fafc] text-slate-950 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}