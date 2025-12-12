'use client';

import { motion } from 'framer-motion';
import { Box, Search, AlertTriangle, CheckCircle, XCircle, Shield, Download, Zap, TrendingUp, Lock } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from '@/components/Navigation';
import SearchTerminal from '@/components/SearchTerminal';
import HeroCarousel from '@/components/HeroCarousel';
import NpmPackageCard, { NpmPackageData } from '@/components/NpmPackageCard';
import NpmPackageModal from '@/components/NpmPackageModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import CyberCard from '@/components/CyberCard';

const features = [
    {
        icon: Shield,
        title: 'Deep Analysis',
        description: 'Recursive Base64 decoding & malware detection',
        color: 'pink'
    },
    {
        icon: Zap,
        title: 'Instant Scoring',
        description: 'Real-time health & security scores for any package',
        color: 'red'
    },
    {
        icon: Lock,
        title: 'Supply Chain',
        description: 'Verify integrity of dependencies before installing',
        color: 'purple'
    },
    {
        icon: TrendingUp,
        title: 'Popularity',
        description: 'Track adoption & maintenance trends',
        color: 'orange'
    }
];

export default function NpmScanner() {
    const [query, setQuery] = useState('');
    const [packages, setPackages] = useState<NpmPackageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState<NpmPackageData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const observerTarget = useRef<HTMLDivElement>(null);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const fetchPackages = async (searchQuery: string = '', pageNum: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const url = `/api/npm/list?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&per_page=20`;
            const res = await fetch(url);

            if (!res.ok) throw new Error('Failed to fetch packages');

            const data = await res.json();

            if (pageNum === 1) {
                setPackages(data.packages);
            } else {
                setPackages(prev => [...prev, ...data.packages]);
            }

            setHasMore(pageNum < data.meta.totalPages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages(query, 1);
    }, [query]);

    const handleSearch = (newQuery: string) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        const timer = setTimeout(() => {
            setQuery(newQuery);
            setPage(1);
        }, 500);
        setDebounceTimer(timer);
    };

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPackages(query, nextPage);
        }
    }, [loading, hasMore, page, query]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [loadMore]);

    return (
        <main className="min-h-screen w-full relative overflow-hidden text-[var(--text-primary)]">
            <Navigation />

            {/* Background Accents */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[var(--pink-neon)]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section - Proper spacing for fixed navbar */}
            <section className="relative z-10 pb-12 overflow-hidden" style={{ paddingTop: 'calc(3.5rem + 60px)' }}>
                <div className="container mx-auto max-w-6xl flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--pink-neon)]/30 bg-[var(--pink-neon)]/10 text-[var(--pink-neon)] font-medium text-sm mb-6">
                            <Box size={16} />
                            <span>NPM Security Intelligence</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink-neon)] via-red-500 to-orange-500">
                                NPM SENTINEL
                            </span>
                        </h1>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                            Real-time threat detection for the world's largest software registry.
                        </p>
                    </motion.div>

                    {/* Search */}
                    <div className="w-full max-w-3xl mb-12">
                        <SearchTerminal
                            onSearch={handleSearch}
                            placeholder="Search npm packages (e.g. react, lodash, express)..."
                        />
                    </div>

                    {/* Features */}
                    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                            >
                                <CyberCard glowColor={feature.color as any} className="h-full">
                                    <div className="p-4">
                                        <feature.icon size={28} style={{ color: `var(--${feature.color}-neon)` }} className="mb-3" />
                                        <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                                    </div>
                                </CyberCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="relative z-10 pb-20">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="text-[var(--pink-neon)] text-glow-pink">
                            {query ? 'Search Results' : 'Trending Packages'}
                        </span>
                    </h2>

                    {packages.length === 0 && !loading ? (
                        <div className="text-center py-20 text-[var(--text-secondary)]">
                            No packages found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg, i) => (
                                <NpmPackageCard
                                    key={`${pkg.name}-${i}`}
                                    pkg={pkg}
                                    index={i}
                                    onClick={setSelectedPackage}
                                />
                            ))}
                        </div>
                    )}

                    <div ref={observerTarget} className="mt-12 flex justify-center">
                        {loading && <LoadingSpinner />}
                    </div>
                </div>
            </section>

            <NpmPackageModal
                packageData={selectedPackage}
                onClose={() => setSelectedPackage(null)}
            />
        </main>
    );
}
