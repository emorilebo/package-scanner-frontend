'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchTerminalProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchTerminal({
    onSearch,
    placeholder = 'Search crates...'
}: SearchTerminalProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`cyber-border flex items-center gap-3 px-6 py-4 transition-all duration-300 ${isFocused ? 'glow-cyan' : ''
                    }`}
            >
                <Search
                    className="text-[var(--cyan-neon)]"
                    size={24}
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onSearch(e.target.value);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] font-mono text-lg placeholder:text-[var(--text-muted)]"
                />
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--green-neon)] animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-[var(--cyan-neon)] animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-[var(--pink-neon)] animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
            <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--cyan-neon)] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isFocused ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.form>
    );
}
