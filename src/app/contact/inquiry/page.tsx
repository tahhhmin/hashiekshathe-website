import React from 'react'
import InquiryForm from '@/components/contact/InquiryForm'
import InquiryFormDetails from '@/components/contact/InquiryFormDetails'
import Styles from './page.module.css'

export default function page() {
    return (
        <section className={Styles.section}>
            <InquiryForm />
            <InquiryFormDetails />
        </section>
    )
}
