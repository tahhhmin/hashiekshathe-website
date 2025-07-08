// app/layout.tsx (server component)
import "@/utils/fontawesome"; 
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

import HeaderLayout from "@/ui/header/HeaderLayout";
import FooterLayout from "@/ui/footer/FooterLayout";

import ClientProviders from "@/app/ClientProviders";

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-family",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Hashi Ekshathe",
    description: "Official website of Hashi Ekshathe",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={nunito.variable}>
            <body>
                <ClientProviders>
                    <HeaderLayout />
                    <main>{children}</main>
                    <FooterLayout />
                </ClientProviders>
            </body>
        </html>
    );
}
