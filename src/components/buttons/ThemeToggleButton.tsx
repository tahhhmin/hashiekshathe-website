import React from 'react'
import Button from '@/components/Button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
            setMounted(true);
        }, []);
        if (!mounted) return null;
        const isDark = theme === 'dark';

    return (
        <Button 
            variant="icon"
            showIcon={true}
            icon={isDark ? Sun : Moon}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        />
    )
}

export default ThemeToggleButton