'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import { Button, Input } from '@/components/ui-kit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-kit/card';

type Role = 'admin' | 'editor' | 'viewer';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Creating user…');

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          isActive,
        }),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success(data.message || 'User created successfully.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('admin');
        setIsActive(true);
        return;
      }
      toast.error(data.error || 'Failed to create user.');
    } catch {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="size-5" />
          New admin user
        </CardTitle>
        <p className="text-sm text-slate-500">
          Create a new user account. They can sign in with username or email.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            placeholder="jane_admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            disabled={isLoading}
          />
          <Input
            label="Email"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            disabled={isLoading}
            hint="At least 6 characters"
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            disabled={isLoading}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <p className="mt-1.5 text-sm text-slate-500">
              Admin: full access. Editor: manage content. Viewer: read only.
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              disabled={isLoading}
            />
            <span className="text-sm font-medium text-slate-700">Active (user can sign in)</span>
          </label>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            isLoading={isLoading}
            leftIcon={<UserPlus className="size-5" />}
          >
            Create user
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
