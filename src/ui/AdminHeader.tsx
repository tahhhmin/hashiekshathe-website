import React from 'react'
import Button from '@/ui/Button'
import Styles from './AdminHeader.module.css'

export default function AdminHeader() {
    return (
        <div className={Styles.adminHeader}>
            <p>You are logged in as an admin</p>
            <Button
                variant='primary'
                showIcon
                label='Dashboard'
            />
        </div>
    )
}