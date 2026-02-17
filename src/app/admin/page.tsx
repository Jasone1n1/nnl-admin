// app/admin/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    redirect('/admin/protected/dashboard');
  } else {
    redirect('/admin/login');
  }
}
