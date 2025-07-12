'use client';

import React, { useState } from 'react';
import Styles from './AnnouncementForm.module.css';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';

export default function AnnouncementForm() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subtitle || !description || !links) {
      alert('Please fill all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/announcement/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          links,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to create announcement');

      alert('Announcement created successfully!');
      // Reset form
      setTitle('');
      setSubtitle('');
      setDescription('');
      setLinks('');
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.formContainer}>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <div className={Styles.formHeader}>
          <h2>Create Announcement</h2>
          <p className="muted-text">Create an announcement</p>
        </div>

        <div className={Styles.formInput}>
          <Input
            label="Title"
            name="title"
            type="text"
            placeholder="A man fell down the stairs..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            showIcon
            icon="Type"
            showHelpText
            helpText="Enter an announcement title."
            required
          />
          <Input
            label="Subtitle"
            name="subtitle"
            type="text"
            placeholder="He broke his leg"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            showIcon
            icon="Type"
            showHelpText
            helpText="Enter an announcement subtitle."
            required
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="Description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            showHelpText
            helpText="Enter an announcement description."
            required
          />
          <Input
            label="Links"
            name="links"
            type="url"
            placeholder="https://www.hashiekshathe.com"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            showIcon
            showHelpText
            helpText="Enter announcement links here."
            required
          />
        </div>

        <div className={Styles.formFooter}>
          <Button
            type="submit"
            variant="submit"
            label={loading ? 'Creating...' : 'Create'}
            disabled={loading}
            showIcon
          />
        </div>
      </form>
    </div>
  );
}
