// GET all inquiry messages

import { NextResponse } from 'next/server';
import ContactMessage from '@/models/InquiryMessage.model';
import { connectDB } from '@/lib/connectDB';

export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Error fetching inquiry messages:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to retrieve inquiry messages' },
      { status: 500 }
    );
  }
}
