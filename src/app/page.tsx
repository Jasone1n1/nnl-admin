'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/ui-kit/LoadingScreen';

export default function AdminIndex() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));

    const timeout = setTimeout(() => {
      setLoading(false);
      if (token) {
        router.push('/admin/protected/dashboard');
      } else {
        router.push('/admin/login');
      }
    }, 1000); // Optional: shorten delay

    return () => clearTimeout(timeout);
  }, [router]);

  return loading ? <LoadingScreen /> : null;
}
