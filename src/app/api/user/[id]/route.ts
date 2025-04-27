// import { NextResponse } from 'next/server';
// import  connectMongo  from '@/lib/mongodb';
// import User from '@/models/user';

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await connectMongo();
//     const user = await User.findById(params.id).select('-password');

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/user';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'User ID is missing' }, { status: 400 });
    }
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
