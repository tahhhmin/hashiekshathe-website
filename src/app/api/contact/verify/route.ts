import { NextRequest, NextResponse } from 'next/server';
import ContactMessage from '@/models/contactMessage.model';
import { sendEmail } from '@/utils/sendMail';
import { connectDB } from '@/lib/connectDB'; 

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // <-- make sure DB is connected first

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

    await sendEmail('contactMessageConfirmation', { to: message.email });

    return NextResponse.json({ success: true, message: 'Message successfully verified and saved' });
  } catch (error: any) {
    console.error('Verification failed:', error);
    return NextResponse.json({ success: false, message: error.message || 'Something went wrong' }, { status: 500 });
  }
}
