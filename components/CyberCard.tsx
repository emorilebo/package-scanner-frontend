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
    const glowColors = {
        cyan: 'var(--cyan-neon)',
        pink: 'var(--pink-neon)',
        green: 'var(--green-neon)',
        purple: 'var(--purple-neon)'
    };

    const glowColorValue = glowColors[glowColor];

    return (
        <motion.div
            className={`cyber-border relative ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hover ? {
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            } : undefined}
        >
            {/* Subtle accent line */}
            <div 
                className="absolute top-0 left-0 w-0.5 h-full opacity-40"
                style={{
                    background: `linear-gradient(to bottom, ${glowColorValue}, transparent)`,
                    transition: 'opacity 0.3s ease'
                }}
            />
            <motion.div 
                className="absolute top-0 left-0 w-0.5 h-full"
                style={{ background: glowColorValue }}
                whileHover={{ opacity: 0.8 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hover ? 0.4 : 0 }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
