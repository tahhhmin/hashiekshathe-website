import React from 'react';
import Styles from './page.module.css';
import Button from '@/ui/Button';
import Link from 'next/link';

export default function Page() {
    return (
        <section className={Styles.section}>
            <div className={Styles.container}>
                <div>
                    <h2>Register for Hashi Ekshathe!</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/volunteer/registration" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="Proceed to Register"
                            showIcon

                        />
                    </Link>
                </div>
            </div>

            <div className={Styles.container}>
                <div>
                    <h2>View Volunteer Benefits</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/volunteer/benefits" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="View Benefits"
                            showIcon

                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
