'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CyberCard from '@/components/CyberCard';
import { Shield, Activity, Users, GitBranch, Terminal, Cpu, User } from 'lucide-react';

export default function About() {
    return (
        <div className="relative min-h-screen">
            <Navigation />

            <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--cyan-neon)] text-glow-cyan">
                            About Rust Audit
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                            A comprehensive security analysis platform designed to protect the Rust ecosystem.
                        </p>
                    </motion.div>

                    {/* How it Works */}
                    <section className="mb-20">
                        <motion.h2
                            className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Terminal className="text-[var(--pink-neon)]" />
                            How It Operates
                        </motion.h2>

                        <div className="grid gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <CyberCard className="p-6">
                                    <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                                        Rust Audit continuously monitors the crates.io registry, analyzing package metadata, dependency trees, and security advisories in real-time. When you search for a crate, our engine performs a deep scan of:
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <li className="flex items-center gap-3 text-[var(--text-primary)]">
                                            <span className="w-2 h-2 rounded-full bg-[var(--cyan-neon)]"></span>
                                            Dependency graph complexity
                                        </li>
                                        <li className="flex items-center gap-3 text-[var(--text-primary)]">
                                            <span className="w-2 h-2 rounded-full bg-[var(--pink-neon)]"></span>
                                            Known vulnerability databases
                                        </li>
                                        <li className="flex items-center gap-3 text-[var(--text-primary)]">
                                            <span className="w-2 h-2 rounded-full bg-[var(--green-neon)]"></span>
                                            Maintenance activity & recency
                                        </li>
                                        <li className="flex items-center gap-3 text-[var(--text-primary)]">
                                            <span className="w-2 h-2 rounded-full bg-[var(--purple-neon)]"></span>
                                            Community adoption metrics
                                        </li>
                                    </ul>
                                </CyberCard>
                            </motion.div>
                        </div>
                    </section>

                    {/* Scoring Formula */}
                    <section className="mb-20">
                        <motion.h2
                            className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Cpu className="text-[var(--green-neon)]" />
                            The Scoring Formula
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <CyberCard glowColor="cyan" className="h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-[var(--cyan-neon)]">Recency</h3>
                                        <span className="text-2xl font-bold">40%</span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Evaluates how recently the crate was updated. Frequent updates indicate active maintenance and compatibility with the latest Rust versions.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <CyberCard glowColor="pink" className="h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-[var(--pink-neon)]">Maintenance</h3>
                                        <span className="text-2xl font-bold">30%</span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Checks for repository presence and recent commit activity. A well-maintained repository is crucial for long-term security.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <CyberCard glowColor="purple" className="h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-[var(--purple-neon)]">Community</h3>
                                        <span className="text-2xl font-bold">20%</span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Based on total download counts. High adoption often correlates with battle-tested stability and community vetting.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <CyberCard glowColor="green" className="h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-[var(--green-neon)]">Stability</h3>
                                        <span className="text-2xl font-bold">10%</span>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        Analyzes version history and yanked status. Stable crates avoid breaking changes and retracted versions.
                                    </p>
                                </CyberCard>
                            </motion.div>
                        </div>
                    </section>

                    {/* Author */}
                    <section>
                        <motion.h2
                            className="text-2xl font-bold mb-8 flex items-center gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <User className="text-[var(--cyan-neon)]" />
                            Built By
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <CyberCard className="p-8 text-center">
                                <div className="w-24 h-24 mx-auto bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-6 border-2 border-[var(--cyan-neon)] shadow-[0_0_20px_var(--cyan-glow)]">
                                    <User size={48} className="text-[var(--cyan-neon)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Emmanuel Ori</h3>
                                <p className="text-[var(--cyan-neon)] font-mono mb-6">@emorilebo</p>
                                <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                                    Passionate about Rust security and building tools that empower developers to ship safer code. This project aims to bring transparency to the Rust dependency ecosystem.
                                </p>
                            </CyberCard>
                        </motion.div>
                    </section>
                </div>
            </main>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--cyan-neon)]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--pink-neon)]/5 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
