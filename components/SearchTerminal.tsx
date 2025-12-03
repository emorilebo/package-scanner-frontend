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
            className="relative w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="relative">
                <div
                    className={`relative flex items-center gap-4 px-6 py-5 bg-[var(--bg-secondary)]/50 backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
                        isFocused 
                            ? 'border-[var(--cyan-neon)]/60 shadow-lg shadow-[var(--cyan-neon)]/20' 
                            : 'border-[var(--text-muted)]/20 hover:border-[var(--text-muted)]/40'
                    }`}
                >
                    <Search
                        className={`flex-shrink-0 transition-all duration-300 ${
                            isFocused 
                                ? 'text-[var(--cyan-neon)] scale-110' 
                                : 'text-[var(--text-muted)]'
                        }`}
                        size={22}
                        strokeWidth={2.5}
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
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-lg placeholder:text-[var(--text-muted)] placeholder:font-normal"
                    />
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                type="button"
                                onClick={() => {
                                    setQuery('');
                                    onSearch('');
                                }}
                                className="flex-shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <X size={18} strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Focus indicator glow */}
                {isFocused && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--cyan-neon)]/10 via-[var(--cyan-neon)]/5 to-transparent pointer-events-none -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </div>
            
            {/* Helper text */}
            <motion.p
                className="text-center mt-4 text-sm text-[var(--text-muted)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Press <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--text-muted)]/20 rounded text-xs">Enter</kbd> to search or start typing to filter results
            </motion.p>
        </motion.form>
    );
}
