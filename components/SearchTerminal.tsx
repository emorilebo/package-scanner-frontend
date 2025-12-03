'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
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
            className="relative w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="relative">
                {/* Outer glow effect */}
                <div className={`absolute -inset-1 rounded-3xl blur-xl transition-all duration-500 ${
                    isFocused 
                        ? 'bg-gradient-to-r from-[var(--cyan-neon)]/40 via-[var(--pink-neon)]/30 to-[var(--green-neon)]/40 opacity-75' 
                        : 'bg-[var(--cyan-neon)]/10 opacity-0'
                }`} />
                
                <div
                    className={`relative flex items-center gap-5 px-8 py-6 bg-[var(--bg-secondary)]/80 backdrop-blur-2xl border-2 rounded-3xl transition-all duration-300 ${
                        isFocused 
                            ? 'border-[var(--cyan-neon)]/80 shadow-2xl shadow-[var(--cyan-neon)]/30 scale-[1.02]' 
                            : 'border-[var(--text-muted)]/30 hover:border-[var(--cyan-neon)]/40 hover:shadow-lg'
                    }`}
                >
                    <div className={`flex-shrink-0 p-2.5 rounded-xl transition-all duration-300 ${
                        isFocused 
                            ? 'bg-[var(--cyan-neon)]/20 text-[var(--cyan-neon)]' 
                            : 'bg-[var(--bg-tertiary)]/50 text-[var(--text-muted)]'
                    }`}>
                        <Search
                            size={24}
                            strokeWidth={2.5}
                        />
                    </div>
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
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-xl placeholder:text-[var(--text-muted)] placeholder:font-normal"
                    />
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    onSearch('');
                                }}
                                className="flex-shrink-0 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <X size={20} strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Helper text */}
            <motion.p
                className="text-center mt-6 text-sm text-[var(--text-muted)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Press <kbd className="px-2.5 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--text-muted)]/30 rounded-md text-xs font-mono">Enter</kbd> to search or start typing to filter results
            </motion.p>
        </motion.form>
    );
}
