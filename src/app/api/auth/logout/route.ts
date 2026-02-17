import { NextResponse } from 'next/server';

export async function POST() {
  // Clear cookies or session here
  // Example: set cookie with expires date in the past

  return NextResponse.json({ message: 'Logged out' }, {
    status: 200,
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=0;`, // adjust cookie name
    },
  });
}
