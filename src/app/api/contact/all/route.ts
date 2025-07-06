// src/app/api/contact/all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ContactMessage from '@/models/contactMessage.model';

export async function GET(req: NextRequest) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ success: false, message: 'Failed to retrieve contact messages' }, { status: 500 });
  }
}
