"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/ui/Button";
import Link from "next/link";
import Styles from './AuthButton.module.css';
import React, { useState, useRef } from "react";

export default function AuthButton() {
    const { data: session } = useSession();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (!session) {
        return (
            <Link href='/login'>
                <Button variant="outlined" label="Login / Register" />
            </Link>
        );
    }

    const user = session.user;

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownVisible(false);
        }, 300); // Delay before hiding
    };

    return (
        <div
            className={Styles.avatarContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={user?.image || "/default-avatar.png"}
                alt="avatar"
                className={Styles.userAvatar}
                width={42}
                height={42}
            />

            <div
                className={`${Styles.avatarDropdownContainer} ${
                    isDropdownVisible ? Styles.visible : Styles.hidden
                }`}
            >
                <div className={Styles.avatarIdentity}>
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                </div>
                <div className={Styles.DropdownButtons}>
                    <Link href='/profile' className={Styles.DropdownButtons}>
                        <Button variant="primary" label="Profile" />
                    </Link>
                    <Button
                        variant="primary"
                        label="Sign out"
                        onClick={() => signOut()}
                    />
                </div>
            </div>
        </div>
    );
}
