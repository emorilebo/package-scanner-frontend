'use client';

import { motion } from 'framer-motion';
import { Shield, Github, Menu, X, Box, Terminal, Smartphone, Coffee, Zap } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import GlitchText from './GlitchText';

const platforms = [
    { name: 'Rust', path: '/rust', icon: Shield, color: 'text-[var(--cyan-neon)]' },
    { name: 'NPM', path: '/npm', icon: Box, color: 'text-[var(--pink-neon)]' },
    { name: 'PyPI', path: '/pypi', icon: Terminal, color: 'text-[#FFD43B]' },
    { name: 'Pub', path: '/pub', icon: Smartphone, color: 'text-[#0175C2]' },
    { name: 'Maven', path: '/maven', icon: Coffee, color: 'text-[#C71A36]' },
    { name: 'Go', path: '/go', icon: Zap, color: 'text-[#00ADD8]' },
];

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <motion.nav
            className="fixed top-0 left-0 md:left-[72px] right-0 z-40 border-b border-white/5 bg-[#050810]/80 backdrop-blur-xl transition-all duration-300"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-2 sm:gap-3 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shield
                            className="text-[var(--cyan-neon)] transition-all group-hover:text-glow-cyan flex-shrink-0"
                            size={24}
                            strokeWidth={2.5}
                        />
                        <GlitchText className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono text-[var(--cyan-neon)] tracking-tight">
                            PKG_INTEGRITY
                        </GlitchText>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <a
                            href="/about"
                            className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            About
                        </a>
                        <a
                            href="/dashboard"
                            className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            Dashboard
                        </a>
                        <a
                            href="https://github.com/emorilebo/rust_secure_dependency_audit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 flex items-center gap-2 px-3 py-2 text-sm border border-[var(--cyan-neon)]/30 rounded-lg text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/10 hover:border-[var(--cyan-neon)]/50 transition-all"
                        >
                            <Github size={18} />
                            <span className="hidden lg:inline">GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="md:hidden overflow-hidden bg-[#050810] border-t border-white/5"
                    initial={false}
                    animate={{ height: isMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="pb-4 pt-2 px-2 space-y-1">
                        {/* Mobile Platform Switcher */}
                        <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-white/5 rounded-xl">
                            {platforms.map((p) => {
                                const isActive = pathname === p.path || (p.path !== '/' && pathname?.startsWith(p.path));
                                return (
                                    <a
                                        key={p.name}
                                        href={p.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <p.icon size={20} className={`mb-1 ${p.color}`} />
                                        <span className="text-[10px] font-medium">{p.name}</span>
                                    </a>
                                );
                            })}
                        </div>

                        <a
                            href="/about"
                            className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </a>
                        <a
                            href="https://github.com/emorilebo/rust_secure_dependency_audit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm border border-[var(--cyan-neon)]/30 rounded-lg text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/10 transition-all mt-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center gap-2">
                                <Github size={18} />
                                <span>GitHub</span>
                            </div>
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
