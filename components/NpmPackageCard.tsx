'use client';

import { motion } from 'framer-motion';
import CyberCard from './CyberCard';
import RankBadge from './RankBadge';
import { Download, User, Box, ShieldAlert } from 'lucide-react';

export interface NpmPackageData {
    name: string;
    version: string;
    description: string;
    score: number;
    downloads: string;
    repository?: string;
    lastUpdated: string;
    status?: string;
    statusColor?: string;
    statusEmoji?: string;
    authors?: string[];
    features: string[];
    securityIssues?: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}

interface NpmPackageCardProps {
    pkg: NpmPackageData;
    onClick: (pkg: NpmPackageData) => void;
    index?: number;
}

export default function NpmPackageCard({ pkg, onClick, index = 0 }: NpmPackageCardProps) {
    const totalIssues = pkg.securityIssues ?
        pkg.securityIssues.critical + pkg.securityIssues.high + pkg.securityIssues.medium + pkg.securityIssues.low : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -4 }}
            className="cursor-pointer h-full w-full max-w-full group"
            onClick={() => onClick(pkg)}
        >
            <CyberCard
                className="h-full flex flex-col w-full overflow-hidden relative group"
                glowColor="pink" // Default to pink for NPM
            >
                {/* Scanner Overlay Red/Pink */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="scanner-line bg-[var(--pink-neon)] shadow-[0_0_15px_var(--pink-neon)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--pink-neon)]/8 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
                    <div className="absolute inset-0 security-grid opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10 gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Box size={18} className="text-[var(--pink-neon)] flex-shrink-0" />
                            <h3 className="text-lg sm:text-xl font-bold font-mono text-[var(--pink-neon)] group-hover:text-glow-pink transition-all truncate">
                                {pkg.name}
                            </h3>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
                            <span className="text-xs px-2.5 py-1 bg-[var(--bg-elevated)] border border-[var(--pink-neon)]/30 rounded-md text-[var(--pink-neon)] font-mono">
                                v{pkg.version}
                            </span>
                            {pkg.status && (
                                <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${pkg.statusColor === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        pkg.statusColor === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                    }`}>
                                    {pkg.statusEmoji} {pkg.status}
                                </span>
                            )}
                        </div>

                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-3">
                            {pkg.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            {pkg.authors && pkg.authors.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <User size={12} />
                                    <span className="truncate max-w-[150px]">{pkg.authors[0]}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <RankBadge score={pkg.score} size="sm" />
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-auto flex items-center justify-between relative z-10 pt-4 border-t border-[var(--text-muted)]/10">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Download size={14} className="text-[var(--pink-neon)]" />
                        <span>{pkg.downloads}</span>
                    </div>

                    {totalIssues > 0 ? (
                        <div className="flex items-center gap-1 text-xs text-red-400 font-bold">
                            <ShieldAlert size={14} />
                            <span>{totalIssues} Issues</span>
                        </div>
                    ) : (
                        <div className="text-xs text-[var(--text-muted)] italic">
                            Unscanned
                        </div>
                    )}
                </div>
            </CyberCard>
        </motion.div>
    );
}
