"use client"
import React from 'react'
import Styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import NavigationMenu, { NavItem } from '@/components/NavigationMenu';
import Button from '@/components/Button'
import Sheet from '@/components/sheet';
import { Menu } from 'lucide-react'
import Logo from '../../public/logo-orange.svg'
import ThemeToggleButton from './buttons/ThemeToggleButton';

const navItems: NavItem[] = [
    { name: 'Home', path: '/' },

    { name: 'About', path: '/about', hasDropdown: true,
        dropdownItems: [
        { name: 'Introduction', path: '/about/introduction', 
            description: 'Get to know who we are and what drives our mission.' }, 
        { name: 'Founding Story', path: '/about/founding', 
            description: 'Discover how our journey began and the values we’re built on.' },
        { name: 'Mission & Vision', path: '/about/mission-vision',
            description: 'Learn about our core purpose and the future we’re working toward.' }, 
        { name: 'Our Initiatives', path: '/about/initiatives', 
            description: 'Understand the key focus areas that guide our work.' }, 
        { name: 'Get Involved', path: '/about/get-involved', 
            description: 'Find out how you can contribute, volunteer, or support us.' }, 
        { name: 'Our Leadership', path: '/about/leadership', 
            description: 'Meet the people guiding our vision and impact.' }, 
        { name: 'Our Collaborators', path: '/about/collaborators', 
            description: 'Explore the partnerships that strengthen our mission.' }, 
        ],
    },

    { name: 'Records', path: '/records', hasDropdown: true,
        dropdownItems: [
        { name: 'Donations', path: '/records/donations', 
            description: 'See how your contributions are making a difference.' }, 
        { name: 'Expenditures', path: '/records/expenditures', 
            description: 'Review how we allocate funds for complete transparency.' }, 
        ],
    },

    { name: 'Projects', path: '/projects', hasDropdown: true,
        dropdownItems: [
        { name: 'Upcoming Projects', path: '/projects/upcoming-projects',
            description: 'Explore the initiatives we’re planning in the near future.' }, 
        { name: 'Ongoing Projects', path: '/projects/ongoing-projects',
            description: 'Follow the progress of our current impactful efforts.' },
        { name: 'Completed Projects', path: '/projects/completed-projects',
            description: 'Look back at our past achievements and milestones.' }, 
        { name: 'Gallery', path: '/projects/gallery',
            description: 'View memorable moments and snapshots from our events.' }, 
        ],
    },

    { name: 'Volunteer', path: '/volunteer', hasDropdown: true,
        dropdownItems: [
        { name: 'Registration', path: '/volunteer/register', 
            description: 'Sign up to be a part of our growing volunteer community.' }, 
        { name: 'Benefits', path: '/volunteer/benefits',
            description: 'Discover how volunteering with us helps you grow too.' }, 
        ],
    },

    { name: "Announcements", path: "/announcements", hasDropdown: false },

    { name: "Members", path: "/members", hasDropdown: true,
        dropdownItems: [
        { name: 'Departments', path: '/members/departments', 
            description: 'Explore the various departments that power our organization.' }, 
        { name: 'Volunteers', path: '/members/volunteers', 
            description: 'Meet the passionate individuals behind our efforts.' }, 
        ],
    },

    { name: 'Contact', path: '/contact', hasDropdown: true,
        dropdownItems: [
        { name: 'Inquiry', path: '/contact/inquiry',
            description: 'Have a question? Reach out and we’ll be happy to help.' },
        { name: 'Collaborate', path: '/contact/collaborate',
            description: 'Let’s team up and create something meaningful together.' }, 
        ],
    },
]

export default function Header() {

    return (
        <header className={Styles.header}>
            {/* Logo Container */}
            <div className={Styles.logoContainer}>
                <Link href={'/'}><Image className={Styles.logo}
                        src={Logo}
                        alt="Logo"
                /></Link>
            </div>
            {/* Navigation Container */}
            <div className={Styles.navigationContainer}>
                <NavigationMenu navItems={navItems} />
            </div>
            {/* Button Container */}
            <div className={Styles.buttonContainer}>
                <div className={Styles.themeToggleButton}>
                    <ThemeToggleButton />
                </div>
                <div className={Styles.loginButton}><Button 
                    variant="outlined"
                    label="Register / Login"
                    onClick={() => console.log('button Clicked')}
                /></div>
                <Button 
                    variant="primary"
                    label="Donate"
                    onClick={() => console.log('button Clicked')}
                />
                <div className={Styles.menuButton}><Sheet
                    buttonIcon={Menu}
                    menuName="Navigation"
                    footer={true}
                    items={[
                        { name: 'Home', path: '/' },
                        { name: 'About', path: '/about' },
                        { name: 'Records', path: '/records' },
                        { name: 'Projects', path: '/projects' },
                        { name: 'Volunteer', path: '/volunteer' },
                        { name: 'Announcements', path: '/announcements' },
                        { name: 'Members', path: '/member' },
                        { name: 'Contact', path: '/contact' }
                    ]}
                /></div>
            </div>
        </header>
    )
}
