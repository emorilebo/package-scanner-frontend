'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Shield, Box, Zap, Settings } from 'lucide-react';
import Link from 'next/link';

const platforms = [
    {
        id: 'rust',
        name: 'Rust',
        icon: Shield,
        path: '/',
        color: 'var(--cyan-neon)',
        activeColor: 'text-[var(--cyan-neon)]',
        bgActive: 'bg-[var(--cyan-neon)]/10',
        borderActive: 'border-[var(--cyan-neon)]/50'
    },
    {
        id: 'npm',
        name: 'NPM',
        icon: Box,
        path: '/npm',
        color: 'var(--pink-neon)',
        activeColor: 'text-[var(--pink-neon)]',
        bgActive: 'bg-[var(--pink-neon)]/10',
        borderActive: 'border-[var(--pink-neon)]/50'
    },
    /* Future Platforms
    {
      id: 'pypi',
      name: 'PyPI',
      icon: Code,
      path: '/pypi',
      color: 'var(--yellow-neon)'
    }
    */
];

export default function PlatformSidebar() {
    const pathname = usePathname();

    return (
        <motion.div
            className="fixed left-0 top-0 bottom-0 w-20 z-50 flex flex-col items-center py-6 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-r border-[var(--text-muted)]/10 hidden md:flex"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Brand Icon */}
            <div className="mb-10 p-2 rounded-xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-secondary)] border border-[var(--text-muted)]/20 shadow-lg">
                <Zap size={24} className="text-[var(--cyan-neon)]" />
            </div>

            {/* Platform Icons */}
            <div className="flex-1 flex flex-col gap-6 w-full px-3">
                {platforms.map((platform) => {
                    const isActive = pathname === platform.path || (platform.path !== '/' && pathname?.startsWith(platform.path));

                    return (
                        <Link key={platform.id} href={platform.path} className="relative group">
                            {isActive && (
                                <motion.div
                                    layoutId="activePlatform"
                                    className={`absolute inset-0 rounded-xl ${platform.bgActive} border ${platform.borderActive}`}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className={`relative p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? platform.activeColor : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                                <platform.icon size={24} />

                                {/* Tooltip */}
                                <div className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--text-muted)]/20 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity translate-x-2 group-hover:translate-x-0 z-50">
                                    {platform.name}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto px-3">
                <button className="p-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <Settings size={22} />
                </button>
            </div>
        </motion.div>
    );
}
