// GET all inquiry messages

import { NextResponse } from 'next/server';
import CollaborateMessage from '@/models/CollaborateMessage.model';
import { connectDB } from '@/lib/connectDB';

export async function GET() {
  try {
    await connectDB();

    // Type of messages inferred from Mongoose model
    const messages = await CollaborateMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: unknown) {
    // safer error handling
    if (error instanceof Error) {
      console.error('Error fetching collaborate messages:', error.message);
    } else {
      console.error('Unknown error fetching collaborate messages');
    }

    return NextResponse.json(
      { success: false, message: 'Failed to retrieve collaborate messages' },
      { status: 500 }
    );
  }
}
