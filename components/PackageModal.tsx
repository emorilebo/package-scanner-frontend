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
                    className="relative cyber-border max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-6">
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-[var(--cyan-neon)] text-glow-cyan mb-2">
                                {packageData.name}
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4">
                                {packageData.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--cyan-neon)] rounded text-[var(--cyan-neon)]">
                                    v{packageData.version}
                                </span>
                                {packageData.repository && (
                                    <a
                                        href={packageData.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        Repository
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="sm:ml-6">
                            <RankBadge score={packageData.score} size="lg" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="cyber-border p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Download size={20} className="text-[var(--green-neon)]" />
                                <span className="text-[var(--text-secondary)] text-sm">Downloads</span>
                            </div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">
                                {packageData.downloads}
                            </p>
                        </div>

                        <div className="cyber-border p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <GitBranch size={20} className="text-[var(--pink-neon)]" />
                                <span className="text-[var(--text-secondary)] text-sm">Dependencies</span>
                            </div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">
                                {packageData.dependencies}
                            </p>
                        </div>

                        <div className="cyber-border p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar size={20} className="text-[var(--cyan-neon)]" />
                                <span className="text-[var(--text-secondary)] text-sm">Last Updated</span>
                            </div>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">
                                {packageData.lastUpdated}
                            </p>
                        </div>
                    </div>

                    {/* Security Issues */}
                    <div className="mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                            <Shield className="text-[var(--cyan-neon)]" />
                            Security Analysis
                        </h3>

                        {totalIssues === 0 ? (
                            <div className="cyber-border p-6 text-center">
                                <CheckCircle size={48} className="text-[var(--green-neon)] mx-auto mb-3" />
                                <p className="text-lg text-[var(--green-neon)]">
                                    No known security vulnerabilities
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="cyber-border p-4 text-center">
                                    <AlertTriangle size={24} className="text-[var(--danger)] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-[var(--danger)]">
                                        {packageData.securityIssues.critical}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">Critical</p>
                                </div>

                                <div className="cyber-border p-4 text-center">
                                    <AlertTriangle size={24} className="text-[var(--warning)] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-[var(--warning)]">
                                        {packageData.securityIssues.high}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">High</p>
                                </div>

                                <div className="cyber-border p-4 text-center">
                                    <AlertTriangle size={24} className="text-[var(--cyan-neon)] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-[var(--cyan-neon)]">
                                        {packageData.securityIssues.medium}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">Medium</p>
                                </div>

                                <div className="cyber-border p-4 text-center">
                                    <AlertTriangle size={24} className="text-[var(--green-neon)] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-[var(--green-neon)]">
                                        {packageData.securityIssues.low}
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">Low</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    {packageData.features.length > 0 && (
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="text-[var(--green-neon)]" />
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {packageData.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="cyber-border p-3 flex items-center gap-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <CheckCircle size={16} className="text-[var(--green-neon)] flex-shrink-0" />
                                        <span className="text-[var(--text-secondary)]">{feature}</span>
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
