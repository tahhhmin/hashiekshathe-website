import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationToken, getVerificationTokenExpiry } from '@/utils/generateVerification';
import { sendEmail } from '@/utils/sendMail';
import { connectDB } from '@/lib/connectDB';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      fullName,
      address,
      dob,
      gender,
      profileImageLink,
      email,
      phoneNumber,
      facebook,
      educationLevel,
      institution,
      institutionIdImage,
      whyJoin,
      previousExperience,
      workingLocation,
      skills,
      timeCommitment,
      interviewSchedule,
      referralSource,
    } = await req.json();

    if (
      !fullName || !address || !dob || !gender || !profileImageLink ||
      !email || !phoneNumber || !facebook ||
      !educationLevel || !institution || !institutionIdImage || 
      !whyJoin || !previousExperience || !workingLocation || !skills ||
      !timeCommitment || !interviewSchedule || !referralSource
    ) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = getVerificationTokenExpiry();

    await sendEmail('registrationRequestVerificationCode', {
      to: email,
      code: verificationToken,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to sender email.',
      verificationToken,
      verificationTokenExpiresAt,
    });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Error in /api/registrationRequest/submit:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
