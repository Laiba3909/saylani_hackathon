'use client'
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
      
        <title>WorkFlow Pro | Employee & Office Management Software</title>
        <meta name="description" content="WorkFlow Pro - Streamline your office operations and employee management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
           
              <div className="flex-shrink-0">
               
              <Link href={'/'}>  <span className="text-2xl font-bold text-blue-600">WorkFlow Pro</span></Link>
            
              </div>
             
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link href="/Signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Empty spacer div to push content down */}
      <div className="h-20"></div>
    </>
  );
}
