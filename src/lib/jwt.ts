// src/lib/jwt.ts

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const signToken = (user: {
  id: string;
  role: string;
  value: string;
  email: string;
  username: string;
}) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment');
  }

  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const setAuthToken = async (user: any) => {
  const token = signToken({  // Reuse the above function
    id: user._id.toString(),
    role: user.role,
    value: user.value,
    email: user.email,
    username: user.username,
  });

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
};
