import React from 'react'
import Styles from './page.module.css'
import Link from 'next/link'
import Button from '@/ui/Button'

export default function page() {
    return (
        <section className={Styles.section}>
            <div className={Styles.container}>
                <div>
                    <h2>View Donations</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/records/donations" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="View Donations"
                            showIcon

                        />
                    </Link>
                </div>
            </div>

            <div className={Styles.container}>
                <div>
                    <h2>View Expenditures</h2>
                    <p className="muted-text">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda a 
                        quisquam temporibus illo. Deserunt.
                    </p>
                </div>
                <div className={Styles.footer}>
                    <Link href="/records/expenditures" className={Styles.footer}>
                        <Button
                            variant="primary"
                            label="View Expenditures"
                            showIcon

                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}