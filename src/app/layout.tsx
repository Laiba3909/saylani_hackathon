

'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './header/page';
import Footer from './footer/page';
import { usePathname } from 'next/navigation';  

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  
  const isDashboard = pathname?.startsWith('/dashboard'); 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     
        {!isDashboard && <Header />}
        {children}
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
