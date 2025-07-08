import "@/utils/fontawesome"; 
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Nunito } from "next/font/google";
import "./globals.css";

import HeaderLayout from "@/ui/header/HeaderLayout";
import FooterLayout from "@/ui/footer/FooterLayout";

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-family",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Hashi Ekshathe",
    description: "Official website of Hashi Ekshathe",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en" suppressHydrationWarning className={nunito.variable}>
        <body>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <HeaderLayout />
            <main>{children}</main>
            <FooterLayout />
            </ThemeProvider>
        </body>
        </html>
    );
}
