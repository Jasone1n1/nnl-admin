import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of applications and activity.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
