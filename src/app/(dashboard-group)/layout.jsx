'use client';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import React, { useState } from 'react';

export default function DashboardLayout({
    children,
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-screen overflow-hidden  font-sans antialiased text-slate-900">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div
                className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'
                    }`}
            >
                <Header setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />

                <main className="relative flex-1 overflow-y-auto mt-4 mx-4 rounded-xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                        style={{ backgroundImage: "url('/bgImg1.jpg')" }}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}