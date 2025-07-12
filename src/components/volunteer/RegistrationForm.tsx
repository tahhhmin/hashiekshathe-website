'use client';

import React, { useState } from 'react';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import Button from '@/ui/Button';
import Styles from './RegistraionForm.module.css';
import VerificationCodeInput from '@/ui/VerificationCodeInput';
import Select from '@/ui/Select';

export default function RegistrationForm() {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [profileImageLink, setProfileImageLink] = useState('');

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [facebook, setFacebook] = useState('');

    const [educationLevel, setEducationLevel] = useState('');
    const [institution, setInstitution] = useState('');
    const [institutionIdImage, setInstitutionIdImage] = useState('');

    const [whyJoin, setWhyJoin] = useState('');

    const [wantsLeadership, setWantsLeadership] = React.useState<boolean | string>('');
    const [preferredDepartment, setPreferredDepartment] = useState<string | boolean>('');
    
    const [specificRole, setSpecificRole] = useState('');
    const [cvLink, setCvLink] = useState('');

    const [previousExperience, setPreviousExperience] = useState('');
    const [workingLocation, setWorkingLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [timeCommitment, setTimeCommitment] = useState('');

    const [interviewSchedule, setInterviewSchedule] = useState('');
    const [referralSource, setReferralSource] = useState('');

    const [code, setCode] = useState('');
    const [step, setStep] = useState<'form' | 'verify'>('form');
    const [loading, setLoading] = useState(false);
    const [verificationToken, setVerificationToken] = useState('');
    const [verificationTokenExpiresAt, setVerificationTokenExpiresAt] = useState('');







    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !fullName || !address || !dob || !gender || !profileImageLink ||
            !email || !phoneNumber || !facebook || 
            !educationLevel || !institution || !institutionIdImage || 
            !whyJoin || !previousExperience || !workingLocation || !skills ||
            !timeCommitment || !interviewSchedule || !referralSource
        ) {
            alert('Please fill all fields.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/registrationRequest/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to submit registration form');

            setVerificationToken(data.verificationToken);
            setVerificationTokenExpiresAt(data.verificationTokenExpiresAt);
            setStep('verify');

        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (code.length !== 6) {
            alert('Please enter the full 6-digit code.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/registrationRequest/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Verification failed');

            alert('Your message is verified and submitted!');
            // Reset form
            setFullName('');
            setDob('');
            setAddress('');
            setGender('');
            setProfileImageLink('');

            setEmail('');
            setPhoneNumber('');
            setFacebook('');

            setEducationLevel('');
            setInstitution('');
            setInstitutionIdImage('');

            setWhyJoin('');
            setWantsLeadership('');
            setPreferredDepartment('');
            setSpecificRole('');
            setCvLink('');

            setPreviousExperience('');
            setWorkingLocation('');
            setSkills('');
            setTimeCommitment('');

            setCode('');
            setStep('form');
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Styles.FormContainer}>
            <form
                onSubmit={step === 'form' ? handleSubmit : handleVerify}
                className={Styles.Form}
            >
                <div className={Styles.formHeader}>
                    <h2>Volunteer Registration Form</h2>
                    <p className="muted-text">
                        {step === 'form'
                            ? 'Please fill the form to submit a registration request.'
                            : 'Enter the verification code sent to your email'}
                    </p>
                </div>

                {step === 'form' && (
                <div className={Styles.formInput}>
                    {/* Personal Information */}
                    <div className={Styles.formInputGroup}>
                        <h3>Personal Information</h3>
                        <Input label="Full name" name="fullname"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            showIcon
                            icon="User"
                            showHelpText
                            helpText="Enter your full name."
                            placeholder="John Doe"
                            required
                        />
                        <Input label="Address" name="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            showIcon icon="MapPin"
                            showHelpText helpText="Your current address."
                            placeholder="123 Street Name, City"
                            required
                        />
                            <Input label="Date of Birth" name="dob"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        showIcon icon="Calendar"
        showHelpText helpText="Enter your birth date."
        required
    />
        <Input label="Gender" name="gender"
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        showIcon icon="VenetianMask"
        showHelpText helpText="e.g., Male, Female, Non-binary, etc."
        placeholder="Male / Female / Other"
        required
    />

        <Input label="Profile Image Link" name="profileImageLink"
        type="url"
        value={profileImageLink}
        onChange={(e) => setProfileImageLink(e.target.value)}
        showIcon icon="Image"
        showHelpText helpText="Link to your profile picture."
        placeholder="https://example.com/image.jpg"
        required
    />
                    </div>
                    
                    <div className={Styles.formInputGroup}>
                        <h3>Contact Information</h3>
    <Input label="Email" name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        showIcon icon="Mail"
        showHelpText helpText="Your active email address."
        placeholder="you@example.com"
        required
    />
        <Input label="Phone Number" name="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        showIcon icon="Phone"
        showHelpText helpText="Active phone number with country code."
        placeholder="+8801XXXXXXXXX"
        required
    />
    <Input label="Facebook Profile" name="facebook"
        type="url"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
        showIcon icon="Facebook"
        showHelpText helpText="Link to your Facebook profile."
        placeholder="https://facebook.com/yourprofile"
        required
    />
                    </div>





                    {/* Education Details */}
<div className={Styles.formInputGroup}>
    <h3>Education</h3>
    <Input label="Current Education Level" name="educationLevel"
        type="text"
        value={educationLevel}
        onChange={(e) => setEducationLevel(e.target.value)}
        showIcon icon="GraduationCap"
        showHelpText helpText="e.g., HSC 1st Year, Undergraduate 2nd Year"
        placeholder="HSC / University Year"
        required
    />

    <Input label="Institution Name" name="institution"
        type="text"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        showIcon icon="School"
        showHelpText helpText="Your current institution."
        placeholder="Notre Dame College, Dhaka"
        required
    />

    <Input label="Institution ID Image Link" name="institutionIdImage"
        type="url"
        value={institutionIdImage}
        onChange={(e) => setInstitutionIdImage(e.target.value)}
        showIcon icon="IdCard"
        showHelpText helpText="Link to your student ID image."
        placeholder="https://example.com/id.jpg"
        required
    />
</div>

{/* Motivation & Roles */}
<div className={Styles.formInputGroup}>
    <h3>Motivation & Roles</h3>
    <Textarea label="Why do you want to join?" name="whyJoin"
        value={whyJoin}
        onChange={(e) => setWhyJoin(e.target.value)}

        showHelpText helpText="Tell us why you're interested in volunteering."
        placeholder="I'm passionate about helping others..."
        required
    />

    <Select
        label="Wants Leadership?"
        name="wantsLeadership"
        options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
        ]}
        value={wantsLeadership}
        onChange={(val) => setWantsLeadership(val as boolean | '')}
        placeholder="Choose an option"
        showIcon
        icon="Crown"
        showHelpText
        helpText="Pick an option"
    />

    { wantsLeadership === true &&
        // if select wantsLeadership is yes show or hide
        <div className={Styles.hiddenInputs}>

        <Select
            label="Preferred Department"
            name="preferredDepartment"
            value={preferredDepartment}
            onChange={(value) => setPreferredDepartment(value)}
            placeholder="e.g., Marketing, HR, Digital"
            showIcon
            icon="Layers"
            showHelpText={true}
            helpText="Which department do you want to work in?"
            options={[
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            ]}
        />
        <Input label="Specific Role (if any)" name="specificRole"
            type="text"
            value={specificRole}
            onChange={(e) => setSpecificRole(e.target.value)}
            showIcon icon="Briefcase"
            showHelpText helpText="If you have a role in mind."
            placeholder="Content Writer, Web Dev, etc."
        />

        <Input label="CV/Portfolio Link" name="cvLink"
            type="url"
            value={cvLink}
            onChange={(e) => setCvLink(e.target.value)}
            showIcon icon="FileText"
            showHelpText helpText="Link to your CV or portfolio."
            placeholder="https://drive.google.com/..."
        />
    </div>}
</div>


{/* Background & Availability */}
<div className={Styles.formInputGroup}>
    <h3>Background & Commitment</h3>
    <Textarea label="Previous Volunteering or Experience" name="previousExperience"
        value={previousExperience}
        onChange={(e) => setPreviousExperience(e.target.value)}


        showHelpText helpText="Share your previous relevant experience."
        placeholder="I've volunteered at..."
        required
    />

    <Input label="Preferred Working Location" name="workingLocation"
        type="text"
        value={workingLocation}
        onChange={(e) => setWorkingLocation(e.target.value)}
        showIcon icon="Map"
        showHelpText helpText="e.g., Dhaka, Remote, Rangpur"
        placeholder="Dhaka / Online / Rangpur"
        required
    />

    <Input label="Your Skills" name="skills"
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        showIcon icon="Settings2"
        showHelpText helpText="List your key skills separated by commas."
        placeholder="Communication, Photoshop, Coding"
        required
    />

    <Input label="Time Commitment (weekly)" name="timeCommitment"
        type="text"
        value={timeCommitment}
        onChange={(e) => setTimeCommitment(e.target.value)}
        showIcon icon="Clock"
        showHelpText helpText="Estimated hours you can give per week."
        placeholder="5 hours/week"
        required
    />



    <Input label="Preferred Interview Schedule" name="interviewSchedule"
        type="date"
        value={interviewSchedule}
 onChange={(e) => setInterviewSchedule(e.target.value)}
        showIcon icon="CalendarClock"
        showHelpText helpText="When are you available for an interview?"
        required
    />

    <Input label="How did you hear about us?" name="referralSource"
        type="text"
        value={referralSource}
        onChange={(e) => setReferralSource(e.target.value)}
        showIcon icon="Megaphone"
        showHelpText helpText="e.g., Friend, Instagram, College"
        placeholder="Instagram / Friend / College"
        required
    />
</div>



                </div>
                )}


                {step === 'verify' && (
                    <div className={Styles.verification}>
                        <VerificationCodeInput
                        label="Verification Code"
                        value={code}
                        onChange={setCode}
                        length={6}
                        autoFocus
                        helpText="Enter the 6-digit code sent to your email."
                        />
                    </div>
                )}

                <div className={Styles.formFooter}>
                    <Button
                        type="submit"
                        variant="submit"
                        label={
                            loading
                                ? 'Processing...'
                                : step === 'form'
                                ? 'Send Message'
                                : 'Verify Code'
                        }
                        showIcon
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
}

