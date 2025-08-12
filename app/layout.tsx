import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const fontGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Graph.one | A warm-intro benefit for every employee.",
  description: "Graph.one helps your team get trusted introductions for sales, partnerships, hiring, and projects—while every employee stays in control of what they share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontGrotesk.variable
        )}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
