import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Todo from '../../../models/todo';

export async function POST(req: NextRequest) {
  try {
    const { title, description, completed = false } = await req.json();

    if (!title) {
      return NextResponse.json({
        success: false,
        message: 'Title is required',
      }, { status: 400 });
    }

    await connectToDatabase();

    const newTodo = new Todo({
      title,
      description: description || '',
      completed,
    });

    await newTodo.save();

    return NextResponse.json({
      success: true,
      message: 'Todo added successfully',
      todo: newTodo,
    }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal Server Error',
    }, { status: 500 });
  }
}

