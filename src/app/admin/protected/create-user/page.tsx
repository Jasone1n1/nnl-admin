import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';

export default function CreateUserPage() {
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
      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            User creation form will be available here. Use your existing auth flow or API to add users in the meantime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
