import React from 'react';
import Styles from './page.module.css';
import Button from '@/ui/Button';
import Link from 'next/link';

export default function Page() {
    return (
        <section className={Styles.section}>
            <div className={Styles.container}>
                <div>
                    <h2>Send Inquiry Message</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/contact/inquiry" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="Send Inquiry Message"
                            showIcon

                        />
                    </Link>
                </div>
            </div>

            <div className={Styles.container}>
                <div>
                    <h2>Send Collaboration Message</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/contact/collaboration-message" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="Send Collaboration Message"
                            showIcon

                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
