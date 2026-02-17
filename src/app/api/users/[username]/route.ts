// app/api/admin/users/[username]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await dbConnect();
    const { username } = await context.params;
    const body = await req.json();

    if (body.password) {
      // hash new password if present
      const bcrypt = await import('bcryptjs');
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
// app/api/admin/users/[username]/route.ts (same file add DELETE)
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    await dbConnect();
    const { username } = await context.params;

    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `User "${username}" deleted successfully` });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

