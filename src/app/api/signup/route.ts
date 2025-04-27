import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  let body: {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    designation?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const { fullName, email, password, phone, address, designation } = body;

  if (
    !fullName ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !designation
  ) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  await connectMongo();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { success: false, message: 'User already exists' },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    fullName,
    email,
    password: hash,
    phone,
    address,
    designation,
  });

  try {
    await user.save();
    return NextResponse.json(
      { success: true, message: 'User created successfully' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
