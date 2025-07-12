// Verify code and save message

import { NextRequest, NextResponse } from 'next/server';
import ContactMessage from '@/models/InquiryMessage.model';
import { sendEmail } from '@/utils/sendMail';
import { connectDB } from '@/lib/connectDB'; 

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      email,
      subject,
      userMessage,
      verificationToken,
      verificationTokenExpiresAt,
      code,
    } = await req.json();

    if (
      !email || !subject || !userMessage ||
      !verificationToken || !verificationTokenExpiresAt || !code
    ) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const expiryTime = new Date(verificationTokenExpiresAt).getTime();
    const currentTime = Date.now();

    if (code !== verificationToken || expiryTime < currentTime) {
      return NextResponse.json({ success: false, message: 'Invalid or expired verification code' }, { status: 400 });
    }

    const message = new ContactMessage({
      email,
      subject,
      userMessage,
      isVerified: true,
    });

    await message.save();

    await sendEmail('inquiryMessageConfirmation', { to: message.email });

    return NextResponse.json({ success: true, message: 'Message successfully verified and saved' });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Verification failed:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
