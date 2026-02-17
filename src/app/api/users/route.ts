import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).select('-password');
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { username, email, password, role = 'viewer', isActive = true } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const allowedRoles = ['admin', 'editor', 'viewer'];
    if (role && !allowedRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const exists = await User.findOne({ $or: [{ username: username.trim() }, { email: email.trim().toLowerCase() }] });
    if (exists) {
      return NextResponse.json({ error: 'A user with this username or email already exists' }, { status: 409 });
    }

    // User model pre('save') hashes the password
    const user = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || 'viewer',
      isActive: isActive !== false,
    });

    await user.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
