import { NextResponse } from 'next/server';
import  connectMongo  from '@/lib/mongodb';
import User from '@/models/user';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const user = await User.findById(params.id).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
