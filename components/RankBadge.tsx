'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface RankBadgeProps {
    score: number;
    size?: 'sm' | 'md' | 'lg';
}

export default function RankBadge({ score, size = 'md' }: RankBadgeProps) {
    const getScoreColor = () => {
        if (score >= 80) return { color: 'var(--green-neon)', glow: 'glow-green', Icon: CheckCircle };
        if (score >= 50) return { color: 'var(--warning)', glow: 'glow-cyan', Icon: Shield };
        return { color: 'var(--danger)', glow: 'glow-pink', Icon: AlertTriangle };
    };

    const { color, glow, Icon } = getScoreColor();

    const sizes = {
        sm: 'w-16 h-16 text-sm',
        md: 'w-24 h-24 text-base',
        lg: 'w-32 h-32 text-xl'
    };

    return (
        <motion.div
            className={`${sizes[size]} relative flex items-center justify-center`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
            {/* Hexagon Background */}
            <div
                className={`absolute inset-0 ${glow}`}
                style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                    background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                    border: `2px solid ${color}`
                }}
            />

            {/* Score Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} style={{ color }} />
                <span
                    className="font-bold font-mono"
                    style={{ color }}
                >
                    {score}
                </span>
            </div>

            {/* Corner Accents */}
            <motion.div
                className="absolute top-0 left-0 w-2 h-2 rounded-full"
                style={{ background: color }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
                style={{ background: color }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </motion.div>
    );
}
