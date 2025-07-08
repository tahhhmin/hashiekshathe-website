import React from 'react'
import Button from '@/ui/Button'
import Styles from './AdminHeader.module.css'
import Link from 'next/link'

export default function AdminHeader() {
    return (
        <div className={Styles.adminHeader}>
            <p>You are logged in as an admin</p>
            <Link href='/dashboard'><Button
                variant='outlined'
                showIcon
                label='Dashboard'
            /></Link>
        </div>
    )
}