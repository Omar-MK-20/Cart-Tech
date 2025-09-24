import { NavBar } from "@/components/layout";
import { SidebarProvider } from "@/components/ui";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cart Tech",
  description: "Cart Tech an E-Commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="max-h-10">
        <SidebarProvider>
          <header className="fixed w-full backdrop-blur-md shadow-sm">

          <NavBar />
          </header>
        </SidebarProvider>
        </header>
            {children}
            {children}
            {children}
      </body>
    </html>
  );
}
