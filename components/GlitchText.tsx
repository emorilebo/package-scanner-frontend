'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface GlitchTextProps {
    children: ReactNode;
    className?: string;
    glitchOnHover?: boolean;
}

export default function GlitchText({
    children,
    className = '',
    glitchOnHover = false
}: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    const triggerGlitch = () => {
        if (glitchOnHover) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300);
        }
    };

    return (
        <motion.span
            className={`relative inline-block ${isGlitching ? 'glitch' : ''} ${className}`}
            onMouseEnter={triggerGlitch}
        >
            {children}
        </motion.span>
    );
}
