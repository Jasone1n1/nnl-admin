import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/dbConnect';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';
import { Badge } from '@/components/ui-kit/badge';

export default async function ProfilePage() {
  await connectDB();
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        User not found or not logged in.
      </div>
    );
  }

  const roleNotes: Record<string, string> = {
    admin: 'Admins have full control over the system.',
    editor: 'Editors can manage content but not users.',
    viewer: 'Viewers can only view content.',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your account details and role
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium text-slate-500">Username</span>
            <p className="mt-0.5 text-slate-900">{user.username}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-500">Email</span>
            <p className="mt-0.5 text-slate-900">{user.email}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-500">Role</span>
            <p className="mt-1">
              <Badge variant="default" className="capitalize">{user.role}</Badge>
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">Role notes</p>
            <p className="mt-1 text-sm text-slate-600">{roleNotes[user.role] ?? '—'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
