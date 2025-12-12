'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Shield, Box, Terminal, Smartphone, Coffee, Zap, Settings, Command } from 'lucide-react';
import Link from 'next/link';

const platforms = [
    {
        id: 'rust',
        name: 'Rust',
        icon: Shield,
        path: '/',
        color: 'var(--cyan-neon)',
        bgColor: 'bg-[var(--cyan-neon)]',
    },
    {
        id: 'npm',
        name: 'NPM',
        icon: Box,
        path: '/npm',
        color: 'var(--pink-neon)',
        bgColor: 'bg-[var(--pink-neon)]',
    },
    {
        id: 'pypi',
        name: 'PyPI',
        icon: Terminal,
        path: '/pypi',
        color: '#FFD43B',
        bgColor: 'bg-[#FFD43B]',
    },
    {
        id: 'pub',
        name: 'Pub.dev',
        icon: Smartphone,
        path: '/pub',
        color: '#0175C2',
        bgColor: 'bg-[#0175C2]',
    },
    {
        id: 'maven',
        name: 'Maven',
        icon: Coffee,
        path: '/maven',
        color: '#C71A36',
        bgColor: 'bg-[#C71A36]',
    },
    {
        id: 'go',
        name: 'Go',
        icon: Zap,
        path: '/go',
        color: '#00ADD8',
        bgColor: 'bg-[#00ADD8]',
    }
];

export default function PlatformSidebar() {
    const pathname = usePathname();

    return (
        <motion.div
            className="fixed left-0 top-0 bottom-0 w-20 z-50 flex flex-col items-center py-6 bg-[#050810]/60 backdrop-blur-xl border-r border-white/5 hidden md:flex"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Brand Icon */}
            <div className="mb-8 p-3 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl">
                <Command size={24} className="text-white" />
            </div>

            {/* Platform Icons */}
            <div className="flex-1 flex flex-col gap-4 w-full px-4 overflow-y-auto no-scrollbar">
                {platforms.map((platform) => {
                    const isActive = pathname === platform.path || (platform.path !== '/' && pathname?.startsWith(platform.path));

                    return (
                        <Link key={platform.id} href={platform.path} className="relative group w-full flex justify-center">
                            <div className={`relative p-3 rounded-xl transition-all duration-300 group-hover:bg-white/5 ${isActive ? 'bg-white/10' : ''}`}>
                                <platform.icon
                                    size={22}
                                    style={{ color: isActive ? platform.color : '#6B7280' }}
                                    className="transition-colors duration-300 group-hover:text-white"
                                />

                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${platform.bgColor}`}
                                        style={{ left: '-16px' }}
                                    />
                                )}

                                {/* Tooltip */}
                                <div className="absolute left-full ml-5 px-3 py-1.5 rounded-lg bg-[#0F1420] border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 z-50 shadow-xl">
                                    {platform.name}
                                    {/* Arrow */}
                                    <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[1px] border-4 border-transparent border-r-[#0F1420]" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto px-3">
                <button className="p-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-white transition-colors">
                    <Settings size={22} />
                </button>
            </div>
        </motion.div>
    );
}
