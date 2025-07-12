'use client';

import React, { useState } from 'react';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Styles from './CollaborateForm.module.css';
import VerificationCodeInput from '@/ui/VerificationCodeInput';
import Textarea from '@/ui/Textarea';

function CollaborateForm() {
    const [orgName, setOrgName] = useState('');
    const [orgType, setOrgType] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgWebsiteLink, setOrgWebsiteLink] = useState('');
    const [orgSocialLink, setOrgSocialLink] = useState('');
    const [orgAddress, setOrgAddress] = useState('');

    const [collaborationDescription, setCollaborationDescription] = useState('');
    const [proposedTimeline, setProposedTimeline] = useState('');
    const [collaborationGoals, setCollaborationGoals] = useState('');

    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderContactNumber, setSenderContactNumber] = useState('');
    const [senderSocialLink, setSenderSocialLink] = useState('');
    const [senderPosition, setSenderPosition] = useState('');

    const [code, setCode] = useState('');
    const [step, setStep] = useState<'form' | 'verify'>('form');
    const [loading, setLoading] = useState(false);
    const [verificationToken, setVerificationToken] = useState('');
    const [verificationTokenExpiresAt, setVerificationTokenExpiresAt] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !orgName || !orgType || !orgEmail || !orgAddress ||
            !collaborationDescription || !proposedTimeline || !collaborationGoals ||
            !senderName || !senderEmail || !senderContactNumber || !senderPosition
        ) {
            alert('Please fill all fields.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/collaborateMessage/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orgName, orgType, orgEmail, orgWebsiteLink, orgSocialLink, orgAddress,
                    collaborationDescription, proposedTimeline, collaborationGoals,
                    senderName, senderEmail, senderContactNumber, senderSocialLink, senderPosition
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to submit collaboration form');

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
            const res = await fetch('/api/collaborateMessage/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Verification failed');

            alert('Your message is verified and submitted!');
            // Reset form
            setOrgName('');
            setOrgType('');
            setOrgEmail('');
            setOrgWebsiteLink('');
            setOrgSocialLink('');
            setOrgAddress('');
            setCollaborationDescription('');
            setProposedTimeline('');
            setCollaborationGoals('');
            setSenderName('');
            setSenderEmail('');
            setSenderContactNumber('');
            setSenderSocialLink('');
            setSenderPosition('');
            setCode('');
            setStep('form');
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Styles.collaborateFormContainer}>
            <form
                onSubmit={step === 'form' ? handleSubmit : handleVerify}
                className={Styles.collaborateForm}
            >
                <div className={Styles.formHeader}>
                    <h2>Collaborate Form</h2>
                    <p className="muted-text">
                        {step === 'form'
                            ? 'Please fill the form to propose a collaboration.'
                            : 'Enter the verification code sent to your email'}
                    </p>
                </div>

                {step === 'form' && (
                <div className={Styles.formInput}>
                    {/* Organization Details */}
                    <div className={Styles.formInputGroup}>
                    <h3>Organization Details</h3>
                    <Input
                        label="Organization Name"
                        name="orgName"
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        showIcon
                        icon="Building2"
                        showHelpText
                        helpText="Enter your organization's official name."
                        placeholder="e.g., Hashi Ekshathe Foundation"
                        required
                    />
                    <Input
                        label="Type of Organization"
                        name="orgType"
                        type="text"
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        showIcon
                        icon="Tag"
                        showHelpText
                        helpText="E.g., Nonprofit, Community Group, Student Club."
                        placeholder="e.g., Nonprofit"
                        required
                    />
                    <Input
                        label="Organization Email"
                        name="orgEmail"
                        type="email"
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        showIcon
                        icon="Mail"
                        showHelpText
                        helpText="Official email address for contact."
                        placeholder="e.g., contact@org.com"
                        required
                    />
                    <Input
                        label="Website Link"
                        name="orgWebsite"
                        type="url"
                        value={orgWebsiteLink}
                        onChange={(e) => setOrgWebsiteLink(e.target.value)}
                        showIcon
                        icon="Globe"
                        showHelpText
                        helpText="Link to your organization's website (optional)."
                        placeholder="e.g., https://yourorg.org"
                    />
                    <Input
                        label="Social Media Link"
                        name="orgSocial"
                        type="url"
                        value={orgSocialLink}
                        onChange={(e) => setOrgSocialLink(e.target.value)}
                        showIcon
                        icon="Instagram"
                        showHelpText
                        helpText="Primary social media profile (Facebook, Instagram, etc)."
                        placeholder="e.g., https://facebook.com/yourpage"
                    />
                    <Input
                        label="Organization Address"
                        name="orgAddress"
                        type="text"
                        value={orgAddress}
                        onChange={(e) => setOrgAddress(e.target.value)}
                        showIcon
                        icon="MapPin"
                        showHelpText
                        helpText="Full address of your headquarters or base."
                        placeholder="e.g., 123 Street Name, Dhaka, Bangladesh"
                        required
                    />
                    </div>

                    {/* Collaboration Details */}
                    <div className={Styles.formInputGroup}>
                    <h3>Collaboration Details</h3>
                    <Textarea label="Why do you want to join?" name="whyJoin"
                        value={collaborationDescription}
                        onChange={(e) => setCollaborationDescription(e.target.value)}
                        showHelpText helpText="Describe what kind of collaboration you are proposing."
                        placeholder="e.g., Joint food distribution during Eid"
                        required
                    />
                    <Input
                        label="Proposed Timeline"
                        name="timeline"
                        type="text"
                        value={proposedTimeline}
                        onChange={(e) => setProposedTimeline(e.target.value)}
                        showIcon
                        icon="Calendar"
                        showHelpText
                        helpText="Share your expected start and end time."
                        placeholder="e.g., August 2025 - October 2025"
                        required
                    />
                    <Input
                        label="Collaboration Goals"
                        name="collabGoals"
                        type="text"
                        value={collaborationGoals}
                        onChange={(e) => setCollaborationGoals(e.target.value)}
                        showIcon
                        icon="Target"
                        showHelpText
                        helpText="What do you want to achieve together?"
                        placeholder="e.g., Reach 1,000 underprivileged families"
                        required
                    />
                    </div>

                    {/* Sender Details */}
                    <div className={Styles.formInputGroup}>
                    <h3>Sender Details</h3>
                    <Input
                        label="Your Full Name"
                        name="senderName"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        showIcon
                        icon="User"
                        showHelpText
                        helpText="Your full name as the request sender."
                        placeholder="e.g., Tajrian Tahmin"
                        required
                    />
                    <Input
                        label="Your Email"
                        name="senderEmail"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        showIcon
                        icon="AtSign"
                        showHelpText
                        helpText="You'll receive the verification code here."
                        placeholder="e.g., you@example.com"
                        required
                    />
                    <Input
                        label="Contact Number"
                        name="senderPhone"
                        type="text"
                        value={senderContactNumber}
                        onChange={(e) => setSenderContactNumber(e.target.value)}
                        showIcon
                        icon="Phone"
                        showHelpText
                        helpText="Preferably WhatsApp or your primary number."
                        placeholder="e.g., +8801XXXXXXXXX"
                        required
                    />
                    <Input
                        label="Social Media Link"
                        name="senderSocial"
                        type="url"
                        value={senderSocialLink}
                        onChange={(e) => setSenderSocialLink(e.target.value)}
                        showIcon
                        icon="Link"
                        showHelpText
                        helpText="Optional: Your LinkedIn or Facebook profile link."
                        placeholder="e.g., https://linkedin.com/in/yourname"
                    />
                    <Input
                        label="Your Position in the Organization"
                        name="senderPosition"
                        type="text"
                        value={senderPosition}
                        onChange={(e) => setSenderPosition(e.target.value)}
                        showIcon
                        icon="Briefcase"
                        showHelpText
                        helpText="E.g., Director, Founder, Outreach Lead."
                        placeholder="e.g., Outreach Coordinator"
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

export default CollaborateForm;
