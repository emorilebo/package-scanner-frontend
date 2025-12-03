'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'cyan' | 'pink' | 'green' | 'purple';
    hover?: boolean;
}

export default function CyberCard({
    children,
    className = '',
    glowColor = 'cyan',
    hover = true
}: CyberCardProps) {
    const glowClass = `glow-${glowColor}`;

    return (
        <motion.div
            className={`cyber-border relative ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hover ? {
                scale: 1.02,
                transition: { duration: 0.2 }
            } : undefined}
        >
            <div className={`absolute top-0 left-0 w-1 h-full ${glowClass} opacity-50`}></div>
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
