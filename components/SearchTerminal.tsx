'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles } from 'lucide-react';
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
                {/* Enhanced animated gradient background glow */}
                <motion.div
                    className="absolute -inset-3 rounded-3xl opacity-90"
                    animate={{
                        background: [
                            'linear-gradient(90deg, rgba(0,217,255,0.6) 0%, rgba(255,0,229,0.5) 50%, rgba(0,255,136,0.6) 100%)',
                            'linear-gradient(90deg, rgba(0,255,136,0.6) 0%, rgba(0,217,255,0.5) 50%, rgba(255,0,229,0.6) 100%)',
                            'linear-gradient(90deg, rgba(255,0,229,0.6) 0%, rgba(0,255,136,0.5) 50%, rgba(0,217,255,0.6) 100%)',
                            'linear-gradient(90deg, rgba(0,217,255,0.6) 0%, rgba(255,0,229,0.5) 50%, rgba(0,255,136,0.6) 100%)',
                        ],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ filter: 'blur(24px)' }}
                />

                {/* Enhanced animated border */}
                <motion.div
                    className="absolute -inset-[3px] rounded-3xl"
                    style={{
                        background: 'linear-gradient(90deg, var(--cyan-neon), var(--pink-neon), var(--green-neon), var(--cyan-neon))',
                        backgroundSize: '300% 100%',
                    }}
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Main search container - Enhanced */}
                <div
                    className={`relative flex items-center gap-2 sm:gap-3 md:gap-5 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-[var(--bg-primary)] rounded-2xl sm:rounded-3xl transition-all duration-300 border-2 border-transparent ${isFocused ? 'scale-[1.02] sm:scale-[1.03] shadow-[0_0_30px_var(--cyan-glow),0_0_60px_var(--pink-glow)]' : 'shadow-[0_0_15px_var(--cyan-glow)] sm:shadow-[0_0_20px_var(--cyan-glow)]'
                        }`}
                >
                    {/* Enhanced animated search icon */}
                    <motion.div
                        className="flex-shrink-0 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--cyan-neon)]/30 to-[var(--pink-neon)]/30 text-[var(--cyan-neon)] shadow-[0_0_10px_var(--cyan-glow)] sm:shadow-[0_0_15px_var(--cyan-glow)]"
                        animate={isFocused ? {
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0],
                        } : {
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Search size={20} className="sm:hidden" strokeWidth={2.5} />
                        <Search size={24} className="hidden sm:block md:hidden" strokeWidth={2.5} />
                        <Search size={32} className="hidden md:block" strokeWidth={2.5} />
                    </motion.div>

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
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-sm sm:text-base md:text-xl lg:text-2xl placeholder:text-[var(--text-muted)] placeholder:font-normal font-semibold"
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
                                <X size={24} strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Sparkle indicator */}
                    <motion.div
                        className="flex-shrink-0 text-[var(--pink-neon)]"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Sparkles size={24} />
                    </motion.div>
                </div>
            </div>

            {/* Helper text */}
            <motion.p
                className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-[var(--text-muted)] px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Press <kbd className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[var(--bg-tertiary)] border border-[var(--cyan-neon)]/30 rounded-md text-[10px] sm:text-xs font-mono text-[var(--cyan-neon)]">Enter</kbd> to search or start typing to filter results
            </motion.p>
        </motion.form>
    );
}
