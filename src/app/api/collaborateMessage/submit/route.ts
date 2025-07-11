import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationToken, getVerificationTokenExpiry } from '@/utils/generateVerification';
import { sendEmail } from '@/utils/sendMail';
import { connectDB } from '@/lib/connectDB';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      orgName,
      orgType,
      orgEmail,
      orgWebsiteLink,
      orgSocialLink,
      orgAddress,
      collaborationDescription,
      proposedTimeline,
      collaborationGoals,
      senderName,
      senderEmail,
      senderContactNumber,
      senderSocialLink,
      senderPosition,
    } = await req.json();

    // Basic validation
    if (
      !orgName || !orgType || !orgEmail || !orgAddress ||
      !collaborationDescription || !proposedTimeline || !collaborationGoals ||
      !senderName || !senderEmail || !senderContactNumber || !senderPosition
    ) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = getVerificationTokenExpiry();

    // Send verification email to the sender
    await sendEmail('collaborateMessageVerificationCode', {
      to: senderEmail,
      code: verificationToken,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to sender email.',
      verificationToken,
      verificationTokenExpiresAt,
    });

  } catch (error: any) {
    console.error('Error in /api/collaborateMessage/submit:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
