// GET all inquiry messages

import { NextRequest, NextResponse } from 'next/server';
import ContactMessage from '@/models/InquiryMessage.model';
import { connectDB } from '@/lib/connectDB';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error('Error fetching inquiry messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve inquiry messages' },
      { status: 500 }
    );
  }
}
