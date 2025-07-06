import React from 'react'
import CollaborateForm from '@/components/contact/CollaborateForm'
import CollaborateFormDetails from '@/components/contact/CollaborateFormDetails'
import Styles from './page.module.css'

export default function page() {
    return (
        <section className={Styles.section}>
            <CollaborateForm />
            <CollaborateFormDetails />
        </section>
    )
}
