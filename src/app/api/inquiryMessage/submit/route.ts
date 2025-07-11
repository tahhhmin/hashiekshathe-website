// Send verification code

import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationToken, getVerificationTokenExpiry } from '@/utils/generateVerification';
import { sendEmail } from '@/utils/sendMail';
import { connectDB } from '@/lib/connectDB';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, subject, userMessage } = await req.json();

    if (!email || !subject || !userMessage) {
      return NextResponse.json(
        { success: false, message: 'Please fill all fields' },
        { status: 400 }
      );
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = getVerificationTokenExpiry();

    await sendEmail('inquiryMessageVerificationCode', {
      to: email,
      code: verificationToken,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email',
      verificationToken,
      verificationTokenExpiresAt,
    });
  } catch (error: any) {
    console.error('Error in /submit:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
