"use client";

import React, { useState } from 'react';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Textarea from '@/ui/Textarea';
import VerificationCodeInput from '@/ui/VerificationCodeInput';
import Styles from './CollaborateForm.module.css'

function CollaborateForm() {
    return (
        <div className={Styles.collaborateFormContainer}>
            <form className={Styles.collaborateForm}>
                <div className={Styles.formHeader}>
                    <h2>Inquiry Form</h2>
                    <p className="muted-text">
                       Enter the verification code sent to your email
                    </p>
                </div>

                <div className={Styles.formInput}>
                    <div className={Styles.formInputGroup}>
                        <h3>Sender Details</h3>
                        <Input
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Enter username"

                            icon="User"
                            showIcon
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Contact Number"
                            name="contact"
                            type="number"
                            placeholder="+880 00 0000 0000"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Social Media"
                            name="contact"
                            type="url"
                            placeholder="+880 00 0000 0000"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Position in organisation"
                            name="username"
                            type="text"
                            placeholder="Enter username"

                            icon="Award"
                            showIcon
                        />
                    </div>
                    
                    
                    <div className={Styles.formInputGroup}>
                        <h3>Sender Details</h3>
                        <Input
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Enter username"

                            icon="User"
                            showIcon
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Contact Number"
                            name="contact"
                            type="number"
                            placeholder="+880 00 0000 0000"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Social Media"
                            name="contact"
                            type="url"
                            placeholder="+880 00 0000 0000"


                            showIcon
                            showHelpText
                            helpText="Enter a valid email address."
                            required
                        />
                        <Input
                            label="Position in organisation"
                            name="username"
                            type="text"
                            placeholder="Enter username"

                            icon="Award"
                            showIcon
                        />
                    </div>
                </div>

                <div className={Styles.formFooter}>
                    <Button
                        type="submit"
                        variant="submit"

                        showIcon

                    />
                </div>
            </form>
        </div>
    )
}

export default CollaborateForm

