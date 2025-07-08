'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Styles from './page.module.css';
import Sidebar from '@/ui/Sidebar';
import Button from '@/ui/Button';

const header = {
    logo: '/favicon.svg',
    title: 'Hashi Ekshathe',
    subtitle: 'Admin Panel',
};

const footer = {
    avatar: '/favicon.svg',
    name: 'Admin Name',
    email: 'admin@example.com',
    accessLevel: 'Super Admin',
};

const sections = [
    {
        title: 'Platform',
        items: [
        {
            label: 'Overview',
            icon: 'SquareChartGantt' as keyof typeof import('lucide-react'),
            dropdown: ['Reports', 'Graphs'],
        },
        {
            label: 'Analytics',
            icon: 'ChartLine' as keyof typeof import('lucide-react'),
            dropdown: ['Reports', 'Graphs'],
        },
        {
            label: 'Settings',
            icon: 'Settings' as keyof typeof import('lucide-react'),
            dropdown: ['x', 'y'],
        },
        {
            label: 'Admin',
            icon: 'ShieldUser' as keyof typeof import('lucide-react'),
            dropdown: ['x', 'y'],
        },
        ],
    },
    {
        title: 'Manage',
        items: [
        {
            label: 'Projects',
            icon: 'Boxes' as keyof typeof import('lucide-react'),
            dropdown: ['View List', 'Add New'],
        },
        {
            label: 'Announcements',
            icon: 'Megaphone' as keyof typeof import('lucide-react'),
            dropdown: ['View List', 'Add New'],
        },
        {
            label: 'FAQs',
            icon: 'MessageCircleQuestionMark' as keyof typeof import('lucide-react'),
            dropdown: ['View List', 'Add New'],
        },
        ],
    },
    {
        title: 'Manage',
        items: [
        {
            label: 'Department',
            icon: 'BookUser' as keyof typeof import('lucide-react'),
            dropdown: ['List', 'Requests'],
        },
        {
            label: 'Volunteers',
            icon: 'Users' as keyof typeof import('lucide-react'),
            dropdown: ['List', 'Requests'],
        },
        ],
    },
    {
        title: 'Finance',
        items: [
        {
            label: 'Records',
            icon: 'Archive' as keyof typeof import('lucide-react'),
            dropdown: ['List', 'Requests'],
        },
        ],
    },
    {
        title: 'Contacts',
        items: [
        {
            label: 'Contact',
            icon: 'Mail' as keyof typeof import('lucide-react'),
            dropdown: ['List', 'Requests'],
        },
        {
            label: 'Collaborate',
            icon: 'Handshake' as keyof typeof import('lucide-react'),
            dropdown: ['List', 'Requests'],
        },
        ],
    },
    ];

    export default function Page() {
    const [showSidebar, setShowSidebar] = useState(true);

    // Detect screen width on mount and listen for resize to update sidebar visibility
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 750px)');

        // Set initial sidebar visibility based on screen size
        setShowSidebar(!mediaQuery.matches);

        // Update sidebar visibility on screen size changes
        const handleResize = (e: MediaQueryListEvent) => {
        setShowSidebar(!e.matches);
        };

        mediaQuery.addEventListener('change', handleResize);

        // Cleanup listener on unmount
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const handleSubItemClick = (label: string) => {
        switch (label) {
        case 'Reports':
            console.log('Navigate to Reports');
            break;
        case 'Graphs':
            console.log('Open Graphs');
            break;
        case 'View List':
            console.log('Project list clicked');
            break;
        case 'Add New':
            console.log('Add project clicked');
            break;
        default:
            console.log('Clicked on:', label);
        }
    };

    return (
        <div className={Styles.dashboard}>
        {showSidebar && (
            <div className={Styles.sidebar}>
            <Sidebar
                header={header}
                sections={sections}
                footer={footer}
                onSubItemClick={handleSubItemClick}
            />
            </div>
        )}

        <div className={Styles.content}>
                <div className={Styles.dashboardHeader}>
                    <Button
                        variant="icon"
                        showIcon
                        icon="PanelLeft"
                        onClick={() => setShowSidebar(prev => !prev)}
                    />
                    <Link href='/'><Button 
                        variant="primary" 
                        label="Go back to site" 
                        showIcon 
                    /></Link>
                </div>

                <div className={Styles.dashboardContent}>

                </div>
        </div>
        </div>
    );
}
