// lib/session.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export interface User {
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      username: string;
      email: string;
      role: string;
      isActive: boolean;
    };

    // Ensure role is valid
    if (!['admin', 'editor', 'viewer'].includes(decoded.role)) {
      return null;
    }

    return {
      username: decoded.username,
      email: decoded.email,
      role: decoded.role as 'admin' | 'editor' | 'viewer',
      isActive: decoded.isActive,
    };
  } catch {
    return null;
  }
}
