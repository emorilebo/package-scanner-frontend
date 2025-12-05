'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
    // Start with a realistic "base" number and fluctuate it
    const [count, setCount] = useState(1240);

    useEffect(() => {
        // Simulate live visitor changes
        const interval = setInterval(() => {
            setCount(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(1000, prev + change);
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[var(--cyan-neon)] bg-[var(--cyan-neon)]/5 px-3 py-1 rounded-full border border-[var(--cyan-neon)]/20 text-xs font-mono mb-4"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan-neon)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan-neon)]"></span>
            </span>
            <Users size={12} />
            <span>{count.toLocaleString()} developers auditing</span>
        </motion.div>
    );
}
