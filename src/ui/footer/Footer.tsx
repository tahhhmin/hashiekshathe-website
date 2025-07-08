import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faFacebook,
    faYoutube,
    faXTwitter,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import React from 'react';
import Styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../../public/favicon-white.svg';
import HorizontalDivider from '../dividers/HorizontalDivider';

export default function Footer() {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.header}>
                <Link href="/">
                    <Image
                        className={Styles.logo}
                        src={Logo}
                        alt="Hashi Ekshathe Logo"
                    />
                </Link>

                <div className={Styles.headerIcons}>
                    <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className={Styles.fontawesomeIcon} />
                    </Link>
                    <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className={Styles.fontawesomeIcon} />
                    </Link>
                    <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} className={Styles.fontawesomeIcon} />
                    </Link>
                    <Link href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} className={Styles.fontawesomeIcon} />
                    </Link>
                    <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className={Styles.fontawesomeIcon} />
                    </Link>
                </div>
            </div>

            <div className={Styles.content}>
                <div className={Styles.contentContact}>
                    <h2 className={Styles.text}>Keep in the loop with the Hashi Ekshathe newsletter.</h2>
                    <input
                        className={Styles.footerInput}
                        type="email"
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className={Styles.contentText}>
                    <h3>Who We Are</h3>
                    <p>
                        Hashi Ekshathe is a student-led initiative working to uplift underprivileged
                        communities through sustainable projects and active youth involvement.
                        Stay connected to witness our journey of impact and change.
                    </p>
                </div>
            </div>

            <HorizontalDivider backgroundColor="var(--color-white)" />

            <div className={Styles.footerFooter}>
                <p>&copy; 2025 Hashi Ekshathe. All Rights Reserved.</p>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Services</a>
                <a href="#">Organisational Code</a>
            </div>
        </footer>
    );
}
