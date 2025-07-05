'use client';

import React, { useEffect, useState } from 'react';
import Styles from './Storycard.module.css';
import Button from '@/ui/Button';
import Link from 'next/link';

interface StorycardProps {
    showIcon?: boolean;
    icon?: string; // Icon name as string
    title?: string;
    subtitle?: string;
    content?: string;
    linkTo?: string;
    buttonLabel?: string;
}

export default function Storycard({
    showIcon = false,
    icon,
    title = '',
    subtitle = '',
    content = '',
    linkTo,
    buttonLabel = 'Learn More',
}: StorycardProps) {
    const [IconComponent, setIconComponent] = useState<React.ElementType | null>(null);

    useEffect(() => {
        if (showIcon && icon) {
            import('lucide-react')
                .then((icons) => {
                    const LoadedIcon = icons[icon as keyof typeof icons];
                    if (LoadedIcon) {
                        setIconComponent(() => LoadedIcon);
                    }
                })
                .catch((err) => {
                    console.error(`Failed to load icon: ${icon}`, err);
                });
        }
    }, [icon, showIcon]);

    return (
        <div className={Styles.container}>
            <div className={Styles.header}>
                {title && (
                    <div className={Styles.titleContainer}>
                        {showIcon && IconComponent && (
                            <IconComponent className={Styles.icon} size={24} />
                        )}
                        <h2>{title}</h2>
                    </div>
                )}
                {subtitle && <h3 className={Styles.subtitle}>{subtitle}</h3>}
            </div>

            {content && <div className={Styles.content}>{content}</div>}

            {linkTo && (
                <div className={Styles.footer}>
                    <Link href={linkTo} passHref>
                        <Button variant="primary" showIcon label={buttonLabel} />
                    </Link>
                </div>
            )}
        </div>
    );
}
