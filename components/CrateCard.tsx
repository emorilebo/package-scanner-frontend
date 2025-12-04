'use client';

import { motion } from 'framer-motion';
import CyberCard from './CyberCard';
import RankBadge from './RankBadge';
import { Download, User, Scale } from 'lucide-react';

export interface CrateData {
    name: string;
    score: number;
    downloads: string;
    description: string;
    version: string;
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
    status?: string;
    statusColor?: string;
    statusEmoji?: string;
    authors?: string[];
    license?: string;
}

interface CrateCardProps {
    crate: CrateData;
    onClick: (crate: CrateData) => void;
    index?: number;
}

export default function CrateCard({ crate, onClick, index = 0 }: CrateCardProps) {
    const totalIssues =
        crate.securityIssues.critical +
        crate.securityIssues.high +
        crate.securityIssues.medium +
        crate.securityIssues.low;

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
            onClick={() => onClick(crate)}
        >
            <CyberCard className="h-full flex flex-col w-full overflow-hidden relative group">
                {/* Scanner Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="scanner-line"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyan-neon)]/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
                    {/* Security grid overlay on hover */}
                    <div className="absolute inset-0 security-grid opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10 gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold font-mono text-[var(--cyan-neon)] group-hover:text-glow-cyan transition-all truncate">
                                {crate.name}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
                            <span className="text-xs px-2.5 py-1 bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/30 rounded-md text-[var(--cyan-neon)] font-mono">
                                v{crate.version}
                            </span>
                            {crate.status && crate.statusEmoji && (
                                <span
                                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${crate.statusColor === 'green' ? 'bg-[var(--green-neon)]/20 border border-[var(--green-neon)]/40 text-[var(--green-neon)]' :
                                        crate.statusColor === 'yellow' ? 'bg-[var(--warning)]/20 border border-[var(--warning)]/40 text-[var(--warning)]' :
                                            crate.statusColor === 'orange' ? 'bg-[var(--warning)]/20 border border-[var(--warning)]/40 text-[var(--warning)]' :
                                                'bg-[var(--danger)]/20 border border-[var(--danger)]/40 text-[var(--danger)]'
                                        }`}
                                >
                                    {crate.statusEmoji} {crate.status}
                                </span>
                            )}
                            {totalIssues > 0 && (
                                <span className="text-xs px-2.5 py-1 bg-[var(--danger)]/20 border border-[var(--danger)]/40 rounded-md text-[var(--danger)]">
                                    {totalIssues} issue{totalIssues !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-3">
                            {crate.description}
                        </p>

                        {/* Author & License */}
                        <div className="flex items-center gap-2 sm:gap-4 text-xs text-[var(--text-muted)] mb-2 flex-wrap">
                            {crate.authors && crate.authors.length > 0 && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <User size={12} className="text-[var(--pink-neon)] flex-shrink-0" />
                                    <span className="truncate max-w-[120px] sm:max-w-[200px] text-[var(--text-secondary)]" title={crate.authors.join(', ')}>
                                        {crate.authors[0]}
                                        {crate.authors.length > 1 && ` +${crate.authors.length - 1}`}
                                    </span>
                                </div>
                            )}
                            {crate.license && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <Scale size={12} className="text-[var(--purple-neon)] flex-shrink-0" />
                                    <span className="truncate max-w-[80px] sm:max-w-[120px] text-[var(--text-secondary)]" title={crate.license}>
                                        {crate.license}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="ml-2 sm:ml-3 flex-shrink-0">
                        <RankBadge score={crate.score} size="sm" />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 sm:gap-4 mb-4 text-xs relative z-10 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <Download size={14} className="text-[var(--green-neon)] flex-shrink-0" />
                        <span className="truncate">{crate.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
                        <span>{crate.dependencies} deps</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[var(--text-muted)]">Security Score</span>
                        <span className="text-xs font-mono text-[var(--text-secondary)]">{crate.score}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--cyan-neon)] via-[var(--green-neon)] to-[var(--green-neon)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${crate.score}%` }}
                            transition={{ delay: 0.3 + index * 0.05, duration: 1, ease: "easeOut" }}
                            style={{
                                boxShadow: `0 0 8px var(--green-glow)`
                            }}
                        />
                    </div>
                </div>
            </CyberCard>
        </motion.div>
    );
}
