'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle, CheckCircle, TrendingUp, Download, GitBranch, Calendar, ExternalLink, User, Scale } from 'lucide-react';
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
    authors?: string[];
    license?: string;
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
                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
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
                    className="relative cyber-border max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10"
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all z-10"
                        aria-label="Close modal"
                    >
                        <X size={18} className="sm:hidden" />
                        <X size={20} className="hidden sm:block" />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 md:mb-8 gap-4 sm:gap-6 pr-6 sm:pr-8">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-mono text-[var(--cyan-neon)] text-glow-cyan mb-2 sm:mb-3 break-words">
                                {packageData.name}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-3 sm:mb-4 md:mb-5 leading-relaxed">
                                {packageData.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/40 rounded-md sm:rounded-lg text-[var(--cyan-neon)] font-mono text-xs sm:text-sm">
                                    v{packageData.version}
                                </span>
                                {packageData.repository && (
                                    <a
                                        href={packageData.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] hover:bg-[var(--bg-secondary)] rounded-md sm:rounded-lg transition-all border border-transparent hover:border-[var(--cyan-neon)]/30"
                                    >
                                        <ExternalLink size={14} className="sm:hidden" />
                                        <ExternalLink size={16} className="hidden sm:block" />
                                        <span>Repository</span>
                                    </a>
                                )}
                            </div>
                            {/* Author & License */}
                            {(packageData.authors || packageData.license) && (
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[var(--text-muted)]">
                                    {packageData.authors && packageData.authors.length > 0 && (
                                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                            <User size={14} className="sm:hidden text-[var(--pink-neon)] flex-shrink-0" />
                                            <User size={16} className="hidden sm:block text-[var(--pink-neon)] flex-shrink-0" />
                                            <span className="text-[var(--text-secondary)] truncate max-w-[200px] sm:max-w-none" title={packageData.authors.join(', ')}>
                                                {packageData.authors[0]}
                                                {packageData.authors.length > 1 && ` +${packageData.authors.length - 1} more`}
                                            </span>
                                        </div>
                                    )}
                                    {packageData.license && (
                                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                            <Scale size={14} className="sm:hidden text-[var(--purple-neon)] flex-shrink-0" />
                                            <Scale size={16} className="hidden sm:block text-[var(--purple-neon)] flex-shrink-0" />
                                            <span className="text-[var(--text-secondary)] truncate" title={packageData.license}>
                                                {packageData.license}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="sm:ml-4 md:ml-6 flex-shrink-0 self-start sm:self-center flex flex-col items-center gap-3">
                            <div className="sm:hidden">
                                <RankBadge score={packageData.score} size="sm" />
                            </div>
                            <div className="hidden sm:block md:hidden">
                                <RankBadge score={packageData.score} size="md" />
                            </div>
                            <div className="hidden md:block">
                                <RankBadge score={packageData.score} size="lg" />
                            </div>

                            <a
                                href={`/graph/${encodeURIComponent(packageData.name)}`}
                                className="px-3 py-1.5 rounded-md bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/40 text-[var(--cyan-neon)] text-xs font-mono hover:bg-[var(--cyan-neon)]/20 hover:border-[var(--cyan-neon)] transition-all flex items-center gap-2"
                            >
                                <GitBranch size={14} />
                                <span>VIEW GRAPH</span>
                            </a>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                        <div className="cyber-border p-3 sm:p-4 md:p-5 hover:border-[var(--green-neon)]/40 transition-colors">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--green-neon)]/10 border border-[var(--green-neon)]/30">
                                    <Download size={16} className="sm:hidden text-[var(--green-neon)]" />
                                    <Download size={18} className="hidden sm:block text-[var(--green-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium">Downloads</span>
                            </div>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)] font-mono break-words">
                                {packageData.downloads}
                            </p>
                        </div>

                        <div className="cyber-border p-3 sm:p-4 md:p-5 hover:border-[var(--pink-neon)]/40 transition-colors">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--pink-neon)]/10 border border-[var(--pink-neon)]/30">
                                    <GitBranch size={16} className="sm:hidden text-[var(--pink-neon)]" />
                                    <GitBranch size={18} className="hidden sm:block text-[var(--pink-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium">Dependencies</span>
                            </div>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary)] font-mono">
                                {packageData.dependencies}
                            </p>
                        </div>

                        <div className="cyber-border p-3 sm:p-4 md:p-5 hover:border-[var(--cyan-neon)]/40 transition-colors">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30">
                                    <Calendar size={16} className="sm:hidden text-[var(--cyan-neon)]" />
                                    <Calendar size={18} className="hidden sm:block text-[var(--cyan-neon)]" />
                                </div>
                                <span className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium">Last Updated</span>
                            </div>
                            <p className="text-base sm:text-lg md:text-xl font-semibold text-[var(--text-primary)]">
                                {packageData.lastUpdated}
                            </p>
                        </div>
                    </div>

                    {/* Security Issues */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30">
                                <Shield size={18} className="sm:hidden text-[var(--cyan-neon)]" />
                                <Shield size={20} className="hidden sm:block text-[var(--cyan-neon)]" />
                            </div>
                            <span>Security Analysis</span>
                        </h3>

                        {totalIssues === 0 ? (
                            <div className="cyber-border p-4 sm:p-6 md:p-8 text-center border-[var(--green-neon)]/30">
                                <CheckCircle size={40} className="sm:hidden text-[var(--green-neon)] mx-auto mb-3" />
                                <CheckCircle size={48} className="hidden sm:block md:hidden text-[var(--green-neon)] mx-auto mb-3" />
                                <CheckCircle size={56} className="hidden md:block text-[var(--green-neon)] mx-auto mb-4" />
                                <p className="text-base sm:text-lg md:text-xl font-semibold text-[var(--green-neon)] mb-1">
                                    No known security vulnerabilities
                                </p>
                                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                    This crate appears to be secure
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                                <div className="cyber-border p-3 sm:p-4 md:p-5 text-center border-[var(--danger)]/30 hover:border-[var(--danger)]/50 transition-colors">
                                    <div className="mb-2 sm:mb-3">
                                        <AlertTriangle size={20} className="sm:hidden text-[var(--danger)] mx-auto" />
                                        <AlertTriangle size={24} className="hidden sm:block md:hidden text-[var(--danger)] mx-auto" />
                                        <AlertTriangle size={28} className="hidden md:block text-[var(--danger)] mx-auto" />
                                    </div>
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--danger)] font-mono mb-1">
                                        {packageData.securityIssues.critical}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase tracking-wide">Critical</p>
                                </div>

                                <div className="cyber-border p-3 sm:p-4 md:p-5 text-center border-[var(--warning)]/30 hover:border-[var(--warning)]/50 transition-colors">
                                    <div className="mb-2 sm:mb-3">
                                        <AlertTriangle size={20} className="sm:hidden text-[var(--warning)] mx-auto" />
                                        <AlertTriangle size={24} className="hidden sm:block md:hidden text-[var(--warning)] mx-auto" />
                                        <AlertTriangle size={28} className="hidden md:block text-[var(--warning)] mx-auto" />
                                    </div>
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--warning)] font-mono mb-1">
                                        {packageData.securityIssues.high}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase tracking-wide">High</p>
                                </div>

                                <div className="cyber-border p-3 sm:p-4 md:p-5 text-center border-[var(--cyan-neon)]/30 hover:border-[var(--cyan-neon)]/50 transition-colors">
                                    <div className="mb-2 sm:mb-3">
                                        <AlertTriangle size={20} className="sm:hidden text-[var(--cyan-neon)] mx-auto" />
                                        <AlertTriangle size={24} className="hidden sm:block md:hidden text-[var(--cyan-neon)] mx-auto" />
                                        <AlertTriangle size={28} className="hidden md:block text-[var(--cyan-neon)] mx-auto" />
                                    </div>
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--cyan-neon)] font-mono mb-1">
                                        {packageData.securityIssues.medium}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase tracking-wide">Medium</p>
                                </div>

                                <div className="cyber-border p-3 sm:p-4 md:p-5 text-center border-[var(--green-neon)]/30 hover:border-[var(--green-neon)]/50 transition-colors">
                                    <div className="mb-2 sm:mb-3">
                                        <AlertTriangle size={20} className="sm:hidden text-[var(--green-neon)] mx-auto" />
                                        <AlertTriangle size={24} className="hidden sm:block md:hidden text-[var(--green-neon)] mx-auto" />
                                        <AlertTriangle size={28} className="hidden md:block text-[var(--green-neon)] mx-auto" />
                                    </div>
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--green-neon)] font-mono mb-1">
                                        {packageData.securityIssues.low}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase tracking-wide">Low</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    {packageData.features.length > 0 && (
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-3">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--green-neon)]/10 border border-[var(--green-neon)]/30">
                                    <TrendingUp size={18} className="sm:hidden text-[var(--green-neon)]" />
                                    <TrendingUp size={20} className="hidden sm:block text-[var(--green-neon)]" />
                                </div>
                                <span>Key Features</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                {packageData.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="cyber-border p-3 sm:p-4 flex items-start gap-2 sm:gap-3 hover:border-[var(--green-neon)]/40 transition-colors"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        <CheckCircle size={16} className="sm:hidden text-[var(--green-neon)] flex-shrink-0 mt-0.5" />
                                        <CheckCircle size={18} className="hidden sm:block text-[var(--green-neon)] flex-shrink-0 mt-0.5" />
                                        <span className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{feature}</span>
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
