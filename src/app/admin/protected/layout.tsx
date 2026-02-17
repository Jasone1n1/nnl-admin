import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layout';
import { getCurrentUser } from '@/lib/session';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <AppShell user={user}>{children}</AppShell>;
}
