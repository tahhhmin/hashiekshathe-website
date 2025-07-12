import { NextRequest, NextResponse } from 'next/server';
import RegistrationRequest from '@/models/RegistrationRequest.model';
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
      wantsLeadership,
      preferredDepartment,
      specificRole,
      cvLink,
      previousExperience,
      workingLocation,
      skills,
      timeCommitment,
      interviewSchedule,
      referralSource,
      verificationToken,
      verificationTokenExpiresAt,
      code,
    } = await req.json();

    if (
      !fullName || !address || !dob || !gender || !profileImageLink ||
      !email || !phoneNumber || !facebook ||
      !educationLevel || !institution || !institutionIdImage || 
      !whyJoin || !previousExperience || !workingLocation || !skills ||
      !timeCommitment || !interviewSchedule || !referralSource || !code
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

    const registrationRequest = new RegistrationRequest({
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
      wantsLeadership,
      preferredDepartment,
      specificRole,
      cvLink,
      previousExperience,
      workingLocation,
      skills,
      timeCommitment,
      interviewSchedule,
      referralSource,
      isVerified: true,
    });

    await registrationRequest.save();

    await sendEmail('registrationRequestConfirmation', {
      to: registrationRequest.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Registration request successfully verified and saved',
    });
  } catch (error: unknown) {
    console.error('Verification failed:', error);

    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
