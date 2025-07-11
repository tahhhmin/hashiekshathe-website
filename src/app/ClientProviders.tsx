// src/app/ClientProviders.tsx (client component)


"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
