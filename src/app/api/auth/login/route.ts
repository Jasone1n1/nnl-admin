import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken'; // Use jwt sign
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to set this in .env

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  await dbConnect();
  const allowedRoles = ['admin', 'editor', 'viewer'];
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return NextResponse.json({ message: '🕵️ User not found' }, { status: 404 });
  }

  if (!allowedRoles.includes(user.role)) {
  return NextResponse.json({ message: 'Access denied: insufficient permissions' }, { status: 403 });
}

  if (!user.isActive) {
    return NextResponse.json({ message: '🔒 Account is inactive' }, { status: 403 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: '❌ Incorrect password' }, { status: 401 });
  }

  // Create a JWT token with user info and expiry
  const token = sign(
    { id: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Set cookie in response
  const response = NextResponse.json({ message: '✅ Login successful' });
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax',
  });

  return response;
}
