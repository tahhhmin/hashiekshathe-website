"use client"

import React, { useState } from 'react'
import Styles from './InquiryForm.module.css'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import Textarea from '@/ui/Textarea'
import VerificationCodeInput from '@/ui/VerificationCodeInput'


export default function InquiryForm() {
    const [code, setCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    if (code.length === 6) {
      console.log('Submitted code:', code); 
    } else {
      alert('Please enter the full 6-digit code.');
    }
    };
    
    
    return (
        <div className={Styles.inquiryFormContainer}>
            <form onSubmit={handleSubmit} className={Styles.inquiryForm}>
                <div className={Styles.formHeader}>
                    <h2>Inquiry Form</h2>
                    <p className='muted-text'>This is the Inquiry form</p>                   
                </div>

                <div className={Styles.formInput}>
                    <Input
                        label="Email"
                        name="email"
                        type="email"


                        placeholder="your@email.com"
                        showIcon
                        showHelpText
                        helpText="Enter a valid email address."
                    />
                    <Input
                        label="Subject"
                        name="subject"
                        type="text"


                        placeholder="I want to know about..."
                        showIcon
                        icon="Pencil" 
                        showHelpText
                        helpText="Enter your inquiry message subject here"
                    />
                    <Textarea
                        label="Your Message"
                        name="message"

                        
                        required
                        placeholder="Type your message here..."
                        showHelpText
                        helpText="We usually respond within 24 hours."
                    />
                </div>

                <div className={Styles.verification}>
                    <VerificationCodeInput
                        label="Enter the 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        helpText="We sent a verification code to your email."
                    />
                </div>

                <div className={Styles.formFooter}>
                    <Button
                        variant='primary'
                        label='Send Message'
                        showIcon
                    />
                </div>
            </form>
        </div>
    )
}