// admin/protected/applications/page.tsx
import ApplicationsPage from './ApplicationsPage';
import { getCurrentUser } from '@/lib/auth';

export default async function Page() {
  const user = await getCurrentUser();

  return <ApplicationsPage user={user} />;
}
