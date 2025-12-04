'use client';

import { motion } from 'framer-motion';
import { Shield, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import GlitchText from './GlitchText';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--cyan-neon)]/10 bg-[var(--bg-primary)]/80 backdrop-blur-xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <Shield className="text-[var(--cyan-neon)] transition-all group-hover:text-glow-cyan" size={28} />
                        </div>
                        <GlitchText className="text-lg sm:text-xl font-bold font-mono text-[var(--cyan-neon)]">
                            RUST_AUDIT
                        </GlitchText>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <a
                            href="#"
                            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors rounded-lg hover:bg-[var(--bg-secondary)]"
                        >
                            Rankings
                        </a>
                        <a
                            href="#"
                            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors rounded-lg hover:bg-[var(--bg-secondary)]"
                        >
                            Search
                        </a>
                        <a
                            href="/about"
                            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors rounded-lg hover:bg-[var(--bg-secondary)]"
                        >
                            About
                        </a>
                        <a
                            href="https://github.com/emorilebo/rust_secure_dependency_audit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 flex items-center gap-2 px-4 py-2 text-sm border border-[var(--cyan-neon)]/30 rounded-lg text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/10 hover:border-[var(--cyan-neon)]/50 transition-all"
                        >
                            <Github size={18} />
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors rounded-lg hover:bg-[var(--bg-secondary)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="md:hidden overflow-hidden"
                    initial={false}
                    animate={{ height: isMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="pb-4 pt-2 space-y-1">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Rankings
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Search
                        </a>
                        <a
                            href="/about"
                            className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] transition-colors rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
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
