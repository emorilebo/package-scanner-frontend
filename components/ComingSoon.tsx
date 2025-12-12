'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface ComingSoonProps {
    platform: string;
    description: string;
    icon: LucideIcon;
    color: string;
}

export default function ComingSoon({ platform, description, icon: Icon, color }: ComingSoonProps) {
    return (
        <main className="min-h-screen w-full relative overflow-hidden text-[var(--text-primary)]">
            <Navigation />

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
                    style={{ backgroundColor: color }}
                />
            </div>

            <div className="container mx-auto h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity"
                            style={{ backgroundColor: color }}
                        />
                        <Icon size={80} style={{ color }} className="relative z-10" />
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {platform} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Scanner</span>
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wide mb-6">
                        COMING SOON
                    </div>
                </motion.div>

                <motion.p
                    className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {description}
                </motion.p>
            </div>
        </main>
    );
}
