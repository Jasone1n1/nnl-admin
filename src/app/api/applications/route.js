// src/app/api/applications/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Application from '@/models/formModel';

export async function GET() {
  await dbConnect();
  const applications = await Application.find().lean();
  return NextResponse.json(applications);
}

export async function DELETE() {
  await dbConnect();
  await Application.deleteMany({});
  return NextResponse.json({ message: 'All applications deleted' });
}
