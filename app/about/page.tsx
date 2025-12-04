'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import CyberCard from '@/components/CyberCard';
import { Shield, Activity, Users, GitBranch, Terminal, Cpu, User, Code, Database, Zap, Lock, TrendingUp, Globe, Github, ExternalLink } from 'lucide-react';

export default function About() {
    return (
        <main className="relative min-h-screen w-full">
            <Navigation />

            <div className="relative z-10 pb-12 sm:pb-16 md:pb-20 w-full" style={{ paddingTop: 'calc(3.5rem + 60px)' }}>
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-8 sm:mb-12 md:mb-16 w-full mt-4 sm:mt-6 md:mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-[var(--cyan-neon)] text-glow-cyan">
                            About Rust Audit
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                            A comprehensive security analysis platform designed to protect the Rust ecosystem.
                        </p>
                    </motion.div>

                    {/* How it Works */}
                    <section className="mb-12 sm:mb-16 md:mb-20 w-full mt-4 sm:mt-6 md:mt-8">
                        <motion.h2
                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Terminal className="text-[var(--pink-neon)]" size={24} />
                            <span>How It Works</span>
                        </motion.h2>

                        <div className="grid gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <CyberCard className="p-4 sm:p-6">
                                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4 sm:mb-6">
                                        Rust Audit continuously monitors the <strong className="text-[var(--cyan-neon)]">crates.io</strong> registry, analyzing package metadata, dependency trees, and security advisories in real-time. When you search for a crate, our engine performs a comprehensive deep scan across multiple dimensions:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/20">
                                            <Database className="text-[var(--cyan-neon)] flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Dependency Analysis</h4>
                                                <p className="text-xs text-[var(--text-secondary)]">Maps dependency graphs and identifies potential security risks in transitive dependencies</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--pink-neon)]/20">
                                            <Shield className="text-[var(--pink-neon)] flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Vulnerability Scanning</h4>
                                                <p className="text-xs text-[var(--text-secondary)]">Cross-references against known CVE databases and RustSec advisories</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--green-neon)]/20">
                                            <Zap className="text-[var(--green-neon)] flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Maintenance Tracking</h4>
                                                <p className="text-xs text-[var(--text-secondary)]">Monitors repository activity, commit frequency, and update recency</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--purple-neon)]/20">
                                            <TrendingUp className="text-[var(--purple-neon)] flex-shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Community Metrics</h4>
                                                <p className="text-xs text-[var(--text-secondary)]">Analyzes download counts, version history, and adoption patterns</p>
                                            </div>
                                        </div>
                                    </div>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <CyberCard glowColor="cyan" className="p-4 sm:p-6">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="p-2 sm:p-3 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30 flex-shrink-0">
                                            <Code className="text-[var(--cyan-neon)]" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-[var(--cyan-neon)] mb-2 sm:mb-3">Real-Time Processing</h3>
                                            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-3">
                                                Our system fetches live data from the Crates.io API, processes it through our scoring algorithm, and presents results instantly. Each crate is evaluated using a weighted formula that considers:
                                            </p>
                                            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan-neon)]"></span>
                                                    Update frequency and recency (40% weight)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-neon)]"></span>
                                                    Repository maintenance status (30% weight)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)]"></span>
                                                    Community adoption metrics (20% weight)
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple-neon)]"></span>
                                                    Version stability indicators (10% weight)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CyberCard>
                            </motion.div>
                        </div>
                    </section>

                    {/* Scoring Formula */}
                    <section className="mb-12 sm:mb-16 md:mb-20 w-full mt-4 sm:mt-6 md:mt-8">
                        <motion.h2
                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Cpu className="text-[var(--green-neon)]" size={24} />
                            <span>The Scoring Formula</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <CyberCard glowColor="cyan" className="h-full p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold text-[var(--cyan-neon)]">Recency</h3>
                                        <span className="text-xl sm:text-2xl font-bold">40%</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                        Evaluates how recently the crate was updated. Frequent updates indicate active maintenance and compatibility with the latest Rust versions. Scores are calculated based on days since last update.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <CyberCard glowColor="pink" className="h-full p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold text-[var(--pink-neon)]">Maintenance</h3>
                                        <span className="text-xl sm:text-2xl font-bold">30%</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                        Checks for repository presence and recent commit activity. A well-maintained repository is crucial for long-term security. Crates with active GitHub/GitLab repositories score higher.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <CyberCard glowColor="purple" className="h-full p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold text-[var(--purple-neon)]">Community</h3>
                                        <span className="text-xl sm:text-2xl font-bold">20%</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                        Based on total download counts. High adoption often correlates with battle-tested stability and community vetting. Popular crates (1M+ downloads) receive maximum points.
                                    </p>
                                </CyberCard>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <CyberCard glowColor="green" className="h-full p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h3 className="text-base sm:text-lg font-bold text-[var(--green-neon)]">Stability</h3>
                                        <span className="text-xl sm:text-2xl font-bold">10%</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                                        Analyzes version history and yanked status. Stable crates avoid breaking changes and retracted versions. Crates with yanked versions receive penalties.
                                    </p>
                                </CyberCard>
                            </motion.div>
                        </div>
                    </section>

                    {/* Author */}
                    <section className="w-full mt-4 sm:mt-6 md:mt-8">
                        <motion.h2
                            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 text-[var(--text-primary)]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <User className="text-[var(--cyan-neon)]" size={24} />
                            <span>Built By</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="w-full max-w-2xl mx-auto px-2 sm:px-4"
                        >
                            <CyberCard glowColor="cyan" className="p-6 sm:p-8 text-center">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-2 border-[var(--cyan-neon)] shadow-[0_0_20px_var(--cyan-glow)] ring-4 ring-[var(--cyan-neon)]/20 relative">
                                    <Image 
                                        src="/avatar.jpg" 
                                        alt="Godfrey Lebo" 
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                                        priority
                                    />
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">Godfrey Lebo</h3>
                                <p className="text-sm sm:text-base text-[var(--cyan-neon)] font-mono mb-3 sm:mb-4">Fullstack Developer & Technical PM</p>
                                <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed mb-4 sm:mb-6">
                                    Specializing in <strong className="text-[var(--cyan-neon)]">AI, Mobile & Backend Security</strong> with <strong className="text-[var(--green-neon)]">9+ years</strong> of experience building secure applications. Passionate about Rust security and creating tools that empower developers to ship safer code.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 text-left">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/20">
                                        <Code className="text-[var(--cyan-neon)] flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1">Expertise</h4>
                                            <p className="text-xs text-[var(--text-secondary)]">Rust, TypeScript, Python, Mobile Development</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--green-neon)]/20">
                                        <Lock className="text-[var(--green-neon)] flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1">Focus</h4>
                                            <p className="text-xs text-[var(--text-secondary)]">Security, Performance, Developer Experience</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                                    <a
                                        href="https://godfreylebo.dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/40 rounded-full text-xs sm:text-sm text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/20 transition-all"
                                    >
                                        <Globe size={16} />
                                        <span>Visit Portfolio</span>
                                    </a>
                                    <a
                                        href="https://github.com/emorilebo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--text-muted)]/30 rounded-full text-xs sm:text-sm text-[var(--text-secondary)] hover:border-[var(--cyan-neon)]/50 hover:text-[var(--cyan-neon)] transition-all"
                                    >
                                        <Github size={16} />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </CyberCard>
                        </motion.div>
                    </section>
                </div>
            </div>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--cyan-neon)]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--pink-neon)]/5 rounded-full blur-3xl" />
            </div>
        </main>
    );
}
