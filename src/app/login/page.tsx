"use client"

import React from 'react'
import Styles from './page.module.css'
import Button from '@/ui/Button'
import { signIn } from "next-auth/react";
import Input from '@/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {  // <-- uppercase P here
    const router = useRouter();

    return (
        <div className={Styles.loginPage}>
            <form className={Styles.form}>
                {/* Form Header with Identity and back button */}
                <div className={Styles.formHeader}>
                    <div>
                        <h2>Login</h2>
                        <p className='muted-text'>Login Form</p>
                    </div>
                    <div className={Styles.headerButton}>
                        <Button
                            variant='icon'
                            showIcon
                            icon='X'
                            onClick={() => router.back()}
                        />
                    </div>
                </div>
                {/* Form content with inputs */}
                <div className={Styles.formContent}>
                    <Input
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="example"
                        showIcon
                        icon="User"
                        showHelpText
                        helpText="Enter your username here"
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        showIcon
                        showHelpText
                        helpText="Enter your username here"
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="example@email.com"
                        showIcon
                        showHelpText
                        helpText="Enter your password here"
                        required
                    />
                </div>
                
                <div className={Styles.formFooter}>
                    <Button
                        variant='outlined'
                        label='Sign in with Google'
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                    />

                    <p>Not a volunteer? <Link href='/volunteer/register' className={Styles.link}>Register here</Link></p>
                </div>
            </form>
        </div>
    )
}
