// GET all inquiry messages

import { NextRequest, NextResponse } from 'next/server';
import CollaborateMessage from '@/models/CollaborateMessage.model';
import { connectDB } from '@/lib/connectDB';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const messages = await CollaborateMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error('Error fetching collaborate messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve collaborate messages' },
      { status: 500 }
    );
  }
}
