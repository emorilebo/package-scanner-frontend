'use client';

import { motion } from 'framer-motion';
import CyberCard from './CyberCard';
import RankBadge from './RankBadge';
import { Download } from 'lucide-react';

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
            className="cursor-pointer h-full"
            onClick={() => onClick(crate)}
        >
            <CyberCard className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold font-mono text-[var(--cyan-neon)] hover:text-glow-cyan transition-all truncate">
                                {crate.name}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-xs px-2.5 py-1 bg-[var(--bg-elevated)] border border-[var(--cyan-neon)]/30 rounded-md text-[var(--cyan-neon)] font-mono">
                                v{crate.version}
                            </span>
                            {crate.status && crate.statusEmoji && (
                                <span 
                                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                                        crate.statusColor === 'green' ? 'bg-[var(--green-neon)]/20 border border-[var(--green-neon)]/40 text-[var(--green-neon)]' :
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
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                            {crate.description}
                        </p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                        <RankBadge score={crate.score} size="sm" />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <Download size={14} className="text-[var(--green-neon)]" />
                        <span>{crate.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <span className="text-[var(--text-muted)]">•</span>
                        <span>{crate.dependencies} deps</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto">
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
