"use client";

import React, { useState } from 'react';
import Styles from './InquiryForm.module.css';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Textarea from '@/ui/Textarea';
import VerificationCodeInput from '@/ui/VerificationCodeInput';

export default function InquiryForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [loading, setLoading] = useState(false);

  const [verificationToken, setVerificationToken] = useState('');
  const [verificationTokenExpiresAt, setVerificationTokenExpiresAt] = useState('');

  // Step 1: Submit form and request verification code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      alert('Please fill all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, userMessage: message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to submit inquiry');

      setVerificationToken(data.verificationToken);
      setVerificationTokenExpiresAt(data.verificationTokenExpiresAt);
      setStep('verify');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify the code
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      alert('Please enter the full 6-digit code.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject,
          userMessage: message,
          verificationToken,
          verificationTokenExpiresAt,
          code,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Verification failed');

      alert('Your message is verified and submitted!');
      setEmail('');
      setSubject('');
      setMessage('');
      setCode('');
      setStep('form');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.inquiryFormContainer}>
      <form
        onSubmit={step === 'form' ? handleSubmit : handleVerify}
        className={Styles.inquiryForm}
      >
        <div className={Styles.formHeader}>
          <h2>Inquiry Form</h2>
          <p className="muted-text">
            {step === 'form'
              ? 'This is the Inquiry form'
              : 'Enter the verification code sent to your email'}
          </p>
        </div>

        {step === 'form' && (
          <div className={Styles.formInput}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showIcon
              showHelpText
              helpText="Enter a valid email address."
              required
            />
            <Input
              label="Subject"
              name="subject"
              type="text"
              placeholder="I want to know about..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              showIcon
              icon="Pencil"
              showHelpText
              helpText="Enter your inquiry message subject here"
              required
            />
            <Textarea
              label="Your Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              showHelpText
              helpText="We usually respond within 24 hours."
              required
            />
          </div>
        )}

        {step === 'verify' && (
          <div className={Styles.verification}>
            <VerificationCodeInput
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
  type="submit" // ✅ Required to trigger form submission
  variant="submit" // Optional — just for styling
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
