import React from 'react'
import Storycard from '@/ui/cards/Storycard'
import Styles from './page.module.css'

export default function page() {
    return (
        <>
            <section className={Styles.section}>
                <Storycard
                    showIcon
                    icon="Info"
                    title="Introduction"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/about/introduction"
                    buttonLabel="Read More"
                />
                <Storycard
                    showIcon
                    icon="Flag"
                    title="Founding Story"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/about/founding-story"
                    buttonLabel="Read More"
                />
                <Storycard
                    showIcon
                    icon="Compass"
                    title="Our Mission & Vission"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/story"
                    buttonLabel="Read More"
                />
                <Storycard
                    showIcon
                    icon="Sparkles"
                    title="Our Initiatives"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/story"
                    buttonLabel="Read More"
                />


                <Storycard
                    showIcon
                    icon="Handshake"
                    title="Get Involved"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/story"
                    buttonLabel="Read More"
                />
                <Storycard
                    showIcon
                    icon="Crown"
                    title="Our Leadership"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/story"
                    buttonLabel="Read More"
                />
                <Storycard
                    showIcon
                    icon="Users"
                    title="Our Collaborators"
                    subtitle="How we started"
                    content="Lorem ipsum dolor sit amet..."
                    linkTo="/story"
                    buttonLabel="Read More"
                />
            </section>
        </>
    )
}