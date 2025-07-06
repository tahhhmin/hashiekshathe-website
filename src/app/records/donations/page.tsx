import React from 'react'
import Styles from './page.module.css'
import Storycard from '@/ui/cards/Storycard'
import DonationTable from '@/components/records/DonationTable'

export default function page() {
    return (
        <section className={Styles.section}>
            <div>
                <Storycard
                    showIcon
                    icon="Info"
                    title="Introduction"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/about/introduction"
                    buttonLabel="Read More"
                />
            </div>


            <div>
                <DonationTable />
            </div>
        </section>
    )
}