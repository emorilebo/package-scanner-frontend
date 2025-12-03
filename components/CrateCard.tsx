'use client';

import { motion } from 'framer-motion';
import CyberCard from './CyberCard';
import RankBadge from './RankBadge';
import { Download } from 'lucide-react';

interface CrateData {
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
}

interface CrateCardProps {
    crate: CrateData;
    onClick: (crate: CrateData) => void;
    index?: number;
}

export default function CrateCard({ crate, onClick, index = 0 }: CrateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => onClick(crate)}
        >
            <CyberCard className="h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold font-mono text-[var(--cyan-neon)] mb-1 hover:text-glow-cyan transition-all">
                            {crate.name}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--text-muted)] rounded text-[var(--text-muted)]">
                            v{crate.version}
                        </span>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                            {crate.description}
                        </p>
                    </div>
                    <RankBadge score={crate.score} size="sm" />
                </div>

                <div className="flex items-center gap-2 text-sm mb-4">
                    <Download size={16} className="text-[var(--green-neon)]" />
                    <span className="text-[var(--text-secondary)]">
                        {crate.downloads} downloads
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[var(--cyan-neon)] to-[var(--green-neon)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${crate.score}%` }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 1 }}
                    />
                </div>
            </CyberCard>
        </motion.div>
    );
}
