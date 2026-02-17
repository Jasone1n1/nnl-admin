import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your account details and role.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
