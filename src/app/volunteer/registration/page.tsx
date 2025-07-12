import React from 'react';
import Styles from './page.module.css';
import RegistrationForm from '@/components/volunteer/RegistrationForm'
import RegistrationFormDetails from '@/components/volunteer/CollaborateFormDetails'

export default function Page() {
    return (
        <section className={Styles.section}>
            <RegistrationForm />
            <RegistrationFormDetails />
        </section>
    );
}
