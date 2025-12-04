'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="relative w-20 h-20">
                {/* Outer rotating ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--cyan-neon)] border-r-[var(--pink-neon)]"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        boxShadow: '0 0 20px var(--cyan-glow)'
                    }}
                />

                {/* Inner rotating ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-b-[var(--green-neon)] border-l-[var(--purple-neon)]"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        boxShadow: '0 0 15px var(--green-glow)'
                    }}
                />

                {/* Center pulse */}
                <motion.div
                    className="absolute inset-6 rounded-full bg-[var(--cyan-neon)]/20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Scanning text */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-sm text-[var(--cyan-neon)] font-mono">
                        Scanning<span className="typing-indicator inline-flex ml-1">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
