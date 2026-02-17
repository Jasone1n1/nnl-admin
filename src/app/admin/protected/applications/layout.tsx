import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applications',
  description: 'View and manage loan applications.',
};

export default function ApplicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
