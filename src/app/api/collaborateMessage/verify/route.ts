import { NextRequest, NextResponse } from 'next/server';
import ContactMessage from '@/models/CollaborateMessage.model';
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
      verificationToken,
      verificationTokenExpiresAt,
      code,
    } = await req.json();

    // Basic validation
    if (
      !orgName || !orgType || !orgEmail || !orgAddress ||
      !collaborationDescription || !proposedTimeline || !collaborationGoals ||
      !senderName || !senderEmail || !senderContactNumber || !senderPosition || !code
    ) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    const expiryTime = new Date(verificationTokenExpiresAt).getTime();
    const currentTime = Date.now();

    if (code !== verificationToken || expiryTime < currentTime) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    const message = new ContactMessage({
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
      isVerified: true,
    });

    await message.save();

    await sendEmail('collaborateMessageConfirmation', { to: senderEmail });

    return NextResponse.json({
      success: true,
      message: 'Message successfully verified and saved',
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Verification failed:', error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error in verification');
      return NextResponse.json(
        { success: false, message: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
}
