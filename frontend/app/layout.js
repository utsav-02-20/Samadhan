import "./globals.css";

export const metadata = {
  title: "Samadhan",
  description: "Civic innovation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}