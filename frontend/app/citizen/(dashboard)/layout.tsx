import AppShell from "../../../components-citizen/layout/AppShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell role="citizen">{children}</AppShell>;
}
