'use client';

import React from 'react';
import Footer from '@/ui/footer/Footer';
import { usePathname } from 'next/navigation';

export default function FooterLayout() {
    const pathname = usePathname();
    const showFooter = pathname !== '/dashboard';

    return (
        <>
            {showFooter && <Footer />}
        </>
    );
}
