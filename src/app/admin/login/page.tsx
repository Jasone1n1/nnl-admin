'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Input } from '@/components/ui-kit';
import { Card, CardContent, CardHeader } from '@/components/ui-kit/card';

export default function AdminLoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Signing you in…');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: usernameOrEmail, password }),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success(data.message || 'Welcome back.');
        router.push('/admin/protected/dashboard');
        return;
      }
      toast.error(data.message || 'Invalid credentials. Please try again.');
    } catch {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-4xl">
        <Card className="overflow-hidden shadow-xl sm:rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px] md:min-h-[480px]">
            {/* Illustration - hidden on small screens */}
            <div className="relative hidden md:block h-64 md:h-auto min-h-[280px] bg-gradient-to-br from-emerald-600 to-emerald-800">
              <Image
                src="/images/bg/3293465.jpg"
                alt=""
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 768px) 0px, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-emerald-900/40" aria-hidden />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
              <CardHeader className="p-0 pb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Admin Login
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Sign in to the NNL control panel
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <Input
                    label="Email or username"
                    type="text"
                    placeholder="you@example.com"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    autoComplete="username"
                    required
                    disabled={isLoading}
                  />
                  <div className="space-y-1.5">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded px-1 py-0.5"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <span className="inline-flex items-center gap-1"><EyeOff className="size-4" /> Hide</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><Eye className="size-4" /> Show</span>
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    leftIcon={<LogIn className="size-5" />}
                  >
                    Sign in
                  </Button>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
