"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/ui/Button";
import Link from "next/link";
import Styles from './AuthButton.module.css';

//                 onClick={() => signIn("google")}


export default function AuthButton() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <Link href='/login'>
                <Button
                    variant="outlined"
                    label="Login / Register"
                />
            </Link>
        );
    }

    const user = session.user;

    return (
    <div className={Styles.avatarContainer}>
        <Image src={user?.image || "/default-avatar.png"}
            alt="avatar"
            className={Styles.userAvatar}
            width={42}
            height={42}
        />

        <div className={Styles.avatarDropdownContainer}>
            <div className={Styles.avatarIdentity}>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
            </div>
            <Button
                variant="primary"
                label="Sign out"
                onClick={() => signOut()}
            />
        </div>

    </div>
  );
}
