// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Styles from './page.module.css';
import Sidebar, { SidebarSection } from '@/ui/Sidebar';
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

const sections: SidebarSection[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Overview', icon: 'SquareChartGantt', dropdown: ['Reports', 'Graphs'] },
      { label: 'Analytics', icon: 'ChartLine', dropdown: ['Reports', 'Graphs'] },
      { label: 'Settings', icon: 'Settings', dropdown: ['x', 'y'] },
      { label: 'Admin', icon: 'ShieldUser', dropdown: ['x', 'y'] },
    ],
  },
  {
    title: 'Manage',
    items: [
      { label: 'Projects', icon: 'Boxes', dropdown: ['View List', 'Add New'] },
      { label: 'Announcements', icon: 'Megaphone', dropdown: ['View List', 'Add New'] },
      { label: 'FAQs', icon: 'MessageCircleQuestionMark', dropdown: ['View List', 'Add New'] },
    ],
  },
  {
    title: 'Manage',
    items: [
      { label: 'Department', icon: 'BookUser', dropdown: ['List', 'Requests'] },
      { label: 'Volunteers', icon: 'Users', dropdown: ['List', 'Requests'] },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Records', icon: 'Archive', dropdown: ['List', 'Requests'] },
    ],
  },
  {
    title: 'Contacts',
    items: [
      { label: 'Contact', icon: 'Mail', dropdown: ['List', 'Requests'] },
      { label: 'Collaborate', icon: 'Handshake', dropdown: ['List', 'Requests'] },
    ],
  },
];

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.isAdmin) {
      router.replace('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 750px)');
    setShowSidebar(!mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setShowSidebar(!e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  if (status === 'loading' || !session?.user?.isAdmin) {
    return <div className={Styles.loading}>Checking permissions...</div>;
  }

  const handleSubItemClick = (label: string) => {
    console.log('Clicked:', label);
  };

  return (
    <div className={Styles.dashboard}>
      {showSidebar && (
        <div className={Styles.sidebar}>
          <Sidebar header={header} sections={sections} footer={footer} onSubItemClick={handleSubItemClick} />
        </div>
      )}

      <div className={Styles.content}>
        <div className={Styles.dashboardHeader}>
          <Button variant="icon" showIcon icon="PanelLeft" onClick={() => setShowSidebar((prev) => !prev)} />
          <Link href="/">
            <Button variant="primary" label="Go back to site" showIcon />
          </Link>
        </div>

        <div className={Styles.dashboardContent}>
          {/* Protected content here */}
        </div>
      </div>
    </div>
  );
}
