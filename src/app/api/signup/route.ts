// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, password, phone, address, designation } = body;

  if (!fullName || !email || !password || !phone || !address || !designation) {
    return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
  }

  await connectMongo();
  const existing = await User.findOne({ email });

  if (existing) {
    return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);
  const user = new User({ fullName, email, password: hash, phone, address, designation });

  try {
    await user.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
