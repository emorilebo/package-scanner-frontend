'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Shield, Box, Terminal, Smartphone, Coffee, Zap } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const platforms = [
    { id: 'rust', name: 'Rust', icon: Shield, path: '/rust', color: '#00D9FF', fullName: 'Rust Crates' },
    { id: 'npm', name: 'NPM', icon: Box, path: '/npm', color: '#FF3E9D', fullName: 'NPM Registry' },
    { id: 'pypi', name: 'PyPI', icon: Terminal, path: '/pypi', color: '#FFD43B', fullName: 'Python Packages' },
    { id: 'pub', name: 'Pub', icon: Smartphone, path: '/pub', color: '#0175C2', fullName: 'Dart/Flutter' },
    { id: 'maven', name: 'Maven', icon: Coffee, path: '/maven', color: '#C71A36', fullName: 'Maven Central' },
    { id: 'go', name: 'Go', icon: Zap, path: '/go', color: '#00ADD8', fullName: 'Go Modules' },
];

export default function PlatformSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path || (path !== '/' && pathname?.startsWith(path));

    const activePlatform = useMemo(() => {
        return platforms.find(p => isActive(p.path)) || null;
    }, [pathname]);

    return (
        <>
            {/* Desktop Sidebar - Enhanced */}
            <motion.aside
                className="fixed left-0 top-0 bottom-0 w-20 z-50 hidden md:flex flex-col py-6 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, rgba(5,8,16,0.98) 0%, rgba(5,8,16,0.92) 100%)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Animated Border Glow */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <motion.div
                        className="absolute right-0 top-0 bottom-0 w-[2px]"
                        style={{
                            background: activePlatform
                                ? `linear-gradient(180deg, transparent, ${activePlatform.color}, transparent)`
                                : 'linear-gradient(180deg, transparent, #00D9FF, transparent)',
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Scanning Line Effect */}
                <motion.div
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{
                        top: ['0%', '100%'],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Logo Mark */}
                <motion.div
                    className="mb-6 px-5 relative"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <Link href="/" className="block relative group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF]/25 to-[#FF3E9D]/25 flex items-center justify-center border border-white/10 backdrop-blur-sm relative overflow-hidden">
                            <Shield size={18} className="text-[#00D9FF] relative z-10" strokeWidth={2.5} />
                            {/* Glow */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/20 to-[#FF3E9D]/20 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        {/* Pulse ring on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-[#00D9FF]/0"
                            whileHover={{
                                borderColor: 'rgba(0, 217, 255, 0.4)',
                                scale: 1.1,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                </motion.div>

                {/* Dynamic Platform Title */}
                <AnimatePresence mode="wait">
                    {activePlatform && (
                        <motion.div
                            key={activePlatform.id}
                            className="px-3 mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative">
                                {/* Vertical text */}
                                <div
                                    className="text-[10px] font-bold tracking-widest uppercase"
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                        color: activePlatform.color,
                                        textShadow: `0 0 10px ${activePlatform.color}40`,
                                    }}
                                >
                                    {activePlatform.fullName}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Platform Navigation */}
                <nav className="flex-1 flex flex-col items-center gap-1.5 px-3">
                    {platforms.map((platform, index) => {
                        const active = isActive(platform.path);
                        return (
                            <motion.div
                                key={platform.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: index * 0.06 + 0.15,
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="w-full relative"
                            >
                                <Link href={platform.path} className="relative group block">
                                    <motion.div
                                        className={`
                                            relative flex items-center justify-center w-full h-12 rounded-xl
                                            transition-all duration-300 ease-out
                                            ${active
                                                ? 'bg-white/[0.12] shadow-lg'
                                                : 'hover:bg-white/[0.06]'
                                            }
                                        `}
                                        whileHover={{ scale: 1.05, x: 2 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            boxShadow: active ? `0 0 20px ${platform.color}25` : 'none',
                                        }}
                                    >
                                        <platform.icon
                                            size={20}
                                            style={{ color: active ? platform.color : '#6B7280' }}
                                            className="transition-all duration-300 relative z-10"
                                            strokeWidth={active ? 2.5 : 2}
                                        />

                                        {/* Active Indicator - Left bar */}
                                        {active && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full"
                                                style={{
                                                    backgroundColor: platform.color,
                                                    boxShadow: `0 0 12px ${platform.color}`,
                                                }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 500,
                                                    damping: 35,
                                                }}
                                            />
                                        )}

                                        {/* Hover glow */}
                                        <motion.div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: `radial-gradient(circle at center, ${platform.color}15, transparent)`,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>

                                    {/* Enhanced Tooltip */}
                                    <div className="
                                        absolute left-full top-1/2 -translate-y-1/2 ml-4
                                        px-4 py-2 rounded-xl
                                        bg-[#0A0E18]/95 border border-white/10
                                        text-xs font-bold text-white
                                        opacity-0 group-hover:opacity-100
                                        pointer-events-none
                                        transition-all duration-200 ease-out
                                        translate-x-2 group-hover:translate-x-0
                                        shadow-2xl shadow-black/50
                                        whitespace-nowrap z-[60]
                                        backdrop-blur-xl
                                    ">
                                        <div className="flex items-center gap-2">
                                            <platform.icon size={14} style={{ color: platform.color }} />
                                            <span>{platform.fullName}</span>
                                        </div>
                                        {/* Arrow */}
                                        <div
                                            className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent"
                                            style={{ borderRightColor: '#0A0E18' }}
                                        />
                                        {/* Glow edge */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-50"
                                            style={{
                                                boxShadow: `inset 0 0 20px ${platform.color}20`,
                                            }}
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Bottom Indicator */}
                <div className="mt-4 px-3">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
                    <motion.div
                        className="text-center text-[8px] font-mono text-gray-600 uppercase tracking-wider"
                        animate={{
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        LIVE
                    </motion.div>
                </div>
            </motion.aside>

            {/* Mobile Bottom Navigation - Enhanced */}
            <motion.nav
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div
                    className="flex items-center justify-around px-2 py-3 mx-3 mb-3 rounded-2xl relative overflow-hidden"
                    style={{
                        background: 'rgba(5,8,16,0.95)',
                        backdropFilter: 'saturate(180%) blur(24px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
                    }}
                >
                    {/* Animated top border */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-[1px]"
                        style={{
                            background: activePlatform
                                ? `linear-gradient(90deg, transparent, ${activePlatform.color}, transparent)`
                                : 'linear-gradient(90deg, transparent, #00D9FF, transparent)',
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {platforms.map((platform) => {
                        const active = isActive(platform.path);
                        return (
                            <Link
                                key={platform.id}
                                href={platform.path}
                                className="flex-1 flex flex-col items-center py-1"
                            >
                                <motion.div
                                    className={`
                                        flex flex-col items-center gap-1 px-2 py-2 rounded-xl relative
                                        transition-all duration-300
                                        ${active ? 'bg-white/10' : ''}
                                    `}
                                    whileTap={{ scale: 0.85 }}
                                    style={{
                                        boxShadow: active ? `0 0 16px ${platform.color}30` : 'none',
                                    }}
                                >
                                    <platform.icon
                                        size={22}
                                        style={{ color: active ? platform.color : '#6B7280' }}
                                        className="transition-all duration-300"
                                        strokeWidth={active ? 2.5 : 2}
                                    />
                                    <span
                                        className={`text-[9px] font-bold uppercase tracking-wide transition-all duration-300 ${active ? 'text-white' : 'text-[#6B7280]'}`}
                                    >
                                        {platform.name}
                                    </span>
                                    {active && (
                                        <motion.div
                                            layoutId="mobile-active"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                            style={{ backgroundColor: platform.color }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </>
    );
}
