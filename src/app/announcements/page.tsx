import React from 'react'
import Storycard from '@/ui/cards/Storycard'
import Styles from './page.module.css'
import AnnouncementList from '@/components/announcement/AnnouncementList'

export default function page() {
    return (
        <>
            <section className={Styles.section}>
                <Storycard
                    showIcon
                    icon="Megaphone"
                    title="Announcements"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                />

                <div className={Styles.container}>
                    <AnnouncementList />
                </div>
            </section>
        </>
    )
}