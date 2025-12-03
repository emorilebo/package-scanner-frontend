'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle, CheckCircle, TrendingUp, Download, GitBranch, Calendar, ExternalLink } from 'lucide-react';
import RankBadge from './RankBadge';

interface PackageData {
    name: string;
    version: string;
    score: number;
    downloads: string;
    description: string;
    repository?: string;
    lastUpdated: string;
    dependencies: number;
    securityIssues: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    features: string[];
}

interface PackageModalProps {
    packageData: PackageData | null;
    onClose: () => void;
}

export default function PackageModal({ packageData, onClose }: PackageModalProps) {
    if (!packageData) return null;

    const totalIssues =
        packageData.securityIssues.critical +
        packageData.securityIssues.high +
        packageData.securityIssues.medium +
        packageData.securityIssues.low;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />

                {/* Modal Content */}
                <motion.div
                    className="relative cyber-border max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10"
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-6 pr-8">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-[var(--cyan-neon)] text-glow-cyan mb-3">
                                {packageData.name}
                            </h2>
                            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-5 leading-relaxed">
                                {packageData.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/40 rounded-lg text-[var(--cyan-neon)] font-mono text-sm">
                                    v{packageData.version}
                                </span>
                                {packageData.repository && (
                                    <a
                                        href={packageData.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all border border-transparent hover:border-[var(--cyan-neon)]/30"
                                    >
                                        <ExternalLink size={16} />
                                        Repository
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="sm:ml-6 flex-shrink-0">
                            <RankBadge score={packageData.score} size="lg" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="cyber-border p-5 hover:border-[var(--green-neon)]/40 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-[var(--green-neon)]/10 border border-[var(--green-neon)]/30">
                                    <Download size={18} className="text-[var(--green-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-sm font-medium">Downloads</span>
                            </div>
                            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono">
                                {packageData.downloads}
                            </p>
                        </div>

                        <div className="cyber-border p-5 hover:border-[var(--pink-neon)]/40 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-[var(--pink-neon)]/10 border border-[var(--pink-neon)]/30">
                                    <GitBranch size={18} className="text-[var(--pink-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-sm font-medium">Dependencies</span>
                            </div>
                            <p className="text-2xl font-bold text-[var(--text-primary)] font-mono">
                                {packageData.dependencies}
                            </p>
                        </div>

                        <div className="cyber-border p-5 hover:border-[var(--cyan-neon)]/40 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30">
                                    <Calendar size={18} className="text-[var(--cyan-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-sm font-medium">Last Updated</span>
                            </div>
                            <p className="text-lg font-semibold text-[var(--text-primary)]">
                                {packageData.lastUpdated}
                            </p>
                        </div>
                    </div>

                    {/* Security Issues */}
                    <div className="mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30">
                                <Shield size={20} className="text-[var(--cyan-neon)]" />
                            </div>
                            Security Analysis
                        </h3>

                        {totalIssues === 0 ? (
                            <div className="cyber-border p-8 text-center border-[var(--green-neon)]/30">
                                <CheckCircle size={56} className="text-[var(--green-neon)] mx-auto mb-4" />
                                <p className="text-xl font-semibold text-[var(--green-neon)] mb-1">
                                    No known security vulnerabilities
                                </p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    This crate appears to be secure
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="cyber-border p-5 text-center border-[var(--danger)]/30 hover:border-[var(--danger)]/50 transition-colors">
                                    <div className="mb-3">
                                        <AlertTriangle size={28} className="text-[var(--danger)] mx-auto" />
                                    </div>
                                    <p className="text-3xl font-bold text-[var(--danger)] font-mono mb-1">
                                        {packageData.securityIssues.critical}
                                    </p>
                                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Critical</p>
                                </div>

                                <div className="cyber-border p-5 text-center border-[var(--warning)]/30 hover:border-[var(--warning)]/50 transition-colors">
                                    <div className="mb-3">
                                        <AlertTriangle size={28} className="text-[var(--warning)] mx-auto" />
                                    </div>
                                    <p className="text-3xl font-bold text-[var(--warning)] font-mono mb-1">
                                        {packageData.securityIssues.high}
                                    </p>
                                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">High</p>
                                </div>

                                <div className="cyber-border p-5 text-center border-[var(--cyan-neon)]/30 hover:border-[var(--cyan-neon)]/50 transition-colors">
                                    <div className="mb-3">
                                        <AlertTriangle size={28} className="text-[var(--cyan-neon)] mx-auto" />
                                    </div>
                                    <p className="text-3xl font-bold text-[var(--cyan-neon)] font-mono mb-1">
                                        {packageData.securityIssues.medium}
                                    </p>
                                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Medium</p>
                                </div>

                                <div className="cyber-border p-5 text-center border-[var(--green-neon)]/30 hover:border-[var(--green-neon)]/50 transition-colors">
                                    <div className="mb-3">
                                        <AlertTriangle size={28} className="text-[var(--green-neon)] mx-auto" />
                                    </div>
                                    <p className="text-3xl font-bold text-[var(--green-neon)] font-mono mb-1">
                                        {packageData.securityIssues.low}
                                    </p>
                                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">Low</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    {packageData.features.length > 0 && (
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-[var(--green-neon)]/10 border border-[var(--green-neon)]/30">
                                    <TrendingUp size={20} className="text-[var(--green-neon)]" />
                                </div>
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {packageData.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="cyber-border p-4 flex items-start gap-3 hover:border-[var(--green-neon)]/40 transition-colors"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        <CheckCircle size={18} className="text-[var(--green-neon)] flex-shrink-0 mt-0.5" />
                                        <span className="text-[var(--text-secondary)] leading-relaxed">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
