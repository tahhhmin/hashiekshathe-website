'use client';

import React, { useEffect, useState } from 'react';
import Styles from './AnnouncementList.module.css';
import Button from '@/ui/Button';
import Link from 'next/link';

interface Announcement {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  links: string;
  createdAt: string;
}

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcement/get');
        const data = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <p className={Styles.loading}>Loading announcements...</p>;
  if (!announcements.length) return <p className={Styles.empty}>No announcements found.</p>;

  return (
    <div className={Styles.gridContainer}>
      {announcements.map((a) => (
        <div className={Styles.AnnouncementCard} key={a._id}>
          <div className={Styles.header}>
            <h2>{a.title}</h2>
            <h3 className="muted-text">{a.subtitle}</h3>
          </div>

          <div className={Styles.content}>
            <p>{a.description}</p>
          </div>

          <div className={Styles.footer}>
            <Link href={a.links} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                label="Visit Link"
                showIcon
                icon="Link"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}