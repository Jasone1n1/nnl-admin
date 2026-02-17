import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CreateUserForm from './CreateUserForm';

export default async function CreateUserPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create user
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new admin or editor account
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <p className="font-medium">Access restricted</p>
          <p className="mt-1 text-sm">Only admins can create new users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Create user
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Add a new admin, editor, or viewer account
        </p>
      </div>
      <CreateUserForm />
    </div>
  );
}
