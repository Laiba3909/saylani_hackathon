import { NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await connectMongo();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ success: false, message: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, userId: user._id }, { status: 200 });
  } catch (error) {
    console.log('Login Error:', error); 
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
  
}
