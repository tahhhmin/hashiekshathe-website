'use client';

import React from 'react';
import Header from '@/ui/header/Header';
import { usePathname } from 'next/navigation';

export default function HeaderLayout() {
    const pathname = usePathname();
    const showHeader = pathname !== '/dashboard' && pathname !== '/login';

    return (
        <>
            {showHeader && <Header />}
        </>
    );
}
