'use client';

import { motion } from 'framer-motion';
import { Shield, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import GlitchText from './GlitchText';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 cyber-border backdrop-blur-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Shield className="text-[var(--cyan-neon)] glow-cyan" size={32} />
                        <GlitchText className="text-xl font-bold font-mono text-[var(--cyan-neon)]">
                            RUST_AUDIT
                        </GlitchText>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <a
                            href="#"
                            className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                        >
                            Rankings
                        </a>
                        <a
                            href="#"
                            className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                        >
                            Search
                        </a>
                        <a
                            href="#"
                            className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="https://github.com/emorilebo/rust_secure_dependency_audit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 cyber-border hover:glow-cyan transition-all"
                        >
                            <Github size={20} />
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[var(--cyan-neon)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden mt-4 cyber-border p-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-col gap-4">
                            <a
                                href="#"
                                className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                            >
                                Rankings
                            </a>
                            <a
                                href="#"
                                className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                            >
                                Search
                            </a>
                            <a
                                href="#"
                                className="text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="https://github.com/emorilebo/rust_secure_dependency_audit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 cyber-border hover:glow-cyan transition-all"
                            >
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
